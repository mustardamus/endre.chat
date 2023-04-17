<script>
  import { createEventDispatcher } from "svelte";
  import dateformat from "dateformat";
  import Avatar from "../Avatar.svelte";
  import ScrambleText from "$lib/components/ScrambleText.svelte";

  const dispatch = createEventDispatcher();

  export let message = {
    id: "",
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

  export const handleResendClick = () => {
    dispatch("resend", message);
  };
</script>

<div class="chat-message flex mt-5" class:is-by-current-user={isByCurrentUser}>
  <div class="avatar w-[38px] relative z-2">
    <Avatar
      seed={message.user.avatarSeed}
      color={message.user.avatarColor}
      size="78"
      strokeWidth="2"
      class="z-1 relative"
    />
  </div>

  <div class="w-full flex-grow overflow-y-hidden">
    <div
      class="bg-dark-900 px-7 py-5 rounded mx-6 shadow-lg"
      class:opacity-50={message.error || message.pending}
    >
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
      <span class="text-gray-200">{message.user.name}</span>
      <span class="text-gray-600 mr-1 ml-1">-</span>
      <span class="text-gray-600"
        >{dateformat(message.createdAt, "HH:MM:ss")}</span
      >
      {#if message.error}
        <div class="i-tabler-exclamation-circle text-red-500 text-xl ml-1" />
        <div class="ml-1 color-red-500">{message.errorMessage}</div>
        <button
          class="ml-1 rounded-full bg-gray-100 color-grey-700 pl-1 pr-1 cursor-pointer"
          on:click={handleResendClick}
        >
          Try resend</button
        >
      {:else if message.pending}
        <div
          class="i-svg-spinners:180-ring-with-bg text-grey-100 text-sm ml-1"
        />
      {:else}
        <div class="i-tabler-check text-green-500 text-xl ml-1" />
      {/if}
    </div>
  </div>
</div>

<style>
  .chat-message.is-by-current-user .avatar {
    order: 9999;
  }

  :global(.chat-message.is-by-current-user .avatar svg) {
    position: absolute;
    top: 0;
    left: -32px;
  }

  .chat-message:not(.flex.is-by-current-user) .metadata {
    text-align: right;
  }
</style>
