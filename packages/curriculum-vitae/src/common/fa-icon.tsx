import { Image } from '@react-pdf/renderer'
import { load as loadXml } from 'cheerio'
import fs from 'node:fs/promises'
import sharp from 'sharp'
import { z } from 'zod'

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

export const faIconSchema = z.object({
  iconSet: z.enum(['solid', 'regular', 'brands']).optional(),
  name: z.string(),
  size: z.number().optional(),
  color: z.string().optional(),
})

type FaIconProps = z.infer<typeof faIconSchema>

export const faIcon =
  ({ name, size, color, iconSet }: Required<FaIconProps>) =>
  async () => {
    await fs.mkdir(ICON_CACHE_DIR, { recursive: true })
    const fileName = `${name}-${size}-${color}-${hashOfFunction(faIcon)}.png`
    const cachePath = `${DIR_NAME}/.fa-icons/${fileName}`
    try {
      return await fs.readFile(cachePath)
    } catch {
      const response = await fetch(
        `https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/${iconSet}/${name}.svg`
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

export const FaIcon: React.FunctionComponent<FaIconProps> = (props) => {
  const defaultOptions = {
    color: 'black',
    size: 48,
    iconSet: 'solid' as const,
  }
  const options = {
    ...defaultOptions,
    ...props,
  }
  const height = `${(options.size / 48) * 4}mm`
  return <Image src={faIcon(options)} cache={false} style={{ height }} />
}
