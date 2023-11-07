import type { CoverLetterProps } from '../templates/cover-letter/cover-letter'

const phoneNumber = process.env['PHONE_NUMBER']

export default {
  documentMeta: {
    title: 'Cover Letter',
    author: 'Nicklas Sedlock',
  },
  header: {
    name: 'Nicklas Sedlock',
    receiver: {
      name: 'Company Name',
      addressLines: ['Street Address', 'City, State, Zip Code'],
    },
    contact: {
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
    },
  },
  content: {
    city: 'Berlin',
    greeting: 'Dear Sir or Madam',
    paragraphs: [
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        molestie semper facilisis. Suspendisse hendrerit faucibus fringilla.
        Vestibulum gravida nulla et augue rhoncus, non cursus dolor rutrum.
        Etiam eu turpis a quam hendrerit condimentum nec ut libero. Curabitur
        ornare dui arcu, auctor facilisis dolor volutpat quis. Nunc eu nisl
        efficitur, sagittis augue a, auctor tortor. Aliquam leo nisl, tempus et
        tincidunt quis, dapibus nec arcu. Ut in metus ipsum. Proin sit amet
        placerat neque.
      </>,
      <>
        Donec pharetra est eget elit lacinia, nec gravida libero fringilla.
        Aenean eu aliquam neque. In molestie lectus lectus, at accumsan nisi
        venenatis sed. Etiam turpis tortor, fermentum nec tortor ac, facilisis
        lobortis massa. Curabitur turpis ante, laoreet a eleifend id, placerat a
        purus. Nulla sed velit accumsan massa mattis ultricies quis vitae sem.
        Donec risus orci, condimentum vel ullamcorper id, mollis et massa. Nunc
        nec fringilla felis. Maecenas non magna gravida, mattis enim quis,
        scelerisque odio. Integer purus dolor, consectetur non iaculis ac,
        sagittis quis turpis.
      </>,
      <>
        Quisque condimentum cursus elementum. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Nunc egestas
        mauris sed interdum ultrices. Donec mollis fermentum sodales. Nam non
        lobortis felis. Sed tincidunt justo sit amet neque accumsan accumsan.
        Proin vitae orci congue, tempus nibh sed, egestas urna. Nulla facilisi.
        Maecenas at faucibus neque. Nullam hendrerit id sem at ultricies.{' '}
      </>,
    ],
    valediction: ['Sincerely,', 'Nicklas Sedlock'],
  },
} satisfies CoverLetterProps
