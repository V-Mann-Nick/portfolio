/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('node:path')
const prettierOptions = require('./prettier-config.js')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/strict',
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
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    'prettier/prettier': ['error', prettierOptions, { usePrettierrc: false }],
    '@typescript-eslint/no-non-null-assertion': 'off',
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
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
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
