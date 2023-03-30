<script>
  import NavBar from "$lib/components/NavBar.svelte";

  let navBarHeightRem = 2;
  let navBarHeightRemStr = `${navBarHeightRem}rem`;
  let containerPassingTopRemStr = `${navBarHeightRem * 2}rem`;
</script>

<div class="h-screen relative">
  <div class="fixed top-0 left-0 w-full">
    <NavBar height={navBarHeightRemStr} />
  </div>

  <main class={`container mx-auto h-[calc(100% - ${navBarHeightRemStr})`}>
    <div class={`pt-[${containerPassingTopRemStr}]`}>
      <slot />
    </div>
  </main>
</div>
