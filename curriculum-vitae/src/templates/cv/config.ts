import _ from "lodash";
import { z } from "zod";

import {
  type Config as CommonConfig,
  configSchema as commonConfigSchema,
  createConfigProvider,
  transformConfig as transformCommonConfig,
} from "../../common/config.tsx";

const cvConfig = z.object({
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
});

type CvConfig = z.infer<typeof cvConfig>;

const defaultConfig: CvConfig = {
  spacing: {
    overviewColumnWidth: 80,
    overviewColumnPaddingX: 6,
    overviewGap: 5,
    overviewBlockHeadingMarginBottom: 2,
    overviewBlockContentGap: 2,
    keyValueBlockGap: 1,
    contactGap: 3,
    contactItemGap: 2,
    contentColumnPaddingX: 7,
    contentGap: 3,
    contentBlockHeadingMarginBottom: 3,
    contentBlockGap: 4,
    contentSubBlockGap: 2,
    contentSubBlockTextGap: 1.5,
    keyPropertiesGap: 4,
    pagePaddingTop: 8,
    pagePaddingBottom: 24,
    imageWidth: 50,
    imageHeight: 50,
    headerPaddingBottom: 8,
  },
};

export const configSchema = commonConfigSchema.merge(cvConfig).deepPartial();

const configSchemaTransformed = configSchema
  .transform((config) => {
    const { spacing } = _.merge(defaultConfig, config) as
      & CvConfig
      & Partial<CommonConfig>;
    const extendedSpacing = {
      ...spacing,
      get imageMarginLeft(): number {
        return (this.overviewColumnWidth - this.imageWidth) / 2;
      },
      get imageMarginRight(): number {
        return this.imageMarginLeft + this.contentColumnPaddingX;
      },
      get headerHeight(): number {
        return this.imageHeight + this.pagePaddingTop +
          this.headerPaddingBottom;
      },
      get contentPaddingTop(): number {
        return this.headerHeight;
      },
    };
    return {
      ...config,
      spacing: extendedSpacing,
    };
  })
  .transform(transformCommonConfig);

export const { ConfigProvider, useConfig } = createConfigProvider(
  configSchemaTransformed,
);
