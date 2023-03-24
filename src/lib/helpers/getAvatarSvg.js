import * as blobs2 from "blobs/v2";
import random from "lodash/random";

function getRandomColorHex() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

export default function () {
  return blobs2.svg(
    {
      seed: random(1, 99999),
      extraPoints: random(5, 20),
      randomness: random(1, 100),
      size: 128,
    },
    {
      fill: getRandomColorHex(),
      stroke: "black",
      strokeWidth: 3,
    }
  );
}
