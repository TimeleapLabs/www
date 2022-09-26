<script>
  import LinkedIn from "src/icons/LinkedIn.svelte";
  import Github from "src/icons/Github.svelte";
  import Medium from "src/icons/Medium.svelte";
  import Twitter from "src/icons/Twitter.svelte";
  import External from "src/icons/External.svelte";

  import Card from "./Card.svelte";
  import Button from "./Button.svelte";

  export let linkedIn = "";
  export let github = "";
  export let medium = "";
  export let twitter = "";

  export let photo;
  export let name;
</script>

<Card flat>
  <div class="wrap">
    <div class="photo">
      <img src={photo} alt={name} />
    </div>
    <div class="body">
      <slot />
    </div>
    <div class="buttons">
      {#if linkedIn}
        <Button solid href={linkedIn}>
          <LinkedIn /> LinkedIn <External />
        </Button>
      {/if}
      {#if github}
        <Button solid href={github}>
          <Github /> Github <External />
        </Button>
      {/if}
      {#if medium}
        <Button solid href={medium}>
          <Medium /> Medium <External />
        </Button>
      {/if}
      {#if twitter}
        <Button solid href={twitter}>
          <Twitter /> Twitter <External />
        </Button>
      {/if}
    </div>
  </div>
</Card>

<style>
  .wrap {
    box-sizing: border-box;
    display: flex;
    gap: 1.5em;
    flex-direction: column;
    height: 100%;
  }
  img {
    border-radius: 0.5em;
    height: 96px;
  }
  .buttons {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .body {
    flex: 1;
  }
</style>
