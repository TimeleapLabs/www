<script>
  import { Button } from "carbon-components-svelte";
  import { TrashCan } from "carbon-icons-svelte";

  export let values = [];
  export let component;

  $: values = [
    ...values.filter(
      (v) => Object.values(v).every(Boolean) && Object.values(v).length
    ),
    {},
  ];

  const remove = (i) => () => (values = values.filter((_, j) => j !== i));
  const iterate = (values) => values.map((_, index) => index);
</script>

<div class="object-array-fields">
  {#each iterate(values) as index}
    <div class="object-array-field">
      <div class="input">
        <svelte:component this={component} {index} bind:value={values[index]}>
          <Button
            on:click={remove(index)}
            icon={TrashCan}
            kind="danger"
            size="field"
            iconDescription="Delete"
          />
        </svelte:component>
      </div>
    </div>
  {/each}
</div>

<style>
  .object-array-fields {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .input {
    flex: 1;
  }
</style>
