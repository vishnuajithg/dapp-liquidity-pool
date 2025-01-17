/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")
require('dotenv').config();


module.exports = {
  defaultNetwork:"infurahol",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    sepolia:{
      url:process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  solidity: "0.8.20",
};