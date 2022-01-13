const { ethers } = require("hardhat");


async function main() {
    const [signer0] = await ethers.getSigners()
    const deployer = signer0.address
    console.log('deployer address', deployer)
    const UniContract = await ethers.getContractFactory('Uni')
    const now = new Date().getTime() + 3600 * 1000 * 24 * 3
    const uni = await UniContract.deploy(deployer, deployer, now)
    console.log('uni address,', uni.address)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});