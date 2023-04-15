<script>
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import userSuite from "$lib/validations/user.js";
  import { createRoom as suite } from "$lib/validations/room.js";
  import { goto } from "$app/navigation";
  import Input from "$lib/components/ui/Input.svelte";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import RadioGroup from "$lib/components/ui/RadioGroup.svelte";
  import Avatar from "$lib/components/Avatar.svelte";
  import ImageSelect from "$lib/components/ImageSelect.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let filters = [];
  let filterId = 0;

  $: {
    filters = data.filters.map((filter, index) => {
      return {
        id: `filter-${index}`,
        label: filter.name,
        value: filter.id,
        url: `/images/${filter.name.toLowerCase()}.jpg`,
      };
    });
  }

  const { form, errors, setData } = createForm({
    extend: [validator({ suite: userSuite }), validator({ suite })],

    initialValues: {
      userName: data.currentUser?.name || "",
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

  <!-- <RadioGroup
    entries={filters}
    name="filterId"
    bind:value={filterId}
    error={$errors.filterId?.join(",")}
  /> -->

  <ImageSelect options={filters} bind:selected={filterId} />

  {#if data.currentUser?.name}
    <Avatar
      seed={data.currentUser.avatarSeed}
      color={data.currentUser.avatarColor}
    />
    Create as {data.currentUser.name}

    <!-- for validation to work -->
    <input type="hidden" value={data.currentUser.name} name="userName" />
  {:else}
    <UserInfo
      name={data.currentUser?.name}
      seed={data.currentUser?.avatarSeed}
      errors={$errors}
    />
  {/if}

  <Button>Create</Button>
</form>
