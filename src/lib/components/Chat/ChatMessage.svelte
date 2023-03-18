<script>
  import dateformat from "dateformat";

  export let message = {
    user: {
      username: "",
      avatarUrl: "",
    },
    content: "",
    createdAt: "",
  };
</script>

<div class="flex">
  <div class="w-16 text-center">
    <div class="rounded-100% w-14 h-14 bg-gray-400 mx-auto">
      <img
        class="rounded-100% block"
        src={message.user.avatarUrl}
        alt={message.user.username}
      />
    </div>
  </div>

  <div class="w-full">
    <div class="bg-gray-200 px-7 py-5 rounded ml-3 shadow-lg">
      {message.content}
    </div>

    <div class="text-right text-sm p-1">
      <span class="text-gray-700">{message.user.username}</span>
      <span class="text-gray-400">- {dateformat(message.createdAt)}</span>
    </div>
  </div>
</div>
