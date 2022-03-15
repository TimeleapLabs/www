<script>
  export let danger = false;
  export let success = true;
</script>

<div class="alert" class:danger class:success>
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
    border: 1px solid #0c6e6b;
    background-color: #f4433620;
  }
</style>
