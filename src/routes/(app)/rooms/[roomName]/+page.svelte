<script>
  import ChatMessage from "$lib/components/Chat/ChatMessage.svelte";
  import { onMount, onDestroy } from "svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let messages = [];
  let message = "";

  $: messages = data?.room?.messages || [];

  async function onSubmit() {
    const body = JSON.stringify({ message, roomId: data.room.id });
    const response = await fetch("/api/messages", { method: "POST", body });

    if (response.ok) {
      const messageData = await response.json();

      messages.push({
        user: {
          name: data.currentUser.name,
          avatarSvg: data.currentUser.avatarSvg,
        },
        contentFiltered: messageData.contentFiltered,
        createdAt: message.createdAt,
      });

      messages = messages; // triggers reactivity
      message = "";

      // TODO scroll down
    }
  }

  function subscribe() {
    const sse = new EventSource(`/api/messages?roomId=${data.room.id}`);
    sse.addEventListener("message", (event) => {
      const messageData = JSON.parse(event.data);
      console.log("SSE: ", messageData);
      if (data.currentUser.id != messageData.userId) {
        messages.push({
          user: {
            name: messageData.userName,
            avatarSvg: data.currentUser.avatarSvg,
          },
          contentFiltered: messageData.contentFiltered,
          createdAt: message.createdAt,
        });

        // See https://svelte.dev/docs#component-format-script-2-assignments-are-reactive
        messages = messages;
      }
    });
    return () => sse.close();
  }

  let subscription = null;

  onMount(() => {
    subscription = subscribe();
  });

  function unsubscribe() {
    if (subscription) subscription();
  }

  onDestroy(unsubscribe);
</script>

<h1 class="text-4xl pt-10">{data.room.name}</h1>
<h2 class="text-2xl pb-10">{data.room.filter.name}</h2>

<div id="messages" class="py-8">
  {#each messages as message}
    <ChatMessage
      {message}
      isByCurrentUser={message.user.name === data.currentUser.name}
    />
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
