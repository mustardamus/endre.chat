<script>
  import { browser } from "$app/environment";
  export let originalText = "";
  export let targetText = "";

  let chars = "!<>-_\\/[]{}—=+*^?#________";
  let queue = [];
  let frameRequest = null;
  let frame = 0;

  export let htmlOutput = "";

  function getRandomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function start() {
    const length = Math.max(originalText.length, targetText.length);
    queue = [];

    for (let i = 0; i < length; i++) {
      const from = originalText[i] || "";
      const to = targetText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(frameRequest);
    frame = 0;
    update();
  }

  function update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = queue.length; i < n; i++) {
      let { from, to, start, end, char } = queue[i];
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = getRandomChar();
          queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    htmlOutput = output;
    if (complete === queue.length) {
      console.log("done");
    } else {
      frameRequest = requestAnimationFrame(update);
      frame++;
    }
  }

  $: if (browser && targetText.length) {
    start();
  }
</script>

<div>{@html htmlOutput || originalText}</div>

<style>
</style>
