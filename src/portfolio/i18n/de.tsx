import { Link } from '../links'

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
            Grundlage bildet die hauseigene <Link linkKey="react" />
            -Komponentenbilbiothek. Zum visuellen Testen wird{' '}
            <Link linkKey="storybook" /> verwendet.
          </li>
          <li>
            Konfiguration und Verwaltung von <Link linkKey="keycloak" />, einer
            OpenID Connect Implementierung, für Authentifizierung und
            Autorisierung.
          </li>
          <li>
            Planung und Durchführung einer Migration der Benutzerdatenbank von{' '}
            <Link linkKey="auth0" /> zu Keycloak ohne Ausfallzeit.
          </li>
          <li>
            Neuschreiben des Suchdienstes auf Basis von{' '}
            <Link linkKey="elasticsearch" />, um dem Benutzer eine intelligente
            Unternehmenssuche bereitzustellen.
          </li>
          <li>
            Entwicklung des Front- und Back-Ends für eine datengetriebene
            Verkaufsanwendung.
          </li>
          <li>
            Implementierung, Dokumentierung und Veröffentlichung der
            Open-Source-Bibliothek <Link linkKey="keycloakAdminAio" />, die ich
            bis heute pflege und weiterentwickle.
          </li>
          <li>
            Konzeptionierung und Implementierung einer
            Zugriffsverwaltungsanwendung auf Basis von{' '}
            <Link linkKey="keycloak" />. Sie ermöglicht eine no-code
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
              Entwickelte <Link linkKey="pydantic" />
              -Modelle zur Datenbereinigung und zum Import von offenen
              Datensätzen in die <Link linkKey="postgresql" />
              -Datenbank nach Durchführung der anfänglichen Datenanalyse mit{' '}
              <Link linkKey="pandas" />.
            </li>
            <li>
              Implementierte einen PDF-Generierungsdienst unter Verwendung von{' '}
              <Link linkKey="reactPdf" /> und <Link linkKey="fastify" />. Dieser
              erstellt Immobilienberichte mit Standortinformationen und
              Analysen.
            </li>
          </ul>
          <p>
            In meiner Rolle habe ich alleine die Entwicklung und Wartung einer
            umfassenden <Link linkKey="saas" />
            -Plattform und des Flaggschiffprodukts, einer webbasierten
            Kartenanwendung für Standortanalysen, getragen:
          </p>
          <ul>
            <li>
              Verwaltete den gesamten Stack der <Link linkKey="saas" />
              -Plattform und richtete das Code-Repository mit{' '}
              <Link linkKey="turborepo" /> ein, um unsere Monorepo-Struktur
              effizient zu verwalten.
            </li>
            <li>
              Entwickelte die zentrale UI-Komponentenbilbiothek auf Basis von{' '}
              <Link linkKey="baseweb" /> und testete sie auf Regressionen anhand
              von Snapshots.
            </li>
            <li>
              Implementierte die Plattform auf Basis von{' '}
              <Link linkKey="nextjs" /> mit Schlüsselintegrationen mit{' '}
              <Link linkKey="keycloak" /> für Authentifizierung und{' '}
              <Link linkKey="stripe" /> für abonnementbasierte Zahlungen.
            </li>
            <li>
              Entwickelte das Produkt, ein standortbasiertes Analysetool, auf
              Grundlage von <Link linkKey="mapbox" /> mit mehrsprachiger
              Unterstützung und einer vollständig barrierefreien und für mobile
              Geräte optimierten Benutzeroberfläche. Es integriert sich nahtlos
              mit unserem zentralen Datenlager, das von meinem Kollegen als
              Daten-Backend implementiert wurde. Die Features wurden in{' '}
              <Link linkKey="gherkinCucumber" /> beschrieben und mit{' '}
              <Link linkKey="cypress" />
              in Integrationstests überprüft.
            </li>
            <li>
              Trug zur Infrastruktur bei, die mit <Link linkKey="terraform" />{' '}
              beschrieben ist und aus Bare-Metal-Servern besteht, auf denen das{' '}
              <Link linkKey="nomad" />
              -Cluster, ein <Link linkKey="consul" />
              -Service-Mesh und ein <Link linkKey="vault" />
              -Secret-Store gehostet werden. Deployments wurden mit{' '}
              <Link linkKey="gitlabCi" /> durchgeführt.
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
