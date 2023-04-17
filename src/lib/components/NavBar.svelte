<script>
  import { page } from "$app/stores";
  import ScrambleText from "./ScrambleText.svelte";
  import Avatar from "./Avatar.svelte";
  import Button from "./ui/Button.svelte";
  import { goto } from "$app/navigation";

  export let menuEntries = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/rooms",
      title: "Rooms",
    },
  ];

  export let height = "5.5rem";
  export let brand = "Brand";
  export let currentUser;

  let isMenuActive = false;

  function onToggleMenu() {
    isMenuActive = !isMenuActive;
  }
</script>

<header
  class="
    bg-dark-600 after:bg-dark-600 lg:backdrop-blur-sm

    relative z-20 w-full after:absolute after:top-full after:left-0
    after:z-10 after:block after:h-px after:w-full lg:after:hidden
  "
>
  <div
    class="
      relative mx-auto 
    "
  >
    <nav
      aria-label="main navigation"
      class={`
        flex h-[${height}] items-stretch justify-between font-medium relative
      `}
    >
      <a
        href="/"
        aria-label="logo"
        aria-current="page"
        on:click={() => (isMenuActive = false)}
        class="
          items-center gap-2 py-3 text-lg whitespace-nowrap
          focus:outline-none pl-5
        "
      >
        <ScrambleText originalText={brand} targetText={brand} />
      </a>

      {#if currentUser}
        <div class="absolute top-8px right-6px">
          <Button class="" on:click={() => goto("/rooms/create")}>
            Create Room
          </Button>
        </div>
      {/if}
    </nav>
  </div>
</header>
