<script>
  import { fly } from "svelte/transition";

  export let placeholder = "";
  export let regex = /.*/;
  export let validator = () => true;
  export let name = "";
  export let value = "";
  export let suffix = "";
  export let rows = 4;
  export let disabled;

  let valid;
  $: valid = validator(value) && value.toString().match(regex);
</script>

<div class="wrap">
  <div class="input">
    <textarea
      class:valid
      class:invalid={!valid}
      class:empty={!value}
      type="text"
      {rows}
      {placeholder}
      {disabled}
      bind:value
    />
    {#if value && suffix}
      <span>{suffix}</span>
    {/if}
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
    gap: 1em;
  }
  textarea {
    background: transparent;
    outline: none;
    padding: 0.5em 0.75em;
    font-size: 1em;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  textarea:disabled {
    resize: vertical;
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
</style>
