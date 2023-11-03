import { type ParentComponent, createContext, useContext } from 'solid-js'

import type { LinkPreview, LinkPreviews } from './link-previews'
import type { LinkKey } from './links'

import { defaultLocale } from './i18n'
import { useLocale } from './locale-provider'

type LinkPreviewContext = {
  getLinkPreview: (key: LinkKey) => LinkPreview
}

const linkPreviewContext = createContext<LinkPreviewContext>()

export const LinkPreviewProvider: ParentComponent<{
  linkPreviews: LinkPreviews
}> = (props) => {
  const { currentLocale } = useLocale()
  const getLinkPreview = (key: LinkKey) => {
    const preview = props.linkPreviews[key]
    return preview.previews[currentLocale()] ?? preview.previews[defaultLocale]
  }
  return (
    <linkPreviewContext.Provider value={{ getLinkPreview }}>
      {props.children}
    </linkPreviewContext.Provider>
  )
}

export const useLinkPreviews = () => {
  const context = useContext(linkPreviewContext)
  if (!context) {
    throw new Error('useLinkPreviews must be used within a LinkPreviewProvider')
  }
  return context
}
