import { Image } from '@react-pdf/renderer'
import { load as loadXml } from 'cheerio'
import fs from 'node:fs/promises'
import sharp from 'sharp'

import { getDirName } from './utils'

const fillSvg = (svg: string, color: string) => {
  const $ = loadXml(svg, { xml: true })
  $('[fill]').attr('fill', color)
  $('*:not([fill])').attr('fill', color)
  return $.xml()
}

const hashOfFunction = (fn: (...args: any[]) => unknown) =>
  Math.abs(
    fn
      .toString()
      .split('')
      .reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0)
  ).toString(16)

const DIR_NAME = getDirName(import.meta.url)
const ICON_CACHE_DIR = `${DIR_NAME}/.fa-icons`

type FaIconProps = {
  iconSet?: 'solid' | 'regular' | 'brands'
  icon: string
  size?: number
  color?: string
  noCache?: boolean
}

export const faIcon =
  ({ icon, size, color, iconSet, noCache }: Required<FaIconProps>) =>
  async () => {
    await fs.mkdir(ICON_CACHE_DIR, { recursive: true })
    const fileName = `${icon}-${size}-${color}-${hashOfFunction(faIcon)}.png`
    const cachePath = `${DIR_NAME}/.fa-icons/${fileName}`
    try {
      if (noCache) {
        throw new Error()
      }
      return await fs.readFile(cachePath)
    } catch {
      const response = await fetch(
        `https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/${iconSet}/${icon}.svg`
      )
      const svg = await response.text()
      const coloredSvg = fillSvg(svg, color)
      const image = await sharp(Buffer.from(coloredSvg))
        .resize(size)
        .png()
        .toBuffer()
      await fs.writeFile(cachePath, image)
      return image
    }
  }

export const FaIcon: React.FunctionComponent<FaIconProps> = ({
  color = '#000000',
  size = 48,
  noCache = false,
  iconSet = 'solid',
  ...props
}) => {
  const height = `${(size / 48) * 4}mm`
  return (
    <Image
      src={faIcon({ color, size, noCache, iconSet, ...props })}
      cache={false}
      style={{ height }}
    />
  )
}
