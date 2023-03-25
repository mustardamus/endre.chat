<script>
  import Input from "$lib/components/ui/Input.svelte";
  import Button from "$lib/components/ui/Button.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<form method="POST">
  {#if data.currentUser}
    <div>Howdy! {data.currentUser.name}</div>
  {:else}
    create user first
  {/if}
</form>
