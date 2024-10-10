import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const contractAddress = process.env.DEPLOYED_CONTRACT_ADDRESS;
    if (!contractAddress) {
        throw new Error("Please set DEPLOYED_CONTRACT_ADDRESS in your .env file");
    }

    // Attach to the deployed contract
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = MyToken.attach(contractAddress);

    const [owner] = await ethers.getSigners();

    // Ensure the signer is the contract owner
    const isOwner = await token.owner();
    console.log("Contract owner is:", owner.address);
    console.log("Expected owner is:", isOwner);

    if (owner.address.toLowerCase() !== isOwner.toLowerCase()) {
        throw new Error("Signer is not the contract owner.");
    }

    // Mint tokens to the owner's address
    const mintAmount = ethers.parseUnits("500", 18); // Updated to `utils`
    try {
        const mintTx = await token.mint(owner.address, mintAmount, { gasLimit: 1000000 });
        await mintTx.wait();
        console.log(`Successfully minted 500 tokens to ${owner.address}`);
    } catch (error) {
        console.error("Minting failed: ", error);
        // Check if the error has a reason
        if (error?.data?.message) {
            console.error("Revert reason:", error.data.message);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
