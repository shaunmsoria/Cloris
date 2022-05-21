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
            provider: new ethers.providers.Web3Provider(window.ethereum)
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
        console.log(`The value of blockNumber is ${blockNumber}`);
        const balance = await this.state.provider.getBalance("ethers.eth");
        console.log(`The value of balance is ${balance}`);
        const balanceEther = ethers.utils.formatEther(balance);
        console.log(`The value of balanceEther is ${balanceEther}`);
        console.log(`The value of balanceWei is ${ethers.utils.parseEther(balanceEther)}`);


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
//              </div>
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
