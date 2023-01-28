<script>
  import LinkedIn from "src/icons/LinkedIn.svelte";
  import Github from "src/icons/Github.svelte";
  import Medium from "src/icons/Medium.svelte";
  import Twitter from "src/icons/Twitter.svelte";

  import { Tile, Button, Column } from "carbon-components-svelte";

  export let linkedIn = "";
  export let github = "";
  export let medium = "";
  export let twitter = "";

  export let photo;
  export let name;
</script>

<Column sm={4} lg={8}>
  <Tile>
    <div class="wrap">
      <div class="photo">
        <img src={photo} alt={name} />
      </div>
      <div class="body">
        <h4>{name}</h4>
        <slot />
      </div>
      <div class="buttons">
        {#if linkedIn}
          <Button solid href={linkedIn} kind="ghost" icon={LinkedIn}>
            LinkedIn
          </Button>
        {/if}
        {#if github}
          <Button solid href={github} kind="ghost" icon={Github}>Github</Button>
        {/if}
        {#if medium}
          <Button solid href={medium} kind="ghost" icon={Medium}>Medium</Button>
        {/if}
        {#if twitter}
          <Button solid href={twitter} kind="ghost" icon={Twitter}>
            Twitter
          </Button>
        {/if}
      </div>
    </div>
  </Tile>
</Column>

<style>
  .wrap {
    box-sizing: border-box;
    display: flex;
    gap: 1.5em;
    flex-direction: column;
    height: 100%;
  }
  img {
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
  h4 {
    margin-bottom: 1em !important;
    margin-top: 0 !important;
  }
</style>
