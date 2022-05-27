<script>
  import { fly } from "svelte/transition";

  export let placeholder = "";
  export let regex = /.*/;
  export let validator = () => true;
  export let name = "";
  export let value = "";
  export let suffix = "";
  export let prefix = "";
  export let prefixAlwaysOn = false;
  export let gapless = false;
  export let icon;
  export let valid;

  const Icon = icon;

  $: valid = validator(value) && value?.toString().match(regex);
</script>

<div class="wrap">
  <div
    class="input"
    class:gapless
    class:valid
    class:invalid={!valid}
    class:empty={!value}
  >
    {#if icon}
      <span class="icon">
        <Icon />
      </span>
    {/if}
    {#if (value || prefixAlwaysOn) && prefix}
      <span>{prefix}</span>
    {/if}
    <input type="text" {placeholder} bind:value />
    {#if value && suffix}
      <span>{suffix}</span>
    {/if}
    <slot name="buttons" />
  </div>

  {#if value && !valid}
    <div class="message" transition:fly={{ x: -8 }}>
      Not a valid input
      {#if name}
        for {name}
      {/if}
    </div>
  {/if}
</div>

<style>
  .wrap {
    width: 100%;
  }
  .input {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: calc(0.5em - 1px) 0.75em;
  }
  .input:not(.gapless) {
    gap: 0.5em;
  }
  input {
    background: transparent;
    outline: none;
    font-size: 1em;
    flex: 1;
    box-sizing: border-box;
    border: none;
    color: currentColor;
  }
  .valid {
    border: 1px solid #0c6e6b;
    color: var(--secondary-color);
  }
  .invalid {
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
  }
  .empty {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
  }
  .empty:hover,
  .empty:focus {
    border: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
  .message {
    margin-top: 1em;
    font-style: italic;
  }
  .icon {
    display: flex;
  }
  .icon :global(svg) {
    height: 1em;
  }
</style>
