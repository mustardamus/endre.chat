<script>
  import * as blobs2 from "blobs/v2";

  export let canEdit = false;
  export let seed = 1;
  export let size = 128;

  let avatarSvg = "";

  async function onAvatarClick() {
    if (!canEdit) {
      return;
    }

    const body = JSON.stringify({ updateAvatarSeed: true });
    const response = await fetch("/api/users", { method: "PUT", body });
    const user = await response.json();
    seed = user.avatarSeed;
  }

  // function getRandomColorHex() {
  //   return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  // }

  $: {
    avatarSvg = blobs2.svg(
      {
        seed,
        extraPoints: 20,
        randomness: 50,
        size,
      },
      {
        fill: "red",
        stroke: "black",
        strokeWidth: 3,
      }
    );
  }
</script>

<div on:click={onAvatarClick} on:keyup={onAvatarClick}>
  {@html avatarSvg}
</div>
