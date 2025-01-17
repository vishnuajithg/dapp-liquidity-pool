import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner"; // Importing a spinner component

function WalletConnect({ walletAddress, setWalletAddress }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // Success/Notification message

  const checkMetaMaskAvailability = () => {
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed.");
      return false;
    }
    return true;
  };

  const connectWallet = async () => {
    try {
      if (checkMetaMaskAvailability()) {
        setLoading(true);
        setMessage(null);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setLoading(false);
        setMessage("Wallet connected successfully!");
      }
    } catch (err) {
      setLoading(false);
      setError("Error connecting to MetaMask: " + err.message);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setMessage("Wallet disconnected!");
  };

  useEffect(() => {
    if (checkMetaMaskAvailability()) {
      const fetchConnectedWallet = async () => {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      };
      fetchConnectedWallet();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {!walletAddress ? (
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={connectWallet}
          disabled={loading}
        >
          {loading ? (
            <TailSpin height={20} width={20} color="white" />
          ) : (
            "Connect MetaMask"
          )}
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <span className="text-xl text-blue-500 font-semibold">{walletAddress}</span>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
}

export default WalletConnect;
