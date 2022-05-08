<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
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

  let address;

  $: if ($wallet?.provider) {
    onboard.setChain({ chainId: "0x38" });
  }

  const setAddress = () => {
    address = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  const currentContractAddress = "0x8AdA51404F297bF2603912d1606340223c0a7784";
  const contractAddress = "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f";
  const migrateAddress = "0x3336979f99921D98Df1Eb60c254f0e1A2F488E84";

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
      const tx2 = await migrate.connect(signer).migrate();
      await tx2.wait(1);
    } catch (error) {
      spin = false;
      return toast.push("Something went wrong!");
    }

    kenshi.balanceOf(address).then((balance) => {
      userBalance = balance;
    });

    toast.push("Migration successful.");
    toast.push("Don't forget to add the new token to your wallet!");

    spin = false;
  };
</script>

<Navbar />

<div class="section">
  <h2>Migrate to Kenshi V2</h2>
  <Card>
    <div class="card-inner">
      <div class="form">
        <h3>Migrate V1 tokens to V2</h3>
        <div class="description">
          <p>
            Migrate your current ERC-20 Kenshi tokens to the new ERC-1363 token
            standard to benefit from the new features of the Kenshi platform.
          </p>
          <p>
            This migration is tax-free. The migration process ends on 22nd May
            2022.
          </p>
          Read the
          <a href="https://docs.kenshi.io/token/migrate.html">
            migration documentation
          </a> for more info.
        </div>
        <Alert warning>
          Warning: After the migration period is over you won't be able to
          migrate your tokens anymore. The V1 token will be deprecated and lose
          its value.
        </Alert>
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
    {#if $wallet?.provider}
      <div class="buttons">
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
            <Wallet /> Add token to wallet
          </Button>
        {/if}
      </div>
    {:else}
      <div class="connect">
        Connect your <span class="inline-icon"> <Wallet /></span> wallet to continue.
      </div>
    {/if}
  </Card>
</div>

<Footer />

<style>
  .connect {
    margin-top: 2em;
  }
  .inline-icon {
    display: inline;
  }
  .inline-icon :global(svg) {
    height: 0.8em;
    margin-bottom: -0.1em;
  }
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
    flex-wrap: wrap;
  }
  .description {
    margin-bottom: 1em;
    color: #111;
  }
  .description p:first-of-type {
    margin-top: 0;
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
  a {
    color: var(--primary-color);
  }
</style>
