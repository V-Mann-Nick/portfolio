import type { Component } from 'solid-js'

type Tech = {
  name: string
  link: string
}

export const techStack = {
  react: {
    name: 'React',
    link: 'https://reactjs.org/',
  },
  keycloak: {
    name: 'Keycloak',
    link: 'https://www.keycloak.org/',
  },
  python: {
    name: 'Python',
    link: 'https://www.python.org/',
  },
  typescript: {
    name: 'Typescript',
    link: 'https://www.typescriptlang.org/',
  },
  elasticsearch: {
    name: 'Elasticsearch',
    link: 'https://www.elastic.co/',
  },
  gRPC: {
    name: 'gRPC',
    link: 'https://grpc.io/',
  },
  kubernetes: {
    name: 'Kubernetes',
    link: 'https://kubernetes.io/',
  },
  terraform: {
    name: 'Terraform',
    link: 'https://www.terraform.io/',
  },
  docker: {
    name: 'Docker',
    link: 'https://www.docker.com/',
  },
  storybook: {
    name: 'Storybook',
    link: 'https://storybook.js.org/',
  },
  auth0: {
    name: 'Auth0',
    link: 'https://auth0.com/',
  },
  keycloakAdminAio: {
    name: 'V-Mann-Nick/keycloak-admin-aio',
    link: 'https://github.com/V-Mann-Nick/keycloak-admin-aio',
  },
  fastApi: {
    name: 'FastAPI',
    link: 'https://fastapi.tiangolo.com/',
  },
  postgresql: {
    name: 'PostgreSQL',
    link: 'https://www.postgresql.org/',
  },
  podman: {
    name: 'Podman',
    link: 'https://podman.io/',
  },
  nomad: {
    name: 'Nomad',
    link: 'https://www.nomadproject.io/',
  },
  consul: {
    name: 'Consul',
    link: 'https://www.consul.io/',
  },
  vault: {
    name: 'Vault',
    link: 'https://www.vaultproject.io/',
  },
  nextjs: {
    name: 'Next.js',
    link: 'https://nextjs.org/',
  },
  turborepo: {
    name: 'Turborepo',
    link: 'https://turbo.build/repo',
  },
  cypress: {
    name: 'Cypress',
    link: 'https://www.cypress.io/',
  },
  gherkinCucumber: {
    name: 'Gherkin/Cucumber',
    link: 'https://cucumber.io',
  },
  stripe: {
    name: 'Stripe',
    link: 'https://stripe.com',
  },
  mapbox: {
    name: 'Mapbox',
    link: 'https://www.mapbox.com/',
  },
  pandas: {
    name: 'Pandas',
    link: 'https://pandas.pydata.org/',
  },
  pydantic: {
    name: 'Pydantic',
    link: 'https://docs.pydantic.dev',
  },
  reactPdf: {
    name: 'React-pdf',
    link: 'https://react-pdf.org/',
  },
  fastify: {
    name: 'Fastify',
    link: 'https://www.fastify.io/',
  },
  baseweb: {
    name: 'Baseweb',
    link: 'https://baseweb.design/',
  },
  gitlabCi: {
    name: 'Gitlab CI',
    link: 'https://docs.gitlab.com/ee/ci/',
  },
  saas: {
    name: 'SaaS',
    link: 'https://en.wikipedia.org/wiki/Software_as_a_service',
  },
} satisfies Record<string, Tech>

export type TechKey = keyof typeof techStack

export const TechTag: Component<{ techKey: TechKey }> = (props) => (
  <a
    class="badge badge-outline no-underline hover:underline"
    href={techStack[props.techKey].link}
    target="_blank"
  >
    {techStack[props.techKey].name}
  </a>
)

export const TechLink: Component<{ techKey: TechKey }> = (props) => (
  <a href={techStack[props.techKey].link} target="_blank">
    {techStack[props.techKey].name}
  </a>
)
