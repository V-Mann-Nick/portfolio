// @ts-check

import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { filterSitemapByDefaultLocale, i18n } from "astro-i18n-aut/integration";
import Icons from "unplugin-icons/vite";

const locales = {
  en: "en",
  de: "de",
};

const defaultLocale = "en";

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
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  vite: {
    plugins: [
      Icons({ compiler: "solid" }),
    ],
  },
});
