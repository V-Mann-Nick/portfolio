import type { LinkPreviews } from './link-previews'

import { createContext, useContext } from 'solid-js'

const linkPreviewContext = createContext<LinkPreviews>()

export const LinkPreviewProvider = linkPreviewContext.Provider

export const useLinkPreviews = () => {
  const context = useContext(linkPreviewContext)
  if (!context) {
    throw new Error('useLinkPreviews must be used within a LinkPreviewProvider')
  }
  return context
}
