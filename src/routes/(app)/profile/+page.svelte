<script>
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let avatarSvg = data.user?.avatarSvg || "";
  let name = data.user?.name || "";
  let errors = {};

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

<form on:submit|preventDefault={onSubmit}>
  <UserInfo bind:name bind:avatarSvg bind:errors />

  <div class="flex pt-6">
    <Button>Save</Button>
  </div>
</form>
