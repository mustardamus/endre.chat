<script>
  import UserInfo from "$lib/components/UserInfo.svelte";

  let username = "";
  let blobFill = "";
  let blobSeed = 0;
  let blobExtraPoints = 0;
  let blobRandomness = 0;

  $: {
    console.log({
      username,
      blobFill,
      blobSeed,
      blobExtraPoints,
      blobRandomness,
    });
  }
</script>

<UserInfo
  bind:username
  bind:blobFill
  bind:blobSeed
  bind:blobExtraPoints
  bind:blobRandomness
/>
