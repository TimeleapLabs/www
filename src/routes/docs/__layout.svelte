<script>
  import Navbar from "src/components/Navbar.svelte";
  import Footer from "src/components/Footer.svelte";

  import { SvelteToast } from "@zerodevx/svelte-toast";
  import "../../common.css";
</script>

<Navbar />

<div class="docs">
  <slot />
</div>

<SvelteToast />

<Footer />

<style>
  .docs {
    padding: 4em;
    padding-top: 0;
  }
  .docs :global(div) {
    margin-top: 2em;
  }
  .docs :global(a) {
    color: black;
    text-decoration: underline;
  }
  .docs :global(a:hover) {
    color: var(--primary-color);
  }
  .docs :global(h1 a) {
    text-decoration: none;
  }
</style>
