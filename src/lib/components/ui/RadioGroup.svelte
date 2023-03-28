<script>
  export let entries = [{ id: "", label: "", value: "" }];
  export let value = entries[0].value;
  export let name = "";
  export let error = "";
</script>

{#each entries as entry}
  <div>
    <div class="relative flex items-center">
      <input
        class="
          w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none
          cursor-pointer peer border-slate-500 checked:border-emerald-500
          checked:bg-emerald-500 checked:hover:border-emerald-600
          checked:hover:bg-emerald-600 focus:outline-none
          checked:focus:border-emerald-700 checked:focus:bg-emerald-700
          focus-visible:outline-none disabled:cursor-not-allowed
          disabled:border-slate-100 disabled:bg-slate-50
        "
        type="radio"
        bind:group={value}
        id={entry.id}
        value={entry.value}
      />

      <label
        class="
          pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed
          peer-disabled:text-slate-400
        "
        for={entry.id}
      >
        {entry.label}
      </label>

      <svg
        class="
          absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0
          pointer-events-none fill-white peer-checked:scale-100
          peer-checked:opacity-100 peer-disabled:cursor-not-allowed
        "
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="graphics-symbol"
      >
        <circle cx="8" cy="8" r="4" />
      </svg>
    </div>
  </div>
{/each}

{#if error && error.length !== 0}
  <small
    class="
      text-xs w-full py-1 px-4 transition text-slate-400 text-pink-500 block
    "
  >
    <span>{error}</span>
  </small>
{/if}

<input type="hidden" {name} bind:value />
