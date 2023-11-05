import { View } from '@react-pdf/renderer'
import { colorsLight } from 'theme'

import { CONTENT_COLUMN_PADDING_X, HEADER_HEIGHT } from './constants'
import { FaIcon } from './fa-icon'
import { H3, H4, Text } from './typography'

export const Content: React.FunctionComponent = () => (
  <View
    style={{
      flex: 1,
      paddingLeft: `${CONTENT_COLUMN_PADDING_X}mm`,
      paddingRight: `${CONTENT_COLUMN_PADDING_X}mm`,
      paddingTop: `${HEADER_HEIGHT}mm`,
      paddingBottom: '12mm',
      backgroundColor: colorsLight['base-200'],
      color: colorsLight['base-content'],
      display: 'flex',
      flexDirection: 'column',
      gap: '6mm',
    }}
  >
    <Text>
      Versatile programmer with a keen eye for detail and a passion for
      automation. I have a strong interest in programming languages and
      compilers, and I am always looking for ways to improve my craft.
    </Text>
    <View>
      <H3 style={{ marginBottom: '3mm' }}>Experience</H3>
      <View style={{ display: 'flex', flexDirection: 'column', gap: '6mm' }}>
        {[
          {
            company: 'delphai',
            start: new Date(Date.UTC(2020, 6)),
            end: new Date(Date.UTC(2022, 4)),
            achievements: [
              "Rewrote the user interface using a modular approach. The base is a React component library providing the company's design system and base components. It utilizes Storybook for visual testing.",
              'Configured and managed Keycloak - an OpenID Connect implementation - for authentication and authorization.',
            ],
          },
          {
            company: 'Citywalx GmbH',
            end: new Date(Date.UTC(2023, 7)),
            start: new Date(Date.UTC(2021, 11)),
            achievements: [
              'Developed Pydantic models for data cleaning and importing of open datasets to the PostgreSQL database after conducting initial data analysis with Pandas.',
              'Implemented a PDF generating service using React-pdf and Fastify. It generates real estate reports providing location information and analysis.',
            ],
          },
        ].map(({ company, start, end, achievements }, idx) => {
          const formatDate = (date: Date) =>
            new Intl.DateTimeFormat('en', {
              month: 'long',
              year: 'numeric',
            }).format(date)
          const startString = formatDate(start)
          const endString = formatDate(end)
          return (
            <View
              key={idx}
              style={{ display: 'flex', flexDirection: 'column', gap: '3mm' }}
            >
              <H4>{company}</H4>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '4mm',
                }}
              >
                {[
                  { icon: 'user', text: 'Fullstack-Engineer' },
                  { icon: 'calendar', text: `${startString} - ${endString}` },
                ].map(({ icon, text }, idx) => (
                  <View
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '2mm',
                      alignItems: 'center',
                    }}
                  >
                    <FaIcon icon={icon} size={36} color={colorsLight.primary} />
                    <Text
                      style={{ color: colorsLight.primary, fontWeight: 500 }}
                    >
                      {text}
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{ display: 'flex', flexDirection: 'column', gap: '2mm' }}
              >
                {achievements.map((achievement, idx) => (
                  <Text key={idx}>• {achievement}</Text>
                ))}
              </View>
            </View>
          )
        })}
      </View>
    </View>
  </View>
)
