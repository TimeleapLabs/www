<script>
  export let name = "";
  export let value;
  export let suffix = "";
  export let min;
  export let max;
  export let valid;

  value ||= new Date();

  let strValue = value.toLocaleDateString("en-CA");

  $: if (strValue !== value.toLocaleDateString("en-CA")) {
    value = new Date(strValue);
  }

  $: {
    if (min && min.valueOf() > value.valueOf()) valid = false;
    else if (max && max.valueOf() < value.valueOf()) valid = false;
    else valid = true;
  }
</script>

<div class="wrap">
  <div class="input">
    <input
      {name}
      type="date"
      class:valid
      class:invalid={!valid}
      class:empty={!value}
      bind:value={strValue}
    />
    {#if value && suffix}
      <span>{suffix}</span>
    {/if}
  </div>
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
  input {
    background: transparent;
    outline: none;
    padding: 0.5em 0.75em;
    font-size: 1em;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  .valid {
    border: 1px solid #0c6e6b;
    color: var(--secondary-color);
  }
  .invalid {
    border: 1px solid #0c6e6b;
    color: var(--secondary-color);
  }
  .empty {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
  }
  .empty:hover,
  .empty:focus {
    border: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
</style>
