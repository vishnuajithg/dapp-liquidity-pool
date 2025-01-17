import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import liquidityPoolABI from '../../../hardhat(backend)/artifacts/contracts/LiquidityPool.sol/LiquidityPool.json';

const SwapTokens = ({ walletAddress }) => {
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [swapDirection, setSwapDirection] = useState(true); // true for A->B, false for B->A
  const [reserveA, setReserveA] = useState(null); // Dynamic reserves
  const [reserveB, setReserveB] = useState(null);

  const CONTRACT_ADDRESS = '0xBBFA8eEee092Ab6D8d1AEB3Eb917b13d0C2fd387'; // Hardcoded contract address for simplicity

  // Fetch the reserves from the smart contract
  const fetchReserves = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, liquidityPoolABI, signer);

      const [reserveA, reserveB] = await contract.getReserves();
      setReserveA(ethers.utils.formatEther(reserveA)); // Convert from Wei to Ether
      setReserveB(ethers.utils.formatEther(reserveB)); // Convert from Wei to Ether
    } catch (err) {
      console.error("Error fetching reserves:", err);
    }
  };

  useEffect(() => {
    fetchReserves();
  }, []); // Fetch reserves on initial load

  const getSwapRate = (amount, reserveA, reserveB) => {
    // Calculate the swap rate based on the reserves
    if (swapDirection) {
      return (amount * reserveB) / reserveA;
    } else {
      return (amount * reserveA) / reserveB;
    }
  };

  useEffect(() => {
    if (amountA && reserveA && reserveB) {
      setAmountB(getSwapRate(amountA, reserveA, reserveB).toFixed(4));
    } else if (amountB && reserveA && reserveB) {
      setAmountA(getSwapRate(amountB, reserveB, reserveA).toFixed(4));
    }
  }, [amountA, amountB, swapDirection, reserveA, reserveB]);

  const swapTokens = async () => {
    if (!amountA || isNaN(amountA) || parseFloat(amountA) <= 0) {
      setMessage('Please enter a valid amount to swap.');
      return;
    }

    try {
      setLoading(true);
      setButtonDisabled(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, liquidityPoolABI, signer);

      // Ensure that user has approved the contract to spend Token A
      const tx = await contract.swap(ethers.utils.parseEther(amountA));
      await tx.wait();
      setMessage('Swap successful!');
    } catch (err) {
      setMessage('Failed to swap. Please check the amount and try again.');
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const toggleSwapDirection = () => {
    setSwapDirection(!swapDirection);
    setAmountA(''); // Reset the inputs to prevent confusion
    setAmountB('');
  };

  return (
    <div className="swap-container bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Swap Tokens</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder={`Amount to Swap (${swapDirection ? 'Token A' : 'Token B'})`}
            value={swapDirection ? amountA : amountB}
            onChange={(e) => {
              if (swapDirection) {
                setAmountA(e.target.value);
              } else {
                setAmountB(e.target.value);
              }
            }}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="font-semibold text-lg text-gray-700">{swapDirection ? 'Token A' : 'Token B'}</span>
        </div>
        
        {/* Swap Direction Button */}
        <button
          className="swap-direction-btn p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={toggleSwapDirection}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 12h16M12 4l8 8-8 8"
            />
          </svg>
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-6">
        <span>Expected amount: </span>
        <strong>{swapDirection ? amountB : amountA} {swapDirection ? 'Token B' : 'Token A'}</strong>
      </div>

      <button
        onClick={swapTokens}
        disabled={buttonDisabled || !amountA || !amountB || !reserveA || !reserveB}
        className={`w-full py-3 px-6 rounded-md text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
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
          'Swap'
        )}
      </button>

      {message && (
        <p
          className={`mt-4 p-4 rounded-md ${
            message.includes('successful') ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SwapTokens;
