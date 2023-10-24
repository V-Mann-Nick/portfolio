import { Link } from '../links'

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
            <Link linkKey="react" /> component library providing the company's
            design system and base components. It utilizes{' '}
            <Link linkKey="storybook" /> for visual testing.
          </li>
          <li>
            Configured and managed <Link linkKey="keycloak" /> - an OpenID
            Connect implementation - for authentication and authorization.
          </li>
          <li>
            Planned and executed a migration of the user database from{' '}
            <Link linkKey="auth0" /> to Keycloak with no downtime.
          </li>
          <li>
            Rewrote the search service based on <Link linkKey="elasticsearch" />{' '}
            providing intelligent company search to the user.
          </li>
          <li>
            Developed the front-end and back-end for a data driven sales
            application.
          </li>
          <li>
            Implemented, documented and published the open-source library{' '}
            <Link linkKey="keycloakAdminAio" /> which I maintain and further
            develop to this day.
          </li>
          <li>
            Conceptualized and implemented an access management application
            based on top of <Link linkKey="keycloak" />. It provides
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
              Developed <Link linkKey="pydantic" /> models for data cleaning and
              importing of open datasets to the <Link linkKey="postgresql" />{' '}
              database after conducting initial data analysis with{' '}
              <Link linkKey="pandas" />.
            </li>
            <li>
              Implemented a PDF generating service using{' '}
              <Link linkKey="reactPdf" /> and <Link linkKey="fastify" />. It
              generates real estate reports providing location information and
              analysis.
            </li>
          </ul>
          <p>
            In my role, I single-handedly undertook the development and
            maintenance of a comprehensive <Link linkKey="saas" /> platform and
            the company's flagship product, a map-based web application for
            location analysis:
          </p>
          <ul>
            <li>
              Managed the entire <Link linkKey="saas" /> platform's stack,
              setting up the code repository with <Link linkKey="turborepo" />{' '}
              to efficiently manage our monorepo structure.
            </li>
            <li>
              Built the core UI component library on top of{' '}
              <Link linkKey="baseweb" /> and tested it for regressions with
              snapshots.
            </li>
            <li>
              Built the platform with <Link linkKey="nextjs" /> featuring key
              integrations with <Link linkKey="keycloak" /> for authentication
              and <Link linkKey="stripe" /> for subscription based payments.
            </li>
            <li>
              Developed the product - a map based location analysis tool - with{' '}
              <Link linkKey="mapbox" /> featuring multi language support and a
              fully accessible and mobile optimized interface. It integrates
              with our central data warehouse implemented by my colleague as a
              data back-end. Features were specified with{' '}
              <Link linkKey="gherkinCucumber" /> and tested with{' '}
              <Link linkKey="cypress" /> in integration.
            </li>
            <li>
              Contributed to the infrastructure configured with{' '}
              <Link linkKey="terraform" /> consiting of bare metal servers
              hosting the <Link linkKey="nomad" /> cluster, a{' '}
              <Link linkKey="consul" /> service mesh and a{' '}
              <Link linkKey="vault" /> secret store. Deployments were done with{' '}
              <Link linkKey="gitlabCi" />.
            </li>
          </ul>
        </>
      ),
    },
    openSource: {
      title: 'Open Source Contributions',
      pullRequests: {
        lokiDocs: 'Contribution to Loki documentation',
        baseweb: 'Fix for Baseweb react component library',
        jotaiLocation: 'API extension for jotai-location',
        jotaiTanstackQuery: 'Fix for jotai-tanstack-query',
      },
    },
  },
  projects: {
    title: 'Projects',
  },
}
