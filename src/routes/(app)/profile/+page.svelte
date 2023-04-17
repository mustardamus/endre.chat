<script>
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import { invalidateAll } from "$app/navigation";
  import suite from "$lib/validations/user.js";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import ScrambleText from "$lib/components/ScrambleText.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  const { form, errors } = createForm({
    extend: validator({ suite }),

    initialValues: {
      userName: data.currentUser?.name || "",
    },

    onSubmit: async (values) => {
      const body = JSON.stringify({
        userName: values.userName,
      });
      const response = await fetch("/api/users", { method: "PUT", body });

      if (response.ok) {
        await invalidateAll();
        history.back();
      }
    },
  });
</script>

<form use:form class="container mx-auto p-5 h-full overflow-auto">
  <UserInfo
    name={data.currentUser?.name}
    seed={data.currentUser?.avatarSeed}
    color={data.currentUser?.avatarColor}
    errors={$errors}
  />

  <div class="flex pt-6">
    <Button class="w-full text-4xl py-5 mt-12">
      <ScrambleText originalText="Save" targetText="Save" />
    </Button>
  </div>
</form>

{#each data.currentUser.rooms as room}
  <div>
    <a href={`/rooms/${room.name}`}>{room.name}</a>
  </div>
{/each}
