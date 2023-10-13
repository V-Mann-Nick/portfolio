import solid from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

/**
 * @type {import('astro/types').AstroConfig}
 */
export default defineConfig({
  integrations: [solid(), tailwind({ applyBaseStyles: false })],
})
