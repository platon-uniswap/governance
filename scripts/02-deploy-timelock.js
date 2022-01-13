const { ethers } = require("hardhat");


async function main() {
    const [signer0] = await ethers.getSigners()
    const deployer = signer0.address
    console.log('deployer address', deployer)
    const delay = 60 * 1000 * 30
    let nonce = await ethers.provider.getTransactionCount(deployer, 'latest')
    nonce += 1
    const govAddress = ethers.utils.getContractAddress({from: deployer, nonce})
    const TimelockContract = await ethers.getContractFactory('Timelock')
    const timelock = await TimelockContract.deploy(govAddress, delay)
    console.log('timelock address,', timelock.address, govAddress)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
