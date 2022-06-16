
require('@babel/register');
require('@babel/polyfill');
require('dotenv').config();   //added

const HDWalletProvider = require('@truffle/hdwallet-provider');



//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {




  networks: {


    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*"       // Any network (default: none)
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          [process.env.DEPLOYER_PRIVATE_KEY], `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`)
      },
      network_id: 3
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          [process.env.DEPLOYER_PRIVATE_KEY], `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`)
      },
      network_id: 4
    }

  },

  contracts_directory: './src/contracts/',      //added
  contracts_build_directory: './src/abis/',     //added

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",   
       optimizer: {
         enabled: true,
         runs: 200
       }
    }
  },

  plugins: [
    'truffle-plugin-verify'
  ],

  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }

};
