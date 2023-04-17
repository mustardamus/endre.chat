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
      relative mx-auto max-w-full 
      lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]
    "
  >
    <nav
      aria-label="main navigation"
      class={`
        flex h-[${height}] items-stretch justify-between font-medium
      `}
    >
      <a
        href="/"
        aria-label="logo"
        aria-current="page"
        on:click={() => (isMenuActive = false)}
        class="
          flex items-center gap-2 py-3 text-lg whitespace-nowrap
          focus:outline-none lg:flex-1 pl-5
        "
      >
        <ScrambleText originalText={brand} targetText={brand} />
      </a>

      <!-- <button
        class={`
          relative self-center order-10 visible block w-10 h-10 opacity-100
          lg:hidden
          ${
            isMenuActive
              ? `
                visible opacity-100 [&_span:nth-child(1)]:w-6
                [&_span:nth-child(1)]:translate-y-0
                [&_span:nth-child(1)]:rotate-45
                [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45
              `
              : ""
          }
        `}
        aria-expanded={isMenuActive ? "true" : "false"}
        aria-label="Toggle menu"
        on:click={onToggleMenu}
      >
        <div
          class="
            absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2
            left-1/2
          "
        >
          <span
            aria-hidden="true"
            class="
              absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full
              bg-slate-900 transition-all duration-300
            "
          />
          <span
            aria-hidden="true"
            class="
              absolute block h-0.5 w-6 transform rounded-full bg-slate-900
              transition duration-300
            "
          />
          <span
            aria-hidden="true"
            class="
              absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform
              rounded-full bg-slate-900 transition-all duration-300
            "
          />
        </div>
      </button>

      <ul
        aria-label="Select page"
        class={`
          absolute top-0 left-0 z-[-1] h-[28.5rem] w-full justify-center
          overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8
          pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300
          lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto
          lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0
          lg:pt-0 lg:opacity-100
          ${
            isMenuActive
              ? "visible opacity-100 backdrop-blur-sm"
              : "invisible opacity-0"
          }
        `}
      >
        {#each menuEntries as entry}
          <li role="none" class="flex items-stretch">
            <a
              role="menuitem"
              aria-haspopup="false"
              tabindex="0"
              class={`
                flex items-center gap-2 py-4 transition-colors duration-300
                hover:text-emerald-500 focus:bg-emerald-50 focus:outline-none
                focus-visible:outline-none lg:px-8
                ${entry.href === $page.url.pathname ? "text-emerald-500" : ""}
              `}
              href={entry.href}
              on:click={() => (isMenuActive = false)}
            >
              <span>{entry.title}</span>
            </a>
          </li>
        {/each}
      </ul> -->

      {#if currentUser}
        <div class="flex items-center px-6 ml-auto lg:ml-0 lg:p-0">
          <Button class="ml-5" on:click={() => goto("/rooms/create")}>
            Create Room
          </Button>
        </div>
      {/if}
    </nav>
  </div>
</header>
