// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BetaToken is ERC20 {
    constructor() ERC20("BetaToken", "BETA") {
          _mint(msg.sender, 10000 * 1e18);

    }
}
