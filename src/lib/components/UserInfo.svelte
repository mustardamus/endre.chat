<script>
  import * as blobs2 from "blobs/v2";
  import random from "lodash/random";
  import Input from "./ui/Input.svelte";

  export let username = "";
  export let blobFill = "";
  export let blobSeed = 0;
  export let blobExtraPoints = 0;
  export let blobRandomness = 0;

  let svgString = "";

  function generateBlobSvg() {
    blobFill =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    blobSeed = random(1, 99999);
    blobExtraPoints = random(1, 20);
    blobRandomness = random(1, 100);
    svgString = blobs2.svg(
      {
        seed: blobSeed,
        extraPoints: blobExtraPoints,
        randomness: blobRandomness,
        size: 128,
      },
      {
        fill: blobFill,
        stroke: "black",
        strokeWidth: 3,
      }
    );
  }

  generateBlobSvg();
</script>

<div class="flex">
  <div
    class="cursor-pointer"
    on:click={generateBlobSvg}
    on:keyup={generateBlobSvg}
  >
    {@html svgString}
  </div>

  <div class="flex-grow">
    <Input
      type="text"
      name="username"
      label="Username"
      bind:value={username}
      on:keyup={generateBlobSvg}
    />
  </div>
</div>
