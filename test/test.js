const { inputToConfig } = require("@ethereum-waffle/compiler");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("BananaToken Contract", function () {
  //global variables
  let Token;
  let bananaToken;
  let owner;
  let addr1;
  let addr2;
  let tokenCap = 100000000;
  let tokenBlockReward = 5;

  beforeEach(async function () {
    //Get the ContractFactory and signers here
    Token = await ethers.getContractFactory("BananaToken");
    [owner, addr1, addr2] = await hre.ethers.getSigners();

    bananaToken = await Token.deploy(tokenCap, tokenBlockReward);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await bananaToken.owner()).to.equal(owner.address);
    });

    it("should set the max capped supply to the argument provided during the deployment", async function () {
      const cap = await bananaToken.cap();
      expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokenCap);
    });

    it("should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await bananaToken.blockReward();
      expect(Number(hre.ethers.utils.formatEther(blockReward))).to.equal(tokenBlockReward);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      //Transfer 50 tokens from owner -> addr1
      await bananaToken.transfer(addr1.address, 50);
      const addr1Balance = await bananaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      //Transfer 50 tokens from addr1 -> addr2
      await bananaToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await bananaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("should revert if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await bananaToken.balanceOf(owner.address);
      //try to send 1 token from addr1 with no balance -> owner
      await expect(bananaToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      //owner balance should not have changed
      expect(await bananaToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await bananaToken.balanceOf(owner.address);
      //transfer 100 tokens from owner -> addr1
      await bananaToken.transfer(addr1.address, 100);
      //transfer another 50 from owner -> addr2;
      await bananaToken.transfer(addr2.address, 50);
      //check balances
      const finalOwnerBalance = await bananaToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await bananaToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await bananaToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
