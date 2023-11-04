import { View } from '@react-pdf/renderer'
import { colorsDark, colorsLight } from 'theme'

import {
  HEADER_HEIGHT,
  OVERVIEW_COLUMN_PADDING_X,
  OVERVIEW_COLUMN_WIDTH,
} from './constants'
import { FaIcon } from './fa-icon'
import { H3, KeyTitle, Text } from './typography'

const phoneNumber = process.env['PHONE_NUMBER']

export const Overview: React.FunctionComponent = () => (
  <View
    style={{
      width: `${OVERVIEW_COLUMN_WIDTH}mm`,
      backgroundColor: colorsDark['base-300'],
      height: '100%',
      color: colorsDark['base-content'],
      padding: `${OVERVIEW_COLUMN_PADDING_X}mm`,
      paddingTop: `${HEADER_HEIGHT}mm`,
    }}
  >
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '9mm',
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'column', gap: '3mm' }}>
        {[
          {
            icon: 'location-pin',
            text: 'Berlin, Germany',
          },
          {
            icon: 'envelope',
            get href() {
              return `mailto:${this.text}`
            },
            text: 'nicklas.sedlock@posteo.net',
          },
          !!phoneNumber && {
            icon: 'phone',
            get href() {
              return `tel:${this.text.replace(' ', '')}`
            },
            text: phoneNumber,
          },
          {
            icon: 'globe',
            get href() {
              return `https://${this.text}`
            },
            text: 'nicklas.sedlock.xyz',
          },
          {
            icon: 'github',
            iconSet: 'brands' as const,
            href: 'https://github.com/V-Mann-Nick',
            text: 'V-Mann-Nick',
          },
          {
            icon: 'linkedin',
            iconSet: 'brands' as const,
            href: 'https://www.linkedin.com/in/nicklas-sedlock-53764b1a8/',
            text: 'nicklas-sedlock',
          },
        ]
          .filter((i): i is Exclude<typeof i, false> => !!i)
          .map(({ icon, href, text, iconSet }, idx) => (
            <View
              style={{ display: 'flex', flexDirection: 'row', gap: '2mm' }}
              key={idx}
            >
              <View
                style={{
                  width: '6mm',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FaIcon icon={icon} iconSet={iconSet} color={colorsDark.info} />
              </View>
              <Text
                as={href ? 'link' : 'text'}
                src={href}
                style={{
                  color: colorsDark['base-content'],
                  textDecoration: 'none',
                }}
              >
                {text}
              </Text>
            </View>
          ))}
      </View>
      <View>
        <H3 style={{ marginBottom: '3mm' }}>Skills</H3>
        <View style={{ display: 'flex', flexDirection: 'column', gap: '4mm' }}>
          {[
            {
              title: 'Programming Languages',
              text: 'Typescript, Python, Rust',
            },
            { title: 'Front-end', text: 'React, Vue, SolidJS' },
            { title: 'Back-end', text: 'FastAPI, Keycloak' },
            { title: 'Databases', text: 'PostgreSQL, MongoDB, Elasticsearch' },
            {
              title: 'DevOps',
              text: 'Podman, Docker, Kubernetes, Terraform, Nomad, CI/CD',
            },
            { title: 'Other', text: 'Linux, Git, Neovim, Nix' },
          ].map(({ title, text }, idx) => (
            <View
              key={idx}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5mm' }}
            >
              <KeyTitle style={{ color: colorsLight.info }}>{title}</KeyTitle>
              <Text>{text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  </View>
)
