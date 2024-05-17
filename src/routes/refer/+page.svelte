<script>
  import Footer from "src/components/Footer.svelte";

  import { wallet } from "src/stores/wallet";
  import { toast } from "@zerodevx/svelte-toast";
  import { SpinLine } from "svelte-loading-spinners";
  import { Content, Tile, Grid, Row, Column } from "carbon-components-svelte";
  import { TileGroup, RadioTile, Button } from "carbon-components-svelte";
  import { TextArea, CodeSnippet } from "carbon-components-svelte";
  import { TextInput, Link } from "carbon-components-svelte";
  import { Information, SendAlt } from "carbon-icons-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";

  import { ContentView, Enterprise, FaceCool } from "carbon-icons-svelte";

  const persons = [
    {
      id: "creator",
      name: "Content creator",
      info: "A content creator writing articles or making videos about Kenshi",
      icon: ContentView,
    },
    {
      id: "business",
      name: "Business partner",
      info: "A business partner working with Kenshi, or using Kenshi products for its clients",
      icon: Enterprise,
    },
    {
      id: "other",
      name: "Regular",
      info: "Don't fit any of the other options? You can still earn by referring clients",
      icon: FaceCool,
    },
  ];

  const endpoint = "https://api.kenshi.io/referrers";
  let refType = "creator";
  let userAddress;
  let email;
  let content;
  let refCode;
  let referralLink;
  let referralLinkToDocs;
  let spin = false;

  $: if (refCode) {
    referralLink = `https://timeleap.swiss/?ref=${refCode}`;
    referralLinkToDocs = `https://timeleap.swiss/docs/?ref=${refCode}`;
  }

  const selectRefType = ({ detail }) => {
    refType = detail;
  };

  const save = async () => {
    spin = true;
    const payload = {
      refType,
      wallet: userAddress,
      email,
      content,
      refCode,
    };
    try {
      const req = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (req.ok) {
        toast.push("Saved! You can now use your referral link!");
      } else {
        const res = await req.text();
        throw new Error(res);
      }
    } catch (error) {
      toast.push(error.message);
    }
    spin = false;
  };

  const setAddress = () => {
    userAddress = $wallet.accounts?.[0]?.address;
  };

  $: if ($wallet) setAddress();
</script>

<Content>
  <Grid noGutter padding narrow>
    <Row>
      <Column lg={4}>
        <div class="stick sidebar">
          <Tile class="blue-tile">
            <div class="form-info">
              <ExpressiveHeading size={4}>
                <h1>Referral program</h1>
              </ExpressiveHeading>
              <p class="body-02">
                Earn up to 20% by promoting and referring clients to Kenshi.
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
              <ExpressiveHeading size={2}>Your details</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Who are you? If you choose one of business partner or content
                creator options be sure to read
                <Link href="/docs/refer">what qualifies</Link> as promotional.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <div class="persons">
                <TileGroup on:select={selectRefType} legend="Referrer type">
                  {#each persons as person}
                    <RadioTile
                      value={person.id}
                      checked={refType === person.id}
                    >
                      <div class="person">
                        <svelte:component this={person.icon} />
                        <h4 class="name">{person.name}</h4>
                      </div>
                      <div class="info">
                        {person.info}
                      </div>
                    </RadioTile>
                  {/each}
                </TileGroup>
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                bind:value={userAddress}
                labelText="Wallet address"
                placeholder="Your BSC wallet address"
              />
            </Column>
            <Column>
              <TextInput
                bind:value={refCode}
                labelText="Referrer code"
                placeholder="Your referrer code"
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>
                Contact Information
              </ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              Let us know how we can contact you if needed. We respect your
              privacy, so this field is completely optional.
            </Column>
          </Row>
          <Row>
            <Column>
              <TextInput
                bind:value={email}
                labelText="Email"
                placeholder="Your email address"
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <ExpressiveHeading size={2}>Referrals</ExpressiveHeading>
            </Column>
          </Row>
          <Row>
            <Column>
              <p>
                Tell us how you promote our brand or products. Be sure to
                include links so we can find your content. Your referral type
                will fall back to "Regular" if we cannot verify your content
                using the information you provide here.
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <TextArea
                bind:value={content}
                labelText="Your content"
                placeholder="Anything that helps us learn about you and the way you promote our products and services"
              />
            </Column>
          </Row>
          {#if referralLink}
            <Row>
              <Column>
                <ExpressiveHeading size={2}>
                  Your referrer links
                </ExpressiveHeading>
              </Column>
            </Row>
            <Row>
              <Column>
                Share these links with your followers or customers to start
                earning commissions. These links aren't valid unless you submit
                the form!
              </Column>
            </Row>
            <Row>
              <Column>
                <CodeSnippet code={referralLink} />
              </Column>
              <Column>
                <CodeSnippet code={referralLinkToDocs} />
              </Column>
            </Row>
          {/if}
          <Row>
            <Column>
              <div class="buttons">
                <Button on:click={save} disabled={spin} icon={SendAlt}>
                  {#if spin}
                    <SpinLine
                      size="32"
                      color="currentColor"
                      unit="px"
                      duration="4s"
                    />
                    Processing
                  {:else}
                    Submit
                  {/if}
                </Button>
              </div>
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
  .persons :global(.bx--tile-group > div) {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .person {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .person :global(svg) {
    height: 1rem;
  }
  .person .name {
    flex: 1;
  }
  .persons .info {
    margin-top: 0.5em;
    padding-left: 2.25em;
  }
</style>
