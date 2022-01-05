import Onboard from "bnc-onboard";
import { wallet } from "src/stores/wallet";

const dappId = "bc69f74d-6e94-400b-8f06-439b4bcca6d6";
const rpcUrl = "https://bsc-dataseed.binance.org";
const email = "admin@kenshi.io";
const appName = "Kenshi";
const appUrl = "https://kenshi.io";
const networkId = 0x38;

const wallets = [
  { walletName: "coinbase", preferred: true },
  { walletName: "trust", preferred: true, rpcUrl },
  { walletName: "metamask", preferred: true },
  { walletName: "mathwallet", preferred: true },
  { walletName: "binance", preferred: true },
  {
    walletName: "walletConnect",
    rpc: { [networkId]: rpcUrl },
    preferred: true,
  },
  { walletName: "trezor", appUrl, email, rpcUrl },
  { walletName: "ledger", rpcUrl },
  { walletName: "walletLink", rpcUrl, appName },
  { walletName: "huobiwallet", rpcUrl },
  { walletName: "opera" },
  { walletName: "ronin" },
];

export const onboard = Onboard({
  dappId,
  networkId,
  subscriptions: {
    wallet: async (selectedWallet) => {
      await onboard.walletCheck();
      wallet.set(selectedWallet);
    },
  },
  walletSelect: {
    wallets,
  },
});
