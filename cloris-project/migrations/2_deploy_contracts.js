const helper = require('./../test/helpers');

const Cloris = artifacts.require("Cloris")



module.exports = async function (deployer) {

    const accounts = await web3.eth.getAccounts()
    const name = process.env.PROJECT_NAME
    const symbol = process.env.PROJECT_SYMBOL
    const cost = process.env.MINT_COST
    const maxSupply = process.env.MAX_SUPPLY
    const mintTime = helper.unixTime(process.env.NFT_MINT_DATE) // convert normal Time to unix Time
    const baseURI = process.env.IPFS_IMAGE_METADATA_CID
    const baseExtensionURI = ".json"


    await deployer.deploy(Cloris, name, symbol, cost, maxSupply, mintTime, baseURI, baseExtensionURI )
};