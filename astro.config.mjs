import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import compress from "astro-compress";
import remarkHighlight from "./src/lib/remarkHighlight.js";

export default defineConfig({
  output: "static",
  compressHTML: true,
  markdown: {
    remarkPlugins: [remarkHighlight],
  },
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
});
