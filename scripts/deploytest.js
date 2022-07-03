const hre = require("hardhat");
async function main(){

    const TESTDEPLOYER = await hre.ethers.getContractFactory("Test");
    const testdeployer = await TESTDEPLOYER.deploy();
    await testdeployer.deployed();
    console.log("test deployed to address ",testdeployer.address);
    let transaction =await testdeployer.checksaffi();
    let tx = await transaction.wait();
    console.log(tx.events);   

}

main().then(()=>process.exit(0)).catch((e)=>{
    console.log("error is",e);
    process.exit(1);
})