/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['./base.js', 'plugin:solid/recommended'],
  plugins: ['solid'],
  rules: {
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
