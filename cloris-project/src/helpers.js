import { ethers } from "ethers"; // try to use ether.js to connect to metamask and the cloris smart contract

export async function walletUser() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return signer;
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
]

export const clorisContract = new ethers.Contract(clorisAddress, clorisAbi, walletUser());

// const cloris = clorisContract;
// const clorisBlockTime = await cloris.blockCurrentTime();
//  <span>test value: {clorisBlockTime}</span> 

module.exports = {
    walletUser,
    clorisContract
}