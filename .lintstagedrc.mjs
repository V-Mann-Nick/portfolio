import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirName = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('lint-staged').Config} */
const config = {
  '*.{yaml,yml,json,html,md}': 'prettier --write',
  '*.{js,jsx,mjs,cjs,ts,tsx}': ['eslint --fix', `${dirName}/tsc-lint.sh`],
}

export default config
