import type ReactPDF from '@react-pdf/renderer'
import type { PartialDeep } from 'type-fest'

import { Font, Link, Text as PdfText } from '@react-pdf/renderer'
import merge from 'lodash.merge'
import React from 'react'
import { colorsDark, colorsLight } from 'theme'
import { z } from 'zod'

import { mergeStyles } from './utils'

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

export const configSchema = z.object({
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

export type Config = z.infer<typeof configSchema>

const defaultConfig = {
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
} satisfies Config

export const transformConfig = <TConfig extends PartialDeep<Config>>(
  config: TConfig
) => {
  const mergedConfig = merge(defaultConfig, config) as TConfig & Config

  type TypographyComponentsByName = {
    [K in keyof typeof mergedConfig.typography]: <TAs extends 'text' | 'link'>(
      props: TypographyProps<TAs>
    ) => JSX.Element
  }

  const typography = Object.fromEntries(
    Object.entries(mergedConfig.typography).map(([name, style]) => {
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

  const registerFonts = () => {
    if (typeof mergedConfig.font === 'string') {
      return
    }
    Font.register({
      family: 'custom-font',
      fonts: Object.entries(mergedConfig.font.source).map(([weight, src]) => ({
        src,
        fontWeight: Number(weight),
      })),
    })
  }

  return {
    ...mergedConfig,
    typography,
    fontFamily:
      typeof mergedConfig.font === 'string' ? mergedConfig.font : 'custom-font',
    registerFonts,
  }
}

export const createConfigProvider = <TConfigIn, TConfigOut>(
  schema: z.ZodType<TConfigOut, z.ZodTypeDef, TConfigIn>
) => {
  const configContext = React.createContext<TConfigOut | null>(null)

  type ConfigProviderProps = {
    config?: TConfigIn
  }

  const ConfigProvider: React.FunctionComponent<
    React.PropsWithChildren<ConfigProviderProps>
  > = ({ config, children }) => (
    <configContext.Provider value={schema.parse(config)}>
      {children}
    </configContext.Provider>
  )

  const useConfig = () => {
    const config = React.useContext(configContext)
    if (!config) {
      throw new Error('useConfig must be used within a ConfigProvider')
    }
    return config
  }

  return { ConfigProvider, useConfig }
}
