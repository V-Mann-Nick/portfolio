import { z } from "astro/zod";
import { getLinkPreview } from "link-preview-js";
import fs from "node:fs/promises";

import { defaultLocale, type Locale, locales } from "./i18n/locales.ts";
import { links } from "./links.ts";

const CACHE_FOLDER = ".link-preview-cache";

const cacheItemSchema = z.object({
  timestamp: z.number(),
  previews: z.record(z.enum(locales), z.any()),
});

type CacheItem = z.infer<typeof cacheItemSchema>;

const fileCache = {
  constructPath(key: string) {
    return `${CACHE_FOLDER}/${key}.json`;
  },
  async get(key: string): Promise<CacheItem | null> {
    const path = this.constructPath(key);
    try {
      const file = await fs
        .readFile(path)
        .then((buffer) => cacheItemSchema.parse(JSON.parse(buffer.toString())));
      return file;
    } catch (_error) {
      return null;
    }
  },
  async set(key: string, cacheItem: CacheItem) {
    const path = this.constructPath(key);
    await fs.mkdir(CACHE_FOLDER, { recursive: true });
    await fs.writeFile(path, JSON.stringify(cacheItem));
  },
};

async function fetchLinkPreview(key: string, link: string) {
  console.log(`Fetching link preview for ${key}`);
  const getLinkPreviewWithOptions = (locale: Locale) =>
    getLinkPreview(link, {
      followRedirects: "follow",
      timeout: 60000,
      imagesPropertyType: "og",
      headers: { "Accept-Language": locale },
    }).catch((error: unknown) => {
      console.error(`Error fetching link preview for ${key}`, error);
      return null;
    });
  const previewsByLocale = Object.fromEntries(
    await Promise.all(
      locales.map(async (locale) => [
        locale,
        await getLinkPreviewWithOptions(locale),
      ]),
    ),
  ) as Record<Locale, Awaited<ReturnType<typeof getLinkPreviewWithOptions>>>;
  const processPreview = (locale: Locale) => {
    const preview = previewsByLocale[locale];
    if (preview?.contentType !== "text/html") {
      return null;
    }
    const previewAsserted = preview as {
      title: string;
      description: string | undefined;
      images: string[];
    };
    return {
      title: previewAsserted.title,
      description: previewAsserted.description,
      image: previewAsserted.images[0],
    };
  };
  const processedPreviewsByLocale = Object.fromEntries(
    locales.map((locale) => [locale, processPreview(locale)]),
  ) as Record<Locale, ReturnType<typeof processPreview>>;
  locales.forEach((locale) => {
    if (locale === defaultLocale) {
      return;
    }
    const isSameAsDefaultLocale = Object.entries(
      processedPreviewsByLocale[locale] ?? {},
    ).every(
      ([key, value]) =>
        value ===
          // @ts-expect-error - this is fine
          processedPreviewsByLocale[defaultLocale]?.[key],
    );
    if (isSameAsDefaultLocale) {
      processedPreviewsByLocale[locale] = null;
    }
  });
  console.log(`Done with ${key}`);
  const linkPreview = {
    timestamp: Date.now(),
    previews: processedPreviewsByLocale,
  };
  await fileCache.set(key, linkPreview);
  return linkPreview;
}

export type LinkPreview = Awaited<
  ReturnType<typeof fetchLinkPreview>
>["previews"][Locale];

export async function fetchLinkPreviews() {
  await Promise.all(
    Object.entries(links).map(async ([key, { link }]) => {
      await fetchLinkPreview(key, link);
    }),
  );
}

export async function getCachedLinkPreviews() {
  return Object.fromEntries(
    await Promise.all(
      Object.keys(links).map(async (key) => [
        key,
        await fileCache.get(key),
      ]),
    ),
  ) as LinkPreviews;
}

export type LinkPreviews = Record<
  keyof typeof links,
  Awaited<ReturnType<typeof fetchLinkPreview>>
>;
