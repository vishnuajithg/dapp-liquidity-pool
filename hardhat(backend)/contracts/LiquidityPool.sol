// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityPool {
    IERC20 public alphaToken;
    IERC20 public betaToken;

    uint256 public reserveA;
    uint256 public reserveB;

    constructor(address _alphaToken, address _betaToken) {
        alphaToken = IERC20(_alphaToken);
        betaToken = IERC20(_betaToken);
    }

    // Add liquidity to the pool
    function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        require(alphaToken.transferFrom(msg.sender, address(this), _amountA), "Transfer of TokenA failed");
        require(betaToken.transferFrom(msg.sender, address(this), _amountB), "Transfer of TokenB failed");

        reserveA += _amountA;
        reserveB += _amountB;
    }

    // Remove liquidity from the pool
    function removeLiquidity(uint256 _amountA, uint256 _amountB) external {
        require(reserveA >= _amountA, "Not enough liquidity in TokenA");
        require(reserveB >= _amountB, "Not enough liquidity in TokenB");

        reserveA -= _amountA;
        reserveB -= _amountB;

        require(alphaToken.transfer(msg.sender, _amountA), "Transfer of TokenA failed");
        require(betaToken.transfer(msg.sender, _amountB), "Transfer of TokenB failed");
    }

    // Swap TokenA for TokenB and vice versa
    function swap(uint256 _amountA) external {
        require(alphaToken.transferFrom(msg.sender, address(this), _amountA), "Transfer of TokenA failed");

        uint256 amountB = (_amountA * reserveB) / reserveA;
        require(betaToken.transfer(msg.sender, amountB), "Transfer of TokenB failed");

        reserveA += _amountA;
        reserveB -= amountB;
    }
}
