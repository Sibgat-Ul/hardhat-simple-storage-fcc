//import {  } from "
const { ethers } = require("hardhat");

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploy");

  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract ${simpleStorage.address}`)  
}
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err); 
    process.exit(1)
  })
