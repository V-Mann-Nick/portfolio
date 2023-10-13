import { createSignal } from 'solid-js'
import { isServer } from 'solid-js/web'

export const [currentSection, setCurrentSection] = createSignal<string>()

export const [isDarkMode, setIsDarkMode] = createSignal(
  isServer ? null : document.documentElement.classList.contains('dark')
)
