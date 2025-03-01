import { View } from "@react-pdf/renderer";
import { z } from "zod";

import { FaIcon, faIconSchema } from "../../common/fa-icon.tsx";
import { zReactNode } from "../../common/utils.ts";
import { useConfig } from "./config.ts";
import { ZodConditionalRender } from "./zod-conditional-render.tsx";

const dateRangeSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date().optional(),
});

const dateSchema = z.object({ date: z.coerce.date() });

const datesSchema = z.union([dateRangeSchema, dateSchema]);

type DatesProps = z.infer<typeof datesSchema>;

const formatDate = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);

const Dates: React.FunctionComponent<DatesProps> = (props) => {
  const { locale } = useConfig();
  return (
    <ZodConditionalRender
      schema={dateRangeSchema}
      value={props}
      fallback={({ date }) => formatDate(date, locale)}
    >
      {({ from, to }) => {
        const fromString = formatDate(from, locale);
        if (to) {
          const toString = formatDate(to, locale);
          return `${fromString} - ${toString}`;
        }
        return `Since ${fromString}`;
      }}
    </ZodConditionalRender>
  );
};

const keyPropertySchema = z.object({
  icon: faIconSchema.optional(),
  content: z.union([zReactNode, datesSchema]),
});

type KeyProperty = z.infer<typeof keyPropertySchema>;

const KeyProperty: React.FunctionComponent<KeyProperty> = ({
  icon,
  content,
}) => {
  const { colors, typography } = useConfig();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "2mm",
        alignItems: "center",
      }}
    >
      {icon && <FaIcon size={36} color={colors.light.accent} {...icon} />}
      <typography.Text style={{ color: colors.light.accent, fontWeight: 600 }}>
        <ZodConditionalRender
          schema={datesSchema}
          value={content}
          fallback={(content) => content}
        >
          {(content) => <Dates {...content} />}
        </ZodConditionalRender>
      </typography.Text>
    </View>
  );
};

const contentSubBlockSchema = z.object({
  title: z.string(),
  keyProperties: z.array(keyPropertySchema).optional(),
  content: z.union([z.array(zReactNode), zReactNode]),
  isList: z.boolean().optional(),
});

type ContentSubBlockProps = z.infer<typeof contentSubBlockSchema>;

const ContentSubBlock: React.FunctionComponent<ContentSubBlockProps> = ({
  title,
  keyProperties,
  content,
  isList,
}) => {
  const { spacing, typography, colors } = useConfig();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: `${spacing.contentSubBlockGap}mm`,
      }}
    >
      <typography.H4>{title}</typography.H4>
      {!!keyProperties?.length && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: `${spacing.keyPropertiesGap}mm`,
          }}
        >
          {keyProperties.map((keyProperty, idx) => (
            <KeyProperty key={idx} {...keyProperty} />
          ))}
        </View>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${spacing.contentSubBlockTextGap}mm`,
        }}
      >
        {(Array.isArray(content) ? content : [content]).map(
          (achievement, idx) => (
            <typography.Text key={idx}>
              {isList && (
                <typography.Text
                  style={{ color: colors.light.accent, fontWeight: 600 }}
                >
                  ~
                </typography.Text>
              )} {achievement}
            </typography.Text>
          ),
        )}
      </View>
    </View>
  );
};

const contentBlockSchema = z.object({
  title: z.string().optional(),
  content: z.union([
    z.array(contentSubBlockSchema),
    z.array(zReactNode),
    zReactNode,
  ]),
});

type ContentBlockProps = z.infer<typeof contentBlockSchema>;

const ContentBlock: React.FunctionComponent<ContentBlockProps> = ({
  title,
  content,
}) => {
  const { spacing, typography } = useConfig();
  return (
    <View>
      {title && (
        <typography.H3
          style={{
            marginBottom: `${spacing.contentBlockHeadingMarginBottom}mm`,
          }}
        >
          {title}
        </typography.H3>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${spacing.contentBlockGap}mm`,
        }}
      >
        {(Array.isArray(content) ? content : [content]).map((subBlock, idx) => (
          <ZodConditionalRender
            key={idx}
            schema={contentSubBlockSchema}
            value={subBlock}
            fallback={(subBlock) => (
              <typography.Text>{subBlock}</typography.Text>
            )}
          >
            {(subBlock) => <ContentSubBlock {...subBlock} />}
          </ZodConditionalRender>
        ))}
      </View>
    </View>
  );
};

export const contentSchema = z.object({
  contentBlocks: z.array(contentBlockSchema),
});

type ContentProps = z.infer<typeof contentSchema>;

export const Content: React.FunctionComponent<ContentProps> = ({
  contentBlocks,
}) => {
  const { spacing, colors } = useConfig();
  return (
    <View
      style={{
        flex: 1,
        paddingLeft: `${spacing.contentColumnPaddingX}mm`,
        paddingRight: `${spacing.contentColumnPaddingX}mm`,
        paddingTop: `${spacing.contentPaddingTop}mm`,
        paddingBottom: `${spacing.pagePaddingBottom}mm`,
        backgroundColor: colors.light.background,
        color: colors.light.text,
        display: "flex",
        flexDirection: "column",
        gap: `${spacing.contentGap}mm`,
      }}
    >
      {contentBlocks.map((contentBlock, idx) => (
        <ContentBlock key={idx} {...contentBlock} />
      ))}
    </View>
  );
};
