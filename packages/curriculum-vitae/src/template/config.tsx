import type ReactPDF from '@react-pdf/renderer'

import { Link, Text as PdfText } from '@react-pdf/renderer'
import React from 'react'
import { colorsDark, colorsLight } from 'theme'
import { z } from 'zod'

import { mergeStyles } from '../utils'

const typographyStyleSchema = z.object({
  fontSize: z.number().positive(),
  fontWeight: z.union([
    z.literal(300),
    z.literal(400),
    z.literal(500),
    z.literal(600),
    z.literal(700),
  ]),
  textTransform: z.enum(['uppercase', 'lowercase', 'capitalize']).optional(),
})

type TypographyProps<TAs extends 'text' | 'link' = 'text'> =
  React.PropsWithChildren<
    (TAs extends 'text' ? ReactPDF.TextProps : ReactPDF.LinkProps) & {
      as?: TAs
    }
  >

const fontSchema = z.union([
  z.literal('Courier'),
  z.literal('Courier-Bold'),
  z.literal('Courier-Oblique'),
  z.literal('Courier-BoldOblique'),
  z.literal('Helvetica'),
  z.literal('Helvetica-Bold'),
  z.literal('Helvetica-Oblique'),
  z.literal('Helvetica-BoldOblique'),
  z.literal('Times-Roman'),
  z.literal('Times-Bold'),
  z.literal('Times-Italic'),
  z.literal('Times-BoldItalic'),
  z.object({
    source: z.object({
      300: z.string().url(),
      400: z.string().url(),
      500: z.string().url(),
      600: z.string().url(),
      700: z.string().url(),
    }),
  }),
])

export const configSchema = z
  .object({
    spacing: z.object({
      overviewColumnWidth: z.number().positive(),
      overviewColumnPaddingX: z.number().positive(),
      overviewGap: z.number().positive(),
      overviewBlockHeadingMarginBottom: z.number().positive(),
      overviewBlockContentGap: z.number().positive(),
      keyValueBlockGap: z.number().positive(),
      contactGap: z.number().positive(),
      contactItemGap: z.number().positive(),
      contentColumnPaddingX: z.number().positive(),
      contentGap: z.number().positive(),
      contentBlockHeadingMarginBottom: z.number().positive(),
      contentBlockGap: z.number().positive(),
      contentSubBlockGap: z.number().positive(),
      keyPropertiesGap: z.number().positive(),
      contentSubBlockTextGap: z.number().positive(),
      pagePaddingTop: z.number().positive(),
      pagePaddingBottom: z.number().positive(),
      imageWidth: z.number().positive(),
      imageHeight: z.number().positive(),
      headerPaddingBottom: z.number().positive(),
    }),
    colors: z.object({
      dark: z.object({
        background: z.string(),
        text: z.string(),
        accent: z.string(),
      }),
      light: z.object({
        background: z.string(),
        text: z.string(),
        accent: z.string(),
      }),
    }),
    typography: z.object({
      H1: typographyStyleSchema,
      H2: typographyStyleSchema,
      H3: typographyStyleSchema,
      H4: typographyStyleSchema,
      KeyTitle: typographyStyleSchema,
      Text: typographyStyleSchema,
    }),
    font: fontSchema,
    locale: z.enum(['de', 'en']),
  })
  .default({
    spacing: {
      overviewColumnWidth: 75,
      overviewColumnPaddingX: 6,
      overviewGap: 9,
      overviewBlockHeadingMarginBottom: 3,
      overviewBlockContentGap: 3,
      keyValueBlockGap: 1.5,
      contactGap: 3,
      contactItemGap: 2,
      contentColumnPaddingX: 7,
      contentGap: 3,
      contentBlockHeadingMarginBottom: 3,
      contentBlockGap: 4,
      contentSubBlockGap: 2,
      contentSubBlockTextGap: 1.5,
      keyPropertiesGap: 4,
      pagePaddingTop: 15,
      pagePaddingBottom: 24,
      imageWidth: 50,
      imageHeight: 50,
      headerPaddingBottom: 8,
    },
    colors: {
      dark: {
        background: colorsDark['base-300'],
        text: colorsDark['base-content'],
        accent: colorsDark.info,
      },
      light: {
        background: colorsLight['base-200'],
        text: colorsLight['base-content'],
        accent: colorsLight.primary,
      },
    },
    typography: {
      H1: {
        fontSize: 32,
        fontWeight: 700,
      },
      H2: {
        fontSize: 18,
        fontWeight: 600,
      },
      H3: {
        fontSize: 16,
        fontWeight: 600,
      },
      H4: {
        fontSize: 12,
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
    },
    font: {
      source: {
        300: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf',
        400: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sFVfxN87gsj0.ttf',
        500: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_A9sFVfxN87gsj0.ttf',
        600: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_ONrFVfxN87gsj0.ttf',
        700: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_NprFVfxN87gsj0.ttf',
      },
    },
    locale: 'en',
  })

const configSchemaTransformed = configSchema.transform((config) => {
  const extendedSpacing = {
    ...config.spacing,
    get imageMarginLeft(): number {
      return (this.overviewColumnWidth - this.imageWidth) / 2
    },
    get imageMarginRight(): number {
      return this.imageMarginLeft + this.contentColumnPaddingX
    },
    get headerHeight(): number {
      return this.imageHeight + this.pagePaddingTop + this.headerPaddingBottom
    },
    get contentPaddingTop(): number {
      return this.headerHeight
    },
  }

  type TypographyComponentsByName = {
    [K in keyof typeof config.typography]: <TAs extends 'text' | 'link'>(
      props: TypographyProps<TAs>
    ) => JSX.Element
  }

  const typography = Object.fromEntries(
    Object.entries(config.typography).map(([name, style]) => {
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

  return {
    ...config,
    spacing: extendedSpacing,
    typography,
    fontFamily: typeof config.font === 'string' ? config.font : 'custom-font',
  }
})

const configContext = React.createContext<z.infer<
  typeof configSchemaTransformed
> | null>(null)

type ConfigProviderProps = {
  config?: z.infer<typeof configSchema>
}

export const ConfigProvider: React.FunctionComponent<
  React.PropsWithChildren<ConfigProviderProps>
> = ({ config, children }) => (
  <configContext.Provider value={configSchemaTransformed.parse(config)}>
    {children}
  </configContext.Provider>
)

export const useConfig = () => {
  const config = React.useContext(configContext)
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return config
}
