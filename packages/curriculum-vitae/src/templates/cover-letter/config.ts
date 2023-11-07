import { z } from 'zod'

import {
  configSchema as commonConfigSchema,
  createConfigProvider,
  transformConfig as transformCommonConfig,
} from '../../common/config'

export const configSchema = commonConfigSchema.and(
  z
    .object({
      spacing: z.object({
        pagePaddingY: z.number().positive(),
        pagePaddingX: z.number().positive(),
        contactGap: z.number().positive(),
        contactItemGap: z.number().positive(),
        contentGap: z.number().positive(),
        contentParagraphsGap: z.number().positive(),
        receiverHeadingMarginBottom: z.number().positive(),
        receiverGap: z.number().positive(),
        headingPaddingBottom: z.number().positive(),
        receiverAndContactPaddingY: z.number().positive(),
      }),
    })
    .default({
      spacing: {
        pagePaddingX: 10,
        pagePaddingY: 15,
        contactGap: 3,
        contactItemGap: 2,
        contentGap: 9,
        contentParagraphsGap: 6,
        receiverHeadingMarginBottom: 2,
        receiverGap: 1,
        headingPaddingBottom: 2,
        receiverAndContactPaddingY: 9,
      },
    })
)

const configSchemaTransformed = configSchema
  .transform(({ typography, spacing, ...config }) => {
    const extendedSpacing = {
      ...spacing,
      get contentPaddingX(): number {
        return spacing.pagePaddingX
      },
      get contentPaddingY(): number {
        return spacing.pagePaddingY
      },
    }
    return {
      ...config,
      spacing: extendedSpacing,
      typography: {
        ...typography,
        Text: {
          ...typography.Text,
          fontSize: 12,
        },
        KeyTitle: {
          ...typography.KeyTitle,
          fontSize: 10,
        },
      },
    }
  })
  .transform(transformCommonConfig)

export const { ConfigProvider, useConfig } = createConfigProvider(
  configSchemaTransformed
)
