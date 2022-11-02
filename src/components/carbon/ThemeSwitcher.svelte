<script>
  import { Theme } from "carbon-components-svelte";
  import { Moon } from "carbon-icons-svelte";
</script>

<div class="switcher">
  <Theme
    persist
    theme="white"
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
