<script>
  import Input from "$lib/components/ui/Input.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

{#each data.rooms as room}
  <div>{room.name}</div>
{/each}

{JSON.stringify(form)}

<form method="POST">
  <Input
    label="Room Name"
    name="name"
    value={form?.errors?.name?.value || ""}
    error={form?.errors?.name?.message}
  />

  <Button>Create</Button>
</form>
