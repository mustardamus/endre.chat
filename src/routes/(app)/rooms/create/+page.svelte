<script>
  import { goto } from "$app/navigation";
  import Input from "$lib/components/ui/Input.svelte";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let roomName = "";
  let roomErrors = {};
  let avatarSvg = data.user?.avatarSvg || "";
  let userName = data.user?.name || "";
  let userErrors = {};

  async function onSubmit() {
    const response = await fetch("/api/rooms", {
      method: "POST",
      body: JSON.stringify({ roomName, userName }),
    });
    const data = await response.json();

    if (response.ok) {
      goto(`/rooms/${data.name}`);
    } else {
      console.log("handle errors", data);
    }
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <Input
    label="Room Name"
    name="roomName"
    bind:value={roomName}
    error={roomErrors?.name?.message}
  />

  {#if data.currentUser && data.currentUser.name}
    Create as {data.currentUser.name}
  {:else}
    <UserInfo bind:name={userName} bind:avatarSvg bind:errors={userErrors} />
  {/if}

  <Button>Create</Button>
</form>
