import { View } from '@react-pdf/renderer'
import { colorsLight } from 'theme'

import { CONTENT_COLUMN_PADDING_X, HEADER_HEIGHT } from './constants'
import { Text } from './typography'

export const Content: React.FunctionComponent = () => (
  <View
    style={{
      flex: 1,
      paddingLeft: `${CONTENT_COLUMN_PADDING_X}mm`,
      paddingRight: `${CONTENT_COLUMN_PADDING_X}mm`,
      paddingTop: `${HEADER_HEIGHT}mm`,
      paddingBottom: '12mm',
      backgroundColor: colorsLight['base-200'],
      color: colorsLight['base-content'],
    }}
  >
    <Text>
      Versatile programmer with a keen eye for detail and a passion for
      automation. I have a strong interest in programming languages and
      compilers, and I am always looking for ways to improve my craft.
    </Text>
  </View>
)
