import Onboard from "@web3-onboard/core";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const appName = "Kenshi";

const injected = injectedModule();
const walletConnect = walletConnectModule();

const options = {
  appMetadata: {
    name: appName,
    description: "Kenshi dApp",
    icon: "/images/kenshi.logo.short.svg",
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
  chains: [
    {
      id: "0x61",
      token: "BNB",
      label: "BNB Smart Chain Testnet",
      rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
    {
      id: "0x38",
      token: "BNB",
      label: "BNB Smart Chain",
      rpcUrl: "https://bsc-dataseed.binance.org",
    },
    {
      id: "0x13881",
      token: "MATIC",
      label: "Polygon Mumbai Testnet",
      rpcUrl: "https://rpc-mumbai.maticvigil.com",
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Polygon Mainnet",
      rpcUrl: "https://polygon-rpc.com",
    },
    {
      id: "0xfa2",
      token: "FTM",
      label: "Fantom Testnet",
      rpcUrl: "https://rpc.testnet.fantom.network",
    },
    {
      id: "0xfa",
      token: "FTM",
      label: "Fantom Mainnet",
      rpcUrl: "https://rpc.ftm.tools",
    },
    {
      id: "0xa869",
      token: "AVAX",
      label: "Avalanche Fuji C-Chain",
      rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    },
    {
      id: "0xa86a",
      token: "AVAX",
      label: "Avalanche C-Chain",
      rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    },
  ],
  wallets: [walletConnect, injected],
};

export const onboard = Onboard(options);
