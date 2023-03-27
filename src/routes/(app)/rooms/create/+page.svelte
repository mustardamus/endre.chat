<script>
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import userSuite from "$lib/validations/user.js";
  import roomSuite from "$lib/validations/room.js";
  import { goto } from "$app/navigation";
  import Input from "$lib/components/ui/Input.svelte";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let avatarSvg = data.user?.avatarSvg || "";

  const { form, errors } = createForm({
    extend: [validator({ suite: userSuite }), validator({ suite: roomSuite })],

    initialValues: {
      userName: data.user?.name || "",
      roomName: "",
    },

    onSubmit: async (values) => {
      const body = JSON.stringify({
        userName: values.userName,
        roomName: values.roomName,
      });
      const response = await fetch("/api/rooms", { method: "POST", body });
      const room = await response.json();

      if (response.ok) {
        goto(`/rooms/${room.name}`);
      }
    },
  });
</script>

<form use:form>
  <Input
    label="Room Name"
    name="roomName"
    error={$errors.roomName?.join(",")}
  />

  {#if data.currentUser && data.currentUser.name}
    Create as {data.currentUser.name}
    <!-- for validation to work -->
    <input type="hidden" value={data.currentUser.name} />
  {:else}
    <UserInfo bind:avatarSvg errors={$errors} />
  {/if}

  <Button>Create</Button>
</form>
