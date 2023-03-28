<script>
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import userSuite from "$lib/validations/user.js";
  import roomSuite from "$lib/validations/room.js";
  import { goto } from "$app/navigation";
  import Input from "$lib/components/ui/Input.svelte";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import RadioGroup from "$lib/components/ui/RadioGroup.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let avatarSvg = data.user?.avatarSvg || "";
  let filters = [];
  let filterId;

  $: {
    filters = data.filters.map((filter, index) => {
      return { id: `filter-${index}`, label: filter.name, value: filter.id };
    });
  }

  const { form, errors, setData } = createForm({
    extend: [validator({ suite: userSuite }), validator({ suite: roomSuite })],

    initialValues: {
      userName: data.user?.name || "",
      roomName: "",
      filterId,
    },

    onSubmit: async (values) => {
      const body = JSON.stringify(values);
      const response = await fetch("/api/rooms", { method: "POST", body });
      const room = await response.json();

      if (response.ok) {
        goto(`/rooms/${room.name}`);
      }
    },
  });

  // Note: Felte does not handle the radio changes, so use the setData helper
  // here to update it whenever the filterId changes, which is bound on the
  // RadioGroup component
  $: setData("filterId", filterId);
</script>

<form use:form>
  <Input
    label="Room Name"
    name="roomName"
    error={$errors.roomName?.join(",")}
  />

  <RadioGroup
    entries={filters}
    name="filterId"
    bind:value={filterId}
    error={$errors.filterId?.join(",")}
  />

  {#if data.currentUser && data.currentUser.name}
    Create as {data.currentUser.name}
    <!-- for validation to work -->
    <input type="hidden" value={data.currentUser.name} name="userName" />
  {:else}
    <UserInfo bind:avatarSvg errors={$errors} />
  {/if}

  <Button>Create</Button>
</form>
