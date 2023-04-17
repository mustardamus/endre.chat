<script>
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import userSuite from "$lib/validations/user.js";
  import { createRoom as suite } from "$lib/validations/room.js";
  import { goto } from "$app/navigation";
  import Input from "$lib/components/ui/Input.svelte";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Avatar from "$lib/components/Avatar.svelte";
  import ImageSelect from "$lib/components/ImageSelect.svelte";
  import ScrambleText from "$lib/components/ScrambleText.svelte";

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

  // Note: Felte does not handle the ImageSelect changes, so use the setData helper
  // here to update it whenever the filterId changes, which is bound on the
  // component
  $: setData("filterId", filterId);
</script>

<form use:form class="container mx-auto p-5 h-full overflow-scroll">
  <Input
    label="Room Name"
    name="roomName"
    error={$errors.roomName?.join(",")}
  />

  <ImageSelect options={filters} bind:selected={filterId} />

  {#if $errors.filterId}
    <div class="text-red">
      {$errors.filterId?.join(", ")}
    </div>
  {/if}

  <div class="my-9">
    {#if data.currentUser?.name}
      <!-- for validation to work -->
      <input type="hidden" value={data.currentUser.name} name="userName" />

      <Button class="w-full text-3xl py-4 relative">
        <div class="absolute -top-32px -left-10px">
          <Avatar
            seed={data.currentUser.avatarSeed}
            color={data.currentUser.avatarColor}
            size="160"
            strokeWidth="1"
            class="z-2"
          />
        </div>

        <div class="relative z-1 shadow">
          <ScrambleText
            originalText={`Create as ${data.currentUser.name}`}
            targetText={`Create as ${data.currentUser.name}`}
          />
        </div>
      </Button>
    {:else}
      <UserInfo
        name={data.currentUser?.name}
        seed={data.currentUser?.avatarSeed}
        color={data.currentUser?.avatarColor}
        errors={$errors}
      />

      <Button class="w-full text-4xl py-5 mt-12">
        <ScrambleText originalText="Create" targetText="Create" />
      </Button>
    {/if}
  </div>
</form>
