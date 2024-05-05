<script>
  import { onMount } from "svelte";
  import { Content } from "carbon-components-svelte";
  import Footer from "src/components/Footer.svelte";

  import tomorrowNight from "monaco-themes/themes/Tomorrow-Night.json";
  import tomorrow from "monaco-themes/themes/Tomorrow.json";

  import { theme } from "src/stores/theme";
  import { generate } from "@kenshi.io/solidquery/lib/generator";
  import { parse } from "yaml";
  import { debounce } from "$lib/utils";
  import { Base64 } from "js-base64";
  import { page } from "$app/stores";

  import { Grid, Row, Column } from "carbon-components-svelte";
  import { CodeSnippet } from "carbon-components-svelte";
  import { Button, Tile } from "carbon-components-svelte";
  import ExpressiveHeading from "src/components/carbon/ExpressiveHeading.svelte";
  import { LogoGithub, Book } from "carbon-icons-svelte";

  import Articles from "src/components/home/Articles.svelte";
  import HereToHelp from "src/components/home/HereToHelp.svelte";
  import DeveloperResources from "src/components/home/DeveloperResources.svelte";

  let inputEl;
  let outputEl;
  let inputEditor;
  let outputEditor;
  let Monaco;

  $: if (outputEditor && inputEditor && Monaco && $theme) {
    Monaco.editor.setTheme($theme === "g100" ? "tomorrow-night" : "tomorrow");
  }

  const code = $page.url.searchParams.get("code");

  const defaultValue = code
    ? Base64.decode(code)
    : [
        "Book:",
        "  Id: uint256 id auto",
        "  Name: string",
        "  Author: string indexed",
        "  Published: uint256 indexed get set",
        "",
        "Person:",
        "  Name: string",
        "  Birth: uint256 indexed",
        "",
        "User:",
        "  Address: address id",
        "  Balance: uint256",
      ].join("\n");

  const options = { contract: "MyStorage", solidity: "^0.8.0" };
  const defaultResult = generate(parse(defaultValue), options);

  let base64 = Base64.encodeURI(defaultValue);
  let url;

  $: if (typeof window !== "undefined" && base64) {
    url = `${window.location.origin}/solidquery/playground?code=${base64}`;
  }

  const onContentChange = debounce(() => {
    try {
      const input = inputEditor.getValue();
      const output = generate(parse(input), options);
      outputEditor.setValue(output);
      base64 = Base64.encodeURI(input);
    } catch (_error) {}
  });

  onMount(async () => {
    Monaco = await import("monaco-editor");
    Monaco.editor.defineTheme("tomorrow", tomorrow);
    Monaco.editor.defineTheme("tomorrow-night", tomorrowNight);

    inputEditor = Monaco.editor.create(inputEl, {
      value: defaultValue,
      language: "yaml",
      fontFamily: "IBM Plex Mono",
    });

    inputEditor.onDidChangeModelContent(onContentChange);

    outputEditor = Monaco.editor.create(outputEl, {
      value: defaultResult,
      language: "sol",
      readOnly: true,
      fontFamily: "IBM Plex Mono",
    });

    return () => {
      inputEditor.dispose();
      outputEditor.dispose();
    };
  });
</script>

<Content class="gap distance">
  <Grid padding>
    <Row>
      <Column>
        <ExpressiveHeading size={4}>SolidQuery Playground</ExpressiveHeading>
      </Column>
    </Row>
    <Row>
      <Column sm={4} lg={8}>
        <div class="body-02">
          Here at the SolidQuery Playground, you have the chance to experiment
          and engage with SolidQuery's powerful capabilities. This interactive
          space is meant to provide you with a sandbox environment where you can
          create your own decentralized databases from YAML schemas, explore the
          generated Solidity contracts, and observe the power of blockchain
          technology at your fingertips.
        </div>
        <div class="buttons">
          <Button href="/solidquery" icon={Book}>Learn more</Button>
        </div>
      </Column>
      <Column />
    </Row>
    <Row>
      <Column>
        <div class="editors">
          <div bind:this={inputEl} class="h-screen editor" />
          <div bind:this={outputEl} class="h-screen editor" />
        </div>
      </Column>
    </Row>
    <Row>
      <Column>
        <div class="share">
          <ExpressiveHeading size={3}>
            <h4>Share Your Schema!</h4>
          </ExpressiveHeading>
          <div class="body-2">
            Copy the generated URL and send it to your team members, friends, or
            anyone you'd like to share your work with. They can open the link
            and immediately see your schema in the Playground, without any need
            for downloads or setup.
          </div>
          <CodeSnippet code={url} />
        </div>
      </Column>
      <Column />
    </Row>
  </Grid>

  <Grid>
    <Row>
      <Column sm={4} lg={6}>
        <div class="flex-column padding why">
          <ExpressiveHeading size={5}>
            <h2>Why Use The Playground?</h2>
          </ExpressiveHeading>
          <div class="body-01">
            Our playground offers you the freedom to get hands-on experience
            with SolidQuery without needing to download anything or set up a
            complicated development environment.
          </div>
          <div class="buttons">
            <Button
              href="https://github.com/TimeleapLabs/SolidQuery"
              target="_blank"
              icon={LogoGithub}
            >
              See project on GitHub
            </Button>
          </div>
        </div>
      </Column>
      <Column lg={1} />
      <Column>
        <Grid noGutter fullWidth padding>
          <Row>
            <Column lg={8}>
              <Tile class="full-height">
                <div class="highlight">
                  <ExpressiveHeading size={4}>
                    <h3>Create.</h3>
                  </ExpressiveHeading>
                  <div class="body-03">
                    Generate your own decentralized databases by simply defining
                    a schema in YAML.
                  </div>
                </div>
              </Tile>
            </Column>
            <Column lg={8}>
              <Tile class="full-height">
                <div class="highlight">
                  <ExpressiveHeading size={4}>
                    <h3>Learn.</h3>
                  </ExpressiveHeading>
                  <div class="body-03">
                    Understand how SolidQuery works under the hood and how it
                    generates Solidity contracts from your input schemas.
                  </div>
                </div>
              </Tile>
            </Column>
            <Column lg={8}>
              <Tile class="full-height">
                <div class="highlight">
                  <ExpressiveHeading size={4}>
                    <h3>Experiment.</h3>
                  </ExpressiveHeading>
                  <div class="body-03">
                    Try different YAML schemas and see how the generated
                    contract changes.
                  </div>
                </div>
              </Tile>
            </Column>
            <Column lg={8}>
              <Tile class="full-height">
                <div class="highlight">
                  <ExpressiveHeading size={4}>
                    <h3>Share.</h3>
                  </ExpressiveHeading>
                  <div class="body-03">
                    Show others the power of SolidQuery by sharing your unique
                    schemas and the resulting contracts.
                  </div>
                </div>
              </Tile>
            </Column>
          </Row>
        </Grid>
      </Column>
    </Row>
  </Grid>

  <DeveloperResources />
  <HereToHelp />
  <Articles />
</Content>

<Footer />

<style>
  .editors {
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
  }
  .editor {
    height: 400px;
  }
  .highlight h3 {
    margin-bottom: 1rem;
  }
  .highlight {
    padding-bottom: 0.5rem;
  }
  .why h2 {
    margin-bottom: 2rem;
  }
  .buttons {
    margin-top: 2rem;
  }
  .share h4 {
    margin-bottom: 1em;
    margin-top: 1em;
  }
  .share .body-2 {
    margin-bottom: 2em;
  }
  @media (max-width: 720px) {
    .editors {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1em;
      box-sizing: border-box;
    }
    .editor {
      width: 100%;
    }
  }
</style>
