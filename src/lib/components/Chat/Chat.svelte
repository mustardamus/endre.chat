<script>
  import { createEventDispatcher } from "svelte";
  import { onMount, tick } from "svelte";
  import ChatMessage from "$lib/components/Chat/ChatMessage.svelte";
  import Avatar from "$lib/components/Avatar.svelte";

  export let room;
  export let messages;
  export let currentUser;
  export let userCount = 0;

  const dispatch = createEventDispatcher();

  let message = "";
  let messageInput;
  let messagesDiv;
  let roomInput;

  onMount(() => {
    messageInput.focus();
  });

  export const scrollDown = async () => {
    await tick();
    messagesDiv.scrollTo({ top: 999999999, behavior: "smooth" });
  };

  export const handleResend = (event) => {
    dispatch("resend", event.detail);
  };

  async function onSubmit() {
    if (message.length !== 0) {
      dispatch("message", message);

      message = "";
      messageInput.focus();
    } else {
      messageInput.focus();
    }
  }
</script>

<div class="h-full flex flex-col overflow-hidden bg-dark-500">
  <div class="flex px-6px py-1 bg-dark-800 text-sm">
    <div class="pt-2">
      <a
        href="/profile"
        class="
      relative inline-flex items-center justify-center
      text-white rounded-full
      "
      >
        <Avatar
          seed={currentUser.avatarSeed}
          color={currentUser.avatarColor}
          size="28"
          strokeWidth="0"
          class="absolute -top-4px -left-2px"
        />

        {#if currentUser.name?.length ?? 0 !== 0}
          <span class="text-white/80 pl-32px">Hi, </span>
          <span class="border-b-1 border-b-[#B22222]">{currentUser.name}</span>
          <span class="text-white/80">!</span>
        {/if}
      </a>
    </div>

    <div class="flex-grow text-right">
      <span class="text-gray-500">{room?.filter.name}</span>
      <strong>{userCount}</strong>
      <input
        class="room-url cursor-pointer bg-black/20 min-w-1/2 text-center input text-sm py-2 w-auto inline-block ml-3 
        "
        bind:this={roomInput}
        value={`https://endre.chat/rooms/${room?.name}`}
        on:focus={() => {
          roomInput.select();
        }}
        on:click={() => {
          roomInput.select();
        }}
      />
    </div>
  </div>

  <div
    class="custom-scroll flex-grow overflow-x-hidden overflow-y-scroll"
    bind:this={messagesDiv}
  >
    <div class="container mx-auto mb-8">
      {#each messages as message}
        {#if message.type === "joined"}
          <div class="p-7 text-gray-800">{message.userName} joined</div>
        {:else}
          <ChatMessage
            {message}
            isByCurrentUser={message.user.name === currentUser?.name}
            on:resend={handleResend}
          />
        {/if}
      {/each}
    </div>
  </div>

  <form
    class="flex border-5px border-dark-600 shadow-2xl shadow-gray-900"
    on:submit|preventDefault={onSubmit}
  >
    <input
      class="flex-grow p-3 text-l bg-dark-500 focus-visible:outline-none
      focus:bg-dark-800 transition-all"
      type="text"
      placeholder="Your message here..."
      bind:value={message}
      bind:this={messageInput}
    />

    <button
      class="h-full block bg-funky px-10 color-gray-900 font-bold cursor-pointer ml-5px"
    >
      Send
    </button>
  </form>
</div>

<style>
  .custom-scroll::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  .custom-scroll::-webkit-scrollbar-track {
    background: black; /* color of the tracking area */
  }

  .custom-scroll::-webkit-scrollbar-thumb {
    border-radius: 20px; /* roundness of the scroll thumb */
    background-color: orange; /* color of the scroll thumb */
    border: 3px solid black; /* creates padding around scroll thumb */
  }

  .room-url::selection {
    color: black;
    background: #888;
  }
</style>
