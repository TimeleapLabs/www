<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import TextInput from "src/components/TextInput.svelte";
  import Select from "src/components/Select.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";

  import Copy from "src/icons/Copy.svelte";
  import Wallet from "src/icons/Wallet.svelte";

  import { onboard } from "src/lib/onboard";
  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";

  import migrateAbi from "src/lib/abi/migrate";
  import kenshiAbi from "src/lib/abi/kenshi";

  let chain;
  let address;

  $: if ($wallet?.provider) {
    onboard.setChain({ chainId: "0x61" });
  }

  const setAddress = () => {
    address = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  const currentContractAddress = "0x61E2738f370371183A8f32F0CC49d54522198276";
  const contractAddress = "0xaCC70a58462E3F5B2e36DcE500E598963918cFdB";
  const migrateAddress = "0xb378F0e0B9368CBE271240807e3b70D18A5E7430";

  let userBalance;
  let kenshi;

  $: if ($wallet?.provider) {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    kenshi = new ethers.Contract(currentContractAddress, kenshiAbi, provider);
  }

  $: if ($wallet?.provider && kenshi && address) {
    kenshi.balanceOf(address).then((balance) => {
      userBalance = balance;
    });
  }

  const copy = (text) => () => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  const addToMetamask = (address) => () => {
    const params = {
      type: "ERC20",
      options: {
        address,
        symbol: "Kenshi",
        decimals: 18,
        image: `${window.location.origin}/images/logo/512x512.png`,
      },
    };
    $wallet.provider
      .request({ method: "wallet_watchAsset", params })
      .catch(() => {
        toast.push("Couldn't add the token to your wallet.");
      });
  };

  const formatBalance = (balance) => {
    const formatted = ethers.utils.formatUnits(balance);
    const [lhs, rhs] = formatted.split(".");
    return [lhs, lhs === "0" ? rhs : ""].filter(Boolean).join(".");
  };

  let spin = false;

  const migrate = async () => {
    spin = true;

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const migrate = new ethers.Contract(migrateAddress, migrateAbi, provider);
    const kenshi = new ethers.Contract(
      currentContractAddress,
      kenshiAbi,
      provider
    );

    const _1e31 = "10000000000000000000000000000000";

    try {
      const signer = provider.getSigner();
      const tx = await kenshi.connect(signer).approve(migrateAddress, _1e31);
      await tx.wait(1);
      await migrate.connect(signer).migrate();
    } catch (error) {
      spin = false;
      return toast.push("Something went wrong!");
    }

    kenshi.balanceOf(address).then((balance) => {
      userBalance = balance;
    });

    toast.push("Migrate successful.");
    toast.push("Don't forget to add the new token to your wallet!");

    spin = false;
  };
</script>

<Navbar />

<div class="section">
  <h2>Migrate to Kenshi ERC-1363 payable token</h2>
  <Card>
    <div class="card-inner">
      <div class="form">
        <h3>Migrate your ERC-20 tokens</h3>
        <div class="description">
          Migrate your current ERC-20 Kenshi tokens to the new ERC-1363 token
          standard to benefit from the new features of the Kenshi platform.
        </div>
        <div class="copy" on:click={copy(contractAddress)}>
          <Alert>
            <div class="address">
              <span>Contract address: {contractAddress}</span>
              <Copy />
            </div>
          </Alert>
        </div>
      </div>
      <div />
    </div>
    <div class="buttons">
      {#if $wallet?.provider}
        {#if userBalance?.gt(0)}
          <Button on:click={migrate} disabled={spin}>
            {#if spin}
              <SpinLine
                size="32"
                color="currentColor"
                unit="px"
                duration="4s"
              />
              Processing
            {:else}
              Migrate {formatBalance(userBalance)} ₭enshi
            {/if}
          </Button>
        {:else if userBalance?.eq(0)}
          <Button disabled>Nothing to migrate</Button>
        {/if}
        {#if $wallet.provider}
          <Button on:click={addToMetamask(contractAddress)}>
            <Wallet /> Add to wallet
          </Button>
        {/if}
      {:else}
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
    display: flex;
    gap: 1em;
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
