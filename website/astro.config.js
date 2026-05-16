// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import { filterSitemapByDefaultLocale, i18n } from "astro-i18n-aut/integration";
import Icons from "unplugin-icons/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const locales = {
  en: "en",
  de: "de",
};

const defaultLocale = "en";

const workspaceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

export default defineConfig({
  site: "https://nicklas.sedlock.xyz",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    i18n({
      locales,
      defaultLocale,
      redirectDefaultLocale: true,
    }),
    solid(),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  vite: {
    plugins: [Icons({ compiler: "solid" }), tailwindcss()],
    server: {
      fs: {
        allow: [
          workspaceRoot,
        ],
      },
    },
  },
});
