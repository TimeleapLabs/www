<script>
  export let danger = false;
  export let warning = false;
  export let info = false;
  export let note = false;
  export let success = !danger && !warning && !info && !note;
</script>

<div
  class="alert"
  class:danger
  class:success
  class:warning
  class:info
  class:note
>
  <slot />
</div>

<style>
  .alert {
    padding: 1em;
    border-radius: 4px;
  }
  .success {
    color: var(--secondary-color);
    border: 1px solid #0c6e6b;
    background-color: #4caf6920;
  }
  .danger {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    background-color: #f4433620;
  }
  .warning {
    color: #992e1a;
    border: 1px solid #ca6f28;
    background-color: #f8d59020;
  }
  .info {
    color: #444;
    border: 1px solid #a0a0a0;
    background-color: #f2f2f2;
  }
  .note {
    color: #06283d;
    border: 1px solid #7db4b5;
    background-color: #e0eff1;
  }
</style>
