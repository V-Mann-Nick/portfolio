import { View } from '@react-pdf/renderer'
import { z } from 'zod'

import { zReactNode } from '../utils'
import { useConfig } from './config'
import { FaIcon, faIconSchema } from './fa-icon'
import { ZodConditionalRender } from './zod-conditional-render'

const dateRangeSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
})

type DateRangeProps = z.infer<typeof dateRangeSchema>

const formatDate = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date)

const DateRange: React.FunctionComponent<DateRangeProps> = ({ from, to }) => {
  const { locale } = useConfig()
  const fromString = formatDate(from, locale)
  const toString = formatDate(to, locale)
  return `${fromString} - ${toString}`
}

const keyPropertySchema = z.object({
  icon: faIconSchema.optional(),
  content: z.union([zReactNode, dateRangeSchema]),
})

type KeyProperty = z.infer<typeof keyPropertySchema>

const KeyProperty: React.FunctionComponent<KeyProperty> = ({
  icon,
  content,
}) => {
  const { colors, typography } = useConfig()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2mm',
        alignItems: 'center',
      }}
    >
      {icon && <FaIcon size={36} color={colors.light.accent} {...icon} />}
      <typography.Text style={{ color: colors.light.accent, fontWeight: 600 }}>
        <ZodConditionalRender
          schema={dateRangeSchema}
          value={content}
          fallback={(content) => content}
        >
          {(content) => <DateRange {...content} />}
        </ZodConditionalRender>
      </typography.Text>
    </View>
  )
}

const contentSubBlockSchema = z.object({
  title: z.string(),
  keyProperties: z.array(keyPropertySchema).optional(),
  content: z.union([z.array(zReactNode), zReactNode]),
  isList: z.boolean().optional(),
})

type ContentSubBlockProps = z.infer<typeof contentSubBlockSchema>

const ContentSubBlock: React.FunctionComponent<ContentSubBlockProps> = ({
  title,
  keyProperties,
  content,
  isList,
}) => {
  const { spacing, typography } = useConfig()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${spacing.contentSubBlockGap}mm`,
      }}
    >
      <typography.H4>{title}</typography.H4>
      {!!keyProperties?.length && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
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
          display: 'flex',
          flexDirection: 'column',
          gap: `${spacing.contentSubBlockTextGap}mm`,
        }}
      >
        {(Array.isArray(content) ? content : [content]).map(
          (achievement, idx) => (
            <typography.Text key={idx}>
              {isList && '•'} {achievement}
            </typography.Text>
          )
        )}
      </View>
    </View>
  )
}

const contentBlockSchema = z.object({
  title: z.string().optional(),
  content: z.union([
    z.array(contentSubBlockSchema),
    z.array(zReactNode),
    zReactNode,
  ]),
})

type ContentBlockProps = z.infer<typeof contentBlockSchema>

const ContentBlock: React.FunctionComponent<ContentBlockProps> = ({
  title,
  content,
}) => {
  const { spacing, typography } = useConfig()
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
          display: 'flex',
          flexDirection: 'column',
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
  )
}

export const contentSchema = z.object({
  contentBlocks: z.array(contentBlockSchema),
})

type ContentProps = z.infer<typeof contentSchema>

export const Content: React.FunctionComponent<ContentProps> = ({
  contentBlocks,
}) => {
  const { spacing, colors } = useConfig()
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
        display: 'flex',
        flexDirection: 'column',
        gap: `${spacing.contentGap}mm`,
      }}
    >
      {contentBlocks.map((contentBlock, idx) => (
        <ContentBlock key={idx} {...contentBlock} />
      ))}
    </View>
  )
}
