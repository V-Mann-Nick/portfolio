import { defaultLocale, type Locale, locales } from './components/i18n'
import { links } from './components/links'

import { z } from 'astro/zod'
import { getLinkPreview } from 'link-preview-js'
import fs from 'node:fs/promises'

const CACHE_FOLDER = '.link-preview-cache'
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

const cacheItemSchema = z.object({
  timestamp: z.number(),
  previews: z.record(z.enum(locales), z.any()),
})

type CacheItem = z.infer<typeof cacheItemSchema>

const fileCache = {
  constructPath(key: string) {
    return `${CACHE_FOLDER}/${key}.json`
  },
  async get(key: string): Promise<CacheItem | null> {
    const path = this.constructPath(key)
    try {
      const file = await fs
        .readFile(path)
        .then((buffer) => cacheItemSchema.parse(JSON.parse(buffer.toString())))
      if (Date.now() - file.timestamp > CACHE_TTL) {
        await fs.rm(path)
        return null
      }
      return file
    } catch (error) {
      return null
    }
  },
  async set(key: string, cacheItem: CacheItem) {
    const path = this.constructPath(key)
    await fs.mkdir(CACHE_FOLDER, { recursive: true })
    await fs.writeFile(path, JSON.stringify(cacheItem))
  },
}

const fetchLinkPreview = async (key: string, link: string) => {
  const getLinkPreviewWithOptions = (locale: Locale) =>
    getLinkPreview(link, {
      followRedirects: 'follow',
      timeout: 60000,
      imagesPropertyType: 'og',
      headers: { 'Accept-Language': locale },
    }).catch((error) => {
      console.error(`Error fetching link preview for ${key}`, error)
      return null
    })
  const previewsByLocale = Object.fromEntries(
    await Promise.all(
      locales.map(async (locale) => [
        locale,
        await getLinkPreviewWithOptions(locale),
      ])
    )
  ) as Record<Locale, Awaited<ReturnType<typeof getLinkPreviewWithOptions>>>
  const processPreview = (locale: Locale) => {
    const preview = previewsByLocale[locale]
    if (preview?.contentType !== 'text/html') {
      return null
    }
    const previewAsserted = preview as {
      title: string
      description: string | undefined
      images: string[]
    }
    return {
      title: previewAsserted.title,
      description: previewAsserted.description,
      image: previewAsserted.images[0],
    }
  }
  const processedPreviewsByLocale = Object.fromEntries(
    locales.map((locale) => [locale, processPreview(locale)])
  ) as Record<Locale, ReturnType<typeof processPreview>>
  locales.forEach((locale) => {
    if (locale === defaultLocale) return
    const isSameAsDefaultLocale = Object.entries(
      processedPreviewsByLocale[locale] ?? {}
    ).every(
      ([key, value]) =>
        value ===
        // @ts-expect-error - this is fine
        (processedPreviewsByLocale[defaultLocale] ?? {})[key]
    )
    if (isSameAsDefaultLocale) {
      processedPreviewsByLocale[locale] = null
    }
  })
  return {
    timestamp: Date.now(),
    previews: processedPreviewsByLocale,
  }
}

const cachedFetchLinkPreview = async (key: string, link: string) => {
  const cached = await fileCache.get(key)
  if (cached) return cached
  const fetched = await fetchLinkPreview(key, link)
  await fileCache.set(key, fetched)
  return fetched
}

const choosenFetchLinkPreview =
  process.env.NODE_ENV === 'production'
    ? fetchLinkPreview
    : cachedFetchLinkPreview

const fetchLinkPreviews = async () =>
  Object.fromEntries(
    await Promise.all(
      Object.entries(links).map(async ([key, { link }]) => {
        return [key, await choosenFetchLinkPreview(key, link)]
      })
    )
  ) as Record<keyof typeof links, Awaited<ReturnType<typeof fetchLinkPreview>>>

export default fetchLinkPreviews
export type LinkPreviews = Awaited<ReturnType<typeof fetchLinkPreviews>>
