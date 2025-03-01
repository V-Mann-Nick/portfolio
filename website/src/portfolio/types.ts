import type { Component, ComponentProps, JSX } from "solid-js";

import type { DictI18n } from "./i18n/index.ts";

export type SectionDefinition = {
  key: string;
  label: (messages: DictI18n) => string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
  Content: Component;
  noNavigate?: boolean;
};
