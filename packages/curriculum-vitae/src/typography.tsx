import type ReactPdf from '@react-pdf/renderer'

import { Link, Text as PdfText } from '@react-pdf/renderer'

import { type Style, mergeStyles } from './utils'

export const typography = {
  H1: {
    fontSize: 32,
    fontWeight: 700,
  },
  H2: {
    fontSize: 18,
    fontWeight: 600,
  },
  H3: {
    fontSize: 18,
    fontWeight: 600,
  },
  H4: {
    fontSize: 10,
    fontWeight: 600,
  },
  Text: {
    fontSize: 10,
    fontWeight: 400,
  },
  KeyTitle: {
    fontSize: 8,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
} satisfies Record<string, Style>

type TypographyProps<TAs extends 'text' | 'link' = 'text'> =
  React.PropsWithChildren<
    (TAs extends 'text' ? ReactPdf.TextProps : ReactPdf.LinkProps) & {
      as?: TAs
    }
  >

type TypographyComponentsByName = {
  [K in keyof typeof typography]: <TAs extends 'text' | 'link'>(
    props: TypographyProps<TAs>
  ) => JSX.Element
}

export const { H1, H2, H3, H4, Text, KeyTitle } = Object.fromEntries(
  Object.entries(typography).map(([name, style]) => {
    const Component = <TAs extends 'text' | 'link'>(
      props: TypographyProps<TAs>
    ) => {
      if (props.as === 'link') {
        // @ts-expect-error - Type guarantees that `as` is 'link'
        return <Link {...props} style={mergeStyles(style, props.style)} />
      }
      return <PdfText {...props} style={mergeStyles(style, props.style)} />
    }
    return [name, Component]
  })
) as TypographyComponentsByName
