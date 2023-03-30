<script>
  import ChatMessage from "$lib/components/Chat/ChatMessage.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let messages = [];
  let message = "";

  $: messages = data?.room?.messages || [];

  function onSubmit() {
    messages.push({
      user: {
        name: data.currentUser.name,
        avatarSvg: data.currentUser.avatarSvg,
      },
      contentOriginal: message,
      createdAt: Date.now(),
    });

    messages = messages; // triggers reactivity
    message = "";
  }
</script>

<h1 class="text-4xl pt-10">{data.room.name}</h1>
<h2 class="text-2xl pb-10">{data.room.filter.name}</h2>

<div id="messages">
  {#each messages as message}
    <ChatMessage {message} />
  {/each}
</div>

<form
  class="fixed left-0 bottom-0 w-full flex border-t-5 border-gray-600 h-16"
  on:submit|preventDefault={onSubmit}
>
  <input
    class="w-full p-4 text-lg focus-visible:outline-none"
    type="text"
    placeholder="Your message here..."
    bind:value={message}
  />

  <button class="h-full block bg-gray-600 px-10 color-white cursor-pointer">
    Send
  </button>
</form>

<style>
  :global(#messages svg) {
    transform-origin: left top;
    transform: scale(0.5);
  }
</style>
