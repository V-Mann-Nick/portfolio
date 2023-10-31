import FaBrandsOsi from '~icons/fa-brands/osi'

import citywalxLogo from '../assets/citywalx.svg'
import delphaiLogo from '../assets/delphai.svg'

import { ContentFrame } from './content-frame'
import { ExperienceBox } from './experience-box'
import type { DictI18n } from './i18n'
import { useLinkPreviews } from './link-preview-provider'
import { type LinkKey, links } from './links'
import { useLocale } from './locale-provider'

import type { Component } from 'solid-js'
import { For, Show } from 'solid-js'

type OsContributionDefinition = {
  title?: (messages: DictI18n) => string
  imageLinkKey: LinkKey
  contentLinkKey: LinkKey
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
            src={imageLinkPreview()?.image}
            class="!m-0 aspect-[2/1] w-[min(100%,theme(spacing.72))] rounded-lg sm:w-52"
            loading="lazy"
            alt={
              titleForAlt()
                ? `Link preview for '${titleForAlt()}'`
                : `Link preview`
            }
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
            title: () => 'V-Mann-Nick/keycloak-admin-aio',
            imageLinkKey: 'keycloakAdminAio',
            contentLinkKey: 'keycloakAdminAio',
          },
        ]}
        title="Maintainer"
      />
      <OsContributionList
        contributions={[
          {
            title: (messages) =>
              messages.experience.openSource.pullRequests.lokiDocs,
            imageLinkKey: 'lokiGithub',
            contentLinkKey: 'lokiContribution',
          },
          {
            title: (messages) =>
              messages.experience.openSource.pullRequests.baseweb,
            imageLinkKey: 'baseweb',
            contentLinkKey: 'basewebContribution',
          },
          {
            title: (messages) =>
              messages.experience.openSource.pullRequests.jotaiLocation,
            imageLinkKey: 'jotaiLocation',
            contentLinkKey: 'jotaiLocationContribution',
          },
          {
            title: (messages) =>
              messages.experience.openSource.pullRequests.jotaiTanstackQuery,
            imageLinkKey: 'jotaiTanstackQuery',
            contentLinkKey: 'jotaiTanstackQueryContribution',
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
      <ContentFrame as="h1" class="my-0">
        {messages().experience.title}
      </ContentFrame>
      <ExperienceBox
        title="delphai"
        image={delphaiLogo.src}
        link="https://delphai.com"
        position={messages().experience.fullstackEngineer}
        dates={{
          start: new Date(Date.UTC(2020, 6)),
          end: new Date(Date.UTC(2022, 4)),
        }}
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
        more={messages().experience.delphai.more()}
      />
      <ExperienceBox
        title="Citywalx"
        image={citywalxLogo.src}
        link="https://citywalx.net"
        position={messages().experience.fullstackEngineer}
        dates={{
          start: new Date(Date.UTC(2021, 11)),
          end: new Date(Date.UTC(2023, 7)),
        }}
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
        more={messages().experience.citywalx.more()}
      />
      <OpenSourceContributions />
    </article>
  )
}
