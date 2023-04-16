import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import UnoCSS from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import { extractorSvelte } from "@unocss/core";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [presetUno(), presetIcons()],
      extractors: [extractorSvelte],
    }),
    sveltekit(),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
