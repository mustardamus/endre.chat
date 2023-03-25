<script>
  import Input from "$lib/components/ui/Input.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let avatarSvg = data.currentUser?.avatarSvg || "";
  let name = data.currentUser?.name || "";
  let errors = {};

  async function onAvatarClick() {
    const response = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ updateAvatarSvg: true }),
    });
    const user = await response.json();
    avatarSvg = user.avatarSvg;
  }

  async function onSubmit() {
    const response = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      errors = {};
    } else {
      errors = await response.json();
    }
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

  <form class="flex-grow pl-7 pt-5" on:submit|preventDefault={onSubmit}>
    <Input
      type="text"
      label="Username"
      name="name"
      bind:value={name}
      error={errors?.name?.message}
    />

    <div class="flex pt-6">
      <Button>Save</Button>
    </div>
  </form>
</div>
