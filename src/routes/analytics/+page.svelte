<script>
  import { onMount } from "svelte";
  import { chainIcons, chainNames } from "src/lib/chains";
  import DefaultTags from "src/components/seo/DefaultTags.svelte";
  import {
    Content,
    ClickableTile,
    Grid,
    Row,
    Column,
    Tag,
    Button,
    Search,
  } from "carbon-components-svelte";

  import { Dashboard, DashboardReference } from "carbon-icons-svelte";

  import Footer from "src/components/Footer.svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  const https = (url) =>
    url.match(/https?:/) ? url : `https://${url.replace(/^\//, "")}`;

  const trimChain = (chain) => chain.split("-").shift();

  let profiles = [];

  const fetchAll = async () => {
    const query = `{
      getUserSubs(analytics: true) {
        analytics {
          chain
          address
          metadata {
            logo
            summary
            name
            symbol
          }
        }
      }
    }`;

    const response = await fetch("https://api.kenshi.io/subscriptions", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    profiles = result.data?.getUserSubs?.analytics;

    console.log(profiles);
  };

  onMount(async () => {
    await fetchAll();
  });

  let query;

  const filter = (profiles, query) => {
    if (!query) return profiles;
    const queryLower = query.toLowerCase();
    return profiles.filter(
      (profile) =>
        profile.address.toLowerCase().includes(queryLower) ||
        profile.metadata.name.toLowerCase().includes(queryLower) ||
        profile.metadata.symbol.toLowerCase().includes(queryLower) ||
        profile.metadata.summary.toLowerCase().includes(queryLower)
    );
  };
</script>

<DefaultTags
  description="Kenshi Analytics offers a fully-featured dashboard for visualizing
            your smart contract data. Get actionable insights about your token
            and offer transparency to your users."
  title="Kenshi — Analytics"
/>

<Content>
  <Grid padding>
    <Row>
      <Column>
        <div class="flex-column">
          <ExpressiveHeading size={5}>
            <h1>Kenshi Analytics</h1>
          </ExpressiveHeading>

          <p class="body-02">
            Kenshi Analytics offers a fully-featured dashboard for visualizing
            your smart contract data. Get actionable insights about your token
            and offer transparency to your users.
          </p>
        </div>
      </Column>
      <Column>
        <div class="buttons">
          <Button href="/dashboard" icon={Dashboard}>Add Your Contract</Button>
        </div>
      </Column>
    </Row>
    <Row>
      <Column>
        <Search placeholder="Search catalog..." bind:value={query} />
      </Column>
    </Row>
    <Row>
      {#each filter(profiles, query) as profile}
        <Column lg={8}>
          <ClickableTile
            href="/analytics/{trimChain(profile.chain)}/{profile.address}"
          >
            <div class="profile">
              <img
                src={https(profile.metadata.logo)}
                class="logo"
                alt={profile.metadata.name}
              />
              <div class="body">
                <ExpressiveHeading size={5}>
                  <h1>{profile.metadata.name} ({profile.metadata.symbol})</h1>
                </ExpressiveHeading>
                <div class="body-01">
                  {profile.metadata.summary}
                </div>
                <div class="toolbar">
                  <div class="tags">
                    <Tag>
                      <span>
                        <img
                          src="/images/chains/{chainIcons[profile.chain]}.svg"
                          alt={chainNames[profile.chain]}
                        />
                        {chainNames[profile.chain]}
                      </span>
                    </Tag>
                  </div>
                  <div class="flex-spacer" />
                  <Button
                    icon={DashboardReference}
                    size="small"
                    href="/analytics/{trimChain(
                      profile.chain
                    )}/{profile.address}"
                  >
                    View Charts
                  </Button>
                </div>
              </div>
            </div>
          </ClickableTile>
        </Column>
      {/each}
    </Row>
  </Grid>
</Content>

<Footer />

<style>
  .logo {
    width: 128px;
  }
  .profile {
    display: flex;
    gap: 2em;
  }
  .body {
    display: flex;
    gap: 1em;
    flex-direction: column;
  }
  .tags img {
    display: inline-block;
    height: 1em;
  }
  .tags span {
    display: flex;
    gap: 0.5em;
    align-items: center;
  }
  .toolbar {
    display: flex;
    align-items: center;
  }
  .buttons {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
</style>
