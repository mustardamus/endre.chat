<script>
  import Input from "$lib/components/ui/Input.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let avatarSvg = "";

  $: avatarSvg = data.user?.avatarSvg;

  async function onAvatarClick() {
    const response = await fetch("/api/avatar", { method: "PUT" });
    const json = await response.json();
    avatarSvg = json.avatarSvg;
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

  <form class="flex-grow pl-7 pt-5">
    <Input
      value={data.user.name}
      type="text"
      label="Username"
      name="username"
    />

    <Button>Save</Button>
  </form>
</div>
