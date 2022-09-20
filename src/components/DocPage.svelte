<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";
  import Card from "src/components/Card.svelte";
  import Button from "src/components/Button.svelte";
  import ChevronLeft from "src/icons/ChevronLeft.svelte";
  import ChevronRight from "src/icons/ChevronRight.svelte";
  import Nav from "src/components/docs/Nav.svelte";

  import Image from "./gallery/Image.svelte";
  import Gallery from "./gallery/Gallery.svelte";

  import { SvelteToast } from "@zerodevx/svelte-toast";

  import "../common.css";
  import "../ayu.css";

  export let next = null;
  export let prev = null;

  let sidebar = false;
  const toggleSidebar = () => {
    if (!sidebar || window.innerWidth >= 640) {
      sidebar = !sidebar;
    }
  };

  const closeSidebar = (e) => {
    if (
      !e.target.classList.value.includes("sidebar") &&
      !e.target.classList.value.includes("chevron")
    ) {
      sidebar = false;
    }
  };

  const openSidebar = () => {
    sidebar = true;
  };

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

  const scroll = () => {
    [...headings.querySelectorAll(".active")].map((el) =>
      el.classList.remove("active")
    );
    const closest = [...body.querySelectorAll("h1,h2,h3,h4,h5")]
      .map((el) => {
        const offset = el.getBoundingClientRect();
        const distance = Math.abs(offset.top - window.pageYOffset);
        return { el, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .shift();
    headings
      .querySelector(`[href="#${closest.el.id}"]`)
      ?.classList?.add?.("active");
  };
</script>

<svelte:window on:hashchange={hashchange} on:scroll={scroll} />

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Navbar />

<div class="docs" on:click={closeSidebar}>
  <div class="sidebar" class:active={sidebar} on:click={toggleSidebar}>
    <Nav />
  </div>

  <div class="chevron" on:click={openSidebar}>
    <ChevronRight />
  </div>

  <div class="body" bind:this={body}>
    <Card flat>
      <slot />
    </Card>

    <div class="nav-buttons">
      {#if prev}
        <Button href={prev.url}>
          <ChevronLeft />
          {prev.title}
        </Button>
      {/if}
      <div class="spacer" />
      {#if next}
        <Button href={next.url}>
          {next.title}
          <ChevronRight />
        </Button>
      {/if}
    </div>
  </div>

  <div class="headings" bind:this={headings}>
    <h5>Contents</h5>
    <slot name="headings" />
  </div>
</div>

<SvelteToast />
<Footer />

<style>
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
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.35s left;
  }
  .nav-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin-top: 2em;
  }
  .nav-buttons .spacer {
    flex: 1;
  }
  .body {
    display: flex;
    flex-direction: column;
  }
  .docs {
    padding: 4em;
    padding-top: 2em;
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    gap: 2em;
  }
  .docs :global(h1) {
    margin-top: 0;
  }
  .docs :global(h1 a),
  .docs :global(h2 a),
  .docs :global(h3 a),
  .docs :global(h4 a),
  .docs :global(h5 a) {
    font-family: "Frank";
    text-decoration: none;
  }
  .docs .body :global(h1),
  .docs .body :global(h2),
  .docs .body :global(h3),
  .docs .body :global(h4),
  .docs .body :global(h5) {
    margin: 0;
  }
  .docs .body > :global(.card) {
    display: grid;
    gap: 1.25em;
    grid-template-columns: 1fr;
  }
  .docs .body :global(li:not(last-of-type)) {
    margin-bottom: 0.5em;
  }
  .docs .body > :global(.card > div) {
    overflow: hidden;
  }
  .docs :global(a) {
    color: black;
    text-decoration: underline solid rgba(0, 0, 0, 0.2);
  }
  .docs :global(.nav-buttons a) {
    text-decoration: none;
  }
  .docs .headings :global(a) {
    text-decoration: none;
  }
  .docs :global(a:hover) {
    color: var(--primary-color);
  }
  .docs :global(h1 a) {
    text-decoration: none;
  }
  .headings > :global(div) {
    display: flex;
    gap: 0.5em;
    flex-direction: column;
  }
  .chevron {
    display: none;
  }
  .chevron :global(svg) {
    width: 0.5em;
  }
  .headings :global(a.active) {
    color: var(--primary-color);
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
  @media only screen and (min-width: 640px) {
    .sidebar,
    .headings {
      position: sticky;
      top: 6em;
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
    .sidebar {
      width: 300px;
      position: fixed;
      z-index: 100;
      left: -300px;
      top: 0;
      background: #fff;
      height: 100%;
    }
    .sidebar.active {
      left: 0;
      top: 3em;
      padding: 2em;
      box-sizing: border-box;
      box-shadow: 1em 1em 2em 0.25em rgb(0 0 0 / 10%);
    }
    .sidebar:not(.active) + .chevron {
      display: flex;
      align-items: center;
      left: -1px;
      position: fixed;
      top: 200px;
      background: #fff;
      padding: 1em;
      border-top-right-radius: 4px;
      border-bottom-left-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      animation: chevron linear 0.5s;
    }
    .headings {
      display: none;
    }
  }
</style>
