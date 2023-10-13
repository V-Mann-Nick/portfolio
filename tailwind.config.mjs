import daisyui from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'

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
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: [
      {
        'nord-light': {
          primary: '#8FBCBB',
          'primary-focus': '#88C0D0',
          'primary-content': '#D8DEE9',

          secondary: '#81A1C1',
          'secondary-focus': '#5E81AC',
          'secondary-content': '#D8DEE9',

          accent: '#434C5E',
          'accent-focus': '#4C566A',
          'accent-content': '#B48EAD',

          neutral: '#2E3440',
          'neutral-focus': '#3B4252',
          'neutral-content': '#D8DEE9',

          'base-100': '#ECEFF4',
          'base-200': '#E5E9F0',
          'base-300': '#D8DEE9',
          'base-content': '#2E3440',

          info: '#EBCB8B',
          success: '#A3BE8C',
          warning: '#D08770',
          error: '#BF616A',
        },
      },
      {
        'nord-dark': {
          primary: '#8FBCBB',
          'primary-focus': '#88C0D0',
          'primary-content': '#D8DEE9',

          secondary: '#81A1C1',
          'secondary-focus': '#5E81AC',
          'secondary-content': '#D8DEE9',

          accent: '#434C5E',
          'accent-focus': '#4C566A',
          'accent-content': '#B48EAD',

          neutral: '#2E3440',
          'neutral-focus': '#3B4252',
          'neutral-content': '#D8DEE9',

          'base-100': '#434c5e',
          'base-200': '#3b4252',
          'base-300': '#2e3440',
          'base-content': '#eceff4',

          info: '#EBCB8B',
          success: '#A3BE8C',
          warning: '#D08770',
          error: '#BF616A',
        },
      },
    ],
  },
}
