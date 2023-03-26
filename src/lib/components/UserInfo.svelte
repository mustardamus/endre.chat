<script>
  import Input from "$lib/components/ui/Input.svelte";

  export let name = "";
  export let avatarSvg = "";
  export let errors = {};

  async function onAvatarClick() {
    const response = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ updateAvatarSvg: true }),
    });
    const user = await response.json();
    avatarSvg = user.avatarSvg;
  }
</script>

<div class="flex">
  <div
    on:click={onAvatarClick}
    on:keyup={onAvatarClick}
    class="cursor-pointer w-128px select-none"
  >
    {@html avatarSvg}

    <div class="text-center text-sm text-gray-400">
      Click to regenerate avatar
    </div>
  </div>

  <div class="flex-grow pl-7 pt-5">
    <Input
      type="text"
      label="Username"
      name="userName"
      bind:value={name}
      error={errors?.name?.message}
    />
  </div>
</div>
