import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import UnoCSS from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import { extractorSvelte } from "@unocss/core";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [presetUno()],
      extractors: [extractorSvelte],
    }),
    sveltekit(),
    SvelteKitPWA({
      /* pwa options */
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
