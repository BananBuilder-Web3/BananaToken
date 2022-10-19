const hre = require("hardhat");

async function main() {
    const BananaToken = await hre.ethers.getContractFactory("BananaToken");
    const bananaToken = await BananaToken.atttach("0xC9c7062F42e3e062109992545f7FcC68565E732C");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });