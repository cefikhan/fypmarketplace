require("@nomiclabs/hardhat-waffle");
const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString()
const projectId = "187f77dc14dd4f0c8f0224ef0c7d6158"
const ROPSTEN_PRIVATE_KEY = "2985424ea834095dfdd3dd39899664bb360d5187980d7467fda16674441f394e";



module.exports = {

  networks:{
    hardhat:{
      chainId:31337,
      gas: 2100000,
      gasPrice: 8000000000
    },
    mumbai:{
      url:`https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts:[privateKey]
    },
    mainnet:{
      url:`https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts:[privateKey]
    },
     bsc_test: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts:[`${ROPSTEN_PRIVATE_KEY}`],
    }
  },
 
  solidity: "0.8.4",
};
