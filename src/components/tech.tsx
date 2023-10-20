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
