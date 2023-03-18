<script>
  import ChatMessage from "$lib/components/Chat/ChatMessage.svelte";

  const message = {
    user: {
      username: "CaptainHook",
      avatarUrl: "https://placehold.co/64x64",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: "2013-10-07T08:23:19.120Z",
  };
</script>

<ChatMessage {message} />
