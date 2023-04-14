<script>
  import { createEventDispatcher } from "svelte";
  import { onMount, onDestroy, tick } from "svelte";
  import ChatMessage from "$lib/components/Chat/ChatMessage.svelte";

  import { nanoid } from "nanoid";
  import { Map } from "immutable";

  export let room;
  export let messagesById = Map({});
  export let currentUser;

  let messageInput;

  onMount(() => {
    messagesById = Map(room.messages);
    messageInput.focus();
  });

  $: messages = messagesById.toList().sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    if (a.createdAt === b.createdAt) {
      return 0;
    }
  });

  export const scrollDown = () => {
    messagesDiv.scrollTo({ top: 999999999, behavior: "smooth" });
  };

  export const handleResend = (event) => {
    console.log(event.detail);
    send(event.detail.id, event.detail.contentOriginal, room.id);
  };

  // const dispatch = createEventDispatcher();
  let message = "";
  let messagesDiv;

  // function onSubmit() {
  //   dispatch("message", message);
  //   message = "";
  // }

  async function send(id, message, roomId) {
    const body = JSON.stringify({
      id,
      message,
      roomId,
    });
    const response = await fetch("/api/messages", { method: "POST", body });

    if (response.ok) {
      const { contentFiltered } = await response.json();
      resolveOptimisticMessage(id, { contentFiltered });
    } else {
      const { error } = await response.json();
      errorOptimisticMessage(id, error);
    }
  }

  async function onSubmit() {
    if (!message.length) return;
    let messageToSend = message;
    message = "";
    messageInput.focus();

    let id = nanoid();
    addOptimisticMessage(id, messageToSend);
    await send(id, messageToSend, room.id);
  }

  async function addOptimisticMessage(id, content) {
    messagesById = messagesById.set(id, {
      id,
      user: {
        name: currentUser.name,
        avatarSeed: currentUser.avatarSeed,
        avatarColor: currentUser.avatarColor,
      },
      contentFiltered: "",
      errorMessage: "",
      contentOriginal: content,
      createdAt: new Date(),
      isOptimistic: true,
      pending: true,
      error: false,
    });
    await tick();
    scrollDown();
  }

  async function addMessage(id, message) {
    // messages.push(message);
    // messages = messages; // triggers reactivity
    messagesById = messagesById.set(id, message);
    await tick();
    scrollDown();
  }

  function errorOptimisticMessage(id, errorMessage) {
    // messages.push(message);
    // messages = messages; // triggers reactivity
    messagesById = messagesById.set(
      id,
      Object.assign(messagesById.get(id), {
        error: true,
        errorMessage,
        pending: false,
      })
    );
  }

  function resolveOptimisticMessage(id, message) {
    // messages.push(message);
    // messages = messages; // triggers reactivity
    messagesById = messagesById.set(
      id,
      Object.assign(messagesById.get(id), {
        contentFiltered: message.contentFiltered,
        pending: false,
      })
    );
  }

  function subscribe() {
    // NGINX settings:
    // https://stackoverflow.com/questions/46371939/sse-over-https-not-working
    const sse = new EventSource(`/api/messages?roomId=${room.id}`);
    sse.addEventListener("message", async (event) => {
      const message = JSON.parse(event.data);

      if (currentUser.id !== message.userId) {
        addMessage(message.id, {
          user: {
            name: message.userName,
            avatarSeed: currentUser.avatarSeed,
            avatarColor: currentUser.avatarColor,
          },
          contentFiltered: message.contentFiltered,
          createdAt: message.createdAt,
        });
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

<div class="h-full flex flex-col overflow-hidden">
  <div>
    <h1 class="text-4xl pt-10">{room?.name}</h1>
    <h2 class="text-2xl pb-10">{room?.filter.name}</h2>
  </div>

  <div class="flex-grow overflow-scroll" bind:this={messagesDiv}>
    {#each messages.toJS() as message}
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
