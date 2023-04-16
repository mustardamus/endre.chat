<script>
  import { createEventDispatcher } from "svelte";
  import { onMount, tick } from "svelte";
  import ChatMessage from "$lib/components/Chat/ChatMessage.svelte";

  export let room;
  export let messages;
  export let currentUser;

  const dispatch = createEventDispatcher();

  let message = "";
  let messageInput;
  let messagesDiv;

  onMount(() => {
    messageInput.focus();
  });

  export const scrollDown = async () => {
    await tick();
    messagesDiv.scrollTo({ top: 999999999, behavior: "smooth" });
  };

  export const handleResend = (event) => {
    console.log(event.detail);

    messagesById = messagesById.set(
      id,
      Object.assign(messagesById.get(id), {
        error: false,
        errorMessage: "",
        pending: true,
      })
    );

    send(event.detail.id, event.detail.contentOriginal, room.id);
  };

  async function onSubmit() {
    if (message.length !== 0) {
      dispatch("message", message);

      message = "";
      messageInput.focus();
    }
  }
</script>

<div class="h-full flex flex-col overflow-hidden">
  <div>
    <h1 class="text-4xl pt-10">{room?.name}</h1>
    <h2 class="text-2xl pb-10">{room?.filter.name}</h2>
  </div>

  <div class="flex-grow overflow-scroll" bind:this={messagesDiv}>
    {#each messages as message}
      <ChatMessage
        {message}
        isByCurrentUser={message.user.name === currentUser?.name}
        on:resend={handleResend}
      />
    {/each}
  </div>

  <form
    class="flex border-t-3px border-t-gray-600"
    on:submit|preventDefault={onSubmit}
  >
    <input
      class="flex-grow p-4 text-lg focus-visible:outline-none"
      type="text"
      placeholder="Your message here..."
      bind:value={message}
      bind:this={messageInput}
    />

    <button class="h-full block bg-gray-600 px-10 color-white cursor-pointer">
      Send
    </button>
  </form>
</div>
