/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:solid/recommended',
  ],
  plugins: ['simple-import-sort', '@typescript-eslint', 'solid', 'import'],
  rules: {
    // 'react/jsx-key': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'import/first': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-extraneous-dependencies': 'error',
    // '@typescript-eslint/ban-ts-comment': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/no-namespace': 'off',
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
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['dist'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.mjs'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // // Packages `react` related packages come first.
              // ['^react', '^@?\\w'],
              // // Global imports.
              // ['^(@|components)(ui|web)?(/.*|$)'],
              // Aliased imports.
              ['^~.*(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
}
