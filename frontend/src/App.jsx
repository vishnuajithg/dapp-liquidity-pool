import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import AddLiquidity from "./components/AddLiquidity";
import RemoveLiquidity from "./components/RemoveLiquidity";
import SwapTokens from "./components/SwapTokens";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [activeTab, setActiveTab] = useState("add");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white py-4 shadow-md">
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Liquidity Pool DApp</h1>
          <div className="space-x-6">
            <button
              className={`hover:text-gray-300 ${activeTab === "add" ? "text-white" : ""}`}
              onClick={() => handleTabChange("add")}
            >
              Add Liquidity
            </button>
            <button
              className={`hover:text-gray-300 ${activeTab === "remove" ? "text-white" : ""}`}
              onClick={() => handleTabChange("remove")}
            >
              Remove Liquidity
            </button>
            <button
              className={`hover:text-gray-300 ${activeTab === "swap" ? "text-white" : ""}`}
              onClick={() => handleTabChange("swap")}
            >
              Swap Tokens
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-screen-xl mx-auto p-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Decentralized Liquidity Pool
            </h2>
            <p className="text-lg text-gray-600">
              Manage liquidity and perform token swaps with ease.
            </p>
          </div>

          {/* Wallet Connection Section */}
          <div className="mt-8 text-center">
            <WalletConnect
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
            />
          </div>

          {/* Add, Remove, and Swap Liquidity Sections */}
          {walletAddress && (
            <div className="space-y-8 mt-8">
              {activeTab === "add" && (
                <div className="space-y-6">
                  <AddLiquidity walletAddress={walletAddress} />
                </div>
              )}

              {activeTab === "remove" && (
                <div className="space-y-6">
                  <RemoveLiquidity walletAddress={walletAddress} />
                </div>
              )}

              {activeTab === "swap" && (
                <div className="space-y-6">
                  <SwapTokens walletAddress={walletAddress} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-6">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; 2024 Liquidity Pool DApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
