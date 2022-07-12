//import {  } from "
const { ethers, run, network} = require("hardhat");

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploy");

  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract ${simpleStorage.address}`);  
  console.log(network.config);

  if(network.config.chainId == 4 && process.env.ETH_SCAN_API) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`currentValue: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue}`)
}

async function verify(contractAddress, args) {
  console.log("Verifying contract..."); 
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,

    });
  } catch(e) {
    if(e.message.toLowerCase().includes(
      "already verified"
      )
    ) {
      console.log("verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err); 
    process.exit(1)
  })
