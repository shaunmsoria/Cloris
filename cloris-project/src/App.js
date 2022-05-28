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
            clorisAddress: "0x44F9Ff6E64FE6b901De19bE356e8eB7f72e73C71",
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
            ]
        };

    }

    async componentDidMount(){
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", []);
        await this.state.provider.send("eth_requestAccounts", []);
        const testSigner = this.state.provider.getSigner();
        console.log(testSigner);
        this.setState({signer: testSigner});
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
        console.log(`the name of the contract is ${await clorisContract.name()}`);
        console.log(`the symbol of the contract is ${await clorisContract.symbol()}`);
        console.log(`the deployedTime of the contract is ${await clorisContract.deployedTime()}`);
        console.log(`the maxMintAccount of the contract is ${await clorisContract.maxMintAccount()}`);
        console.log(`the mintCost of the contract is ${await clorisContract.mintCost()}`);
        console.log(`the maxSupply of the contract is ${await clorisContract.maxSupply()}`);
        console.log(`the tokenMaxPurchase of the contract is ${await clorisContract.tokenMaxPurchase()}`);
        console.log(`the mintTime of the contract is ${await clorisContract.mintTime()}`);
        console.log(`the isPaused of the contract is ${await clorisContract.isPaused()}`);
        // console.log(`the mintContract of the contract is ${await clorisContract.mintContract(1, {from: testSigner})}`);
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
                        <span>
                            Value time left before minting {this.state.signer._index}
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

// function App (){
//     return (
//         <div className="App">
//              <div className="title">
//                  <h1>
//                      Welcome to the Cloris Project!
//                  </h1>
//              </div>https://github.com/Solarisray/Cloris
//              <div className="content">
//                  <div>
//                      <img src={logo} className="App-logo" alt="logo" />
//                  </div>
//                  <div className="status">
//                      <span>
//                          Value time left before minting
//                      </span>
//                  </div>
//              </div>
//              <div className="socialMedia">
//                  <h1>
//                      Social Media
//                 </h1>
//              </div>
//          </div>
//     );
// }
