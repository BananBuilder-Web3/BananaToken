const hre = require("hardhat");

async function main() {
  const BananaToken = await hre.ethers.getContractFactory("BananaToken");
  const bananaToken = await BananaToken.deploy(100000000, 50);

  console.log("Deploying");

  await bananaToken.deployed();

  console.log("Banana Token deployed: ", bananaToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
