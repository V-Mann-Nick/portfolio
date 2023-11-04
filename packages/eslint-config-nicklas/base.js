/** @type {import('node:path')} */
// eslint-disable-next-line
const path = require('node:path')

const project = path.resolve(process.cwd(), 'tsconfig.json')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'perfectionist'],
  settings: {
    'import/resolver': {
      node: true,
      typescript: {
        alwaysTryTypes: true,
        project,
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', '!.*'],
  rules: {
    curly: 'error',
    camelcase: 'error',
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'perfectionist/sort-array-includes': [
      'error',
      { type: 'natural', 'spread-last': true },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        groups: [
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
      },
    ],
    'perfectionist/sort-exports': ['error', { type: 'natural' }],
    'perfectionist/sort-named-imports': ['error', { type: 'natural' }],
    'perfectionist/sort-named-exports': ['error', { type: 'natural' }],
  },
}
