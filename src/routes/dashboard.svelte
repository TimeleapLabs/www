<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";

  import Copy from "src/icons/Copy.svelte";
  import External from "src/icons/External.svelte";

  import { wallet } from "src/stores/wallet";
  import { toast } from "@zerodevx/svelte-toast";
  import { fly } from "svelte/transition";
  import { ethers } from "ethers";

  import TaskForm from "src/components/dash/TaskForm.svelte";
  import TaskView from "src/components/dash/TaskView.svelte";

  import GraphQLForm from "src/components/dash/GraphQLForm.svelte";
  import GraphQLView from "src/components/dash/GraphQLView.svelte";

  import WebhookForm from "src/components/dash/WebhookForm.svelte";

  let showNewTaskForm = false;
  let showNewGraphQLForm = false;
  let showNewWebhookForm = false;

  let userAddress;

  const setAddress = async () => {
    const provider = new ethers.providers.Web3Provider($wallet.provider);
    const signer = provider.getSigner($wallet.accounts?.[0]?.address);
    userAddress = await signer.getAddress();
  };

  $: if ($wallet) setAddress();

  const syncTaskQuery = (owner) => `{
    getUserSubs(owner: "${owner}", syncTasks: true) {
      syncTasks {
        signature
        abi
        args {
          name
          value
        }
        fromBlock
        step
        chain
        address
        interval
        timeout
        expiresAt
      }
    }
  }`;

  const apiKeyQuery = (owner) => `{
    getUserSubs(owner: "${owner}", apiKeys: true) {
      apiKeys {
        requests
        sharedKey
        encryptedKey
        createdAt
        allow {
          condition
          value
          comparison
          arg
        }
      }
    }
  }`;

  let userSyncTasks = [];
  let userApiKeys = [];

  const getUserTasks = async () => {
    const query = syncTaskQuery(userAddress);

    const response = await fetch("https://api.kenshi.io/subscriptions", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    userSyncTasks = result.data?.getUserSubs?.syncTasks || [];
  };

  const getUserApiKeys = async () => {
    const query = apiKeyQuery(userAddress);

    const response = await fetch("https://api.kenshi.io/subscriptions", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    userApiKeys = result.data?.getUserSubs?.apiKeys || [];
  };

  $: if (userAddress) {
    getUserTasks();
    getUserApiKeys();
  }
</script>

<Navbar />

<div class="page">
  <div class="section">
    <h2>Kenshi Dashboard</h2>
    <div class="deep-index">
      <h3>Deep Index</h3>
      <div class="body">
        <p>
          The Kenshi Deep Index consists of multiple services for retrieving,
          querying and processing blockchain data.
        </p>
        {#if !$wallet?.provider}
          <p>Connect your wallet to continue.</p>
        {/if}
      </div>
      <div class="buttons">
        <Button
          href="https://docs.kenshi.io/services/deep-index/index.html"
          solid
        >
          Docs <External />
        </Button>
        {#if $wallet?.provider}
          <Button on:click={() => (showNewTaskForm = !showNewTaskForm)}>
            New Sync Task
          </Button>
        {/if}
      </div>
    </div>
  </div>

  {#if $wallet?.provider && showNewTaskForm}
    <div class="section" transition:fly={{ y: -32 }}>
      <TaskForm bind:showNewTaskForm />
    </div>
  {/if}

  {#if $wallet?.provider}
    <div class="section">
      <h3>Your Deep Index Sync tasks</h3>
      <div class="tasks" class:empty={userSyncTasks.length === 0}>
        {#each userSyncTasks as task}
          <TaskView {task} />
        {:else}
          You don't have any sync tasks.
        {/each}
      </div>
    </div>
    <div class="section">
      <h3>Your GraphQL API keys</h3>
      <div class="api-keys" class:empty={userApiKeys.length === 0}>
        {#each userApiKeys as graphql}
          <GraphQLView {graphql} />
        {:else}
          You do not have any GraphQL API keys at the moment. Create one using
          the button below.
        {/each}
      </div>
      <div class="buttons">
        <Button on:click={() => (showNewGraphQLForm = !showNewGraphQLForm)}>
          New GraphQL API Key
        </Button>
      </div>
    </div>
    {#if showNewGraphQLForm}
      <div class="section">
        <GraphQLForm bind:showNewGraphQLForm />
      </div>
    {/if}
    <div class="section">
      <h3>Reverse API (Webhooks)</h3>
      <div>
        You don't have any Reverse API endpoints registered at the moment.
        Create one using the button below.
      </div>
      <div class="buttons">
        <Button on:click={() => (showNewWebhookForm = !showNewWebhookForm)}>
          New Reverse API
        </Button>
      </div>
    </div>
  {/if}

  {#if showNewWebhookForm}
    <div class="section">
      <WebhookForm />
    </div>
  {/if}

  <div class="spacer" />

  <Footer />
</div>

<style>
  h2 {
    margin-bottom: 1.5em;
  }
  h3 {
    margin-top: 0;
  }
  .page {
    display: flex;
    flex-direction: column;
    min-height: calc(100% - 64px);
    box-sizing: border-box;
  }
  .section {
    padding: 4em;
    padding-top: 0;
  }
  .spacer {
    flex: 1;
  }
  @media screen and (max-width: 960px) {
    .section {
      padding: 2em;
    }
  }
  .buttons {
    margin-top: 2em;
    display: flex;
    gap: 1em;
  }
  .tasks {
    margin-top: 2.5em;
  }
  .tasks:not(.empty),
  .api-keys:not(.empty) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
    gap: 1em;
  }
  .api-keys:not(.empty) {
    margin-bottom: 4em;
    margin-top: 2.5em;
  }
</style>
