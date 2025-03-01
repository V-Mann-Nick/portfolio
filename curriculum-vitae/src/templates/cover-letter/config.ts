import type { PartialDeep } from "type-fest";

import _ from "lodash";
import { z } from "zod";

import {
  type Config as CommonConfig,
  configSchema as commonConfigSchema,
  createConfigProvider,
  transformConfig as transformCommonConfig,
} from "../../common/config.tsx";

const coverLetterConfig = z.object({
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
});

type CoverLetterConfig = z.infer<typeof coverLetterConfig>;

const defaultConfig = {
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
} satisfies CoverLetterConfig;

export const configSchema = commonConfigSchema
  .merge(coverLetterConfig)
  .deepPartial();

export type Config = z.infer<typeof configSchema>;

const configSchemaTransformed = configSchema
  .transform((config) => {
    const { spacing, typography } = _.merge(
      defaultConfig,
      config,
    ) as CoverLetterConfig & PartialDeep<CommonConfig>;
    const extendedSpacing = {
      ...spacing,
      get contentPaddingX(): number {
        return spacing.pagePaddingX;
      },
      get contentPaddingY(): number {
        return spacing.pagePaddingY;
      },
    };
    return {
      ...config,
      spacing: extendedSpacing,
      typography: {
        ...typography,
        Text: {
          ...typography?.Text,
          fontSize: 12,
        },
        KeyTitle: {
          ...typography?.KeyTitle,
          fontSize: 10,
        },
      },
    };
  })
  .transform(transformCommonConfig);

export const { ConfigProvider, useConfig } = createConfigProvider(
  configSchemaTransformed,
);
