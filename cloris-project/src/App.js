import mosaic from "./mosaic.png";
import React from "react";
import "./App.css";
import {
    clorisProvider,
    clorisSendConnectionRequest,
    clorisContract,
    clorisWithSigner
} from "./connect";


class App extends React.Component {
    constructor (props){
        super(props);
        this.state = { 
            userAddress: "",
            userNumberToken: 0,
            maxNumberToken: 1,
            date: Math.floor(new Date() / 1000),
            countDownDate: "",
            deploymentTime: "",
            timeLeft: "",
            isFuture: false

        };
        this.handleClick = this.handleClick.bind(this);

    }

    calculateTimeDifferenceFromMinting(){
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
        this.calculateTimeDifferenceFromMinting();
    }

    async clorisSignerUpdate(){
        this.setState({userNumberToken: (await clorisWithSigner.walletOfOwner(this.state.userAddress)).length});
    }

    async handleClick (){
        this.setState({userAddress: clorisProvider.provider._state.accounts[0]});
        await clorisWithSigner.mintContract(1);
        this.setState({userNumberToken: (await clorisWithSigner.walletOfOwner(this.state.userAddress)).length});
    }

    async componentDidMount(){

        clorisSendConnectionRequest();

        this.setState({deploymentTime: `${(new Date(await clorisContract.deployedTime() * 1000)).toLocaleString("en-US", {timeZoneName: "short"})}`});
        this.setState({countDownDate: `${await clorisContract.mintTime()}`});
        this.setState({userAddress: clorisProvider.provider._state.accounts[0]});
        this.setState({maxNumberToken: await clorisContract.maxMintAccount()});

        this.calculateTimeDifferenceFromMinting();

        this.timerID = setInterval(
            () => this.tick(), 1000
        );

        
        // Require User to sign in with Metamask
        this.signerUpdate = setInterval(
            () => this.clorisSignerUpdate(), 1000
        );

        

    }


    componentWillUnmount(){
        clearInterval(this.timerID);
        clearInterval(this.signerUpdate);
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
                        <img src={mosaic} className="App-logo" alt="logo" />
                    </div>
                    <div className="status">

                        <span className="timeReference">
                            Contract Deployment Time on the Blockchain was: {this.state.deploymentTime}
                        </span>
                        <span className="timeReference">
                            {this.state.timeLeft}
                        </span>
                        <span className="timeReference">
                            The maximum mintable Cloris NFT is {(this.state.maxNumberToken).toString()}.
                        </span>
                        <span className="timeReference">
                            Your wallet currently contain {this.state.userNumberToken} Cloris NFT.
                        </span>
                        {(this.state.isFuture ? 
                                <button class="buttonStyle"><span className="buttonText">Contract almost ready for Minting!</span></button> :
                                    this.state.userNumberToken >= this.state.maxNumberToken ?
                                        <button ><span className="buttonText">You minted the maximum amount of token allowed.</span></button> :
                                        <button onClick={this.handleClick}> <span className="buttonText">Mint Cloris!</span> </button>)}


                    </div>
                </div>
                <div className="socialMedia">
                    <h1>
                        Social Media
                    </h1>
                    <div>
                        <span className="socialTags"><a href="https://github.com/Solarisray/Cloris" target="jsx-no-target-blank">GitHub</a></span>
                        <span className="socialTags"><a href="https://shaunmsoria.github.io/resume/" target="jsx-no-target-blank">Resume</a></span>
                        <span className="socialTags"><a href="https://linkedin.com/in/shaunmsoria" target="jsx-no-target-blank">LinkedIn</a></span>
                    </div>
                    
                </div>
            </div>
        );
    }
}


export default App;


