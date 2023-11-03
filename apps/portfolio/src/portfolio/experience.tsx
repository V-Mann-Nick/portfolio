import type { Component } from 'solid-js'

import FaBrandsOsi from '~icons/fa-brands/osi'
import { For, Show } from 'solid-js'

import type { DictI18n } from './i18n'

import citywalxLogo from '../assets/citywalx.svg'
import delphaiLogo from '../assets/delphai.svg'
import { ContentFrame } from './content-frame'
import { ExperienceBox } from './experience-box'
import { useLinkPreviews } from './link-preview-provider'
import { type LinkKey, links } from './links'
import { useLocale } from './locale-provider'

type OsContributionDefinition = {
  contentLinkKey: LinkKey
  imageLinkKey: LinkKey
  title?: (messages: DictI18n) => string
}

const OsContribution: Component<OsContributionDefinition> = (props) => {
  const { messages } = useLocale()
  const { getLinkPreview } = useLinkPreviews()
  const imageLinkPreview = () => getLinkPreview(props.imageLinkKey)
  const contentLinkPreview = () => getLinkPreview(props.contentLinkKey)
  const titleForAlt = () =>
    props.title?.(messages()) || contentLinkPreview()?.title
  return (
    <Show when={imageLinkPreview()?.image && contentLinkPreview()?.title}>
      <li class="!m-0 !p-0">
        <a
          class="!m-0 flex flex-col items-center gap-6 rounded-lg !p-4 !no-underline transition-colors hover:bg-base-300 hover:text-base-content sm:flex-row sm:gap-8"
          href={links[props.contentLinkKey].link}
          target="_blank"
        >
          <img
            class="!m-0 aspect-[2/1] w-[min(100%,theme(spacing.72))] rounded-lg sm:w-52"
            alt={
              titleForAlt()
                ? `Link preview for '${titleForAlt()}'`
                : `Link preview`
            }
            loading="lazy"
            src={imageLinkPreview()?.image}
          />
          <div>
            <Show when={props.title}>
              {(title) => <h4 class="!mt-0">{title()(messages())}</h4>}
            </Show>
            <p class="!mb-0 text-sm">{contentLinkPreview()?.title}</p>
          </div>
        </a>
      </li>
    </Show>
  )
}

const OsContributionList: Component<{
  contributions: OsContributionDefinition[]
  title: string
}> = (props) => (
  <>
    <h3>{props.title}</h3>
    <ul class="!m-0 flex list-none flex-col gap-4 !p-0 sm:gap-0">
      <For each={props.contributions}>{OsContribution}</For>
    </ul>
  </>
)

const OpenSourceContributions: Component = () => {
  const { messages } = useLocale()
  return (
    <ContentFrame class="prose max-w-none shadow" as="article">
      <h2 class="flex gap-4">
        <FaBrandsOsi /> {messages().experience.openSource.title}
      </h2>
      <OsContributionList
        contributions={[
          {
            contentLinkKey: 'keycloakAdminAio',
            imageLinkKey: 'keycloakAdminAio',
            title: () => 'V-Mann-Nick/keycloak-admin-aio',
          },
        ]}
        title="Maintainer"
      />
      <OsContributionList
        contributions={[
          {
            contentLinkKey: 'lokiContribution',
            imageLinkKey: 'lokiGithub',
            title: (messages) =>
              messages.experience.openSource.pullRequests.lokiDocs,
          },
          {
            contentLinkKey: 'basewebContribution',
            imageLinkKey: 'baseweb',
            title: (messages) =>
              messages.experience.openSource.pullRequests.baseweb,
          },
          {
            contentLinkKey: 'jotaiLocationContribution',
            imageLinkKey: 'jotaiLocation',
            title: (messages) =>
              messages.experience.openSource.pullRequests.jotaiLocation,
          },
          {
            contentLinkKey: 'jotaiTanstackQueryContribution',
            imageLinkKey: 'jotaiTanstackQuery',
            title: (messages) =>
              messages.experience.openSource.pullRequests.jotaiTanstackQuery,
          },
        ]}
        title="Pull requests"
      />
    </ContentFrame>
  )
}

export const Experience: Component = () => {
  const { messages } = useLocale()
  return (
    <article class="prose flex max-w-none flex-col gap-4 py-12">
      <ContentFrame class="my-0" as="h1">
        {messages().experience.title}
      </ContentFrame>
      <ExperienceBox
        dates={{
          end: new Date(Date.UTC(2022, 4)),
          start: new Date(Date.UTC(2020, 6)),
        }}
        image={delphaiLogo.src}
        link="https://delphai.com"
        more={messages().experience.delphai.more()}
        position={messages().experience.fullstackEngineer}
        techStack={[
          'typescript',
          'react',
          'keycloak',
          'python',
          'gRPC',
          'elasticsearch',
          'kubernetes',
          'terraform',
          'docker',
        ]}
        title="delphai"
      />
      <ExperienceBox
        dates={{
          end: new Date(Date.UTC(2023, 7)),
          start: new Date(Date.UTC(2021, 11)),
        }}
        image={citywalxLogo.src}
        link="https://citywalx.net"
        more={messages().experience.citywalx.more()}
        position={messages().experience.fullstackEngineer}
        techStack={[
          'fastApi',
          'python',
          'postgresql',
          'podman',
          'nomad',
          'consul',
          'vault',
          'terraform',
          'typescript',
          'nextjs',
          'react',
          'mapbox',
          'turborepo',
          'cypress',
          'gherkinCucumber',
          'stripe',
          'keycloak',
        ]}
        title="Citywalx"
      />
      <OpenSourceContributions />
    </article>
  )
}
