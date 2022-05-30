import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { ethers } from "ethers";


// Next stage: Connect to Cloris Smart Contract


class App extends React.Component {
    constructor (props){
        super(props);
        this.state = { 
            signer: "",
            provider: new ethers.providers.Web3Provider(window.ethereum),
            clorisAddress: "0x84bdFF44b36cF1aD0dA2D14cbb138f5a8549aE4d",
            clorisAbi: [
                "function name() view returns (string)",
                "function symbol() view returns (string)",
                "function deployedTime() view returns (uint)",
                "function maxMintAccount() view returns (uint)",
                "function mintCost() view returns (uint)",
                "function maxSupply() view returns (uint)",
                "function tokenMaxPurchase() view returns (uint)",
                "function mintTime() view returns (uint)",
                "function isPaused() view returns (bool)",
                "function mintContract(uint) payable returns ()"
            ],
            // date: Math.floor(new Date() / 1000),
            // countDownDate: Math.floor(new Date("May 31, 2022 16:00:00") / 1000),
            date: Math.floor(new Date() / 1000),
            countDownDate: Math.floor(new Date("May 31, 2022 07:00:00") / 1000),
            timeLeft: ""
        };

    }

    calculateTimeLeft(){

        const oneDay = 60 * 60 * 24;
        const oneHour = 60 * 60;
        const oneMinute = 60;
        const calTimeLeft = this.state.countDownDate - this.state.date;
        const daysLeft = calTimeLeft / oneDay;
        const hoursLeft = (calTimeLeft % oneDay) / oneHour;
        const minutesLeft = (calTimeLeft % hoursLeft) / oneMinute;
        const secondsLeft = calTimeLeft % minutesLeft;
        
        if(this.state.countDownDate - this.state.date > 0 ){
            this.setState(
                {timeLeft: `Time left before deployment: Days Left: ${daysLeft.toFixed(0)} Hours Left: ${hoursLeft.toFixed(0)} Minutes Left: ${minutesLeft.toFixed(0)} Seconds Left: ${secondsLeft.toFixed(0)}`}
            )
        } else {
            this.setState(
                {timeLeft: `Contract deployed since: ${(daysLeft * (- 1)).toFixed(0)} Days, ${(hoursLeft * (- 1)).toFixed(0)} Hours, ${(minutesLeft * (- 1)).toFixed(0)} Minutes, ${(secondsLeft * (- 1)).toFixed(0)} Seconds`}
            )
        }
    }

    async componentDidMount(){
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", []);
        await this.state.provider.send("eth_requestAccounts", []);
        const testSigner = this.state.provider.getSigner();
        this.setState({signer: testSigner});
        this.calculateTimeLeft();
        const blockNumber = await this.state.provider.getBlockNumber();
        // console.log(`The value of blockNumber is ${blockNumber}`);
        // const balance = await this.state.provider.getBalance("ethers.eth");
        // console.log(`The value of balance is ${balance}`);
        // const balanceEther = ethers.utils.formatEther(balance);
        // console.log(`The value of balanceEther is ${balanceEther}`);
        // console.log(`The value of balanceWei is ${ethers.utils.parseEther(balanceEther)}`);
        // const transaction = this.state.signer.sendTransaction({
        //      to: "0x40953332Fe1c3838b93Ed6071403A7CD54eb9AE1",
        //      value: ethers.utils.parseEther("1.0")
        // });
        const clorisContract = new ethers.Contract(this.state.clorisAddress, this.state.clorisAbi, this.state.provider);
        const clorisSigner = clorisContract.connect(this.state.signer);
        console.log(`The value of testSigner is ${testSigner}`);
        console.log(`the name of the contract is ${await clorisContract.name()}`);
        console.log(`the symbol of the contract is ${await clorisContract.symbol()}`);
        console.log(`the deployedTime of the contract is ${await clorisContract.deployedTime()}`);
        console.log(`the maxMintAccount of the contract is ${await clorisContract.maxMintAccount()}`);
        console.log(`the mintCost of the contract is ${await clorisContract.mintCost()}`);
        console.log(`the maxSupply of the contract is ${await clorisContract.maxSupply()}`);
        console.log(`the tokenMaxPurchase of the contract is ${await clorisContract.tokenMaxPurchase()}`);
        console.log(`the mintTime of the contract is ${await clorisContract.mintTime()}`);
        console.log(`the isPaused of the contract is ${await clorisContract.isPaused()}`);
        // console.log(`the mintContract of the contract is ${await clorisSigner.mintContract(1)}`);
        console.log(`the value of date is ${this.state.date}`);
        console.log(`the value of countDownDate is ${this.state.countDownDate}`)
        console.log(`the value of timeLeft is ${this.state.timeLeft}`);
    }





    render (){
        return (
            <div className="App">
                <div className="title">
                    <h1>
                        Welcome to the Cloris Project!
                    </h1>
                </div>
                <div className="content">
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="status">
                        <span className="timeReference">
                            Deployment Time is: {this.state.date}
                        </span>
                        <span className="timeReference">
                            {this.state.timeLeft}
                        </span>
                    </div>
                </div>
                <div className="socialMedia">
                    <h1>
                        Social Media
                    </h1>
                </div>
            </div>
        );
    }
}

export default App;


