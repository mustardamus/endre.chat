<script>
  import { onMount, onDestroy } from "svelte";
  /** @type {import('./$types').PageData} */
  export let data;

  let subscription = null;

  export let messages = [];

  export let inputMessage = "";

  function subscribe() {
    const sse = new EventSource("/api/messages/test");
    sse.addEventListener("message", (x) => {
      messages.push(x);

      // See https://svelte.dev/docs#component-format-script-2-assignments-are-reactive
      messages = messages;
    });
    return () => sse.close();
  }

  onMount(() => {
    subscription = subscribe();
  });

  function unsubscribe() {
    if (subscription) subscription();
  }

  onDestroy(unsubscribe);

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
    {message.data}
  </div>
{/each}

<input bind:value={inputMessage} />
<button type="button" on:click={send}>Send</button>

<!-- avatar example -->
<!-- <img src={`data:image/png;base64,${data.avatar.b64_json}`} alt="" /> -->
