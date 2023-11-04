import { Document, Font, Image, Page, View } from '@react-pdf/renderer'
import fs from 'node:fs/promises'

import { getDirName } from './utils'

const meImage = () => fs.readFile(`${getDirName(import.meta.url)}/me.jpeg`)

import { colorsDark } from 'theme'

import {
  HEADER_PADDING_BOTTOM,
  HEADER_PADDING_TOP,
  IMAGE_HEIGHT,
  IMAGE_MARGIN_LEFT,
  IMAGE_MARGIN_RIGHT,
  IMAGE_WIDTH,
} from './constants'
import { Content } from './content'
import { Overview } from './overview'
import { H1, H2 } from './typography'

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
      <View
        style={{
          paddingTop: `${HEADER_PADDING_TOP}mm`,
          paddingBottom: `${HEADER_PADDING_BOTTOM}mm`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            transform: ' translateX(-90mm) translateY(-340mm) rotate(70deg)',
            height: '150mm',
            width: '150mm',
            backgroundColor: colorsDark.info,
          }}
        />
        <Image
          cache={false}
          src={meImage}
          style={{
            transform: 'rotate(90)',
            height: `${IMAGE_HEIGHT}mm`,
            width: `${IMAGE_WIDTH}mm`,
            borderRadius: '50%',
            objectFit: 'cover',
            marginLeft: `${IMAGE_MARGIN_LEFT}mm`,
            marginRight: `${IMAGE_MARGIN_RIGHT}mm`,
          }}
        />
        <View>
          <H1>Nicklas Sedlock</H1>
          <H2 style={{ color: colorsDark.primary }}>Programmer</H2>
        </View>
      </View>
    </Page>
  </Document>
)
