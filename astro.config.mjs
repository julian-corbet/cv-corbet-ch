import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import compress from "astro-compress";

export default defineConfig({
  output: "static",
  integrations: [tailwind(), icon(), compress()]
});
