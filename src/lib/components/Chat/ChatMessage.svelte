<script>
  import { createEventDispatcher } from "svelte";
  import dateformat from "dateformat";
  import Avatar from "../Avatar.svelte";
  import ScrambleText from "$lib/components/ScrambleText.svelte";

  const dispatch = createEventDispatcher();

  export let message = {
    user: {
      name: "",
      avatarSeed: 0,
    },
    contentFiltered: "",
    contentOriginal: "",
    createdAt: "",
    isOptimistic: false,
    pending: false,
    error: false,
  };
  export let isByCurrentUser = false;
  export let animationDone = false;

  export const animationDoneHandler = () => {
    animationDone = true;
  };
</script>

<div class="chat-message flex my-5" class:is-by-current-user={isByCurrentUser}>
  <div class="avatar w-[64px]">
    <Avatar seed={message.user.avatarSeed} color={message.user.avatarColor} />
  </div>

  <div class="flex-grow">
    <div
      class="bg-gray-200 px-7 py-5 rounded mx-7 shadow-lg"
      class:bg-red-200={message.error}
    >
      {#if message.error}
        <p class="font-light">
          Message could not be send! Reason: {message.errorMessage}
        </p>
        <button class="bg-red-200 px-10 color-black cursor-pointer">
          Resend
        </button>
      {/if}
      {#if message.isOptimistic && !animationDone}
        <ScrambleText
          targetText={message.contentFiltered}
          originalText={message.contentOriginal}
          on:done={animationDoneHandler}
        />
      {:else}
        {message.contentFiltered || message.contentOriginal}
      {/if}
    </div>

    <div class="flex items-center metadata text-sm px-9 pt-2">
      <span class="text-gray-700">{message.user.name}</span>
      <span class="text-gray-400 mr-1 ml-1">-</span>
      <span class="text-gray-400">{dateformat(message.createdAt)}</span>
      {#if message.pending}
        <div
          class="i-svg-spinners:180-ring-with-bg text-grey-100 text-sm ml-1"
        />
      {:else}
        <div class="i-tabler-checks text-green-500 text-sm ml-1" />
      {/if}
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
