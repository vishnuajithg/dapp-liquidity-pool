// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AlphaToken is ERC20 {
    constructor() ERC20("AlphaToken", "ALPHA") {
            _mint(msg.sender, 10000 * 1e18);

    }
}
