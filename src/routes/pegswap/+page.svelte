<script>
  import Footer from "src/components/Footer.svelte";
  import MetaMask from "src/icons/MetaMask.svelte";

  import { Content, Tile, Grid, Row, Column } from "carbon-components-svelte";
  import { InlineNotification, Link, Button } from "carbon-components-svelte";
  import { TextInput, Checkbox, Select } from "carbon-components-svelte";
  import { Tabs, Tab, TabContent, SelectItem } from "carbon-components-svelte";

  import {
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    Pagination,
  } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import ConnectButton from "src/components/ConnectButton.svelte";

  import { onMount } from "svelte";
  import { onboard } from "src/lib/onboard";
  import { wallet } from "src/stores/wallet";

  import { toast } from "@zerodevx/svelte-toast";
  import { ethers } from "ethers";
  import { SpinLine } from "svelte-loading-spinners";

  import pegswapAbi from "src/lib/abi/pegswap";
  import kenshiAbi from "src/lib/abi/kenshi";

  let sourceChain = "bsc";
  let destChain = "ftm";
  let address;
  let amount = "1000";
  let autoclaim = true;

  const chains = {
    polygon: "0x89",
    bsc: "0x38",
    ftm: "0xfa",
    avax: "0xa86a",
  };

  const kenshiAddresses = {
    bsc: "0x42f9c5a27a2647a64f7D3d58d8f896C60a727b0f",
    polygon: "0x164caf66c45e483F7eE647CcaD275B35B4C75719",
    ftm: "0x164caf66c45e483F7eE647CcaD275B35B4C75719",
    avax: "0x164caf66c45e483F7eE647CcaD275B35B4C75719",
  };

  const operatorAddresses = {
    polygon: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    bsc: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    ftm: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
    avax: "0x855C83A8d3C5BDE6A505cdFEB8272b8F47Bd3213",
  };

  const pegswapAddresses = {
    bsc: "0x3CcAa188Dd35E9125D7ade476da123C020aeC84d",
    polygon: "0x8AdA51404F297bF2603912d1606340223c0a7784",
    ftm: "0x8AdA51404F297bF2603912d1606340223c0a7784",
    avax: "0x8AdA51404F297bF2603912d1606340223c0a7784",
  };

  const chainIds = {
    "0x38": {
      key: "bsc",
      icon: "binance",
      title: "BNB Smart Chain",
      shortTitle: "BSC",
    },
    "0x89": {
      key: "polygon",
      icon: "polygon",
      title: "Polygon",
      shortTitle: "MATIC",
    },
    "0xa86a": {
      key: "avax",
      icon: "avalanche",
      title: "Avalanche",
      shortTitle: "AVAX",
    },
    "0xfa": { key: "ftm", icon: "fantom", title: "Fantom", shortTitle: "FTM" },
  };

  const setAddress = () => {
    address = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();

  const chainOptions = [
    { label: "Avalanche C-Chain", value: "avax" },
    { label: "BNB Smart Chain", value: "bsc" },
    { label: "Fantom", value: "ftm" },
    { label: "Polygon", value: "polygon" },
  ];

  const sourceOptions = [...chainOptions];

  let destOptions;
  $: destOptions = chainOptions.filter(({ value }) => value != sourceChain);

  $: if (sourceChain && sourceChain === destChain) {
    destChain = destOptions[0].value;
  } else {
    destChain = destChain;
  }

  const pegswapEndpoint = "https://api.kenshi.io/pegswap";

  const addToMetamask = (address, chainId) => async () => {
    const params = {
      type: "ERC20",
      options: {
        address,
        symbol: "Kenshi",
        decimals: 18,
        image: `${window.location.origin}/images/logo/512x512.png`,
      },
    };

    try {
      await onboard.setChain({ chainId });
    } catch (error) {
      return toast.push("Couldn't switch to the destination network.");
    }

    $wallet.provider
      .request({ method: "wallet_watchAsset", params })
      .catch(() => {
        toast.push("Couldn't add the token to your wallet.");
      });
  };

  const pegswapNonceQuery = (operator, toChain, nonce) => `{
    getEntries(operator: "${operator}", toChain: "${toChain}", nonce: "${nonce}") {
      signature
      request {
        fromChain
        toChain
        operator
        recipient
        amount
        nonce
      }
    }
  }`;

  const pegswapRecipientQuery = (recipient) => `{
    getEntries(recipient: "${recipient}") {
      signature
      request {
        fromChain
        toChain
        operator
        recipient
        amount
        nonce
      }
    }
  }`;

  let userRequests;
  let pendingRequests = [];
  let pageSize = 5;
  let page = 1;
  let filteredRowIds = [];

  const getUserRequests = async () => {
    const recipient = $wallet?.accounts?.[0]?.address;
    if (recipient) {
      const query = pegswapRecipientQuery(ethers.utils.getAddress(recipient));

      const response = await fetch(pegswapEndpoint, {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      const { data: { getEntries } = {} } = (await response.json()) || {};
      userRequests = getEntries || userRequests || [];

      const pending = [];

      for (const entry of userRequests) {
        if (entry.signature === currentClaim) continue;
        const claimed = await isClaimed(entry.request);
        if (!claimed) pending.push(entry);
      }

      pendingRequests = pending.map((req, id) => ({
        ...req.request,
        actions: {
          signature: req.signature,
          request: req.request,
        },
        id,
      }));
    }
  };

  $: if ($wallet?.accounts?.[0]?.address) getUserRequests();

  const parseLog = (kenshi, pegswap) => (log) => {
    try {
      return kenshi.interface.parseLog(log);
    } catch (error) {}
    try {
      return pegswap.interface.parseLog(log);
    } catch (error) {}
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getErrorMessage = (error) => {
    return (
      error.data?.message?.match(/PegSwap: (.*)/)?.pop() ||
      error.data?.message?.replace(/execution reverted: /, "") ||
      error.data?.message ||
      "Something went wrong!"
    );
  };

  const rpcList = {
    "0x38": "https://bsc-dataseed.binance.org",
    "0x89": "https://polygon-rpc.com",
    "0xfa": "https://rpc.ftm.tools",
    "0xa86a": "https://api.avax.network/ext/bc/C/rpc",
  };

  const isClaimed = async (request) => {
    const rpcUrl = rpcList[request.toChain];
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const pegswapAddr = pegswapAddresses[chainIds[request.toChain].key];
    const pegswap = new ethers.Contract(pegswapAddr, pegswapAbi, provider);
    return await pegswap.isClaimed(request.fromChain, request.nonce);
  };

  let claiming = false;
  let currentClaim = "";

  const claim = async ({ request, signature }) => {
    currentClaim = signature;

    // Switch to the correct chain
    // await onboard.setChain({
    //   chainId: request.toChain.replace(/^0x0*/, "0x"),
    // });

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner();
    const pegswapAddr = pegswapAddresses[chainIds[request.toChain].key];
    const pegswap = new ethers.Contract(pegswapAddr, pegswapAbi, provider);

    try {
      const { v, r, s } = ethers.utils.splitSignature(signature);
      const tx = await pegswap.connect(signer).claim(request, v, r, s);
      await tx.wait(1);
      toast.push("Claimed successfully.");
    } catch (error) {
      toast.push(getErrorMessage(error));
    }

    currentClaim = "";
  };

  const claimPastRequest = async (request, signature) => {
    claiming = true;
    await onboard.setChain({
      chainId: request.toChain.replace(/^0x0+/, "0x"),
    });
    await claim({ request, signature });
    claiming = false;
  };

  const hexZeroPad = (hex) =>
    hex.length % 2 ? hex.replace(/^0x/, "0x0") : hex;

  const waitForNonceAndClaim = async (operator, toChain, nonce) => {
    const paddedChain = hexZeroPad(toChain);
    const paddedNonce = hexZeroPad(nonce.toHexString());
    const query = pegswapNonceQuery(operator, paddedChain, paddedNonce);

    let entry;

    while (!entry) {
      const response = await fetch(pegswapEndpoint, {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      const { data: { getEntries } = {} } = (await response.json()) || {};

      if (getEntries && getEntries.length) {
        entry = getEntries[0];
        break;
      }

      await sleep(2500);
    }

    message = "Switching to the destination chain";

    try {
      await onboard.setChain({
        chainId: entry.request.toChain.replace(/^0x0+/, "0x"),
      });
    } catch (error) {
      toast.push("Unable to switch network!");
      throw error;
    }

    claiming = true;
    message = "Claiming from the destination chain";

    await claim(entry, true);
    claiming = false;
  };

  let requestInProgress = false;
  let message;

  const requestSwap = async () => {
    requestInProgress = true;

    try {
      message = "Switching to the source chain";
      await onboard.setChain({ chainId: chains[sourceChain] });
    } catch (error) {
      requestInProgress = false;
      message = undefined;
      return toast.push("Unable to switch network!");
    }

    message = "Sending your swap request";

    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const kenshiAddr = kenshiAddresses[sourceChain];
    const pegswapAddr = pegswapAddresses[sourceChain];
    const kenshi = new ethers.Contract(kenshiAddr, kenshiAbi, provider);
    const pegswap = new ethers.Contract(pegswapAddr, pegswapAbi, provider);

    try {
      const signer = provider.getSigner();
      const parsedAmount = ethers.utils.parseUnits(amount);
      const data = ethers.utils.defaultAbiCoder.encode(
        ["uint256", "address"],
        [chains[destChain], operatorAddresses[destChain]]
      );

      const tx = await kenshi
        .connect(signer)
        ["transferAndCall(address,uint256,bytes)"](
          pegswapAddr,
          parsedAmount,
          data
        );

      message = "Waiting for the transaction";

      const receipt = await tx.wait(1);
      const logs = receipt.logs.map(parseLog(kenshi, pegswap));

      const { nonce } = logs
        .filter((log) => log?.name === "SwapRequested")
        .pop().args;

      message = "Waiting for the oracle";

      if (autoclaim) {
        await waitForNonceAndClaim(
          operatorAddresses[destChain],
          chains[destChain],
          nonce
        );
      } else {
        toast.push("Swap request successful");
      }
    } catch (error) {
      toast.push(getErrorMessage(error));
    }

    requestInProgress = false;
    message = undefined;
  };

  const formatAmount = (amount) => ethers.utils.formatUnits(amount);

  onMount(() => {
    getUserRequests();
    const recipientInterval = setInterval(getUserRequests, 15 * 1000);
    return () => {
      clearInterval(recipientInterval);
    };
  });
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column lg={4}>
        <div class="stick sidebar">
          <Tile class="blue-tile">
            <div class="form-info">
              <ExpressiveHeading size={4}>
                <h1>Swap</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Kenshi token is a utility token that allows access to Kenshi's
                on-chain services.
              </p>
            </div>
          </Tile>

          <div>
            <InlineNotification kind="info" hideCloseButton>
              <svelte:fragment slot="subtitle">
                Cross-chain transfers are async and need to be approved by the
                Kenshi PegSwap oracle. Once the oracle receives your Kenshi on
                the source chain, it allows claiming the same amount of tokens
                on the destination chain.
              </svelte:fragment>
            </InlineNotification>
            <InlineNotification kind="warning" hideCloseButton>
              <svelte:fragment slot="subtitle">
                If for any reason you fail to claim your tokens (e.g. if you
                don't have enough gas on the destination chain) you can go to
                the pending tab and claim them later.
              </svelte:fragment>
            </InlineNotification>
          </div>
        </div>
      </Column>
      <Column>
        <Grid>
          <Row>
            <Column>
              <Tabs type="container">
                <Tab label="Move cross-chain" />
                <Tab label="Pending" />
                <svelte:fragment slot="content">
                  <TabContent>
                    <Grid noGutter fullWidth>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={2}>
                            Kenshi cross-chain transfer
                          </ExpressiveHeading>
                          <div>
                            You can move Kenshi token's to any wallet address on
                            any of the supported chains.
                          </div>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <TextInput
                            helperText="Enter destination wallet address"
                            name="address"
                            placeholder="Destination"
                            labelText="Destination wallet"
                            regex={/^0x[a-f0-9]+$/i}
                            bind:value={address}
                          />
                        </Column>
                        <Column>
                          <TextInput
                            helperText="Number of tokens to move"
                            name="amount"
                            placeholder="Amount"
                            labelText="Amount in ₭enshi"
                            regex={/^[1-9][0-9]*(\.[0-9]+)?|0\.[0-9]+$/}
                            bind:value={amount}
                          />
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={2}>
                            Chain info
                          </ExpressiveHeading>
                          <div>
                            Choose the source and the destination chains for
                            this transfer.
                          </div>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <Select
                            labelText="Source"
                            helperText="Source chain to move tokens from"
                            placeholder="Choose source chain"
                            bind:selected={sourceChain}
                          >
                            {#each sourceOptions as { label, value }}
                              <SelectItem {value} text={label} />
                            {/each}
                          </Select>
                        </Column>
                        <Column>
                          <Select
                            labelText="Destination"
                            helperText="Destination chain to move tokens to"
                            placeholder="Choose destination chain"
                            bind:selected={destChain}
                          >
                            {#each destOptions as { label, value }}
                              <SelectItem {value} text={label} />
                            {/each}
                          </Select>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <Checkbox
                            bind:checked={autoclaim}
                            labelText="Claim automatically"
                          />
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <div class="buttons">
                            {#if sourceChain && amount && isFinite(amount) && destChain && address && $wallet?.provider}
                              <Button
                                on:click={requestSwap}
                                disabled={requestInProgress}
                              >
                                {#if requestInProgress}
                                  <SpinLine
                                    size="32"
                                    color="currentColor"
                                    unit="px"
                                    duration="4s"
                                  />
                                  Processing
                                {:else}
                                  Transfer {amount} ₭enshi
                                {/if}
                              </Button>
                              {#if !requestInProgress}
                                <Button
                                  on:click={addToMetamask(
                                    kenshiAddresses[destChain],
                                    chains[destChain]
                                  )}
                                  icon={MetaMask}
                                >
                                  Add {chainIds[chains[destChain]].shortTitle}
                                  ₭enshi
                                </Button>
                              {/if}
                            {:else if !$wallet?.provider}
                              <ConnectButton primary />
                            {:else}
                              Fill the form to continue.
                            {/if}
                          </div>
                        </Column>
                      </Row>
                    </Grid>
                  </TabContent>
                  <TabContent>
                    <Grid noGutter fullWidth>
                      <Row>
                        <Column>
                          <ExpressiveHeading size={3}>
                            <h3>Pending requests</h3>
                          </ExpressiveHeading>
                        </Column>
                      </Row>
                      {#if pendingRequests?.length}
                        <Row>
                          <Column>
                            <DataTable
                              headers={[
                                { key: "fromChain", value: "Source" },
                                { key: "toChain", value: "Destination" },
                                { key: "amount", value: "Amount" },
                                { key: "actions", value: "Actions" },
                              ]}
                              rows={pendingRequests}
                              {pageSize}
                              {page}
                              sortable
                            >
                              <Toolbar>
                                <ToolbarContent>
                                  <ToolbarSearch
                                    persistent
                                    shouldFilterRows
                                    bind:filteredRowIds
                                  />
                                </ToolbarContent>
                              </Toolbar>
                              <svelte:fragment slot="cell" let:row let:cell>
                                {#if cell.key === "actions"}
                                  <Link
                                    href="#"
                                    on:click={claimPastRequest(
                                      cell.value.request,
                                      cell.value.signature
                                    )}
                                  >
                                    Claim
                                  </Link>
                                {:else if cell.key === "fromChain"}
                                  <span class="chain">
                                    <img
                                      src="/images/chains/{chainIds[cell.value]
                                        .icon}.svg"
                                      alt={chainIds[cell.value].title}
                                    />
                                    {chainIds[cell.value].title}
                                  </span>
                                {:else if cell.key === "toChain"}
                                  <span class="chain">
                                    <img
                                      src="/images/chains/{chainIds[cell.value]
                                        .icon}.svg"
                                      alt={chainIds[cell.value].title}
                                    />
                                    {chainIds[cell.value].title}
                                  </span>
                                {:else if cell.key === "amount"}
                                  {formatAmount(cell.value)} KENSHI
                                {/if}
                              </svelte:fragment>
                            </DataTable>
                            <Pagination
                              bind:pageSize
                              bind:page
                              totalItems={filteredRowIds.length}
                              pageSizeInputDisabled
                            />
                          </Column>
                        </Row>
                      {:else}
                        <Row>
                          <Column>No pending requests at the moment.</Column>
                        </Row>
                      {/if}
                      <Row>
                        <Column>
                          <ConnectButton primary />
                        </Column>
                      </Row>
                    </Grid>
                  </TabContent>
                </svelte:fragment>
              </Tabs>
            </Column>
          </Row>
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
    gap: 0;
    align-items: flex-start;
  }
  h3 {
    margin-top: 0;
  }
  .chain img {
    height: 1em;
  }
  .chain {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }
</style>
