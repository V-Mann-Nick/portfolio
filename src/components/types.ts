import type { JSX } from 'solid-js'

export type SectionDefinition = {
  key: string
  label: string
  content: JSX.Element
  noNavigate?: boolean
}
