const hre = require("hardhat");

async function main(){
    const AUCTIONMARKET = await hre.ethers.getContractFactory("AuctionMarket");
    const auctionmarket = await AUCTIONMARKET.deploy();
    await auctionmarket.deployed();
    console.log("auction market deployed to ",auctionmarket.address);


}

main().then(()=>process.exit(0)).catch((error)=>{
    console.log('error is ',error);
    process.exit(1);
})