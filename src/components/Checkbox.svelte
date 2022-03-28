<script>
  import { fly } from "svelte/transition";
  import Xmark from "src/icons/Xmark.svelte";

  export let name = "";
  export let checked = false;
</script>

<div class="wrap">
  <div class="input" class:checked>
    <div class="checkmark">
      {#if checked}
        <div transition:fly={{ y: 20 }}>
          <Xmark />
        </div>
      {/if}
    </div>
    <input {name} type="checkbox" bind:checked />
    <div class="label">
      <slot />
    </div>
  </div>
</div>

<style>
  .wrap {
    width: 100%;
    display: flex;
  }
  input {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
  }
  .input {
    background: transparent;
    outline: none;
    font-size: 1em;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .label {
    padding: 0.5em 0.75em;
    padding-right: 1em;
  }
  .checked {
    border: 1px solid #0c6e6b;
    color: var(--secondary-color);
  }
  .input :global(svg) {
    fill: currentColor;
    width: 1em;
    height: 1em;
  }
  .checkmark {
    width: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 28px;
    overflow: hidden;
  }
  .checked .checkmark {
    border-color: #0c6e6b;
  }
  .checkmark div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
