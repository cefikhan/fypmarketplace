require("@nomiclabs/hardhat-waffle");
const fs = require('fs')
const privateKey = fs.readFileSync(".secret").toString()
const projectId = "187f77dc14dd4f0c8f0224ef0c7d6158"



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
    }
  },
 
  solidity: "0.8.4",
};
