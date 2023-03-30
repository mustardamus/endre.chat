<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1 class="text-4xl pt-10">{data.room.name}</h1>
<h2 class="text-2xl pb-10">{data.room.filter.name}</h2>

{#each data.room.messages as message}
  <div class="flex" id="messages">
    <div class="w-32px">{@html message.user.avatarSvg}</div>
    <div class="flex-grow pl-10">{message.contentFiltered}</div>
  </div>
{/each}

<div class="fixed left-0 bottom-0">message input</div>

<style>
  :global(#messages svg) {
    transform-origin: left top;
    transform: scale(0.25);
  }
</style>
