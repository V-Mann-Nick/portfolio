import type colors from './colors'

import { createTools, type Tailwindest } from 'tailwindest'

type ColorKeys = keyof typeof colors

type CustomTailwind = Tailwindest<{
  color: ColorKeys
}>

type Tailwind = Required<CustomTailwind>
const tw = createTools<CustomTailwind>()

export { type Tailwind, tw }
