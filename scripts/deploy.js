const hre = require("hardhat");

async function main() {
  const BananaToken = await hre.ethers.getContractFactory("BananaToken");
  const bananaToken = await BananaToken.deploy(10000000);

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
