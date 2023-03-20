<script>
  let className = "";
  export { className as class };

  export let type = "text";
  export let label = "Field";
  export let name = "name";
  export let value = "";
  export let error = "";

  // note: can't `bind:value` with dynamic `type`, that's why multiple `<input>`

  const inputClass = `
    relative w-full h-10 px-4 pl-12 text-sm placeholder-transparent
    transition-all border rounded outline-none focus-visible:outline-none
    peer border-slate-200 text-slate-500 autofill:bg-white
    invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500
    focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50
    disabled:text-slate-400
    group-[.invalid]:border-pink-500
  `;
</script>

<div class={`group relative my-6 ${className}`} class:invalid={error?.length}>
  {#if type === "text"}
    <input
      {name}
      id={name}
      type="text"
      placeholder={label}
      class={inputClass}
      bind:value
    />
  {:else if type === "email"}
    <input
      {name}
      id={name}
      type="email"
      placeholder={label}
      class={inputClass}
      bind:value
    />
  {:else if type === "password"}
    <input
      {name}
      id={name}
      type="password"
      placeholder={label}
      class={inputClass}
      bind:value
    />
  {/if}

  <label
    for={name}
    class="
        cursor-text text-xs px-2 transition-all -top-2 left-2
        text-slate-400 z-[1] absolute
        before:bg-white before:h-full before:w-full
        before:transition-all before:top-0 before:left-0
        before:z-[-1] before:absolute before:block '\00a0*']
        peer-placeholder-shown:text-sm
        peer-placeholder-shown:top-2.5
        peer-placeholder-shown:bg-transparent
        peer-placeholder-shown:left-10
        peer-required:after:text-pink-500
        peer-focus:left-2
        peer-focus:cursor-default
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-emerald-500
        peer-focus:bg-white
        peer-disabled:cursor-not-allowed
        peer-disabled:text-slate-400
        peer-disabled:before:bg-transparent
        peer-invalid:text-pink-500
        group-[.invalid]:text-pink-500
        group-[.invalid]:peer-focus:text-pink-500
        group-[.invalid]:bg-white
      "
  >
    {label}
  </label>

  <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 top-2.5 left-4 stroke-slate-400 w-5 absolute peer-disabled:cursor-not-allowed"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5"
    aria-labelledby="title-3 description-3"
    role="graphics-symbol"
  >
    <title id="title-3">Check mark icon</title>
    <desc id="description-3">icon description here</desc>
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg> -->

  <!-- <small
    class="
        flex text-xs w-full py-1 px-4 transition text-slate-400 absolute
        justify-between peer-invalid:text-pink-500
      "
  >
    <span>Text field with helper text</span>
    <span class="text-slate-500">1/10</span>
  </small> -->
</div>
