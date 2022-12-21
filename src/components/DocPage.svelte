<script>
  import Footer from "src/components/Footer.svelte";
  import Nav from "src/components/docs/Nav.svelte";

  import { SvelteToast } from "@zerodevx/svelte-toast";

  import { Button, Content } from "carbon-components-svelte";
  import { Grid, UnorderedList } from "carbon-components-svelte";
  import { ChevronLeft, ChevronRight } from "carbon-icons-svelte";
  import { Dropdown } from "carbon-components-svelte";
  import { EarthEuropeAfrica } from "carbon-icons-svelte";

  import ExpressiveHeading from "./carbon/ExpressiveHeading.svelte";

  import "../common.css";
  import "../ayu.css";

  export let next = null;
  export let prev = null;

  let headings;
  let body;

  const hashchange = () => {
    [...headings.querySelectorAll(".active")].map((el) =>
      el.classList.remove("active")
    );
    headings
      .querySelector(`[href="${window.location.hash}"]`)
      .classList.add("active");
  };
</script>

<svelte:window on:hashchange={hashchange} />

<Content class="docs-page">
  <div class="docs">
    <Nav />

    <div class="body" bind:this={body}>
      <div class="breadcrumb">
        <slot name="breadcrumb" />
        <div class="language">
          <EarthEuropeAfrica />
          <Dropdown
            hideLabel
            titleText="Language"
            items={[{ id: "english", text: "English" }]}
            selectedId={"english"}
          />
        </div>
      </div>

      <div class="content">
        <Grid>
          <slot />
        </Grid>
      </div>

      <div class="nav-buttons">
        {#if prev}
          <Button href={prev.url} kind="secondary">
            <ChevronLeft class="prev-btn-icon" />
            {prev.title}
          </Button>
        {/if}
        <div class="spacer" />
        {#if next}
          <Button href={next.url} icon={ChevronRight}>
            {next.title}
          </Button>
        {/if}
      </div>
    </div>

    <div class="headings" bind:this={headings}>
      <ExpressiveHeading size={7}>
        <h5>On this page</h5>
      </ExpressiveHeading>
      <UnorderedList>
        <slot name="headings" />
      </UnorderedList>
    </div>
  </div>
</Content>

<SvelteToast />
<Footer />

<style>
  .breadcrumb {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .breadcrumb > :global(nav) {
    flex: 1;
  }
  .language {
    display: flex;
    gap: 1em;
    align-items: center;
  }
  .body {
    border-left: 1px solid var(--cds-ui-03);
    border-right: 1px solid var(--cds-ui-03);
  }
  .breadcrumb {
    border-bottom: 1px solid var(--cds-ui-03);
    padding: 1em 2em;
    padding-left: 3em;
    padding-top: 1.5em;
  }
  .breadcrumb :global(nav),
  .breadcrumb :global(.bx--breadcrumb-item),
  .breadcrumb :global(.bx--link) {
    max-width: 100%;
  }
  .breadcrumb :global(.bx--breadcrumb) {
    display: flex;
    flex-wrap: wrap;
  }
  .breadcrumb :global(.bx--link) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
  @media (max-width: 640px) {
    .breadcrumb {
      padding: 0;
      padding-bottom: 0.5em;
      padding-left: 0.5em;
      flex-direction: column;
      align-items: flex-start;
      gap: 1em;
    }
    .language {
      align-self: flex-end;
    }
  }
  :global(.docs-page) {
    margin-left: 0 !important;
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-bottom: 0 !important;
  }
  .body :global(pre) {
    margin: 0;
  }
  .body :global(.alert .message .tabs) {
    margin-top: 1em;
  }
  .docs .body :global(.alert) {
    display: flex;
    gap: 1em;
    width: 100%;
    box-sizing: border-box;
  }
  .docs .body :global(.alert .icon svg) {
    width: 1em;
    fill: currentColor;
  }
  .docs .body :global(.message) {
    flex: 1;
  }
  .nav-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    line-height: initial;
    padding: 2em;
  }
  .nav-buttons .spacer {
    flex: 1;
  }
  .body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    line-height: 1.5;
  }
  .content {
    padding-top: 2em;
    flex: 1;
  }
  .content > :global(.bx--grid > .bx--row) {
    margin-bottom: 1em;
  }
  .content :global(h2),
  .content :global(h3),
  .content :global(h4),
  .content :global(h5) {
    margin-top: 1em !important;
  }
  .content :global(.toc h5) {
    margin-top: 1em !important;
    margin-bottom: 1em !important;
  }
  .docs {
    display: grid;
    grid-template-columns: 16rem 1fr 16rem;
    min-height: calc(100vh - 412px);
  }
  .docs :global(h1) {
    margin-top: 0;
  }
  .docs .body :global(h1),
  .docs .body :global(h2),
  .docs .body :global(h3),
  .docs .body :global(h4),
  .docs .body :global(h5) {
    margin: 0;
  }
  .docs .body :global(b) {
    font-weight: 600;
  }
  .docs .body > :global(.card) {
    display: flex;
    gap: 1.25em;
    flex-direction: column;
  }
  .docs .body :global(li:not(last-of-type)) {
    margin-bottom: 0.5em;
  }
  .docs .body > :global(.card > div) {
    overflow: auto;
  }
  .docs :global(.nav-buttons a) {
    text-decoration: none;
  }
  .docs :global(h1 a) {
    text-decoration: none;
  }
  :global(.prev-btn-icon) {
    margin-right: 1em;
  }
  @keyframes chevron {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .headings > :global(ul) {
    padding-left: 1em;
  }
  .headings {
    padding-left: 1em;
  }
  .headings h5 {
    margin-bottom: 1em;
    margin-top: 1em;
  }
  @media only screen and (min-width: 640px) {
    .headings {
      position: sticky;
      top: 4em;
      align-self: flex-start;
    }
  }
  @media only screen and (max-width: 640px) {
    :global(.card.padding) {
      padding: 1.25em;
    }
    .docs {
      display: block;
      padding: 1em;
    }
    .body {
      border: none;
    }
    .docs :global(.docs-side-nav),
    .headings {
      display: none;
    }
  }
  .docs :global(.toc ol) {
    margin-left: 1em;
  }
</style>
