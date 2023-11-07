import { Document, Page, View } from '@react-pdf/renderer'
import { z } from 'zod'

import { documentMeta } from '../../common/types'
import { ConfigProvider, configSchema, useConfig } from './config'
import { Content, contentSchema } from './content'
import { Header, headerSchema } from './header'
import { Overview, overviewSchema } from './overview'
import { Triangle } from './triangle'

const WithProviders: React.FunctionComponent<
  Omit<CurriculumVitaeProps, 'config'>
> = ({ documentMeta, content, header, overview }) => {
  const { colors, fontFamily, locale, registerFonts } = useConfig()
  registerFonts()
  return (
    <Document
      title={documentMeta.title}
      author={documentMeta.author}
      subject={documentMeta.subject}
      language={locale}
    >
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
  documentMeta,
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
