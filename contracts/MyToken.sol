// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    // Constructor that initializes the ERC20 token and sets the initial owner
    //test
    constructor() ERC20("ArData", "ARD") Ownable(msg.sender) {
        // Mint an initial supply of tokens to the deployer
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    // Function to mint new tokens, callable only by the owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
