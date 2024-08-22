<script>
  import Footer from "src/components/Footer.svelte";

  import { Grid, Row, Column } from "carbon-components-svelte";
  import { Button, Content } from "carbon-components-svelte";

  import { AiGenerate, ArrowRight, Tuning } from "carbon-icons-svelte";
  import { LogoGithub } from "carbon-icons-svelte";
  import { onMount } from "svelte";
  import { ProgressBar } from "carbon-components-svelte";
  import { wallet } from "src/stores/wallet";
  import { TextInput } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import DeveloperResources from "src/components/home/DeveloperResources.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import AdaptiveProductIcon from "src/components/AdaptiveProductIcon.svelte";
  import MailingList from "src/components/MailingList.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { Sia } from "sializer";
  import { uuidv7obj } from "uuidv7";
  import { toast } from "@zerodevx/svelte-toast";
  import { onboard } from "$lib/onboard";
  import { ethers } from "ethers";

  const brokerUrl = "wss://localhost:9123/0.13.0-ai-preview";

  let broker;
  let imageEl;
  let prompt = "A beautiful sunset over the ocean";
  let hasImage = false;
  let generating = false;
  let showAdvanced = false;
  let model = "SimianLuo/LCM_Dreamshaper_v7";
  let loraWeights = "";

  const payTo = "0xA2dEc4f8089f89F426e6beB76B555f3Cf9E7f499";

  const connect = () => {
    broker = new WebSocket(brokerUrl);
    broker.onopen = () => {
      console.log("Connected to broker");
    };
    broker.onclose = () => {
      console.log("Disconnected from broker");
    };
    broker.onmessage = async (event) => {
      const sia = new Sia();
      const arrayBuffer = await event.data.arrayBuffer();

      console.log("Received message", arrayBuffer.length);

      sia.setContent(new Uint8Array(arrayBuffer));
      sia.readByteArrayN(1); // read out the opcode
      const uuid = sia.readByteArray8();
      const error = sia.readUInt64();

      if (error) {
        console.log("Error", error);
        generating = false;
        // TODO: Show error message
        toast.push(`Error generating image: ${error}`, { theme: "error" });
        return;
      }

      const image = sia.readByteArray32();
      const blob = new Blob([image], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      imageEl.src = url;
      hasImage = true;
      generating = false;
    };
  };

  const generate = async () => {
    if (!prompt) {
      toast.push("Please enter a prompt to generate an image", {
        theme: "error",
      });
      return;
    }

    if (!$wallet?.provider) {
      toast.push("Please connect your wallet first");
      return;
    }

    generating = true;

    try {
      await onboard.setChain({ chainId: "0x157b" });
    } catch (error) {
      toast.push("Couldn't change to the Timeleap network.");
      generating = false;
      return null;
    }

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();

    const tx = await signer
      .sendTransaction({
        to: payTo,
        value: ethers.utils.parseEther("0.1"),
      })
      .catch(() => {
        toast.push("Couldn't send transaction to pay for the image generation");
        generating = false;
        return null;
      });

    if (!tx) {
      return;
    }

    const receipt = await tx.wait(1).catch(() => {
      toast.push("Couldn't wait for transaction to be mined");
      generating = false;
      return null;
    });

    if (!receipt) {
      return;
    }

    const payload = new Sia()
      .addByteArrayN([13])
      .addByteArray8(uuidv7obj().bytes)
      .addByteArray8(uuidv7obj().bytes) // We don't care about the signature for now
      .addString8(tx.hash)
      .addString8("Unchained.AI.TextToImage")
      .addString16(prompt)
      .addString16("")
      .addString8(model)
      .addString8(loraWeights)
      .addUInt8(16).content;

    broker.send(payload);
  };

  onMount(() => {
    connect();
  });
</script>

<!-- Hero -->

<Content class="gap">
  <Grid padding>
    <Row padding>
      <Column padding />
    </Row>
    <Row>
      <Column padding lg={8} md={6} sm={4}>
        <div class="hero flex-column">
          <div class="product-icon">
            <AdaptiveProductIcon
              width="128px"
              product="unchained"
              alt="Unchained"
            />
          </div>

          <div>
            <h1>Timeleap Unchained AI</h1>
          </div>

          <div class="flex-spacer">
            <ExpressiveHeading size={3}>
              <div class="muted">
                Unchained AI is a plugin for Timeleap Unchained that allows you
                to run AI models on the distributed network.
              </div>
            </ExpressiveHeading>
          </div>

          <div class="flex-spacer body-02">
            <MailingList topic="wallet" buttonText="Sign Up">
              <p class="muted">
                Sign-Up for the latest news and updates on Timeleap Unchained
                distributed network.
              </p>
            </MailingList>
          </div>

          <div class="buttons">
            <Button
              href="https://github.com/TimeleapLabs/unchained"
              icon={LogoGithub}
              target="_blank"
            >
              See Project on GitHub
            </Button>
            <Button href="/unchained/explore" icon={ArrowRight}>Testnet</Button>
          </div>
        </div>
      </Column>
      <Column lg={8} md={6} sm={4}>
        <div
          class="hero-image contrast noise"
          style="background-image: url(/images/backgrounds/ai.jpg);"
        />
      </Column>
    </Row>
  </Grid>

  <Grid padding>
    <Row>
      <Column>
        <h2>Generate Images with Unchained AI</h2>
      </Column>
    </Row>
    <Row>
      <Column>
        <p>
          Unchained AI is a plugin for Timeleap Unchained that allows you to
          generate images using AI models on the distributed network. Enter a
          prompt and click generate to create an image.
        </p>
      </Column>
    </Row>
    <Row>
      <Column>
        <img
          alt="Unchained AI"
          bind:this={imageEl}
          class:no-image={!hasImage}
        />
      </Column>
    </Row>
    {#if generating}
      <Row>
        <Column>
          <ProgressBar helperText="Generating..." />
        </Column>
      </Row>
    {/if}
    <Row>
      <Column>
        <TextInput
          labelText="Prompt"
          placeholder="Enter your prompt to generate an image on Unchained"
          bind:value={prompt}
        />
      </Column>
    </Row>
    {#if showAdvanced}
      <Row>
        <Column>
          <TextInput labelText="Model" placeholder="Model" bind:value={model} />
        </Column>
        <Column>
          <TextInput
            labelText="LoRa Weights"
            placeholder="LoRa Weights"
            bind:value={loraWeights}
          />
        </Column>
      </Row>
    {/if}
    <Row>
      <Column>
        <Button icon={AiGenerate} on:click={generate} disabled={generating}>
          Generate
        </Button>
        <Button on:click={() => (showAdvanced = !showAdvanced)} icon={Tuning}>
          {showAdvanced ? "Hide" : "Show"} Advanced Options
        </Button>
        <ConnectButton primary />
      </Column>
    </Row>
  </Grid>

  <DeveloperResources />
  <HereToHelp />
</Content>

<Footer />

<style>
  h1 {
    font-weight: 300;
    font-size: 4.5rem;
  }

  @media (max-width: 760px) {
    h1 {
      font-size: 2.5rem;
    }
  }
  .buttons {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    width: 100%;
    flex-wrap: wrap;
  }
  .hero {
    gap: 4em;
    padding-top: 8em;
    padding-bottom: 4em;
  }
  .product-icon :global(.wrap) {
    justify-content: start;
  }
  .no-image {
    display: none;
  }
</style>
