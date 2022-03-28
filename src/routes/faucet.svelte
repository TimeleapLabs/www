<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";

  import Copy from "src/icons/Copy.svelte";

  import { onboard } from "src/lib/onboard";
  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";

  import faucetAbi from "src/lib/abi/faucet";
  import kenshiAbi from "src/lib/abi/kenshi";

  let chain;
  let address;

  const amount = "2.0";

  const chains = {
    mumbai: "0x13881",
    bsc: "0x61",
    ftm: "0xfa2",
    avax: "0xa869",
  };

  const contractAddresses = {
    mumbai: "0xA8eeAd1e6a4Cab8010DCA5F7805d7Cb2c2fD9117",
    bsc: "0xc3eD8d7207e5171C6f7565dd5e18720AA9E333dE",
    ftm: "0x039976F40a15Bbaaf055144d59F0a47341AF2dcb",
    avax: "0xd8aA9BeB5ef0eD1Bbb8Efb6EE665888c2E4F7b64",
  };

  const faucetAddresses = {
    mumbai: "0xbafb8605bA70aAC0BCe9e55c683419C575dD1E51",
    bsc: "0xB4b46933DE40A05E95153a8c0743793e6b9C8a27",
    ftm: "0xF4b77B9Af57830685AaCB0f8dba4Fb6b63421071",
    avax: "0x08cE842914b7313E16DBA708ccF0418bE3dE05c6",
  };

  $: if (chain && $wallet?.provider) {
    onboard.setChain({ chainId: chains[chain] });
  }

  const setAddress = () => {
    address = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  let contractAddress;
  $: if (chain) contractAddress = contractAddresses[chain];

  const copyContractAddr = () => {
    navigator.clipboard?.writeText?.(contractAddress);
    toast.push("Copied to clipboard.");
  };

  let spin = false;

  const withdraw = async () => {
    spin = true;
    const provider = new ethers.providers.Web3Provider($wallet.provider);

    const kenshi = new ethers.Contract(
      contractAddresses[chain],
      kenshiAbi,
      provider
    );

    const balance = await kenshi.balanceOf(address);
    if (balance.gt("10000000000000000000")) {
      spin = false;
      return toast.push("Reached max balance.");
    }

    const contract = new ethers.Contract(
      faucetAddresses[chain],
      faucetAbi,
      provider
    );

    const lastClaimedFrom = await contract.getWithdrawTime(
      $wallet.accounts[0].address
    );

    const lastClaimedTo = await contract.getWithdrawTime(address);
    const currentBlock = await provider.getBlockNumber();

    if (
      lastClaimedFrom.add(100).gt(currentBlock) ||
      lastClaimedTo.add(100).gt(currentBlock)
    ) {
      spin = false;
      return toast.push("Wait a few more minutes");
    }

    try {
      const signer = provider.getSigner();
      await contract.connect(signer).withdraw(address);
    } catch (error) {
      spin = false;
      return toast.push("Something went wrong!");
    }

    spin = false;
    return toast.push("Withdraw successful.");
  };
</script>

<Navbar />

<div class="section">
  <h2>Kenshi Faucet</h2>
  <Card>
    <div class="card-inner">
      <div class="form">
        <h3>Request testnet Kenshi</h3>
        <div class="description">
          Get testnet Kenshi on one of the supported testnets so you can build,
          test and experiment with Kenshi services.
        </div>
        <TextInput
          placeholder="Enter your wallet address"
          name="address"
          regex={/^0x[a-f0-9]+$/i}
          bind:value={address}
        />
        <Select
          options={[
            { label: "Avalanche Fuji C-Chain", value: "avax" },
            { label: "Binance Smart Chain Testnet", value: "bsc" },
            { label: "Fantom Testnet", value: "ftm" },
            { label: "Polygon Mumbai", value: "mumbai" },
          ]}
          placeholder="Choose a chain"
          bind:value={chain}
        />
        {#if contractAddress}
          <div class="copy" on:click={copyContractAddr}>
            <Alert>
              <div class="address">
                <span>Contract address: {contractAddress}</span>
                <Copy />
              </div>
            </Alert>
          </div>
        {/if}
      </div>
      <div />
    </div>
    <div class="buttons">
      {#if chain && address && $wallet?.provider}
        <Button on:click={withdraw} disabled={spin}>
          {#if spin}
            <SpinLine size="32" color="currentColor" unit="px" duration="4s" />
            Processing
          {:else}
            Withdraw {amount} ₭enshi
          {/if}
        </Button>
      {:else if !$wallet?.provider}
        Connect your wallet to continue.
      {/if}
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
  .card-inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .buttons {
    margin-top: 2em;
  }
  .description {
    margin-bottom: 1em;
    color: #111;
  }
  .copy {
    cursor: copy;
  }
  .address :global(svg) {
    height: 1em;
  }
  .address {
    display: flex;
    gap: 1em;
  }
  .address span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }
</style>
