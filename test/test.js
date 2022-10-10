const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BananaToken", function () {
  it("Should mint a new token with an intial supply", async function () {
    const BananaToken = await ethers.getContractFactory("BananaToken");
    const bananToken = await BananaToken.deploy(1000);

    expect(await bananToken.totalSupply()).to.equal(1000);
  });
});
