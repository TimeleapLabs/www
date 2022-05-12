<script>
  export let danger = false;
  export let warning = false;
  export let success = !danger && !warning;
</script>

<div class="alert" class:danger class:success class:warning>
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
</style>
