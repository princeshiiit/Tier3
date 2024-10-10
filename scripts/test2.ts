import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("Please set DEPLOYED_CONTRACT_ADDRESS in your .env file");
  }

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = MyToken.attach(contractAddress);

  const [owner] = await ethers.getSigners();

  // Ensure the signer is the contract owner
  console.log("Contract owner is:", owner.address);

  // Mint tokens to the owner's address
  const mintAmount = ethers.parseUnits("500", 18);
  try {
    const mintTx = await token.mint(owner.address, mintAmount, { gasLimit: 1000000 });
    await mintTx.wait();
    console.log(`Successfully minted 500 tokens to ${owner.address}`);
  } catch (error) {
    console.error("Minting failed: ", error);
  }

  const balance = await token.balanceOf(owner.address);
  console.log(`Owner's balance: ${ethers.formatUnits(balance, 18)} MTK`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
