import { ethers } from "hardhat";
import { expect } from "chai";

describe("MyToken", function () {
    let MyToken: any;
    let myToken: any;
    let owner: any;
    let addr1: any;

    beforeEach(async () => {
        MyToken = await ethers.getContractFactory("MyToken");
        [owner, addr1] = await ethers.getSigners(); // Get signers for testing
        myToken = await MyToken.deploy(); // Deploy the contract
        await myToken.deployed(); // Wait for deployment
    });

    it("Should have correct initial supply", async function () {
        const ownerBalance = await myToken.balanceOf(owner.address);
        expect(ownerBalance).to.equal(1000 * 10 ** 18); // Initial supply should be 1000 tokens
    });

    it("Should allow the owner to mint new tokens", async function () {
        await myToken.mint(addr1.address, 100 * 10 ** 18); // Mint 100 tokens to addr1
        const addr1Balance = await myToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(100 * 10 ** 18);
    });

    it("Should not allow non-owner to mint tokens", async function () {
        await expect(myToken.connect(addr1).mint(addr1.address, 100)).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should correctly update balances after minting", async function () {
        await myToken.mint(addr1.address, 100 * 10 ** 18); // Mint 100 tokens to addr1
        const ownerBalance = await myToken.balanceOf(owner.address);
        expect(ownerBalance).to.equal(1000 * 10 ** 18); // Owner's balance should remain unchanged
    });
});
