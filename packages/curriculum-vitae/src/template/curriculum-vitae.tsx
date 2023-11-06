import { Document, Font, Page, View } from '@react-pdf/renderer'
import { z } from 'zod'

import { ConfigProvider, configSchema, useConfig } from './config'
import { Content, contentSchema } from './content'
import { Header, headerSchema } from './header'
import { Overview, overviewSchema } from './overview'
import { Triangle } from './triangle'

const WithProviders: React.FunctionComponent<
  Omit<CurriculumVitaeProps, 'config'>
> = ({ content, header, overview }) => {
  const { colors, font, fontFamily } = useConfig()
  if (typeof font !== 'string') {
    Font.register({
      family: fontFamily,
      fonts: Object.entries(font.source).map(([weight, src]) => ({
        src,
        fontWeight: Number(weight),
      })),
    })
  }
  return (
    <Document>
      <Page style={{ fontFamily }} wrap={false}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
            height: '100%',
          }}
        >
          <Overview {...overview} />
          <Content {...content} />
        </View>
        <Header {...header} />
        <Triangle
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '35vw',
          }}
          position="bottom-right"
          color={colors.light.accent}
        />
      </Page>
    </Document>
  )
}

export const curriculumVitaeSchema = z.object({
  header: headerSchema,
  overview: overviewSchema,
  content: contentSchema,
  config: configSchema.optional(),
})

export type CurriculumVitaeProps = z.infer<typeof curriculumVitaeSchema>

export const CurriculumVitae: React.FunctionComponent<CurriculumVitaeProps> = ({
  config,
  ...props
}) => (
  <ConfigProvider config={config}>
    <WithProviders {...props} />
  </ConfigProvider>
)
