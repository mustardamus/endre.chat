<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import ScrambleText from "$lib/components/ScrambleText.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  onMount(() => {
    console.log(data);
  });
</script>

<div class="flex flex-col items-center h-full overflow-auto pb-6">
  <div class="text-7xl font-extrabold my-30">
    <ScrambleText originalText={""} targetText={"endre.chat"} />
  </div>
  <div>
    <Button class="" on:click={() => goto("/rooms/create")}>Create Room</Button>
  </div>

  {#if data.rooms?.length}
    <h1 class="text-4xl font-extrabold mb-4 mt-10">Rooms</h1>
    <div
      class="bg-dark-600 text-white font-bold rounded-lg border border-dark-300 shadow-lg w-100"
    >
      <ul class="max-w-md divide-y divide-dark-300">
        {#each data.rooms as room}
          <li class="p-6 cursor-pointer" on:click={goto(`/rooms/${room.name}`)}>
            <div class="flex items-center space-x-4">
              <div class="">
                {room.name}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
