import { createContext, type ParentComponent, useContext } from "solid-js";

import type { LinkPreview, LinkPreviews } from "./link-previews.ts";
import type { LinkKey } from "./links.ts";

import { defaultLocale } from "./i18n/index.ts";
import { useLocale } from "./locale-provider.tsx";

type LinkPreviewContext = {
  getLinkPreview: (key: LinkKey) => LinkPreview;
};

const linkPreviewContext = createContext<LinkPreviewContext>();

export const LinkPreviewProvider: ParentComponent<{
  linkPreviews: LinkPreviews;
}> = (props) => {
  const { currentLocale } = useLocale();
  const getLinkPreview = (key: LinkKey) => {
    const preview = props.linkPreviews[key];
    return preview.previews[currentLocale()] ?? preview.previews[defaultLocale];
  };
  return (
    <linkPreviewContext.Provider value={{ getLinkPreview }}>
      {props.children}
    </linkPreviewContext.Provider>
  );
};

export const useLinkPreviews = () => {
  const context = useContext(linkPreviewContext);
  if (!context) {
    throw new Error(
      "useLinkPreviews must be used within a LinkPreviewProvider",
    );
  }
  return context;
};
