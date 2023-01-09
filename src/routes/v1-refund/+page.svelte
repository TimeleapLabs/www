<script>
  import Footer from "src/components/Footer.svelte";

  import { ethers } from "ethers";
  import { wallet } from "src/stores/wallet";
  import { toast } from "@zerodevx/svelte-toast";
  import { SpinLine } from "svelte-loading-spinners";
  import { Content, Tile, Grid, Row, Column } from "carbon-components-svelte";
  import { TextInput, Button } from "carbon-components-svelte";
  import { Information, SendAlt } from "carbon-icons-svelte";
  import refundAbi from "src/lib/abi/refund";
  import bep20Abi from "src/lib/abi/bep20";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  let userAddress;
  let balance = 0;
  let spin = false;

  const refundAddr = "0xc7D269645c62821436d1e94033113547614639e8";
  const kenshiAddr = "0x8AdA51404F297bF2603912d1606340223c0a7784";

  const claim = async () => {
    spin = true;
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const contract = new ethers.Contract(refundAddr, refundAbi, signer);
    const kenshi = new ethers.Contract(kenshiAddr, bep20Abi, signer);
    try {
      await kenshi.approve(
        refundAddr,
        ethers.utils.parseUnits("1000000000000000000")
      );
      await contract.claim();
      toast.push("Claimed successfully!");
    } catch (error) {
      toast.push("Claiming failed!");
    }
    spin = false;
  };

  const setBalance = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner(userAddress);
    const contract = new ethers.Contract(refundAddr, refundAbi, signer);
    const raw = await contract.getClaim(userAddress);
    balance = ethers.utils.formatUnits(raw);
  };

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();
  $: if (userAddress) setBalance();
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column lg={4}>
        <div class="stick sidebar">
          <Tile class="blue-tile">
            <div class="form-info">
              <ExpressiveHeading size={4}>
                <h1>V1 Token Refund</h1>
              </ExpressiveHeading>
              <p class="body-02">
                If you missed the migration, this tool refunds pre-migration
                value of your v1 token's. Connect your wallet to check your
                eligibility.
              </p>
            </div>
          </Tile>

          <div class="buttons">
            <Button kind="secondary" href="/docs" icon={Information}>
              Learn about Kenshi
            </Button>
          </div>
        </div>
      </Column>
      <Column>
        <Grid>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Claimable</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>Connect your wallet to check your claimable amount.</p>
            </Column>
          </Row>
          {#if userAddress}
            <Row>
              <Column>
                <TextInput
                  bind:value={balance}
                  labelText="Balance"
                  placeholder="Your claimable amount"
                  readonly
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <div class="buttons">
                  <Button on:click={claim} disabled={spin} icon={SendAlt}>
                    {#if spin}
                      <SpinLine
                        size="32"
                        color="currentColor"
                        unit="px"
                        duration="4s"
                      />
                      Processing
                    {:else}
                      Claim
                    {/if}
                  </Button>
                </div>
              </Column>
            </Row>
          {/if}
        </Grid>
      </Column>
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .sidebar {
    padding-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: flex-start;
  }
  .buttons {
    display: flex;
    gap: 1em;
  }
  .buttons :global(svg) {
    width: 1em;
  }
</style>
