import { View } from '@react-pdf/renderer'
import { z } from 'zod'

import { zReactNode } from '../../common//utils'
import { useConfig } from './config'

export const contentSchema = z.object({
  city: z.string(),
  date: z.coerce.date().optional(),
  greeting: z.string(),
  paragraphs: z.array(zReactNode),
  valediction: z.array(zReactNode),
})

export type ContentProps = z.infer<typeof contentSchema>

export const Content: React.FunctionComponent<ContentProps> = ({
  city,
  date,
  greeting,
  paragraphs,
  valediction,
}) => {
  const { typography, spacing, locale } = useConfig()

  const dateString = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date ?? new Date())
  return (
    <View
      style={{
        paddingTop: `${spacing.contentPaddingY}mm`,
        paddingBottom: `${spacing.contentPaddingY}mm`,
        paddingLeft: `${spacing.contentPaddingX}mm`,
        paddingRight: `${spacing.contentPaddingX}mm`,
      }}
    >
      <typography.Text style={{ marginLeft: 'auto' }}>
        {city}, {dateString}
      </typography.Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${spacing.contentGap}mm`,
        }}
      >
        <typography.Text>{greeting}</typography.Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${spacing.contentParagraphsGap}mm`,
          }}
        >
          {paragraphs.map((paragraph, idx) => (
            <typography.Text key={idx}>{paragraph}</typography.Text>
          ))}
        </View>
        <View>
          {valediction.map((paragraph, idx) => (
            <typography.Text key={idx}>{paragraph}</typography.Text>
          ))}
        </View>
      </View>
    </View>
  )
}
