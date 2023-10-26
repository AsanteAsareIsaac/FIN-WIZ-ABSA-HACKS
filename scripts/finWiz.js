const hre = require("hardhat");

async function main() {
    // Deploy the FinWiz contract
    const contract = await hre.ethers.getContractFactory("FinWiz");
    const finWiz = await contract.deploy();

    // Log the FinWiz contract address
    console.log("FinWiz deployed to:", finWiz.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
