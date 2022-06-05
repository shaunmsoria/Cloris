import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { ethers } from "ethers";





class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

class App extends React.Component {
    constructor (props){
        super(props);
        this.state = { 
            signer: "",
            provider: new ethers.providers.Web3Provider(window.ethereum),
            clorisAddress: "0xb1fc11829AAC5c9eD0284936deaeeA4e71eB9F77",
            userAddress: "",
            userNumberToken: 0,
            maxNumberToken: 0,
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
                "function mintContract(uint) payable returns ()",
                "function walletOfOwner(address) public view returns (uint256[])"
            ],
            date: Math.floor(new Date() / 1000),
            // countDownDate: Math.floor(new Date("Jun 1 2022 07:30:00") / 1000),
            countDownDate: "",
            deploymentTime: "",
            timeLeft: "",
            isFuture: false

        };
        this.handleClick = this.handleClick.bind(this);

    }

    calculateTimeLeft(){
        const oneDay = 60 * 60 * 24;
        const oneHour = 60 * 60;
        const oneMinute = 60;
        this.setState({isFuture: (this.state.countDownDate - this.state.date >= 0) ? true : false});
        const calTimeLeft = (this.state.countDownDate - this.state.date >= 0) ? this.state.countDownDate - this.state.date : this.state.date - this.state.countDownDate;
        const daysLeft = Math.floor((calTimeLeft / oneDay));
        const hoursLeft = Math.floor(((calTimeLeft & oneDay) / oneHour));
        const minutesLeft = Math.floor(((calTimeLeft % oneDay) % oneHour) / oneMinute);
        const secondsLeft = Math.floor(((calTimeLeft % oneDay) % oneHour) % oneMinute);
        this.setState(
            {timeLeft: `${(this.state.isFuture) ? "Time left before minting:" : "Time since the contract was minted:"} ${daysLeft} Days, ${hoursLeft} Hours, ${minutesLeft} Minutes, ${secondsLeft} Seconds`} 
        )
    }

    tick(){
        this.setState({
            date: Math.floor(new Date() / 1000)
        });
        this.calculateTimeLeft();
    }



    async handleClick (){
        this.setState({userAddress: this.state.provider.provider._state.accounts[0]});
        let mintResult = await this.state.clorisSigner.mintContract(1);
        this.setState({userNumberToken: (await this.state.clorisSigner.walletOfOwner(this.state.userAddress)).length});

        // this.setState({signerResult: await this.state.clorisSigner.mintContract(1)});
        // console.log(`The value of signerResult is ${this.state.signerResult}`);
    }


    async componentDidMount(){
        await this.state.provider.send("eth_requestAccounts", []);
        const defineSigner = this.state.provider.getSigner();
        this.setState({signer: defineSigner});

        const clorisContract = new ethers.Contract(this.state.clorisAddress, this.state.clorisAbi, this.state.provider);
        // const clorisSigner = clorisContract.connect(this.state.signer);
        // await this.setState({clorisContract: new ethers.Contract(this.state.clorisAddress, this.state.clorisAbi, this.state.provider)});
        await this.setState({clorisSigner: clorisContract.connect(this.state.signer)});

        this.setState({deploymentTime: `${(new Date(await clorisContract.deployedTime() * 1000)).toLocaleString("en-US", {timeZoneName: "short"})}`});
        this.setState({countDownDate: `${await clorisContract.mintTime()}`});
        this.setState({userAddress: this.state.provider.provider._state.accounts[0]});
        this.setState({userNumberToken: (await this.state.clorisSigner.walletOfOwner(this.state.userAddress)).length});
        this.setState({maxNumberToken: await clorisContract.maxMintAccount()});

        this.calculateTimeLeft();

        this.timerID = setInterval(
            () => this.tick(), 1000
        );


        // Testing the front end
        console.log(`The value of defineSigner is ${defineSigner}`);
        console.log(`the name of the contract is ${await clorisContract.name()}`);
        console.log(`the symbol of the contract is ${await clorisContract.symbol()}`);
        console.log(`the deployedTime of the contract is ${await this.state.deploymentTime}`);
        console.log(`the maxMintAccount of the contract is ${await clorisContract.maxMintAccount()}`);
        console.log(`the mintCost of the contract is ${await clorisContract.mintCost()}`);
        console.log(`the maxSupply of the contract is ${await clorisContract.maxSupply()}`);
        console.log(`the tokenMaxPurchase of the contract is ${await clorisContract.tokenMaxPurchase()}`);
        console.log(`the mintTime of the contract is ${await clorisContract.mintTime()}`);
        console.log(`the isPaused of the contract is ${await clorisContract.isPaused()}`);
        // console.log(`the mintContract of the contract is ${await this.state.clorisSigner.mintContract(1)}`);
        console.log(`the value of date is ${this.state.date}`);
        console.log(`the value of countDownDate is ${this.state.countDownDate}`)
        console.log(`the value of timeLeft is ${this.state.timeLeft}`);
        console.log(`The value of blockNumber is ${await this.state.provider.getBlockNumber()}`);
        console.log(`The Cloris deployedTime is ${await clorisContract.deployedTime()}`);
        // console.log(`The value of provider is ${JSON.stringify(this.state.provider, getCircularReplacer(),4)}`);
        console.log(`The value of _isProvider is ${this.state.provider.provider._state.accounts[0]}`);
        // console.log(`The value of walletOwner is ${await this.state.clorisSigner.walletOfOwner(this.state.provider.provider._state.accounts[0])}`);
        console.log(`The value of walletOwner is ${await this.state.clorisSigner.walletOfOwner(this.state.userAddress)}`);
        console.log(`The value of userNumberToken is ${this.state.userNumberToken}`);

        // const balance = await this.state.provider.getBalance("ethers.eth");
        // console.log(`The value of balance is ${balance}`);
        // const balanceEther = ethers.utils.formatEther(balance);
        // console.log(`The value of balanceEther is ${balanceEther}`);
        // console.log(`The value of balanceWei is ${ethers.utils.parseEther(balanceEther)}`);
        // const transaction = this.state.signer.sendTransaction({
        //      to: "0x40953332Fe1c3838b93Ed6071403A7CD54eb9AE1",
        //      value: ethers.utils.parseEther("1.0")
        // });
    }



    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    
    render (){
        // let interAction;
        // if( this.state.errorState){
        //     interAction = <span> {this.state.errorInfo}</span>;
        // } else if ( this.state.isFuture) {
        //     interAction = null;
        // } else {
        //     interAction = <button onClick={this.handleClick}> Mint Cloris! </button>;
        // }

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
                        {/* {interAction} */}
                                          
                        {/* {(this.state.isFuture ? null :
                                <button onClick={this.handleClick}>
                                    Mint Cloris!
                                </button>)} */}

                        {(this.state.isFuture ? null :
                                this.state.userNumberToken > this.state.maxNumberToken ?
                                    <button>You minted the maximum amount of token allowed.</button> :
                                    <button onClick={this.handleClick}> Mint Cloris! </button>)}

                        <span className="timeReference">
                            Deployment Time is: {this.state.deploymentTime}
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


