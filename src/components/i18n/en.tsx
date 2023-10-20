import { TechLink } from '../tech'

export default {
  darkModeToggleTooltip: {
    light: 'Switch to light mode',
    dark: 'Switch to dark mode',
  },
  localeSwitcher: {
    label: 'Change language',
  },
  mobileNavigation: {
    label: 'Navigation',
  },
  landing: {
    subtitle: 'Programmer',
  },
  experience: {
    title: 'Experience',
    box: {
      position: 'Position',
      dates: 'Dates',
      techStack: 'Tech Stack',
      more: 'More',
      less: 'Less',
    },
    fullstackEngineer: 'Fullstack Engineer',
    delphai: {
      more: [
        () => (
          <>
            Rewrote the user interface using a modular approach. The base is a{' '}
            <TechLink techKey="react" /> component library providing the
            company's design system and base components. It utilizes{' '}
            <TechLink techKey="storybook" /> for visual testing.
          </>
        ),
        () => (
          <>
            Configured and managed <TechLink techKey="keycloak" /> - an OpenID
            Connect implementation - for authentication and authorization.
          </>
        ),
        () => (
          <>
            Planned and executed a migration of the user database from{' '}
            <TechLink techKey="auth0" /> to Keycloak with no downtime.
          </>
        ),
        () => (
          <>
            Rewrote the search service based on{' '}
            <TechLink techKey="elasticsearch" /> providing intelligent company
            search to the user.
          </>
        ),
        () => (
          <>
            Developed the front-end and back-end for a data driven sales
            application.
          </>
        ),
        () => (
          <>
            Implemented, documented and published the open-source library{' '}
            <TechLink techKey="keycloakAdminAio" /> which I maintain and further
            develop to this day.
          </>
        ),
        () => (
          <>
            Conceptualized and implemented an access management application
            based on top of <TechLink techKey="keycloak" />. It provides
            stakeholders a no code solution to compose detailed product licenses
            and assign them to users.
          </>
        ),
      ],
    },
  },
  projects: {
    title: 'Projects',
  },
}
