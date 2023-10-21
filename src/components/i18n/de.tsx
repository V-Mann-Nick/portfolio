import { TechLink } from '../tech'

import type { DictI18n } from '.'

export default {
  darkModeToggleTooltip: {
    light: 'Zu hellem Modus wechseln',
    dark: 'Zu dunklem Modus wechseln',
  },
  localeSwitcher: {
    label: 'Sprache verändern',
  },
  mobileNavigation: {
    label: 'Navigation',
  },
  landing: {
    subtitle: 'Programmierer',
    scrollDownTooltip: 'Nach unten scrollen',
  },
  experience: {
    title: 'Erfahrung',
    box: {
      position: 'Stelle',
      dates: 'Zeitraum',
      techStack: 'Technologie-Stack',
      more: 'Mehr',
      less: 'Weniger',
    },
    fullstackEngineer: 'Fullstack-Entwickler',
    delphai: {
      more: () => (
        <ul>
          <li>
            Neuschreiben der Benutzeroberfläche mit einem modularen Ansatz. Die
            Grundlage bildet die hauseigene <TechLink techKey="react" />
            -Komponentenbilbiothek. Zum visuellen Testen wird{' '}
            <TechLink techKey="storybook" /> verwendet.
          </li>
          <li>
            Konfiguration und Verwaltung von <TechLink techKey="keycloak" />,
            einer OpenID Connect Implementierung, für Authentifizierung und
            Autorisierung.
          </li>
          <li>
            Planung und Durchführung einer Migration der Benutzerdatenbank von{' '}
            <TechLink techKey="auth0" /> zu Keycloak ohne Ausfallzeit.
          </li>
          <li>
            Neuschreiben des Suchdienstes auf Basis von{' '}
            <TechLink techKey="elasticsearch" />, um dem Benutzer eine
            intelligente Unternehmenssuche bereitzustellen.
          </li>
          <li>
            Entwicklung des Front- und Back-Ends für eine datengetriebene
            Verkaufsanwendung.
          </li>
          <li>
            Implementierung, Dokumentierung und Veröffentlichung der
            Open-Source-Bibliothek <TechLink techKey="keycloakAdminAio" />, die
            ich bis heute pflege und weiterentwickle.
          </li>
          <li>
            Konzeptionierung und Implementierung einer
            Zugriffsverwaltungsanwendung auf Basis von{' '}
            <TechLink techKey="keycloak" />. Sie ermöglicht eine no-code
            Konfiguration von Produktlizenzen für Benutzer.
          </li>
        </ul>
      ),
    },
    citywalx: {
      more: () => (
        <>
          <ul>
            <li>
              Entwickelte <TechLink techKey="pydantic" />
              -Modelle zur Datenbereinigung und zum Import von offenen
              Datensätzen in die <TechLink techKey="postgresql" />
              -Datenbank nach Durchführung der anfänglichen Datenanalyse mit{' '}
              <TechLink techKey="pandas" />.
            </li>
            <li>
              Implementierte einen PDF-Generierungsdienst unter Verwendung von{' '}
              <TechLink techKey="reactPdf" /> und <TechLink techKey="fastify" />
              . Dieser erstellt Immobilienberichte mit Standortinformationen und
              Analysen.
            </li>
          </ul>
          <p>
            In meiner Rolle habe ich alleine die Entwicklung und Wartung einer
            umfassenden <TechLink techKey="saas" />
            -Plattform und des Flaggschiffprodukts, einer webbasierten
            Kartenanwendung für Standortanalysen, getragen:
          </p>
          <ul>
            <li>
              Verwaltete den gesamten Stack der <TechLink techKey="saas" />
              -Plattform und richtete das Code-Repository mit{' '}
              <TechLink techKey="turborepo" /> ein, um unsere Monorepo-Struktur
              effizient zu verwalten.
            </li>
            <li>
              Entwickelte die zentrale UI-Komponentenbilbiothek auf Basis von{' '}
              <TechLink techKey="baseweb" /> und testete sie auf Regressionen
              anhand von Snapshots.
            </li>
            <li>
              Implementierte die Plattform auf Basis von{' '}
              <TechLink techKey="nextjs" /> mit Schlüsselintegrationen mit{' '}
              <TechLink techKey="keycloak" /> für Authentifizierung und{' '}
              <TechLink techKey="stripe" /> für abonnementbasierte Zahlungen.
            </li>
            <li>
              Entwickelte das Produkt, ein standortbasiertes Analysetool, auf
              Grundlage von <TechLink techKey="mapbox" /> mit mehrsprachiger
              Unterstützung und einer vollständig barrierefreien und für mobile
              Geräte optimierten Benutzeroberfläche. Es integriert sich nahtlos
              mit unserem zentralen Datenlager, das von meinem Kollegen als
              Daten-Backend implementiert wurde. Die Features wurden in{' '}
              <TechLink techKey="gherkinCucumber" /> beschrieben und mit{' '}
              <TechLink techKey="cypress" />
              in Integrationstests überprüft.
            </li>
            <li>
              Trug zur Infrastruktur bei, die mit{' '}
              <TechLink techKey="terraform" /> beschrieben ist und aus
              Bare-Metal-Servern besteht, auf denen das{' '}
              <TechLink techKey="nomad" />
              -Cluster, ein <TechLink techKey="consul" />
              -Service-Mesh und ein <TechLink techKey="vault" />
              -Secret-Store gehostet werden. Deployments wurden mit{' '}
              <TechLink techKey="gitlabCi" /> durchgeführt.
            </li>
          </ul>
        </>
      ),
    },
    openSource: {
      title: 'Open-Source Beiträge',
    },
  },
  projects: {
    title: 'Projekte',
  },
} satisfies DictI18n
