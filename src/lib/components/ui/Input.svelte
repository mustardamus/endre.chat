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
    input
  `;
</script>

<div class={`group relative my-6 ${className}`} class:invalid={error?.length}>
  <!-- <label
    for={name}
    class="
      
    "
  >
    {label}
  </label> -->

  {#if type === "text"}
    <input
      {name}
      id={name}
      type="text"
      placeholder={label}
      class={inputClass}
      bind:value
      on:keyup
    />
  {:else if type === "email"}
    <input
      {name}
      id={name}
      type="email"
      placeholder={label}
      class={inputClass}
      bind:value
      on:keyup
    />
  {:else if type === "password"}
    <input
      {name}
      id={name}
      type="password"
      placeholder={label}
      class={inputClass}
      bind:value
      on:keyup
    />
  {/if}

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

  {#if error?.length}
    <small
      class="
        text-xs w-full py-1 px-4 transition text-slate-400 justify-between
        text-pink-500 block
      "
    >
      <span>{error}</span>
    </small>
  {/if}
</div>
