const { ethers } = require("hardhat");


async function main() {
    const [signer0] = await ethers.getSigners()
    const deployer = signer0.address
    console.log('deployer address', deployer)
    const GovernorAlphaContract = await ethers.getContractFactory('GovernorAlpha')
    const timelockAddress = '0xc408348b9e4b6C7BEE4738640267AE3B8134Fb19'
    const uniAddress = '0x6A04AcbD67f6878A1Cc3DdDf7ACc45afA97057b1'
    const gov = await GovernorAlphaContract.deploy(timelockAddress, uniAddress)
    console.log('gov address,', gov.address)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
