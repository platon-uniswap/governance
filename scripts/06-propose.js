const { ethers, network } = require("hardhat");
const { AbiCoder } = require('@ethersproject/abi')

const sleep = (ms) => {
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, ms)
    })
}


async function main() {
    const [signer0, signer1] = await ethers.getSigners()
    const deployer = signer0.address

    console.log('deployer address', deployer)
    const govAddress = '0x8871579824CBd175CD3C750A41aDAf1A3389FDe2'
    const GovContract = await ethers.getContractFactory('GovernorAlpha')
    const gov = await GovContract.attach(govAddress)

    const uniAddress = await gov.uni()
    const UniContract = await ethers.getContractFactory('Uni')
    const uni = await UniContract.attach(uniAddress)
    const delegates = await uni.delegates(deployer)
    console.log('delegates:', delegates)
    if (delegates == '0x0000000000000000000000000000000000000000') {
        await uni.delegate(deployer)
        await sleep(30_000)
    }

    const value = 0
    const signature = 'mint(address,uint256)'
    const abi = new AbiCoder()
    const data = abi.encode(['address', 'uint256'], [deployer, ethers.utils.parseEther('100')]);
    console.log('propose', gov.address, value, signature, data)
    await gov.propose([uniAddress], [value], [signature], [data], "mint uni")
    console.log('done')
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});