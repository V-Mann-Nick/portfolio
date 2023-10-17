import type { DictI18n } from './i18n'

import type { Component } from 'solid-js'

export type SectionDefinition = {
  key: string
  label: (messages: DictI18n) => string
  Content: Component
  noNavigate?: boolean
}
