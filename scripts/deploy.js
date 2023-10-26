// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
async function main() {
  const hre = require("hardhat");
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const finWiz = await hre.ethers.deployContract("FinWiz");

  console.log("App address:", await finWiz.getAddress());


  await finWiz.waitForDeployment();
  console.log(`FinWiz contract deployed to: ${finWiz.address}`);

  // Display contract state
  console.log("User data:", await finWiz.userData(deployer.address));

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
