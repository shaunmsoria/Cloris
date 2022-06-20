// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";



contract Cloris is ERC721Enumerable, Ownable {
    using Strings for uint256;
    
    string baseURI;
    string baseExtensionURI;
    uint public deployedTime;
    uint public maxMintAccount = 3;
    uint public mintCost;
    uint public maxSupply;
    uint public tokenMaxPurchase;
    uint public mintTime;
    bool public isPaused = false;
    mapping (uint => string) public tokens;

    constructor (string memory _name, string memory _symbol, uint _mintCost, 
        uint _maxSupply, uint _mintTime, string memory _initBaseURI, 
        string memory _initBaseExtenstionURI ) 
        ERC721(_name, _symbol) {

            mintCost = _mintCost;
            maxSupply = _maxSupply;
            mintTime = _mintTime;
            baseURI = _initBaseURI;
            tokenMaxPurchase = 20;
            baseExtensionURI = _initBaseExtenstionURI;
            deployedTime = block.timestamp;

    }

    function mintContract (uint tokensToMint) 
        public payable {
        
            uint supply = totalSupply();
            require( supply + tokensToMint <= maxSupply, "This contract exceeded the maximum mintable token amount");
            require(block.timestamp > mintTime, "Not the time to mint");
            require(tokensToMint > 0, "contract not mintable for a 0 amount");
            require(balanceOf(msg.sender) < maxMintAccount, "Exceeded the maximum mintable amount per account");
            require(tokensToMint <= maxMintAccount, "Exceeded the maximum mintable amount");
            require(tokensToMint <= tokenMaxPurchase, "Can't purchase more than 20 tokens at the time");
            require(!isPaused, "The owner of the contract paused the minting process");

            if(owner() != msg.sender){
                require(msg.value >= tokensToMint * mintCost, "The Gas amount don't cover the mint cost");
            }

            for(uint i = 0; i < tokensToMint; i++ ){
                uint mintIndex = totalSupply();
                if(totalSupply() < maxSupply){
                    _safeMint(msg.sender, mintIndex );
                    
                }
            }
    }

    function walletOfOwner(address _owner) 
        public view returns(uint256[] memory){

            require(_owner != address(0), "The address can't be 0");
            uint256 boundaryOwner = ERC721.balanceOf(_owner);
            uint256[] memory ownerTokenId = new uint256[](boundaryOwner);
            for (uint256 i =  0; i < boundaryOwner ; i++){
                ownerTokenId[i] = tokenOfOwnerByIndex(_owner,i);
            }
            return ownerTokenId;

    }

    function getSecondsUntilMinting() 
        public view returns(uint256){
            uint256 currentTime = block.timestamp;
            uint256 leftTime = 0;
            if( mintTime > currentTime ){
                leftTime = mintTime - currentTime;
            }
            return leftTime;
    }

    function blockCurrentTime()
        public view returns(uint256){
            return block.timestamp;
        }

    function withdraw () public payable onlyOwner {
        (bool success,) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    function _baseURI() 
        internal view override returns (string memory){
            return baseURI;
    }

    function tokenURI(uint256 tokenId) 
        public view virtual override returns (string memory) {
            require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
            return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI,"/", tokenId.toString(), baseExtensionURI)) : "";
    }

    function setBaseURI (string memory _newBaseURI) 
        public onlyOwner {
            baseURI = _newBaseURI;
    }

    function setExtensionURI (string memory _extensionURI) 
        public onlyOwner {
            baseExtensionURI = _extensionURI;
    }

    function setMaxMintAccount (uint _maxMintAccount) 
        public onlyOwner {
            maxMintAccount = _maxMintAccount;
    }

    function setIsPaused (bool _isPaused) 
        public onlyOwner {
            isPaused = _isPaused;
    }





}