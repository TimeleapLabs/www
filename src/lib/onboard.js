import Onboard from "bnc-onboard";
import { wallet } from "src/stores/wallet";

const dappId = "bc69f74d-6e94-400b-8f06-439b4bcca6d6";
const networkId = 0x38;

export const onboard = Onboard({
  dappId,
  networkId,
  subscriptions: {
    wallet: (selectedWallet) => {
      wallet.set(selectedWallet);
    },
  },
});
