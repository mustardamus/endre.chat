<script>
  import { onMount } from "svelte";
  /** @type {import('./$types').PageData} */
  export let data;

  export let messages = [];

  export let inputMessage = "";

  function subscribe() {
    const sse = new EventSource("/api/messages/test");
    sse.onmessage = (x) => {
      messages.push(x);
    };
    return () => sse.close();
  }
  onMount(subscribe);

  async function send() {
    const res = await fetch("/api/messages/test", {
      method: "POST",
      body: JSON.stringify({
        message: inputMessage,
      }),
    });
  }
</script>

<h1 class="text-12">Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

{#each messages as message}
  <div>
    {message}
  </div>
{/each}

<input bind:value={inputMessage} />
<button type="button" on:click={send}>Send</button>

<!-- avatar example -->
<!-- <img src={`data:image/png;base64,${data.avatar.b64_json}`} alt="" /> -->
