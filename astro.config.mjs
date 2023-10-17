import solid from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import { i18n } from 'astro-i18n-aut/integration'
import Icons from 'unplugin-icons/vite'

/**
 * @type {import('astro/types').AstroConfig}
 */
export default defineConfig({
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    i18n({
      locales: { en: 'en', de: 'de' },
      defaultLocale: 'en',
      redirectDefaultLocale: true,
    }),
    solid(),
    tailwind({ applyBaseStyles: false }),
  ],
  vite: {
    plugins: [Icons({ compiler: 'solid' })],
  },
})
