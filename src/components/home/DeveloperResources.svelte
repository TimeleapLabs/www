<script>
  import { Grid, Row, Column } from "carbon-components-svelte";
  import ExpressiveHeading from "../carbon/ExpressiveHeading.svelte";
  import CardButton from "../CardButton.svelte";

  import { Book, LogoGithub, Blog, Forum } from "carbon-icons-svelte";
  import { LogoMedium, LogoNpm, LogoDiscord } from "carbon-icons-svelte";

  import Telegram from "src/icons/Telegram.svelte";
</script>

<Grid>
  <Row>
    <Column lg={4} md={4}>
      <div class="flex-column resources">
        <ExpressiveHeading size={2}>
          <h2>Developer resources</h2>
        </ExpressiveHeading>

        <div class="body-02">
          Find examples, tools and documents for integrating the Kenshi products
          and services into your projects.
        </div>

        <div class="body-01">
          Join the Kenshi community and connect with like-minded individuals and
          businesses passionate about blockchain technology. Share your
          experiences, learn from others, and discover new opportunities for
          growth and innovation in the dynamic blockchain ecosystem. Stay
          up-to-date with the latest news, events, and developments, and become
          an integral part of the Kenshi community today.
        </div>
      </div>
    </Column>
    <Column />
    <Column lg={10}>
      <Grid padding condensed fullWidth>
        <Row>
          <Column lg={5} md={4} sm={4}>
            <CardButton
              href="https://forum.kenshi.io"
              icon={Forum}
              title="Forum"
              description="A community of blockchain developers and enthusiasts. Learn, discuss, and share!"
            />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CardButton
              href="https://github.com/KenshiTech"
              icon={LogoGithub}
              title="GitHub"
              description="Find examples for the Kenshi services and contribute to our open-source projects."
            />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CardButton
              href="https://www.npmjs.com/org/kenshi.io"
              icon={LogoNpm}
              title="NPM"
              description="Check out all the JavaScript and Solidity packages published by Kenshi to NPM."
            />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CardButton
              href="/blog"
              icon={Blog}
              title="Blog"
              description="Read our blog for use cases, examples and technical articles about Kenshi products."
            />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CardButton
              href="https://blog.kenshi.io"
              icon={LogoMedium}
              title="Medium"
              description="Subscribe to our Medium publication to get the latest articles in your inbox."
            />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CardButton
              href="https://t.me/KenshiTech"
              icon={Telegram}
              title="Telegram"
              description="Join our community chat on Telegram to discuss everything Kenshi!"
            />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CardButton
              href="https://discord.gg/KenshiTech"
              icon={LogoDiscord}
              title="Discord"
              description="Join Kenshi Discord server to discuss the tech or get help with the products."
            />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CardButton
              href="/docs"
              icon={Book}
              title="Docs"
              description="Read the docs to learn how to integrate the Kenshi products into your projects."
            />
          </Column>
        </Row>
      </Grid>
    </Column>
  </Row>
</Grid>

<style>
  .resources h2 {
    margin-bottom: 2rem;
  }
</style>
