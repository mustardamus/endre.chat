<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Button on:click={() => goto("/rooms/create")}>Create Room</Button>

{#each data.rooms as room}
  <div>
    <a href={`/rooms/${room.name}`}>{room.name}</a>
  </div>
{/each}
