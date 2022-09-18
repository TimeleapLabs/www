<script>
  import { slide } from "svelte/transition";
  import Alert from "./Alert.svelte";

  export let placeholder = "";
  export let regex = /.*/;
  export let validator = () => true;
  export let name = "";
  export let value = "";
  export let suffix = "";
  export let prefix = "";
  export let help = "";
  export let prefixAlwaysOn = false;
  export let gapless = false;
  export let icon;
  export let valid;
  export let disabled;

  const Icon = icon;

  let focus = false;
  const onFocus = () => (focus = true);
  const onBlur = () => (focus = false);

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
    <input
      type="text"
      {placeholder}
      bind:value
      on:focus={onFocus}
      on:blur={onBlur}
      {disabled}
    />
    {#if value && suffix}
      <span>{suffix}</span>
    {/if}
    <slot name="buttons" />
  </div>

  {#if value && !valid}
    <div class="message" transition:slide>
      <Alert danger>
        Not a valid input
        {#if name}
          for <b>{name}</b>
        {/if}
      </Alert>
    </div>
  {/if}

  {#if focus && help}
    <div class="message" transition:slide>
      <Alert>
        {help}
      </Alert>
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
    overflow: hidden;
    text-overflow: ellipsis;
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
  }
  .icon {
    display: flex;
  }
  .icon :global(svg) {
    height: 1em;
    fill: currentColor;
  }
</style>
