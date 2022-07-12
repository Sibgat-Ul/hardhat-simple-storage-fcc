const {ethers} = require("hardhat");
const {expect, assert} = require("chai");

describe("SimpleStorage", () => {
  
  let simpleStorage, simpleStorageFactory;

  beforeEach(async function() {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a fav number of 0", async function() {
    const currVal = await simpleStorage.retrieve();
    const expectedVal = "0";
    
    //assert
    assert.equal(currVal.toString(), expectedVal);

    //expect
  });

  it("Should update when we call store", async function() {
    let expectedVal = 7;
    const transactionResponse = await simpleStorage.store(expectedVal);
    expectedVal++;
    await transactionResponse.wait(1);

    const currVal = await simpleStorage.retrieve();
    assert.equal(currVal.toString(), expectedVal);
  })
})
