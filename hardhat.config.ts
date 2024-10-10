import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",  // Ensure this matches your contracts' pragma statements
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  ignition: {
    requiredConfirmations: 1
  },
  networks: {
    sepolia: {  // Define Linea Sepolia network
      url: `https://eth-sepolia.public.blastapi.io`,//`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, // Use the Linea Sepolia RPC endpoint
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Load private key from .env file
    },
  },
};

export default config;
