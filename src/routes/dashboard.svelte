<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Button from "src/components/Button.svelte";
  import Alert from "src/components/Alert.svelte";

  import External from "src/icons/External.svelte";

  import { wallet } from "src/stores/wallet";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { ethers } from "ethers";

  import TaskForm from "src/components/dash/TaskForm.svelte";
  import TaskView from "src/components/dash/TaskView.svelte";

  import GraphQLForm from "src/components/dash/GraphQLForm.svelte";
  import GraphQLView from "src/components/dash/GraphQLView.svelte";

  import WebhookForm from "src/components/dash/WebhookForm.svelte";
  import WebhookView from "src/components/dash/WebhookView.svelte";

  import VrfCreditForm from "src/components/dash/VrfCreditForm.svelte";
  import VrfCreditView from "src/components/dash/VrfCreditView.svelte";

  let showNewTaskForm = false;
  let showNewGraphQLForm = false;
  let showNewWebhookForm = false;
  let showNewVrfCreditForm = false;

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
        id
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
        id
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

  const webhookQuery = (owner) => `{
    getUserSubs(owner: "${owner}", webhooks: true) {
      webhooks {
        id
        syncTaskId
        fromBlock
        step
        chain
        endpoint
        interval
        timeout
        query {
          condition
          value
          comparison
          arg
        }
        expiresAt
      }
    }
  }`;

  const vrfQuery = (owner) => `{
    getUserSubs(owner: "${owner}", vrfCredits: true) {
      vrfCredits {
        id
        credit
        allow
        chain
      }
    }
  }`;

  let userSyncTasks = [];
  let userApiKeys = [];
  let userWebhooks = [];
  let userVrfCredits = [];

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

  const getUserWebhooks = async () => {
    const query = webhookQuery(userAddress);

    const response = await fetch("https://api.kenshi.io/subscriptions", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    userWebhooks = result.data?.getUserSubs?.webhooks || [];
  };

  const getUserVrfCredits = async () => {
    const query = vrfQuery(userAddress);

    const response = await fetch("https://api.kenshi.io/subscriptions", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    userVrfCredits = result.data?.getUserSubs?.vrfCredits || [];
  };

  $: if (userAddress) {
    getUserTasks();
    getUserApiKeys();
    getUserWebhooks();
    getUserVrfCredits();
  }

  onMount(() => {
    const interval = setInterval(() => {
      getUserTasks();
      getUserApiKeys();
      getUserWebhooks();
      getUserVrfCredits();
    }, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<Navbar />

<div class="section">
  <h2>Kenshi Dashboard</h2>
  <div class="deep-index">
    <h3>Deep Index</h3>
    <div class="body">
      <p>
        The Kenshi Deep Index consists of multiple services for retrieving,
        querying and processing blockchain data.
      </p>
      <div class="alert">
        {#if !$wallet?.provider}
          <Alert warning>Connect your wallet to continue.</Alert>
        {:else}
          <Alert>
            This service is in public beta test, if you encounter any issues
            send us an email at support@kenshi.io.
          </Alert>
        {/if}
      </div>
    </div>
    <div class="buttons">
      <Button
        href="https://docs.kenshi.io/services/deep-index/index.html"
        solid
      >
        Deep Index docs <External />
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
    <TaskForm bind:showNewTaskForm {getUserTasks} />
  </div>
{/if}

{#if $wallet?.provider}
  <div class="section">
    <h3>Your Deep Index Sync tasks</h3>
    <div class="tasks" class:empty={userSyncTasks.length === 0}>
      {#each userSyncTasks as task}
        <TaskView {task} {getUserTasks} />
      {:else}
        You don't have any sync tasks.
      {/each}
    </div>
  </div>
  <div class="section">
    <h3>Your GraphQL API keys</h3>
    <div class="api-keys" class:empty={userApiKeys.length === 0}>
      {#each userApiKeys as graphql}
        <GraphQLView {graphql} {getUserApiKeys} />
      {:else}
        You do not have any GraphQL API keys at the moment. Create one using the
        button below.
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
      <GraphQLForm bind:showNewGraphQLForm {getUserApiKeys} />
    </div>
  {/if}
  <div class="section">
    <h3>Reverse API (Webhooks)</h3>
    <div class="webhooks" class:empty={userWebhooks.length === 0}>
      {#each userWebhooks as webhook}
        <WebhookView {webhook} {getUserWebhooks} />
      {:else}
        You don't have any Reverse API endpoints registered at the moment.
        Create one using the button below.
      {/each}
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
    <WebhookForm bind:showNewWebhookForm {getUserWebhooks} />
  </div>
{/if}

<div class="section">
  <div class="vrf">
    <h3>VRF (Randomness)</h3>
    <div class="body">
      <p>
        Use the Kenshi VRF service to get randomness for your dApps or games on
        Fantom, Polygon, BSC and the Avalanche blockchains.
      </p>
      <div class="alert">
        {#if !$wallet?.provider}
          <Alert warning>Connect your wallet to continue.</Alert>
        {:else}
          <Alert>
            This service is in public beta test, if you encounter any issues
            send us an email at support@kenshi.io.
          </Alert>
        {/if}
      </div>
    </div>
    <div class="buttons">
      <Button href="https://docs.kenshi.io/services/vrf/index.html" solid>
        VRF docs <External />
      </Button>
      {#if $wallet?.provider}
        <Button on:click={() => (showNewVrfCreditForm = !showNewVrfCreditForm)}>
          New VRF subscription
        </Button>
      {/if}
    </div>
  </div>
</div>

{#if showNewVrfCreditForm}
  <div class="section">
    <VrfCreditForm bind:showNewVrfCreditForm {getUserVrfCredits} />
  </div>
{/if}

{#if $wallet?.provider}
  <div class="section">
    <h3>Your VRF subscriptions</h3>
    <div class="vrf-subs" class:empty={userVrfCredits.length === 0}>
      {#each userVrfCredits as vrf}
        <VrfCreditView {vrf} {getUserVrfCredits} />
      {:else}
        You don't have any VRF subscriptions.
      {/each}
    </div>
  </div>
{/if}

<Footer />

<style>
  h2 {
    margin-bottom: 1.5em;
  }
  h3 {
    margin-top: 0;
  }
  .section {
    padding: 4em;
    padding-top: 0;
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
  .vrf-subs,
  .tasks {
    margin-top: 2.5em;
  }
  .tasks:not(.empty),
  .api-keys:not(.empty),
  .webhooks:not(.empty),
  .vrf-subs:not(.empty) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
    gap: 1em;
  }
  .api-keys:not(.empty),
  .webhooks:not(.empty) {
    margin-bottom: 4em;
    margin-top: 2.5em;
  }
  .alert {
    max-width: 600px;
    margin-top: 1.5em;
  }
</style>
