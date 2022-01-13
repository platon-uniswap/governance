const { ethers } = require("hardhat");


async function main() {
    const [signer0] = await ethers.getSigners()
    const deployer = signer0.address
    console.log('deployer address', deployer)
    const UniContract = await ethers.getContractFactory('Uni')
    const timelockAddress = '0xb90a71E184454F0eb544BD5e135cD093037649b4'
    const uniAddress = '0xDFA36286675c8a03050b63F23D79786A067E0d24'
    const uni = await UniContract.attach(uniAddress)
    console.log('to set')
    await uni.setMinter(timelockAddress)
    console.log('done')
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});