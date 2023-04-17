<script>
  import { createEventDispatcher } from "svelte";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import { joinRoom as suite } from "$lib/validations/room.js";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import Avatar from "$lib/components/Avatar.svelte";
  import ScrambleText from "$lib/components/ScrambleText.svelte";

  export let room;
  export let currentUser;

  const dispatch = createEventDispatcher();

  const { form, errors } = createForm({
    extend: validator({ suite }),

    initialValues: {
      userName: currentUser?.name || "",
    },

    onSubmit: async (values) => {
      dispatch("submit", values);
    },
  });
</script>

<form use:form class="container mx-auto pt-16 h-full overflow-auto px-6">
  <div class="text-center mb-12">
    <span class="block text-6xl">{room.name}</span>
    <span class="block text-gray-600 text-3xl">{room.filter.name}</span>
  </div>

  {#if !currentUser.name || currentUser.name.length === 0}
    <UserInfo
      seed={currentUser.avatarSeed}
      color={currentUser.avatarColor}
      errors={$errors}
    />

    <Button class="w-full text-3xl py-4 mt-12">
      <div class="relative z-1 shadow">
        <ScrambleText originalText={`Join`} targetText={`Join`} />
      </div>
    </Button>
  {:else}
    <input type="hidden" name="userName" value={currentUser.name} />

    <Button class="w-full text-3xl py-4 relative">
      <div class="absolute -top-32px -left-10px">
        <Avatar
          seed={currentUser.avatarSeed}
          color={currentUser.avatarColor}
          size="160"
          strokeWidth="1"
          class="z-2"
        />
      </div>

      <div class="relative z-1 shadow">
        <ScrambleText
          originalText={`Join as ${currentUser.name}`}
          targetText={`Join as ${currentUser.name}`}
        />
      </div>
    </Button>
  {/if}

  <input type="hidden" name="roomId" value={room.id} />
</form>
