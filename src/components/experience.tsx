import FaBrandsOsi from '~icons/fa-brands/osi'

import citywalxLogo from '../assets/citywalx.svg'
import delphaiLogo from '../assets/delphai.svg'

import { ContentFrame } from './content-frame'
import { ExperienceBox } from './experience-box'
import { useLocale } from './locale-provider'

import type { Component } from 'solid-js'

const OpenSourceContributions: Component = () => {
  const { messages } = useLocale()
  return (
    <ContentFrame class="prose max-w-none shadow" as="article">
      <h2 class="flex gap-4">
        <FaBrandsOsi /> {messages().experience.openSource.title}
      </h2>
    </ContentFrame>
  )
}

export const Experience: Component = () => {
  const { messages } = useLocale()
  return (
    <div class="py-12">
      <div class="flex flex-col gap-8">
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
      </div>
    </div>
  )
}
