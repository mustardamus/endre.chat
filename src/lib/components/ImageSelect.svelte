<script>
  import { onMount } from "svelte";

  export let options;
  export let selected;

  onMount(() => console.log("onMount", selected));

  function onClick() {}
</script>

<div class="my-grid">
  {#each options as option (option.id)}
    <div
      class="flex justify-center items-center bg-black border-[#B22222] cursor-pointer"
      style="background-image: url({option.url});"
      class:border-4={option.value === selected}
      on:click={() => (selected = option.value)}
    >
      <div
        class="shadow"
        class:color-white={option.value != selected}
        class:text-action={option.value === selected}
        class:font-bold={option.value === selected}
      >
        {option.label}
      </div>
    </div>
  {/each}
</div>

<style>
  .my-grid {
    padding: 20px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
  }
  .my-grid > * {
    height: 128px;
    width: 128px;
  }
</style>
