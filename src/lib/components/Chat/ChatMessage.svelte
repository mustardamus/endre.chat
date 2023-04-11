<script>
  import dateformat from "dateformat";
  import Avatar from "../Avatar.svelte";
  import ScrambleText from "$lib/components/ScrambleText.svelte";
  import { Circle } from "svelte-loading-spinners";

  export let message = {
    user: {
      name: "",
      avatarSeed: 0,
    },
    contentFiltered: "",
    contentOriginal: "",
    createdAt: "",
    isOptimistic: false,
    isPending: false,
  };
  export let isByCurrentUser = false;
</script>

<div class="chat-message flex my-5" class:is-by-current-user={isByCurrentUser}>
  <div class="avatar w-[64px]">
    <Avatar seed={message.user.avatarSeed} color={message.user.avatarColor} />
  </div>

  <div class="flex-grow">
    <div class="bg-gray-200 px-7 py-5 rounded mx-7 shadow-lg">
      {#if message.isOptimistic}
        <ScrambleText
          targetText={message.contentFiltered}
          originalText={message.contentOriginal}
        />
      {:else}
        {message.contentFiltered || message.contentOriginal}
      {/if}
    </div>

    <div class="metadata text-sm px-9 pt-2">
      <span class="text-gray-700">{message.user.name}</span>
      <span class="text-gray-400">- {dateformat(message.createdAt)}</span>
      {#if message.pending}
        <Circle size="15" color="#FF3E00" unit="px" />{/if}
    </div>
  </div>
</div>

<style>
  :global(.chat-message .avatar svg) {
    transform-origin: left top;
    transform: scale(0.5);
  }

  .chat-message.is-by-current-user .avatar {
    order: 9999;
  }

  .chat-message:not(.flex.is-by-current-user) .metadata {
    text-align: right;
  }
</style>
