<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";

  import { onboard } from "src/lib/onboard";
  import { wallet } from "src/stores/wallet";

  import { ethers } from "ethers";

  import deployerAbi from "src/lib/abi/deployer";

  let signer;
  let contractAddrDisplay;
  let contractAddr;
  let deployer;
  let isKenshiLocker;
  let isChecking;

  const deployerAddr = "0x367Fd3EbD74A1da5439069B4eefCFD7a85956993";

  $: if (contractAddr && contractAddr.length === 42) {
    contractAddrDisplay = [
      contractAddr.slice(0, 6),
      contractAddr.slice(-4),
    ].join("..");
    isKenshiLocker = false;
    if (deployer) {
      isChecking = true;
      deployer
        .isKenshiLocker(contractAddr)
        .then((isIt) => {
          isKenshiLocker = isIt;
          isChecking = false;
        })
        .catch(() => {
          isChecking = false;
        });
    }
  } else {
    isKenshiLocker = false;
  }

  const connectWallet = async (wallet) => {
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    signer = provider.getSigner();
    deployer = new ethers.Contract(deployerAddr, deployerAbi, signer);
  };

  const connectNoWallet = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed.binance.org/"
    );
    deployer = new ethers.Contract(deployerAddr, deployerAbi, provider);
  };

  $: if ($wallet && $wallet.provider) {
    connectWallet($wallet);
  } else if (typeof window !== "undefined") {
    connectNoWallet();
  }

  $: if ($wallet?.provider) {
    onboard.setChain({ chainId: "0x38" });
  }
</script>

<Navbar />

<div class="section">
  <h2>Kenshi Locker</h2>
  <Card>
    <div class="card-inner">
      <div class="form">
        <h3>Manage your Kenshi locker</h3>
        <div class="description">
          Enter the address of your Kenshi locker in the below field and we'll
          take you to the locker management page.
        </div>
        <TextInput
          bind:value={contractAddr}
          prefix="Address"
          placeholder="0x..."
        />
        {#if contractAddr?.length === 42 && !isChecking}
          {#if isKenshiLocker}
            <Alert success>
              {contractAddrDisplay} is a valid Kenshi locker.
            </Alert>
          {:else}
            <Alert warning>
              {contractAddrDisplay} is not a valid Kenshi locker.
            </Alert>
          {/if}
        {/if}
        <div class="buttons">
          {#if contractAddr?.length === 42 && isKenshiLocker}
            <Button href="/lockers/manage/{contractAddr}">Manage locker</Button>
          {/if}
        </div>
      </div>
      <div />
    </div>
  </Card>
</div>

<Footer />

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1.5em;
    margin-left: 0.5em;
  }
  h3 {
    margin-top: 0;
  }
  .section {
    padding: 4em;
    padding-top: 2em;
  }
  @media screen and (max-width: 960px) {
    .section {
      padding: 2em;
    }
  }
  @media screen and (max-width: 480px) {
    .section {
      padding: 1em;
    }
  }
  .card-inner {
    display: grid;
    gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .buttons {
    display: flex;
    gap: 1em;
    margin-top: 2em;
  }
  .description {
    margin-bottom: 1em;
    color: #111;
  }
</style>
