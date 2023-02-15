<script>
  import Footer from "src/components/Footer.svelte";

  import { Content, Tile, Grid, Row, Column } from "carbon-components-svelte";
  import { TextInput, Button } from "carbon-components-svelte";
  import { InlineNotification } from "carbon-components-svelte";
  import { Information } from "carbon-icons-svelte";
  import { Checkbox } from "carbon-components-svelte";
  import { CodeSnippet } from "carbon-components-svelte";
  import { ViewOff, View, Copy } from "carbon-icons-svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { generate } from "src/lib/vrf-seed";
  import { ethers } from "ethers";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  let seedMode = false;
  let entropy = "";
  let index = 0;
  let visible = false;

  const copy = (text) => {
    navigator.clipboard?.writeText?.(text);
    toast.push("Copied to clipboard.");
  };

  let wallet;
  let seedphrase;

  const copySecret = () => copy(seedMode ? seedphrase : wallet.privateKey);
  const toggleView = () => (visible = !visible);

  const getMnemonic = (seed, index) => {
    const key = generate(seed, index);
    return ethers.utils.entropyToMnemonic(`0x${key}`);
  };

  const getWallet = (seed, index) => {
    const key = generate(seed, index);
    return new ethers.Wallet(key);
  };

  $: if (entropy && typeof index !== "undefined") {
    if (seedMode) {
      seedphrase = getMnemonic(entropy, index);
    } else {
      wallet = getWallet(entropy, index);
    }
  }
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column lg={4}>
        <div class="stick sidebar">
          <Tile class="blue-tile">
            <div class="form-info">
              <ExpressiveHeading size={4}>
                <h1>Kenshi VRF Seed</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Kenshi VRF Seed is an experimental VRF-based wallet and seed
                phrase generator.
              </p>
            </div>
          </Tile>

          <InlineNotification kind="warning" hideCloseButton>
            This tool is experimental! Use at your own risk.
          </InlineNotification>

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
              <ExpressiveHeading size={3}>
                <h2>Generator</h2>
              </ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>
                <h3>Entropy</h3>
              </ExpressiveHeading>
              Your wallets and seed phrases will be generated based on this secret.
              You can use this secret to recover your wallets later.<br />It's
              important to choose something memorable, yet difficult to guess,
              and you must keep this secret safe.
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                bind:value={entropy}
                labelText="Entropy"
                placeholder="A memorable, yet difficult to guess secret"
                helperText="Enter a long and difficult to guess secret here."
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>
                <h3>Index</h3>
              </ExpressiveHeading>
              Each entropy or secret can be used to generate multiple wallets and
              seed phrases. Here you can enter an account name or number.
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                bind:value={index}
                labelText="Index"
                placeholder="Account number or name"
                helperText="This selects a specific wallet on your multi-account VRF based seed phrase."
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>
                <h3>Mode</h3>
              </ExpressiveHeading>
              This generator can either produce a private key, or a BIP-39 seed phrase.
            </Column>
          </Row>
          <Row>
            <Column>
              <Checkbox
                bind:checked={seedMode}
                labelText="Produce a BIP-39 seed phrase"
              />
            </Column>
          </Row>
          {#if entropy && typeof index !== "undefined"}
            <Row>
              <Column>
                <ExpressiveHeading size={2}>
                  <h3>Results</h3>
                </ExpressiveHeading>
                Use the Copy button to copy the
                {#if seedMode}
                  seed phrase.
                {:else}
                  private key.
                {/if}
              </Column>
            </Row>
            {#if !seedMode}
              <Row>
                <Column>
                  <h5>Address</h5>
                  <CodeSnippet code={wallet.address} />
                </Column>
              </Row>
            {/if}
            {#if visible}
              <Row>
                <Column>
                  {#if seedMode}
                    <CodeSnippet code={seedphrase} />
                  {:else}
                    <CodeSnippet code={wallet.privateKey} />
                  {/if}
                </Column>
              </Row>
            {/if}
            <Row>
              <Column>
                <Button on:click={copySecret} icon={Copy}>Copy</Button>
                <Button
                  kind="secondary"
                  on:click={toggleView}
                  icon={visible ? ViewOff : View}
                >
                  View
                </Button>
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
    gap: 1em;
    align-items: flex-start;
  }
  .buttons {
    display: flex;
    gap: 1em;
  }
  .buttons :global(svg) {
    width: 1em;
  }
  h3,
  h5 {
    margin-bottom: 1em;
  }
</style>
