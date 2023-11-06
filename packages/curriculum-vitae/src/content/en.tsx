import { type CurriculumVitaeProps } from '../template'
import { getDirName } from '../utils'

const phoneNumber = process.env['PHONE_NUMBER']

const dirName = getDirName(import.meta.url)

export default {
  header: {
    title: 'Nicklas Sedlock',
    subtitle: 'Programmer',
    picture: `${dirName}/me.jpeg`,
  },
  overview: {
    contact: {
      contactInfo: [
        {
          icon: { name: 'location-pin' },
          text: 'Berlin, Germany',
        },
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
          text: 'nicklas-sedlock',
        },
      ].filter((i): i is Exclude<typeof i, false> => !!i),
    },
    overviewBlocks: [
      {
        title: 'Skills',
        content: [
          {
            title: 'Programming Languages',
            content: ['Typescript', 'Python', 'Rust'],
          },
          { title: 'Front-end', content: ['React', 'Vue', 'SolidJS'] },
          { title: 'Back-end', content: ['FastAPI', 'Keycloak'] },
          {
            title: 'Databases',
            content: ['PostgreSQL', 'MongoDB', 'Elasticsearch'],
          },
          {
            title: 'DevOps',
            content: [
              'Podman',
              'Docker',
              'Kubernetes',
              'Terraform',
              'Nomad',
              'CI/CD',
              'Grafana',
            ],
          },
          { title: 'Other', content: ['Linux', 'Git', 'Neovim', 'Nix'] },
        ],
      },
    ],
  },
  content: {
    contentBlocks: [
      {
        content: (
          <>
            Detail-oriented and versatile programmer with a wide range of
            expertise spanning front-end, back-end, infrastructure, and
            developer tools. Adept at streamlining workflows, fostering
            communication through comprehensive documentation and engaging
            conversations. Passionate about teaching and presenting innovative
            concepts and tools to empower teams for success.
          </>
        ),
      },
      {
        title: 'Experience',
        content: [
          {
            title: 'Citywalx GmbH',
            keyProperties: [
              {
                icon: { name: 'user' },
                content: 'Fullstack-Engineer',
              },
              {
                icon: { name: 'calendar' },
                content: {
                  from: new Date(Date.UTC(2021, 11)),
                  to: new Date(Date.UTC(2023, 7)),
                },
              },
            ],
            isList: true,
            content: [
              <>
                Solely developed and maintained a comprehensive SaaS platform,
                seamlessly integrating with Stripe for subscription-based
                payments and Keycloak for authentication and authorization,
                managing the full stack, encompassing UI, back-end services,
                monitoring, and infrastructure.
              </>,
              <>
                Engineered a map-based location analysis tool with a fully
                accessible, multi-lingual, and mobile-optimized interface,
                complete with an export function to generate comprehensive PDF
                reports, significantly improving decision-making processes.
              </>,
            ],
          },
          {
            title: 'delphai',
            keyProperties: [
              {
                icon: { name: 'user' },
                content: 'Fullstack-Engineer',
              },
              {
                icon: { name: 'calendar' },
                content: {
                  from: new Date(Date.UTC(2020, 6)),
                  to: new Date(Date.UTC(2022, 4)),
                },
              },
            ],
            isList: true,
            content: [
              <>
                Overhauled the front-end architecture through a modular
                approach, significantly enhancing system flexibility and
                boosting overall productivity, resulting in more efficient
                development and improved user experiences.
              </>,
              <>
                Configured and managed Keycloak for user authentication and
                authorization, and developed a custom, no-code access management
                system on top of it, allowing stakeholders to seamlessly create
                and assign product licenses.
              </>,
            ],
          },
        ],
      },
    ],
  },
} satisfies CurriculumVitaeProps
