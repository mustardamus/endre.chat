<script>
  import NavBar from "$lib/components/NavBar.svelte";

  // note: `overflow-hidden` is there multiple times to make the inside of a
  // `flex-grow` scrollable (ie chat messages)

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<div class="h-screen flex flex-col overflow-hidden">
  <NavBar height="2rem" brand="endre.chat" currentUser={data.currentUser} />

  <div class="flex-grow overflow-hidden">
    <slot />
  </div>
</div>
