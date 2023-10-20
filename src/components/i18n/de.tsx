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
      more: [
        () => (
          <>
            Neuschreiben der Benutzeroberfläche mit einem modularen Ansatz. Die
            Grundlage bildet die hauseigene <TechLink techKey="react" />
            -Komponentbilbiothek. Zum visuellen Testen wird{' '}
            <TechLink techKey="storybook" /> verwendet.
          </>
        ),
        () => (
          <>
            Konfiguration und Verwaltung von <TechLink techKey="keycloak" />,
            einer OpenID Connect Implementierung, für Authentifizierung und
            Autorisierung.
          </>
        ),
        () => (
          <>
            Planung und Durchführung einer Migration der Benutzerdatenbank von{' '}
            <TechLink techKey="auth0" /> zu Keycloak ohne Ausfallzeit.
          </>
        ),
        () => (
          <>
            Neuschreiben des Suchdienstes auf Basis von{' '}
            <TechLink techKey="elasticsearch" />, um dem Benutzer eine
            intelligente Unternehmenssuche bereitzustellen.
          </>
        ),
        () => (
          <>
            Entwicklung des Front- und Back-Ends für eine datengetriebene
            Verkaufsanwendung.
          </>
        ),
        () => (
          <>
            Implementierung, Dokumentierung und Veröffentlichung der
            Open-Source-Bibliothek <TechLink techKey="keycloakAdminAio" />, die
            ich bis heute pflege und weiterentwickle.
          </>
        ),
        () => (
          <>
            Konzeptionierung und Implementierung einer
            Zugriffsverwaltungsanwendung auf Basis von{' '}
            <TechLink techKey="keycloak" />. Sie ermöglicht eine no-code
            Konfiguration von Produktlizenzen für Benutzer.
          </>
        ),
      ],
    },
  },
  projects: {
    title: 'Projekte',
  },
} satisfies DictI18n
