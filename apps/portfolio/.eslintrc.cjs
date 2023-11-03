/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['nicklas/solidjs'],
  env: { node: true },
  root: true,
  rules: {
    'import/no-unresolved': ['error', { ignore: ['^~icons/.*/.*$'] }],
  },
}
