<script>
  let className = "";
  export { className as class };

  // note: has bg and text white when `type="submit"`
</script>

<button
  class={`
    rounded font-medium bg-emerald-500 h-10 text-sm text-white tracking-wide
    px-5 transition gap-2 duration-300 inline-flex items-center justify-center
    whitespace-nowrap hover:bg-emerald-600 focus:bg-emerald-700
    focus-visible:outline-none disabled:cursor-not-allowed
    disabled:bg-emerald-300 disabled:border-emerald-300 disabled:shadow-none
    cursor-pointer
    ${className}
  `}
  on:click
>
  <span>
    <slot />
  </span>
</button>
