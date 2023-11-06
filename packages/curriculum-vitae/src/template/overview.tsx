import { View } from '@react-pdf/renderer'
import { z } from 'zod'

import { zReactNode } from '../utils'
import { useConfig } from './config'
import { FaIcon, faIconSchema } from './fa-icon'
import { ZodConditionalRender } from './zod-conditional-render'

const contactInfoSchema = z.object({
  icon: faIconSchema,
  text: z.string(),
  href: z.string().url().optional(),
})

type ContactInfoProps = z.infer<typeof contactInfoSchema>

const ContactInfo: React.FunctionComponent<ContactInfoProps> = ({
  icon,
  text,
  href,
}) => {
  const { spacing, colors, typography } = useConfig()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: `${spacing.contactItemGap}mm`,
      }}
    >
      <View
        style={{
          width: '6mm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FaIcon {...icon} color={colors.dark.accent} />
      </View>
      <typography.Text
        as={href ? 'link' : 'text'}
        src={href}
        style={{ color: colors.dark.text, textDecoration: 'none' }}
      >
        {text}
      </typography.Text>
    </View>
  )
}

const contactSchema = z.object({
  contactInfo: z.array(contactInfoSchema),
})

type ContactProps = z.infer<typeof contactSchema>

export const Contact: React.FunctionComponent<ContactProps> = ({
  contactInfo,
}) => {
  const { spacing } = useConfig()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${spacing.contactGap}mm`,
      }}
    >
      {contactInfo.map((info, idx) => (
        <ContactInfo key={idx} {...info} />
      ))}
    </View>
  )
}

const keyValueBlockSchema = z.object({
  title: z.string(),
  content: z.string().or(z.array(z.string())),
})

type KeyValueBlockProps = z.infer<typeof keyValueBlockSchema>

const KeyValueBlock: React.FunctionComponent<KeyValueBlockProps> = ({
  title,
  content,
}) => {
  const { spacing, colors, typography } = useConfig()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${spacing.keyValueBlockGap}mm`,
      }}
    >
      <typography.KeyTitle style={{ color: colors.dark.accent }}>
        {title}
      </typography.KeyTitle>
      <typography.Text>
        {(Array.isArray(content) ? content : [content]).join(', ')}
      </typography.Text>
    </View>
  )
}

const overviewBlockSchema = z.object({
  title: z.string(),
  content: z.union([
    z.array(zReactNode),
    zReactNode,
    z.array(keyValueBlockSchema),
  ]),
})

type OverviewBlockProps = z.infer<typeof overviewBlockSchema>

const OverviewBlock: React.FunctionComponent<OverviewBlockProps> = ({
  title,
  content,
}) => {
  const { spacing, typography } = useConfig()
  return (
    <View>
      <typography.H3
        style={{
          marginBottom: `${spacing.overviewBlockHeadingMarginBottom}mm`,
        }}
      >
        {title}
      </typography.H3>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${spacing.overviewBlockContentGap}mm`,
        }}
      >
        {(Array.isArray(content) ? content : [content]).map((block, idx) => (
          <ZodConditionalRender
            key={idx}
            schema={keyValueBlockSchema}
            value={block}
            fallback={(block) => <typography.Text>{block}</typography.Text>}
          >
            {(block) => <KeyValueBlock {...block} />}
          </ZodConditionalRender>
        ))}
      </View>
    </View>
  )
}

export const overviewSchema = z.object({
  contact: contactSchema,
  overviewBlocks: z.array(overviewBlockSchema),
})

type OverviewProps = z.infer<typeof overviewSchema>

export const Overview: React.FunctionComponent<OverviewProps> = ({
  contact,
  overviewBlocks,
}) => {
  const { spacing, colors } = useConfig()
  return (
    <View
      style={{
        width: `${spacing.overviewColumnWidth}mm`,
        backgroundColor: colors.dark.background,
        height: '100%',
        color: colors.dark.text,
        padding: `${spacing.contentColumnPaddingX}mm`,
        paddingTop: `${spacing.headerHeight}mm`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${spacing.overviewGap}mm`,
      }}
    >
      <Contact {...contact} />
      {overviewBlocks.map((block, idx) => (
        <OverviewBlock key={idx} {...block} />
      ))}
    </View>
  )
}
