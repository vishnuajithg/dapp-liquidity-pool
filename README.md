# 💧💸 Liquidity Pool - Add Liquidity

**Liquidity Pool** is a decentralized application that allows users to add liquidity to a liquidity pool. It facilitates the process of adding two tokens (Token Alpha and Token Beta) with their respective amounts, interacting with smart contracts on the Ethereum blockchain. This DApp enables token holders to contribute to liquidity pools and swap tokens, enhancing the decentralized finance ecosystem. 💸

## 🎯 Objective

The objective of this project is to create an easy-to-use interface that allows users to add liquidity to a pool by supplying two different tokens. By adding liquidity, users can earn rewards or transaction fees. This app interacts with Ethereum smart contracts and utilizes the power of blockchain for secure and transparent transactions. The app aims to empower DeFi (Decentralized Finance) users to manage their liquidity positions directly from their web browsers.

## 🛠️ Built With

  ![React JS](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwindcss&logoColor=white)
  ![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat&logo=solidity&logoColor=white)
  ![Node JS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
  ![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=flat&logo=ethereum&logoColor=white)
  ![Ethers.js](https://img.shields.io/badge/Ethers.js-3C3C3D?style=flat&logo=ethers&logoColor=white)
  ![Hardhat](https://img.shields.io/badge/Hardhat-ff6c37?style=flat&logo=hardhat&logoColor=white)

  
## 🎞️ Demo Video

Watch the demo video to see how the app works:  
[Liquidity Pool Demo: Add Liquidity to Ethereum Pools](https://youtu.be/)

##### You can try the liquidity addition process with test tokens as a demo. 🧪

## ⚙️ Getting Started

To run the project locally, follow these steps:

### 🚀 Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/liquidity-pool.git
    ```
2. Navigate to the project directory:
    ```bash
    cd liquidity-pool
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the project:
    ```bash
    npm run dev
    ```

This will start the development server on `http://localhost:5173/`. You can now open your browser and interact with the app.

### 🔗 Smart Contract Setup with Hardhat

To interact with the Ethereum blockchain and deploy smart contracts, follow these steps:

1. Install Hardhat and required dependencies:
    ```bash
    cd liquidity-pool
    npm install -D hardhat @nomicfoundation/hardhat-toolbox
    ```

2. Set up your environment variables by creating a `.env` file in the root of the project with the following content:
    ```bash
    SEPOLIA_URL=your_sepolia_rpc_url
    PRIVATE_KEY=your_private_key
    ```

    Replace `your_sepolia_rpc_url` with your Sepolia testnet URL (e.g., from Infura or Alchemy), and `your_private_key` with your Ethereum account's private key.

3. Here’s the `hardhat.config.js` configuration file you’ll be using:

    ```javascript
    require("@nomicfoundation/hardhat-toolbox");
    require("dotenv").config();
    const SEPOLIA_URL = process.env.SEPOLIA_URL;
    const PRIVATE_KEY = process.env.PRIVATE_KEY;

    module.exports = {
      defaultNetwork: "infuraSep",
      networks: {
        localhost: {
          url: "http://127.0.0.1:8545/",
        },
        infuraSep: {
          url: SEPOLIA_URL,
          accounts: [PRIVATE_KEY]
        },
      },
      solidity: "0.8.20",
    };
    ```

### 🔑 Important Notes

- Make sure to replace the Sepolia URL and private key in the `.env` file with your own credentials to secure transactions.
- For local testing, you can run the Hardhat node by executing `npx hardhat node`, and use the `localhost` network configuration.

## 🧑‍🤝‍🧑 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

To contribute:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/your-feature-name`)
3. Commit your Changes (`git commit -m 'Add feature'`)
4. Push to the Branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 🔓
