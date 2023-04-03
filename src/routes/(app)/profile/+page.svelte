<script>
  import { createForm } from "felte";
  import { validator } from "@felte/validator-vest";
  import suite from "$lib/validations/user.js";
  import UserInfo from "$lib/components/UserInfo.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let avatarSvg = data.user?.avatarSvg || "";

  const { form, errors } = createForm({
    extend: validator({ suite }),

    initialValues: {
      userName: data.user?.name || "",
    },

    onSubmit: async (values) => {
      const body = JSON.stringify({
        userName: values.userName,
      });
      const response = await fetch("/api/users", { method: "PUT", body });

      if (response.ok) {
        console.log("gewd");
      }
    },
  });
</script>

<form use:form>
  <UserInfo bind:avatarSvg errors={$errors} />

  <div class="flex pt-6">
    <Button>Save</Button>
  </div>
</form>

{#each data.user.rooms as room}
  <div>
    <a href={`/rooms/${room.name}`}>{room.name}</a>
  </div>
{/each}
