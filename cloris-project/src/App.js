import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import './App.css';
import {} from './helpers';
import React, { useCallback } from "react";

import { ethers } from "ethers"; // try to use ether.js to connect to metamask and the cloris smart contract

export async function walletUser2() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
};



function WalletUser3 () {
  const walletUser = useCallback(async() => {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    let response = provider.getSigner()
    console.log(`The value of response is ${String(response)}`);
  }, []);
  return walletUser;
}

const clorisAddress = "0x019500Fd3FbD2c5C3030445D253930aC87767139";

const clorisAbi = [
   "function mintContract (uint tokensToMint) public payable",
   "function walletOfOwner(address _owner) public view returns(uint256[] memory)",
   "function getSecondsUntilMinting() public view returns(uint256)",
   "function blockCurrentTime() public view returns(uint256)",
   "function withdraw () public payable onlyOwner ",
   "function tokenURI(uint256 tokenId) public view virtual override returns ",
   "function setBaseURI (string memory _newBaseURI) public onlyOwner",
   "function setExtensionURI (string memory _extensionURI) public onlyOwner ",
   "function setMaxMintAccount (uint _maxMintAccount) public onlyOwner",
   "function setIsPaused (bool _isPaused) public onlyOwner"
];

// export const clorisContract = new ethers.Contract(clorisAddress, clorisAbi, walletUser());

function App() {

  // const clorisContract = new ethers.Contract(clorisAddress, clorisAbi, signer);

  return (
    <div className="App">
      <div className="socialMedia">
        <span>Welcome to the Cloris Project!</span>
      </div>
      <div className="content" alt="content">
        <div>
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
        <div className="timeText">
            <span>Value of signer is: {WalletUser3}</span>
          <span>Time left before the minting: "timeLeftBeforeMinting"</span>
          <button /*onClick={updateSigner}*/>mint</button>
          <span>the value of testA is {}</span>
          <span>Time since the minting "timeSinceMinting"</span>
        </div>

      </div>
      <div className="socialMedia">
        <span>social medias</span>
      </div>

    </div>
  );
}

export default App;
