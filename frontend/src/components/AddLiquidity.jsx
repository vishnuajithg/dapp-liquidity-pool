import React, { useState } from 'react';
import { ethers } from 'ethers';
import liquidityPoolABI from '../../../hardhat(backend)/artifacts/contracts/LiquidityPool.sol/LiquidityPool.json';

const AddLiquidity = ({ walletAddress }) => {
  const [tokenA, setTokenA] = useState('');
  const [tokenB, setTokenB] = useState('');
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const addLiquidity = async () => {
    if (!tokenA || !tokenB || !amountA || !amountB) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setButtonDisabled(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract('0xBBFA8eEee092Ab6D8d1AEB3Eb917b13d0C2fd387', liquidityPoolABI, signer);

      // Add liquidity to the pool
      const tx = await contract.addLiquidity(
        tokenA,
        tokenB,
        ethers.utils.parseEther(amountA),
        ethers.utils.parseEther(amountB)
      );
      await tx.wait(); // Wait for the transaction to be mined
      setMessage('Liquidity added successfully!');
    } catch (err) {
      setMessage('Failed to add liquidity. Ensure the contract address and tokens are correct.');
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Add Liquidity</h2>

      {/* Input fields for Token A and Token B */}
      <input
        type="text"
        placeholder="Token A Address"
        value={tokenA}
        onChange={(e) => setTokenA(e.target.value)}
        className="w-full mb-2 p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Token B Address"
        value={tokenB}
        onChange={(e) => setTokenB(e.target.value)}
        className="w-full mb-2 p-2 border rounded-md"
      />

      {/* Input fields for amounts */}
      <input
        type="number"
        placeholder="Amount of Token A"
        value={amountA}
        onChange={(e) => setAmountA(e.target.value)}
        className="w-full mb-2 p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Amount of Token B"
        value={amountB}
        onChange={(e) => setAmountB(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md"
      />

      {/* Add Liquidity Button */}
      <button
        onClick={addLiquidity}
        disabled={buttonDisabled}
        className={`w-full px-6 py-3 text-white rounded-md ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
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
          'Add Liquidity'
        )}
      </button>

      {/* Display message based on transaction outcome */}
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

export default AddLiquidity;
