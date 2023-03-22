<script>
  import { dev } from "$app/environment";
</script>

{#if dev}
  <div class="p-5 flex">
    <div class="bg-gray-400 rounded-l-lg">
      <a href="/playground/NavBar">NavBar</a>
      <a href="/playground/Chat">Chat</a>
      <a href="/playground/UserInfo">UserInfo</a>
    </div>

    <div class="w-full shadow-lg p-5 border border-gray-400 rounded-r-lg">
      <slot />
    </div>
  </div>
{/if}

<style>
  a {
    display: block;
    padding: 6px 12px;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
