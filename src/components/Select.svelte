<script>
  import { slide } from "svelte/transition";
  import ChevronDown from "src/icons/ChevronDown.svelte";

  export let placeholder = "";
  export let options = [];
  export let value = "";

  let active;
  let label;

  const toggle = () => (active = !active);

  const setValue = (newVal) => () => {
    value = newVal;
    active = false;
  };

  $: if (value) {
    for (const option of options) {
      if (option.value === value) {
        label = option.label;
        break;
      }
    }
  }
</script>

<div class="select" class:active class:valid={value} class:empty={!value}>
  <div class="placeholder" on:click={toggle}>
    <div class="content">
      {#if value}
        {label}
      {:else}
        {placeholder}
      {/if}
    </div>
    <div class="chevron">
      <ChevronDown />
    </div>
  </div>
  {#if active}
    <div class="options" transition:slide>
      {#each options as option}
        <div class="option" on:click={setValue(option.value)}>
          {option.label}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .select {
    background: transparent;
    outline: none;
    font-size: 1em;
    border-radius: 4px;
  }
  .valid {
    border: 1px solid #0c6e6b;
    color: var(--secondary-color);
  }
  .empty {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
  }
  .empty:hover {
    border: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
  .placeholder,
  .option {
    cursor: pointer;
    padding: 0.5em 0.75em;
  }
  .placeholder:hover,
  .option:hover {
    background: rgba(0, 0, 0, 0.04);
  }
  .placeholder :global(svg) {
    height: 1em;
  }
  .placeholder {
    display: flex;
    align-items: center;
  }
  .placeholder .content {
    flex: 1;
  }
  .chevron {
    transition: cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
  }
  .active .chevron {
    transform: rotate(180deg) translateY(2px);
  }
</style>
