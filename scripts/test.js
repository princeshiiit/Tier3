require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const ethers = hre.ethers; // Access ethers from the hardhat runtime environment

  // Ensure that contract address is loaded from environment variables
  const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("Please set DEPLOYED_CONTRACT_ADDRESS in your .env file");
  }

  // Get the contract factory and attach to the deployed address
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = MyToken.attach(contractAddress);

  // Get the signer (owner) who will interact with the contract
  const [owner] = await ethers.getSigners();

  // Mint 500 tokens for the owner
  console.log("Minting tokens...");
  const mintAmount = ethers.utils.parseUnits("500", 18);  // This line accesses ethers.utils
  const mintTx = await token.mint(owner.address, mintAmount);
  await mintTx.wait();  // Wait for the transaction to be mined
  console.log(`Minted 500 tokens to ${owner.address}`);

  // Check the owner's token balance
  const balance = await token.balanceOf(owner.address);
  console.log(`Owner's balance: ${ethers.utils.formatUnits(balance, 18)} MTK`);

  // Transfer tokens to another address
  const receiverAddress = "0xReceiverAddressHere";  // Replace with actual address
  const transferAmount = ethers.utils.parseUnits("100", 18);  // Parse the amount
  const transferTx = await token.transfer(receiverAddress, transferAmount);
  await transferTx.wait();  // Wait for transaction to complete
  console.log(`Transferred 100 MTK to ${receiverAddress}`);

  // Check the receiver's balance
  const receiverBalance = await token.balanceOf(receiverAddress);
  console.log(`Receiver's balance: ${ethers.utils.formatUnits(receiverBalance, 18)} MTK`);
}

// Run the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
