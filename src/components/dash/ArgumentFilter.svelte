<script>
  import { TextInput } from "carbon-components-svelte";

  export let value;
  export let index;
</script>

<div class="arg-filter">
  <div>
    <TextInput
      bind:value={value.argument}
      labelText="Event argument name [{index}]"
      placeholder="Argument"
    />
  </div>
  <div class="with-button">
    <TextInput
      bind:value={value.value}
      labelText="Event argument value [{index}]"
      placeholder="Value"
    />
    <slot />
  </div>
</div>

<style>
  .arg-filter {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .with-button {
    display: flex;
    align-items: flex-end;
  }
</style>
