<script>
  import Input from "$lib/components/ui/Input.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;

  let avatarSvg = "";
  let name = "";

  $: avatarSvg = data.user?.avatarSvg;
  $: name = form?.name || data.user?.name;

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

  <form method="POST" class="flex-grow pl-7 pt-5">
    <Input
      type="text"
      label="Username"
      name="name"
      value={name}
      error={form?.errors?.name?.message}
    />

    <div class="flex pt-6">
      <Button>Save</Button>

      {#if form?.success}
        <div class="p-10px text-sm">Saved!</div>
      {/if}
    </div>
  </form>
</div>
