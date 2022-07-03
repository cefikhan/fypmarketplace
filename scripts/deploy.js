const hre = require("hardhat");

async function main() {

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3");
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
