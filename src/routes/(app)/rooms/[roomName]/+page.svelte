<script>
  import { nanoid } from "nanoid";
  import { invalidateAll } from "$app/navigation";
  import RoomJoin from "$lib/components/Room/Join.svelte";
  import Chat from "$lib/components/Chat/Chat.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let scrollDown;
  let messages = [];

  $: messages = data.room.messages;

  function addOptimisticMessage(uuid, content) {
    messages.push({
      uuid,
      user: data.currentUser,
      contentOriginal: content,
      contentFiltered: "",
      createdAt: new Date(),
      isOptimistic: true,
      pending: true,
      error: false,
      errorMessage: "",
    });

    messages = messages;

    scrollDown();
  }

  function resolveOptimisticMessage(uuid, contentFiltered) {
    messages = messages.map((message) => {
      if (message.uuid === uuid) {
        message.contentFiltered = contentFiltered;
        message.pending = false;
      }

      return message;
    });
  }

  function errorOptimisticMessage(uuid, errorMessage) {
    messages = messages.map((message) => {
      if (message.uuid === uuid) {
        message.errorMessage = errorMessage;
        message.error = true;
        message.pending = false;
      }

      return message;
    });
  }

  async function onMessage({ detail }) {
    const uuid = nanoid();
    const message = detail;
    const body = JSON.stringify({ uuid, message, roomId: data.room.id });

    addOptimisticMessage(uuid, message);

    const response = await fetch("/api/messages", { method: "POST", body });
    const json = await response.json();

    if (response.ok) {
      resolveOptimisticMessage(uuid, json.contentFiltered);
    } else {
      errorOptimisticMessage(uuid, json.error);
    }
  }

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
    on:message={onMessage}
    bind:scrollDown
  />
{:else}
  <RoomJoin
    room={data.room}
    currentUser={data.currentUser}
    on:submit={onRoomJoinSubmit}
  />
{/if}
