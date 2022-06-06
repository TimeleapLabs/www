<script>
  import { slide } from "svelte/transition";
  import ChevronDown from "src/icons/ChevronDown.svelte";

  export let placeholder = "";
  export let options = [];
  export let value = "";
  export let icon;

  const Icon = icon;

  let active;
  let label;

  const toggle = () => (active = !active);

  const setValue = (newVal) => () => {
    value = newVal;
    active = false;
  };

  $: if (value !== undefined) {
    for (const option of options) {
      if (option.value === value) {
        label = option.label;
        break;
      }
    }
  }

  let filteredOptions = [];
  $: filteredOptions = options;

  $: if (value !== undefined) {
    filteredOptions = options.filter((option) => option.value !== value);
  }
</script>

<div class="wrap">
  <slot name="prefix" />
  <div
    class="select"
    class:active
    class:valid={value !== undefined}
    class:empty={value === undefined}
  >
    <div class="placeholder" on:click={toggle}>
      {#if icon}
        <span class="icon">
          <Icon />
        </span>
      {/if}
      <div class="content">
        {#if value !== undefined}
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
        {#each filteredOptions as option}
          <div class="option" on:click={setValue(option.value)}>
            {option.label}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .wrap {
    display: flex;
    gap: 1em;
    align-items: flex-start;
  }
  .select {
    background: transparent;
    outline: none;
    font-size: 1em;
    border-radius: 4px;
    flex: 1;
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
    padding: calc(0.5em - 1px) 0.75em;
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
    gap: 0.5em;
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
  .options {
    max-height: 200px;
    overflow-y: auto;
  }
  .icon {
    display: flex;
  }
  .icon :global(svg) {
    height: 1em;
    fill: currentColor;
  }
</style>
