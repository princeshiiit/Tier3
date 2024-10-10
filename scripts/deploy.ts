import { ethers } from "hardhat";


async function main() {
  // Get the contract factory for MyToken
  const MyToken = await ethers.getContractFactory("MyToken");

  // Deploy the contract
  const myToken = await MyToken.deploy();

  // Wait for the deployment transaction to be mined
  await myToken.deploymentTransaction()?.wait();

  // Log the address where the contract is deployed
  console.log("MyToken deployed to:", myToken?.getAddress());
}

// Check if the script is run directly (not imported)
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
