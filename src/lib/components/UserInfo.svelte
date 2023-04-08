<script>
  import * as blobs2 from "blobs/v2";
  import Input from "$lib/components/ui/Input.svelte";

  export let name = "";
  export let avatarSeed = 1;
  export let errors = {};

  let avatarSvg;

  // function getRandomColorHex() {
  //   return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  // }

  $: {
    avatarSvg = blobs2.svg(
      {
        seed: avatarSeed,
        extraPoints: 20,
        randomness: 50,
        size: 128,
      },
      {
        fill: "red",
        stroke: "black",
        strokeWidth: 3,
      }
    );
  }

  async function onAvatarClick() {
    const body = JSON.stringify({ updateAvatarSeed: true });
    const response = await fetch("/api/users", { method: "PUT", body });
    const user = await response.json();
    avatarSeed = user.avatarSeed;
  }
</script>

<div class="flex">
  <div
    on:click={onAvatarClick}
    on:keyup={onAvatarClick}
    class="cursor-pointer w-128px select-none"
  >
    {#if avatarSvg}
      {@html avatarSvg}
    {/if}

    <div class="text-center text-sm text-gray-400">
      Click to regenerate avatar
    </div>
  </div>

  <div class="flex-grow pl-7 pt-5">
    <Input
      type="text"
      label="Username"
      name="userName"
      bind:value={name}
      error={errors?.userName?.join(", ")}
    />
  </div>
</div>
