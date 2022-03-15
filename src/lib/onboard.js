import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";

const appName = "Kenshi";

const injected = injectedModule();

const options = {
  appMetadata: {
    name: appName,
    description: "Kenshi dApp",
    icon: "/images/kenshi.logo.short.svg",
  },
  chains: [
    {
      id: "0x61",
      token: "BNB",
      label: "Binance Smart Chain Testnet",
      rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
    {
      id: "0x13881",
      token: "MATIC",
      label: "Polygon Mumbai Testnet",
      rpcUrl: "https://rpc-mumbai.maticvigil.com",
    },
    {
      id: "0xfa2",
      token: "FTM",
      label: "Fantom Testnet",
      rpcUrl: "https://rpc.testnet.fantom.network",
    },
    {
      id: "0xa869",
      token: "AVAX",
      label: "Avalanche Fuji C-Chain",
      rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    },
  ],
  wallets: [injected],
};

export const onboard = Onboard(options);
