type Tech = {
  name: string
  link: string
}

const techStack = {
  react: {
    name: 'React',
    link: 'https://reactjs.org/',
  },
  keycloak: {
    name: 'Keycloak',
    link: 'https://www.keycloak.org/',
  },
} satisfies Record<string, Tech>

export type TechKey = keyof typeof techStack

export default techStack
