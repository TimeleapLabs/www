<script>
  import Footer from "src/components/Footer.svelte";
  import Nav from "src/components/docs/Nav.svelte";

  import { SvelteToast } from "@zerodevx/svelte-toast";

  import { Button, Content, Tile } from "carbon-components-svelte";
  import { Grid, Row, Column, UnorderedList } from "carbon-components-svelte";
  import { ChevronLeft, ChevronRight } from "carbon-icons-svelte";
  import { Search, Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";
  import { debounce } from "$lib/utils";

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

  let innerWidth = 1600;
  let searchQuery;
  let searchExpanded = false;
  let searchResults = [];
  let isSearching = false;

  const search = debounce(async (query) => {
    searchResults = [];
    if (!query || query.length < 3) {
      return;
    }
    isSearching = true;
    searchResults = [];
    const req = await fetch(`/api/docs/search?q=${encodeURIComponent(query)}`);
    searchResults = await req.json();
    console.log({ searchResults });
    isSearching = false;
  });

  $: search(searchQuery);

  const getSearchResultText = (result) => {
    const text = result.text.split("\n").join(" ");
    const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    const start =
      index < 150
        ? 0
        : index - 150 + text.slice(0, index).slice(-150).indexOf(" ");
    const end =
      index + 150 > text.length
        ? text.length
        : index + text.slice(index, index + 150).lastIndexOf(" ");
    return [
      start > 0 ? "..." : "",
      text.slice(start, end),
      end < text.length ? "..." : "",
    ]
      .filter(Boolean)
      .join("");
  };
</script>

<svelte:window on:hashchange={hashchange} bind:innerWidth />

<Content class="docs-page">
  <div class="docs">
    <Nav />

    <div class="body" bind:this={body}>
      <div class="breadcrumb">
        <slot name="breadcrumb" />
        <div class="search">
          <Search
            expandable={innerWidth > 640}
            bind:expanded={searchExpanded}
            bind:value={searchQuery}
            size={"lg"}
          />
        </div>
      </div>

      <div class="content">
        <Grid>
          {#if isSearching}
            Searching for "{searchQuery}"...
          {:else if searchQuery && searchResults?.length}
            {#each searchResults as result}
              <Row>
                <Column>
                  <Tile>
                    <div class="search-path">
                      <Breadcrumb noTrailingSlash>
                        {#each result.breadcrumb as { url, title }}
                          <BreadcrumbItem href={url}>{title}</BreadcrumbItem>
                        {/each}
                      </Breadcrumb>
                    </div>
                    <div>
                      {getSearchResultText(result)}
                    </div>
                  </Tile>
                </Column>
              </Row>
            {/each}
          {:else if searchQuery && searchQuery.length < 3}
            Query is too short.
          {:else if searchQuery && !searchResults?.length}
            No results found for "{searchQuery}"!
          {:else}
            <slot />
          {/if}
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
      flex-direction: column-reverse;
    }
    .search {
      width: calc(100% - 0.25em);
    }
  }
  .search-path :global(.bx--breadcrumb) {
    display: inline-flex;
    flex-wrap: wrap;
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
  .docs :global(.bx--tab-content .bx--inline-notification) {
    max-width: 48rem;
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
