<script>
  import dateformat from "dateformat";

  export let message = {
    user: {
      name: "",
      avatarSvg: "",
    },
    contentFiltered: "",
    contentOriginal: "",
    createdAt: "",
  };
</script>

<div class="flex">
  <div class="w-16">
    {@html message.user.avatarSvg}
  </div>

  <div class="flex-grow">
    <div class="bg-gray-200 px-7 py-5 rounded ml-3 shadow-lg">
      {message.contentFiltered || message.contentOriginal}
    </div>

    <div class="text-right text-sm p-1">
      <span class="text-gray-700">{message.user.name}</span>
      <span class="text-gray-400">- {dateformat(message.createdAt)}</span>
    </div>
  </div>
</div>
