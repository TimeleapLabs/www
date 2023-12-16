<script>
  import Discord from "../icons/Discord.svelte";
  import Telegram from "../icons/Telegram.svelte";
  import Twitter from "../icons/Twitter.svelte";
  import Github from "../icons/Github.svelte";
  import Reddit from "../icons/Reddit.svelte";
  import LinkedIn from "../icons/LinkedIn.svelte";
  import Heart from "../icons/Heart.svelte";

  import { Link, Tile, Button } from "carbon-components-svelte";
  import { Grid, Column, Row } from "carbon-components-svelte";
  import { UnorderedList, ListItem } from "carbon-components-svelte";

  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
</script>

<Tile>
  <Grid noGutterRight padding>
    <Row>
      <Column sm={4} lg={2}>
        <div class="logo" />
      </Column>
      <Column sm={0} lg={4} />
      <Column>
        <Grid condensed noGutter narrow>
          <Row>
            <Column>
              <Button
                kind="ghost"
                href="https://t.me/KenshiTech"
                target="_blank"
                icon={Telegram}
              >
                Telegram
              </Button>
            </Column>
            <Column>
              <Button
                kind="ghost"
                href="https://discord.gg/KenshiTech"
                target="_blank"
                icon={Discord}
              >
                Discord
              </Button>
            </Column>
            <Column>
              <Button
                kind="ghost"
                href="https://twitter.com/KenshiTech"
                target="_blank"
                icon={Twitter}
              >
                Twitter
              </Button>
            </Column>
            <Column>
              <Button
                kind="ghost"
                href="https://www.reddit.com/r/KenshiTech/"
                target="_blank"
                icon={Reddit}
              >
                Reddit
              </Button>
            </Column>
            <Column>
              <Button
                kind="ghost"
                href="https://github.com/KenshiTech"
                target="_blank"
                icon={Github}
              >
                Github
              </Button>
            </Column>
            <Column>
              <Button
                kind="ghost"
                href="https://www.linkedin.com/company/kenshiio/"
                target="_blank"
                icon={LinkedIn}
              >
                LinkedIn
              </Button>
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>
    <Row>
      <Column>
        <ExpressiveHeading size={3}>
          <h3>Developers</h3>
        </ExpressiveHeading>
        <UnorderedList>
          <ListItem>
            <Link target="_blank" href="https://forum.kenshi.io">Forum</Link>
          </ListItem>
          <ListItem><Link href="/docs">Documentation</Link></ListItem>
          <ListItem><Link href="/dashboard">Dashboard</Link></ListItem>
          <ListItem><Link href="/status">Service Status</Link></ListItem>
          <ListItem>
            <Link href="/solidquery/playground">SolidQuery: Playground</Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/deep-index/graphql">
              Deep Index: GraphQL
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/deep-index/mql">Deep Index: MQL</Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/deep-index/webhook">
              Deep Index: Reverse-API
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/oracle-network/custom">
              Oracle Network: Custom Oracles
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/iot/install#arduino-boards">
              IoT SDK: Arduino IDE
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/iot/install#esp32-boards">
              IoT SDK: ESP32
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/iot/install#zephyr-rtos">
              IoT SDK: Zephyr RTOS
            </Link>
          </ListItem>
        </UnorderedList>
      </Column>
      <Column>
        <ExpressiveHeading>
          <h3>Products</h3>
        </ExpressiveHeading>
        <UnorderedList>
          <ListItem>
            <Link href="/docs/services/oracle-network/custom">
              Oracle Network
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/deep-index">Deep Index</Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/iot">Blockchain IoT SDK</Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/services/iot">SolidQuery</Link>
          </ListItem>
        </UnorderedList>
      </Column>
      <Column>
        <ExpressiveHeading>
          <h3>Token</h3>
        </ExpressiveHeading>
        <UnorderedList>
          <ListItem>
            <Link
              href="https://app.uniswap.org/swap?outputCurrency=0xf1264873436A0771E440E2b28072FAfcC5EEBd01"
              target="_blank"
            >
              Buy Kenshi
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/nft/katana">Buy Katana NFT</Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://dexscreener.com/arbitrum/0x68c685fd52a56f04665b491d491355a624540e85"
              target="_blank"
            >
              View charts
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.coingecko.com/en/coins/kenshi"
              target="_blank"
            >
              Track on CoinGecko
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://coinmarketcap.com/currencies/kenshi-v3/"
              target="_blank"
            >
              Follow on CoinMarketCap
            </Link>
          </ListItem>
          <ListItem><Link href="/tools">Tools</Link></ListItem>
          <ListItem><Link href="/stake">Stake</Link></ListItem>
        </UnorderedList>
      </Column>
      <Column>
        <ExpressiveHeading>
          <h3>Contact</h3>
        </ExpressiveHeading>
        <UnorderedList>
          <ListItem>
            <Link href="mailto:experts@kenshi.io">Talk to an expert</Link>
          </ListItem>
          <ListItem>
            <Link href="mailto:inquiries@kenshi.io">Business inquiries</Link>
          </ListItem>
          <ListItem>
            <Link href="mailto:security@kenshi.io">Security</Link>
          </ListItem>
          <ListItem>
            <Link href="mailto:support@kenshi.io">Support</Link>
          </ListItem>
          <ListItem>
            <Link href="mailto:press@kenshi.io">Press inquiries</Link>
          </ListItem>
        </UnorderedList>
      </Column>
      <Column>
        <ExpressiveHeading>
          <h3>Company</h3>
        </ExpressiveHeading>
        <UnorderedList>
          <ListItem><Link href="/docs/kenshi">About</Link></ListItem>
          <ListItem><Link href="/docs/team">Team</Link></ListItem>
          <ListItem><Link href="/blog">Blog</Link></ListItem>
          <ListItem>
            <Link
              href="https://www.linkedin.com/company/kenshiio/"
              target="_blank"
            >
              LinkedIn
            </Link>
          </ListItem>
          <ListItem><Link href="/docs/media">Press Kit</Link></ListItem>
          <ListItem>
            <Link href="/docs/terms-and-conditions">Terms and Conditions</Link>
          </ListItem>
        </UnorderedList>
      </Column>
    </Row>
    <Row class="bottom">
      <Column lg={3}>
        <Grid fullWidth narrow noGutter>
          <Row>
            <div class="swiss-made">
              Made with <Heart /> in Switzerland
            </div>
          </Row>
          <Row>
            <div class="copyright">
              Copyright © 2021-{new Date().getFullYear()} - Kenshi
            </div>
          </Row>
        </Grid>
      </Column>
      <Column sm={0} lg={11} />
      <Column lg={2}>
        <a
          href="https://members.cryptovalley.swiss/companies/2280577"
          target="_blank"
          rel="noreferrer"
        >
          <img
            class="cva"
            src="/images/cva_logo_member.svg"
            alt="Swiss Crypto Valley member"
          />
        </a>
      </Column>
    </Row>
  </Grid>
</Tile>

<style>
  .cva {
    width: 200px;
    max-width: 100%;
  }
  .swiss-made :global(svg) {
    height: 1em;
    width: 1em;
    fill: var(--primary-color);
  }
  .swiss-made {
    display: flex;
    align-items: center;
    gap: 0.5em;
    flex-wrap: wrap;
  }

  .logo {
    background: url("/images/logo.typography.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-position: center left;
    box-sizing: border-box;
    max-width: 520px;
    height: 100%;
  }
  @media only screen and (max-width: 640px) {
    .logo {
      background-position: center;
    }
  }

  a {
    color: #000;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
  }

  h3 {
    font-size: 1.4em;
  }
</style>
