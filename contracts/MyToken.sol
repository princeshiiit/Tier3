// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    // Constructor that initializes the ERC20 token and sets the initial owner
    //test
    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        // Mint an initial supply of tokens to the deployer
        _mint(msg.sender, 1000 * 10 ** decimals()); // Mint 1000 MTK tokens
    }

    // Function to mint new tokens, callable only by the owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
