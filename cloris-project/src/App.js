import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { ethers } from "ethers";


// Next stage: Connect to Cloris Smart Contract


class App extends React.Component {
    constructor (props){
        super(props);
        this.state = { signer: ""};

    }

    async componentDidMount(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const testSigner = provider.getSigner();
        console.log(testSigner);
        this.setState({signer: testSigner});
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
