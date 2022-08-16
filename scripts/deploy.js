const hre = require("hardhat");

async function main() {

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  //bsc_testnet deployer
    //  const nftMarket = await NFTMarket.deploy("0xbD7b620cA4cA8acE9D63092022C787d3Cb56a894");
  await nftMarket.deployed();
  console.log("nftMarket deployed to:", nftMarket.address);


  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();
  console.log("nft deployed to: ",nft.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
