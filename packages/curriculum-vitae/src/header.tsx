import { Image, View } from '@react-pdf/renderer'
import fs from 'node:fs/promises'
import { colorsDark, colorsLight } from 'theme'

import {
  HEADER_PADDING_BOTTOM,
  HEADER_PADDING_TOP,
  IMAGE_HEIGHT,
  IMAGE_MARGIN_LEFT,
  IMAGE_MARGIN_RIGHT,
  IMAGE_WIDTH,
} from './constants'
import { H1, H2 } from './typography'
import { getDirName } from './utils'

const meImage = () => fs.readFile(`${getDirName(import.meta.url)}/me.jpeg`)

export const Header: React.FunctionComponent = () => (
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
      alignItems: 'flex-end',
      color: colorsLight['base-content'],
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
)
