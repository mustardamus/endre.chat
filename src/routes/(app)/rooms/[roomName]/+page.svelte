<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1 class="text-4xl py-10">{data.room.name}</h1>

{#each data.room.messages as message}
  <div class="flex" id="messages">
    <div class="w-32px">{@html message.user.avatarSvg}</div>
    <div class="flex-grow pl-10">{message.contentFiltered}</div>
  </div>
{/each}

<style>
  :global(#messages svg) {
    transform-origin: left top;
    transform: scale(0.25);
  }
</style>