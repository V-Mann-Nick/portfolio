import type { ContactProps } from '../common/types'

const phoneNumber = process.env['PHONE_NUMBER']

export default {
  contactInfo: [
    {
      icon: { name: 'envelope' },
      get href() {
        return `mailto:${this.text}`
      },
      text: 'nicklas.sedlock@posteo.net',
    },
    !!phoneNumber && {
      icon: { name: 'phone' },
      get href() {
        return `tel:${this.text.replace(' ', '')}`
      },
      text: phoneNumber,
    },
    {
      icon: { name: 'globe' },
      get href() {
        return `https://${this.text}`
      },
      text: 'nicklas.sedlock.xyz',
    },
    {
      icon: { name: 'github', iconSet: 'brands' as const },
      href: 'https://github.com/V-Mann-Nick',
      text: 'V-Mann-Nick',
    },
    {
      icon: { name: 'linkedin', iconSet: 'brands' as const },
      href: 'https://www.linkedin.com/in/nicklas-sedlock-53764b1a8/',
      text: 'nicklas-sedlock-53764b1a8',
    },
  ].filter((i): i is Exclude<typeof i, false> => !!i),
} satisfies ContactProps
