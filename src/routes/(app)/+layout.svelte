<script>
  import NavBar from "$lib/components/NavBar.svelte";
</script>

<div class="h-screen relative">
  <div class="fixed top-0 left-0 w-full">
    <NavBar height="2rem" brand="endre.chat" />
  </div>

  <main class="container mx-auto">
    <div class="pt-[4rem]">
      <slot />
    </div>
  </main>
</div>
