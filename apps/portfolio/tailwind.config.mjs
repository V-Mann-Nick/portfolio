import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'
import { colorsDark, colorsLight } from 'theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        'Fira Code Variable',
        'sans-serif',
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  plugins: [daisyui, typography],
  daisyui: {
    logs: false,
    themes: [{ 'nord-light': colorsLight }, { 'nord-dark': colorsDark }],
  },
}
