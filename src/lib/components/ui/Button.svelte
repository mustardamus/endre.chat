<script>
  let className = "";
  export { className as class };

  // note: has bg and text white when `type="submit"`
</script>

<button class={`btn ${className}`} on:click>
  <span>
    <slot />
  </span>
</button>
