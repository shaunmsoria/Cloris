// import { should } from 'chai';
import { assert } from 'chai';
import { zeroAddress, EVM_REVERT, ether, tokens, unixTime, seconds, wait } from './helpers';
const Moment = require('moment');

const Cloris = artifacts.require('./../contracts/Cloris')
const helper = require('./helpers');


require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Cloris', ([deployer, user1, user2, user3, user4]) => {
    let cloris
    let name = process.env.PROJECT_NAME
    let symbol = process.env.PROJECT_SYMBOL
    let mintCost = process.env.MINT_COST
    let maxSupply = process.env.MAX_SUPPLY
    let mintTime = unixTime(process.env.NFT_MINT_DATE)
    let tokenURIs = process.env.IPFS_IMAGE_METADATA_CID
    let baseURIp = "https://gateway.pinata.cloud/ipfs/"
    let baseExtensionURI = ".json"
    let testDeploymentTime

    beforeEach(async () => {
        cloris = await Cloris.new(name,symbol,mintCost,maxSupply, mintTime, tokenURIs, baseExtensionURI)
        testDeploymentTime = Math.floor(Date.now() / 1000)
    })

    describe('deployment', () => {

        it('track the name', async () => {
            const result = await cloris.name()
            result.should.equal("Cloris")
        })
        it('track the symbol', async () => {
            const result = await cloris.symbol()
            result.should.equal("CS")
        })
        it('track the mintCost', async () => {
            const result = await cloris.mintCost()
            result.toString().should.equal(mintCost.toString())
        })
        it('track the maxSupply', async () => {
            const result = await cloris.maxSupply()
            result.toString().should.equal(maxSupply.toString())
        })
        it('track the minting time', async () => {
            const result = await cloris.mintTime()
            result.toString().should.equal(mintTime.toString())
        })
        it('track the maxMintAccount time', async () => {
            const result = await cloris.maxMintAccount()
            result.toString().should.equal("3")
        })



        it('testing the tokenURI', async () => {
            const mintNumber = 3
            const testValue = 2
            const mintContract = await cloris.mintContract(mintNumber)
            const result = await cloris.tokenURI(testValue)
            result.should.equal(`${tokenURIs}/picture${testValue}.json`)
        })
        it('testing the deployment time', async() => {
            const result = await cloris.deployedTime()
            const buffer = 1

            if( result > (testDeploymentTime - buffer) && result <= testDeploymentTime + buffer){
                assert.isTrue(true)
            } else {
                assert.isTrue(false)
            }
        })



    })

    describe('track the minting', () => {
        it('executing the first mint', async () => {
            const mintNumber = 1
            const result = await cloris.mintContract(mintNumber)
            const tSupply = await cloris.totalSupply()
            tSupply.toString().should.equal(mintNumber.toString(), "the mint was successful")
        })

        it('executing two consecutive mints', async () => {
            const mintNumber = 1
            const result = await cloris.mintContract(mintNumber)
            const mintNumber2 = 2
            const result2 = await cloris.mintContract(mintNumber2)
            const tSupply = await cloris.totalSupply()
            tSupply.toString().should.equal("3", "the two consecutive mints minted 3 tokens")
        })

        it('exceeding the maximum mintable amount', async () => {
            const mintNumber = 5
            await cloris.mintContract(mintNumber).should.be.rejected
        })

        it('contract not mintable for a 0 amount', async () => {
            const mintNumber = 0
            await cloris.mintContract(mintNumber).should.be.rejected
        })

        it('maximum mintable tokens', async() => {
            const mintNumber = 3
            const clorisMaxSupp = await Cloris.new(name,symbol,mintCost,2, mintTime, tokenURIs, baseExtensionURI)
            await clorisMaxSupp.mintContract(mintNumber).should.be.rejected
        })

        it('not enough gas for the mint', async () => {
            const mintNumber = 3
            const costValue = ether(5000000)
            const clorisMintFee = await Cloris.new(name,symbol,costValue,maxSupply, mintTime, tokenURIs, baseExtensionURI)
            await clorisMintFee.mintContract(mintNumber, {from: user2}).should.be.rejected
        })



        describe('track minting time functions', async () => {
            it('test minting after the deployment time', async () => {
                const mintTimeContract = await cloris.mintTime()
                mintTimeContract.toString().should.equal(mintTime.toString())
            })

            it('test minting before the deployment time', async () => {
                const mintNumber = 2
                const futureTime = (Math.floor(new Date().getTime()/1000) + 600)
                const clorisFutureTime = await Cloris.new(name,symbol,mintCost,maxSupply, futureTime, tokenURIs, baseExtensionURI)
                await clorisFutureTime.mintContract(mintNumber).should.be.rejected
            })

            it('time left after minting', async () => {
                const timeLeft = await cloris.getSecondsUntilMinting()
                timeLeft.toString().should.equal("0")
            })

            it('time left before minting', async () => {
                const target = 600
                const futureTime = (Math.floor(new Date().getTime()/1000) + target)
                const clorisNewMintTime = await Cloris.new(name,symbol,mintCost,maxSupply, futureTime, tokenURIs, baseExtensionURI)
                const timeLeft = await clorisNewMintTime.getSecondsUntilMinting()
                const buffer = 1

                if ( timeLeft > ( target - buffer) && timeLeft <= target + buffer ){
                    assert.isTrue(true)
                } else {
                    assert.isTrue(false)
                }
            })

            it('time left until minting from deployment', async () => {
                const target = 300
                const futureTime = (Math.floor(new Date().getTime()/1000) + target)
                const clorisNewMintTime = await Cloris.new(name,symbol,mintCost,maxSupply, futureTime, tokenURIs, baseExtensionURI)
                const timeLeft = await clorisNewMintTime.getSecondsUntilMinting()
                const buffer = 1

                if ( timeLeft > ( target - buffer) && timeLeft <= target + buffer ){
                    assert.isTrue(true)
                } else {
                    assert.isTrue(false)
                }

            })

        })

    })

    describe('track the ownership functionalities', () => {
        it('Balance of msg.sender', async () => {
            const mintNumber = 3
            const mintTest = await cloris.mintContract(mintNumber)
            const ownerBalance = await cloris.balanceOf(deployer)
            ownerBalance.toString().should.equal(mintNumber.toString())      
        })

        it('Checking owner token wallet', async () => {
            const mintNumber = 3
            const mintTest1 = await cloris.mintContract(mintNumber, {from: deployer})
            const mintTest2 = await cloris.mintContract(mintNumber-1, {from: user1})
            const mintTest3 = await cloris.mintContract(mintNumber-2, {from: user2})
            const mintTest4 = await cloris.mintContract(mintNumber, {from: user3})
            const mintTest5 = await cloris.mintContract(mintNumber-1, {from: user4})
            const result0 = await cloris.tokenOfOwnerByIndex(user3, 0)
            const result1 = await cloris.tokenOfOwnerByIndex(user3, 1)
            const result2 = await cloris.tokenOfOwnerByIndex(user3, 2)
            const walletOfOwner = await cloris.walletOfOwner(user3)
            walletOfOwner.toString().should.equal([result0,result1,result2].toString())
        })
    })

    describe('track the withdraw', () => {
        it('Withdraw the balance of msg.sender', async () => {
            const result = await cloris.withdraw()
            assert.isTrue(true)
        })
    })

    describe('track the set functions', async () => {
        it('track setBaseURI', async() => {
            const newBaseURI = "test"
            const call = await cloris.setBaseURI(newBaseURI)
            const mintTest = await cloris.mintContract(2)
            const result = await cloris.tokenURI(1)
            const resultSplit = result.split("/picture")
            resultSplit[0].should.equal(newBaseURI)
        })

        it('track setExtensionURI', async() => {
            const setExtensionURI = ".png"
            const call = await cloris.setExtensionURI(setExtensionURI)
            const mintTest = await cloris.mintContract(2)
            const result = await cloris.tokenURI(1)
            const resultSplit = result.split("/picture")
            resultSplit[1].slice(1).should.equal(setExtensionURI)
        })

        it('track setMaxMintAccount', async() => {
            const newMaxMintAccount = 4
            const call = await cloris.setMaxMintAccount(newMaxMintAccount)
            const result = await cloris.maxMintAccount()
            result.toString().should.equal(newMaxMintAccount.toString())
        })

        it('track setIsPause', async() => {
            const call = await cloris.setIsPaused(true)
            const result = await cloris.isPaused()
            result.should.equal(true)
        })

    })



})