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

    const proposalCount = await gov.proposalCount()
    console.log('proposalCount', proposalCount.toString())
    for (let i=1;i<=proposalCount;++i) {
        const proposal = await gov.proposals(i)
        console.log(proposal)
        await gov.castVote(i, true)
    }    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});