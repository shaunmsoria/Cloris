import { ethers } from "ethers";

// Setting up the connection to the cloris smart contract

export const clorisAddress = "0x9cc5195FA7140765aF03B12a729D7B40157F4FEE";

export const clorisABI = [
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
];
export const clorisProvider = new ethers.providers.Web3Provider(window.ethereum);
export const clorisSendConnectionRequest = async () => {await clorisProvider.send("eth_requestAccounts", [])};
export const clorisContract = new ethers.Contract(clorisAddress, clorisABI, clorisProvider);

export const clorisSigner = clorisProvider.getSigner();
export const clorisWithSigner = clorisContract.connect(clorisSigner);
