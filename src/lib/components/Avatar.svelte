<script>
  import { invalidateAll } from "$app/navigation";
  import { browser } from "$app/environment";
  import * as blobs2 from "blobs/v2";

  export let canEdit = false;
  export let seed = 1;
  export let color = "red";
  export let size = 128;
  export let strokeWidth = 3;

  let avatarSvg = "";

  async function onAvatarClick() {
    if (!canEdit) {
      return;
    }

    const body = JSON.stringify({ updateAvatarSeed: true });
    const response = await fetch("/api/users", { method: "PUT", body });
    const user = await response.json();
    seed = user.avatarSeed;
    color = user.avatarColor;

    await invalidateAll();
  }

  $: {
    if (browser) {
      avatarSvg = blobs2.svg(
        {
          seed,
          extraPoints: 20,
          randomness: 50,
          size: +size,
        },
        {
          fill: color,
          stroke: "black",
          strokeWidth: +strokeWidth,
        }
      );
    }
  }
</script>

<div on:click={onAvatarClick} on:keyup={onAvatarClick}>
  {@html avatarSvg}
</div>
