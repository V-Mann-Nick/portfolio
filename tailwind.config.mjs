import colors from './src/colors'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Fira Code', 'sans-serif'],
    },
    extend: { colors },
  },
	plugins: [],
}
