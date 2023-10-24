import UAParser from 'ua-parser-js'

const parser =
  typeof window === 'undefined'
    ? null
    : new UAParser(window.navigator.userAgent).getResult()
export const isMobile = parser?.device.type === 'mobile'
