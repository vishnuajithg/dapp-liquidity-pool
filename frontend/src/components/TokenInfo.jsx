// src/components/TokenInfo.jsx
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const TokenInfo = ({ signer }) => {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const getBalance = async () => {
      const tokenAddress = "YOUR_CONTRACT_ADDRESS";  // Replace with actual contract address
      const tokenABI = [
        "function balanceOf(address account) view returns (uint256)"
      ];
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      const balance = await tokenContract.balanceOf(await signer.getAddress());
      setBalance(ethers.utils.formatUnits(balance, 18)); // Assuming the token has 18 decimals
    };

    if (signer) {
      getBalance();
    }
  }, [signer]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Token Balance</h2>
      <p>Balance: {balance} ALPHA</p>
    </div>
  );
};

export default TokenInfo;
