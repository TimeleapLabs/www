<script>
  import { Theme } from "carbon-components-svelte";
  import { Moon } from "carbon-icons-svelte";
  import { theme } from "src/stores/theme";

  let localTheme;
  $: $theme = localTheme;
</script>

<div class="switcher">
  <Theme
    persist
    bind:theme={localTheme}
    render="toggle"
    toggle={{
      themes: ["white", "g100"],
      hideLabel: true,
      labelA: "",
      labelB: "",
    }}
  />
  <Moon size={20} />
</div>

<style>
  .switcher {
    display: flex;
    gap: 1em;
    color: #fff;
    align-items: center;
    justify-content: center;
    padding-right: 1em;
  }
</style>
