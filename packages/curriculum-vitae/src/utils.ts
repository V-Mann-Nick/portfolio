import type ReactPDF from '@react-pdf/renderer'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

// I wanted to just import it from @react-pdf/types but somehow this leads to
// problems with both ts-node and tsx. Life's too short...
type StyleProp = NonNullable<ReactPDF.TextProps['style']>
export type Style = Exclude<StyleProp, unknown[]>

export const mergeStyles = (...styles: (Style | Style[] | undefined)[]) =>
  styles.reduce<Style[]>(
    (acc, style) => [
      ...acc,
      ...(typeof style === 'undefined'
        ? []
        : Array.isArray(style)
        ? style
        : [style]),
    ],
    []
  )

export const getDirName = (url: string) => path.dirname(fileURLToPath(url))
