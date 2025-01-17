import React, { useState } from 'react';
import { ethers } from 'ethers';
import liquidityPoolABI from '../../../hardhat(backend)/artifacts/contracts/LiquidityPool.sol/LiquidityPool.json';

// Define contract address as a constant
const CONTRACT_ADDRESS = '0xBBFA8eEee092Ab6D8d1AEB3Eb917b13d0C2fd387';

const RemoveLiquidity = ({ walletAddress }) => {
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const removeLiquidity = async () => {
    if (!amountA || !amountB || isNaN(amountA) || isNaN(amountB) || parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0) {
      setMessage('Please enter valid amounts to remove.');
      return;
    }

    try {
      setLoading(true);
      setButtonDisabled(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, liquidityPoolABI, signer);  // Use the constant address

      // Call the removeLiquidity function with both Token A and Token B amounts
      const tx = await contract.removeLiquidity(
        ethers.utils.parseEther(amountA),
        ethers.utils.parseEther(amountB)
      );
      await tx.wait();
      setMessage('Liquidity removed successfully!');
    } catch (err) {
      setMessage('Failed to remove liquidity. Ensure the amounts are correct and try again.');
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Remove Liquidity</h2>

      <input
        type="number"
        placeholder="Amount of Token A to Remove"
        value={amountA}
        onChange={(e) => setAmountA(e.target.value)}
        className="w-full mb-2 p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Amount of Token B to Remove"
        value={amountB}
        onChange={(e) => setAmountB(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md"
      />

      <button
        onClick={removeLiquidity}
        disabled={buttonDisabled}
        className={`w-full px-6 py-3 text-white rounded-md ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {loading ? (
          <span className="flex justify-center">
            <svg
              className="w-6 h-6 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="4"
                d="M4 12h2a10 10 0 0 1 10 10v2"
              />
            </svg>
          </span>
        ) : (
          'Remove Liquidity'
        )}
      </button>

      {message && (
        <p
          className={`mt-4 p-2 rounded-md ${
            message.includes('successfully') ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default RemoveLiquidity;
