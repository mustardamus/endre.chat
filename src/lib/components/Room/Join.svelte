<script>
  import { createEventDispatcher } from "svelte";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import { joinRoom as suite } from "$lib/validations/room.js";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";

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

<h1>Join the room {room.name}</h1>

<form use:form>
  {#if !currentUser.name || currentUser.name.length === 0}
    <UserInfo avatarSvg={currentUser.avatarSvg} errors={$errors} />
  {:else}
    <div>Join as {currentUser.name}</div>
    <input type="hidden" name="userName" value={currentUser.name} />
  {/if}

  <input type="hidden" name="roomId" value={room.id} />

  <div class="flex pt-6">
    <Button>Join</Button>
  </div>
</form>
