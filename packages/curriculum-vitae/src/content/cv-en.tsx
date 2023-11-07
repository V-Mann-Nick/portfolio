import { getDirName } from '../common/utils'
import { type CurriculumVitaeProps } from '../templates/cv'

const phoneNumber = process.env['PHONE_NUMBER']

const dirName = getDirName(import.meta.url)

export default {
  documentMeta: {
    title: 'Nicklas Sedlock - Curriculum Vitae',
    author: 'Nicklas Sedlock',
    subject:
      'Curriculum Vitae of Nicklas Sedlock - a detail-oriented and versatile programmer with a wide range of expertise',
  },
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
          text: 'nicklas-sedlock-53764b1a8',
        },
      ].filter((i): i is Exclude<typeof i, false> => !!i),
    },
    overviewBlocks: [
      {
        title: 'Core Skills',
        content: [
          'Coding',
          'Teaching & Mentoring',
          'Innovation',
          'Resourcefulness',
        ],
        isHighlightedList: true,
      },
      {
        title: 'Technical Skills',
        content: [
          {
            title: 'Programming Languages',
            content: ['Typescript', 'Python', 'Rust'],
          },
          {
            title: 'Frameworks',
            content: [
              'React',
              'Vue',
              'Solid',
              'Next',
              'Astro',
              'FastAPI',
              'Fastify',
            ],
          },
          {
            title: 'Databases',
            content: ['PostgreSQL', 'MongoDB', 'Elasticsearch'],
          },
          {
            title: 'DevOps',
            content: [
              'Podman',
              'Docker',
              'Terraform',
              'Nomad',
              'CI/CD',
              'Grafana',
              'Kubernetes',
            ],
          },
          {
            title: 'Testing',
            content: [
              'E2E (Cypress, Gherkin)',
              'Property-based (Hypothesis)',
              'Unit (Vitest, Pytest)',
            ],
          },
          {
            title: 'Other',
            content: ['Linux', 'Git', 'Neovim', 'Nix', 'Jira'],
          },
        ],
      },
      {
        title: 'Languages',
        content: [
          { title: 'German', content: '- native', oneLine: true },
          { title: 'English', content: '- native', oneLine: true },
          { title: 'Spanish', content: '- advanced', oneLine: true },
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
                and assign product licenses, followed by onboarding and learning
                sessions.
              </>,
            ],
          },
        ],
      },
      {
        title: 'Education',
        content: [
          {
            title: 'BA Culture and technology: Philosophy',
            keyProperties: [
              {
                icon: { name: 'building-columns' },
                content: 'TU Berlin',
              },
              {
                icon: { name: 'calendar' },
                content: { date: new Date(2020, 3) },
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies CurriculumVitaeProps
