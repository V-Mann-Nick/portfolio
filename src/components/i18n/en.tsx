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
    scrollDownTooltip: 'Scroll down',
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
      more: () => (
        <ul>
          <li>
            Rewrote the user interface using a modular approach. The base is a{' '}
            <TechLink techKey="react" /> component library providing the
            company's design system and base components. It utilizes{' '}
            <TechLink techKey="storybook" /> for visual testing.
          </li>
          <li>
            Configured and managed <TechLink techKey="keycloak" /> - an OpenID
            Connect implementation - for authentication and authorization.
          </li>
          <li>
            Planned and executed a migration of the user database from{' '}
            <TechLink techKey="auth0" /> to Keycloak with no downtime.
          </li>
          <li>
            Rewrote the search service based on{' '}
            <TechLink techKey="elasticsearch" /> providing intelligent company
            search to the user.
          </li>
          <li>
            Developed the front-end and back-end for a data driven sales
            application.
          </li>
          <li>
            Implemented, documented and published the open-source library{' '}
            <TechLink techKey="keycloakAdminAio" /> which I maintain and further
            develop to this day.
          </li>
          <li>
            Conceptualized and implemented an access management application
            based on top of <TechLink techKey="keycloak" />. It provides
            stakeholders a no-code solution to compose detailed product licenses
            and assign them to users.
          </li>
        </ul>
      ),
    },
    citywalx: {
      more: () => (
        <>
          <ul>
            <li>
              Developed <TechLink techKey="pydantic" /> models for data cleaning
              and importing of open datasets to the{' '}
              <TechLink techKey="postgresql" /> database after conducting
              initial data analysis with <TechLink techKey="pandas" />.
            </li>
            <li>
              Implemented a PDF generating service using{' '}
              <TechLink techKey="reactPdf" /> and <TechLink techKey="fastify" />
              . It generates real estate reports providing location information
              and analysis.
            </li>
          </ul>
          <p>
            In my role, I single-handedly undertook the development and
            maintenance of a comprehensive <TechLink techKey="saas" /> platform
            and the company's flagship product, a map-based web application for
            location analysis:
          </p>
          <ul>
            <li>
              Managed the entire <TechLink techKey="saas" /> platform's stack,
              setting up the code repository with{' '}
              <TechLink techKey="turborepo" /> to efficiently manage our
              monorepo structure.
            </li>
            <li>
              Built the core UI component library on top of{' '}
              <TechLink techKey="baseweb" /> and tested it for regressions with
              snapshots.
            </li>
            <li>
              Built the platform with <TechLink techKey="nextjs" /> featuring
              key integrations with <TechLink techKey="keycloak" /> for
              authentication and <TechLink techKey="stripe" /> for subscription
              based payments.
            </li>
            <li>
              Developed the product - a map based location analysis tool - with{' '}
              <TechLink techKey="mapbox" /> featuring multi language support and
              a fully accessible and mobile optimized interface. It integrates
              with our central data warehouse implemented by my colleague as a
              data back-end. Features were specified with{' '}
              <TechLink techKey="gherkinCucumber" /> and tested with{' '}
              <TechLink techKey="cypress" /> in integration.
            </li>
            <li>
              Contributed to the infrastructure configured with{' '}
              <TechLink techKey="terraform" /> consiting of bare metal servers
              hosting the <TechLink techKey="nomad" /> cluster, a{' '}
              <TechLink techKey="consul" /> service mesh and a{' '}
              <TechLink techKey="vault" /> secret store. Deployments were done
              with <TechLink techKey="gitlabCi" />.
            </li>
          </ul>
        </>
      ),
    },
    openSource: {
      title: 'Open Source Contributions',
    },
  },
  projects: {
    title: 'Projects',
  },
}
