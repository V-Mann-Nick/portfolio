import type { Component } from 'solid-js'

export type SectionDefinition = {
  key: string
  label: string
  Content: Component
  noNavigate?: boolean
}
