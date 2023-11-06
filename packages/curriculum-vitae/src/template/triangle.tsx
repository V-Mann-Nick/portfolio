import type ReactPDF from '@react-pdf/renderer'

import { Path, Svg } from '@react-pdf/renderer'

type TriangleProps = {
  color: string
  position: 'top-left' | 'bottom-right'
} & ReactPDF.SVGProps

export const Triangle: React.FunctionComponent<TriangleProps> = ({
  color,
  position,
  ...svgProps
}) => {
  const height = 120
  const width = 300
  const topLeft = [0, 0]
  const bottomLeft = [0, height]
  const bottomRight = [width, height]
  const topRight = [width, 0]
  const viewBox = `0 0 ${width} ${height}`
  const first = position === 'top-left' ? topLeft : bottomRight
  const second = position === 'top-left' ? bottomLeft : topRight
  const third = position === 'top-left' ? topRight : bottomLeft
  const path = `M${first.join(' ')} L${second.join(' ')} L${third.join(' ')} Z`
  return (
    <Svg viewBox={viewBox} {...svgProps}>
      <Path d={path} fill={color} />
    </Svg>
  )
}
