<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

{#each data.rooms as room}
  <div>{room.name}</div>
{/each}
