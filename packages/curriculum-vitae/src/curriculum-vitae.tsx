import { Document, Font, Page, View } from '@react-pdf/renderer'
import { colorsLight } from 'theme'

import { Content } from './content'
import { Header } from './header'
import { Overview } from './overview'

Font.register({
  family: 'Fira Code',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sFVfxN87gsj0.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_A9sFVfxN87gsj0.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_ONrFVfxN87gsj0.ttf',
      fontWeight: 600,
    },
    {
      src: 'https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_NprFVfxN87gsj0.ttf',
      fontWeight: 700,
    },
  ],
})

export const CurriculumVitae: React.FunctionComponent = () => (
  <Document>
    <Page style={{ fontFamily: 'Fira Code' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          height: '100%',
        }}
      >
        <Overview />
        <Content />
      </View>
      <Header />
      <View
        style={{
          backgroundColor: colorsLight.primary,
          height: '100mm',
          width: '100mm',
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: 'translateY(235mm) translateX(70mm) rotate(-20deg))',
        }}
      />
    </Page>
  </Document>
)
