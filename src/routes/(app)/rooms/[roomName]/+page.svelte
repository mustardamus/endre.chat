<script>
  import { onMount, onDestroy, tick } from "svelte";
  import { invalidateAll } from "$app/navigation";
  import RoomJoin from "$lib/components/Room/Join.svelte";
  import Chat from "$lib/components/Chat/Chat.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let messages = [];
  let scrollDown;

  $: messages = data.room?.messages;

  async function addMessage(message) {
    messages.push(message);
    messages = messages; // triggers reactivity
    await tick();
    scrollDown();
  }

  async function onMessage({ detail }) {
    const body = JSON.stringify({ message: detail, roomId: data.room.id });
    const response = await fetch("/api/messages", { method: "POST", body });

    if (response.ok) {
      const message = await response.json();

      addMessage({
        user: {
          name: data.currentUser.name,
          avatarSeed: data.currentUser.avatarSeed,
        },
        contentFiltered: message.contentFiltered,
        createdAt: message.createdAt,
      });
    }
  }

  function subscribe() {
    // NGINX settings:
    // https://stackoverflow.com/questions/46371939/sse-over-https-not-working
    const sse = new EventSource(`/api/messages?roomId=${data.room.id}`);
    sse.addEventListener("message", async (event) => {
      const message = JSON.parse(event.data);

      if (data.currentUser.id !== message.userId) {
        addMessage({
          user: {
            name: message.userName,
            avatarSeed: data.currentUser.avatarSeed,
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

  async function onRoomJoinSubmit({ detail }) {
    const body = JSON.stringify({ ...detail, roomId: data.room.id });
    const response = await fetch("/api/rooms", { method: "PUT", body });

    if (response.ok) {
      await invalidateAll(); // re-loads the currentUser if just set
      data.isCurrentUserInRoom = true;
    }
  }
</script>

{#if data.isCurrentUserInRoom}
  <Chat
    room={data.room}
    {messages}
    currentUser={data.currentUser}
    bind:scrollDown
    on:message={onMessage}
  />
{:else}
  <RoomJoin
    room={data.room}
    currentUser={data.currentUser}
    on:submit={onRoomJoinSubmit}
  />
{/if}
