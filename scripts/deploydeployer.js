const hre = require("hardhat");

async function main(){
    const COLLECTIONDEPLOYER = await hre.ethers.getContractFactory("CollectionDeployer");

    const  collectiondeployer = await COLLECTIONDEPLOYER.deploy();

    await collectiondeployer.deployed();


    console.log("collectiondeployer  deployed to ",collectiondeployer.address);
}

main().then(()=>process.exit(1)).catch((error)=>{
    console.log("error is ",error);
    process.exit(1);
})

