import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    // Replace this with your deployed contract address
    const contractAddress = "0x5AC4dcd5fB337946024bbE85c0bc1EEAcb90D7f7";

    // Get the contract ABI from artifacts
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = MyToken.attach(contractAddress); // Attach to the deployed contract

    const [owner, addr1] = await ethers.getSigners();

    // Check the initial balance of the owner
    const ownerBalance = await myToken.balanceOf(owner.address); //myToken.balanceOf(owner.address);
    console.log(`Owner's balance: ${ethers.formatUnits(ownerBalance, 18)} MTK`);

    // Mint tokens to addr1 (only if the owner is executing)
    console.log("Minting tokens to addr1...");
    const mintAmount = ethers.parseUnits("100", 18); // Mint 100 tokens
    await myToken.mint(addr1.address, mintAmount);
    console.log(`Minted ${ethers.formatUnits(mintAmount, 18)} MTK to ${addr1.address}`);

    // Check addr1's balance after minting
    const addr1Balance = await myToken.balanceOf(addr1.address);
    console.log(`addr1's balance: ${ethers.formatUnits(addr1Balance, 18)} MTK`);

    // Attempt to mint tokens as addr1 (should fail)
    console.log("Attempting to mint tokens as addr1 (should fail)...");
    try {
        await myToken.connect(addr1).mint(addr1.address, mintAmount);
    } catch (error) {
        console.error("Minting failed:", error);
    }

    // Check updated balances
    const updatedOwnerBalance = await myToken.balanceOf(owner.address);
    console.log(`Owner's updated balance: ${ethers.formatUnits(updatedOwnerBalance, 18)} MTK`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
