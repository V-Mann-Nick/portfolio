/* eslint-disable @typescript-eslint/no-var-requires */
const prettierConifg = require('./prettier-config.js')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['./base.js', 'plugin:solid/recommended'],
  plugins: ['solid'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        ...prettierConifg,
        plugins: ['prettier-plugin-tailwindcss'],
        tailwindFunctions: ['clsx'],
      },
      { usePrettierrc: false },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'natural',
        'custom-groups': {
          aria: 'aria-*',
          data: 'data-*',
          callback: 'on*',
          class: '*class',
        },
        groups: ['class', 'unknown', 'aria', 'data', 'callback'],
      },
    ],
  },
}
