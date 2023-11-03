import clsx from 'clsx'
import {
  type Component,
  Show,
  type ValidComponent,
  createEffect,
  createResource,
  createSignal,
  mergeProps,
  onCleanup,
  splitProps,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { useLinkPreviews } from './link-preview-provider'
import { Tooltip } from './tooltip'

type Link = {
  name: string
  link: string
}

export const links = {
  react: {
    name: 'React',
    link: 'https://reactjs.org/',
  },
  keycloak: {
    name: 'Keycloak',
    link: 'https://www.keycloak.org/',
  },
  python: {
    name: 'Python',
    link: 'https://www.python.org/',
  },
  typescript: {
    name: 'Typescript',
    link: 'https://www.typescriptlang.org/',
  },
  elasticsearch: {
    name: 'Elasticsearch',
    link: 'https://www.elastic.co/',
  },
  gRPC: {
    name: 'gRPC',
    link: 'https://grpc.io/',
  },
  kubernetes: {
    name: 'Kubernetes',
    link: 'https://kubernetes.io/',
  },
  terraform: {
    name: 'Terraform',
    link: 'https://www.terraform.io/',
  },
  docker: {
    name: 'Docker',
    link: 'https://www.docker.com/',
  },
  storybook: {
    name: 'Storybook',
    link: 'https://storybook.js.org/',
  },
  auth0: {
    name: 'Auth0',
    link: 'https://auth0.com/',
  },
  keycloakAdminAio: {
    name: 'V-Mann-Nick/keycloak-admin-aio',
    link: 'https://github.com/V-Mann-Nick/keycloak-admin-aio',
  },
  fastApi: {
    name: 'FastAPI',
    link: 'https://fastapi.tiangolo.com/',
  },
  postgresql: {
    name: 'PostgreSQL',
    link: 'https://www.postgresql.org/',
  },
  podman: {
    name: 'Podman',
    link: 'https://podman.io/',
  },
  nomad: {
    name: 'Nomad',
    link: 'https://www.nomadproject.io/',
  },
  consul: {
    name: 'Consul',
    link: 'https://www.consul.io/',
  },
  vault: {
    name: 'Vault',
    link: 'https://www.vaultproject.io/',
  },
  nextjs: {
    name: 'Next.js',
    link: 'https://nextjs.org/',
  },
  turborepo: {
    name: 'Turborepo',
    link: 'https://turbo.build/repo',
  },
  cypress: {
    name: 'Cypress',
    link: 'https://www.cypress.io/',
  },
  gherkinCucumber: {
    name: 'Gherkin/Cucumber',
    link: 'https://cucumber.io',
  },
  stripe: {
    name: 'Stripe',
    link: 'https://stripe.com',
  },
  mapbox: {
    name: 'Mapbox',
    link: 'https://www.mapbox.com/',
  },
  pandas: {
    name: 'Pandas',
    link: 'https://pandas.pydata.org/',
  },
  pydantic: {
    name: 'Pydantic',
    link: 'https://docs.pydantic.dev',
  },
  reactPdf: {
    name: 'React-pdf',
    link: 'https://react-pdf.org/',
  },
  fastify: {
    name: 'Fastify',
    link: 'https://www.fastify.io/',
  },
  gitlabCi: {
    name: 'Gitlab CI',
    link: 'https://docs.gitlab.com/ee/ci/',
  },
  saas: {
    name: 'SaaS',
    link: 'https://en.wikipedia.org/wiki/Software_as_a_service',
  },
  lokiGithub: {
    name: 'Loki',
    link: 'https://github.com/grafana/loki',
  },
  lokiContribution: {
    name: 'Loki Contribution',
    link: 'https://github.com/grafana/loki/pull/6139',
  },
  baseweb: {
    name: 'Baseweb',
    link: 'https://github.com/uber/baseweb',
  },
  basewebContribution: {
    name: 'Baseweb Contribution',
    link: 'https://github.com/uber/baseweb/pull/5218',
  },
  jotaiLocation: {
    name: 'jotai-location',
    link: 'https://github.com/jotaijs/jotai-location',
  },
  jotaiLocationContribution: {
    name: 'jotai-location Contribution',
    link: 'https://github.com/jotaijs/jotai-location/pull/4',
  },
  jotaiTanstackQuery: {
    name: 'jotai-tanstack-query',
    link: 'https://github.com/jotaijs/jotai-tanstack-query',
  },
  jotaiTanstackQueryContribution: {
    name: 'jotai-tanstack-query Contribution',
    link: 'https://github.com/jotaijs/jotai-tanstack-query/pull/35',
  },
} satisfies Record<string, Link>

export type LinkKey = keyof typeof links

type LinkProps = {
  linkKey: LinkKey
  asTag?: boolean
  as?: ValidComponent
}

export const Link: Component<LinkProps> = (_props) => {
  const props = mergeProps({ as: 'a' }, _props)

  const { getLinkPreview } = useLinkPreviews()
  const linkPreview = () => getLinkPreview(props.linkKey)

  const classes = () =>
    props.asTag ? 'badge badge-outline no-underline hover:underline' : ''

  const [showTooltip, setShowTooltip] = createSignal(false)
  const imageLink = () => (showTooltip() ? linkPreview()?.image : undefined)
  const [image] = createResource(imageLink, (imageLink) => {
    const image = new Image()
    image.src = imageLink
    return new Promise<typeof image>((resolve, reject) => {
      image.onload = () => resolve(image)
      image.onerror = () => reject(undefined)
    })
  })
  createEffect(() => {
    if (image.loading) {
      const style = document.createElement('style')
      document.head.appendChild(style)
      style.sheet?.insertRule(`* { cursor: wait !important; }`)
      onCleanup(() => {
        document.head.removeChild(style)
      })
    }
  })

  const showLinkPreview = () => {
    if (!linkPreview() || image.loading) return false
    const hasImage = imageLink() && !image.loading && !image.error
    const hasDescription = linkPreview()?.description?.length
    return !!(hasImage || hasDescription)
  }

  return (
    <Tooltip
      delay={500}
      hideTooltip={!showLinkPreview()}
      placement="bottom"
      tooltip={
        <>
          <Show when={imageLink() && !image.error}>
            <figure>
              <img src={imageLink()} />
            </figure>
          </Show>
          <div class="card-body">
            <h2 class="card-title text-base">{linkPreview()?.title}</h2>
            <Show when={linkPreview()?.description}>
              <p class="text-sm">{linkPreview()?.description}</p>
            </Show>
          </div>
        </>
      }
      tooltipContainerClass={clsx(
        'card card-compact w-80 bg-base-100 shadow-xl transition-opacity transition-transform'
      )}
    >
      {(anchorProps) => {
        const [, forwardedProps] = splitProps(anchorProps.forwardedProps, [
          'onFocus',
          'onBlur',
        ])
        return (
          <Dynamic
            class={classes()}
            component={props.as}
            href={links[props.linkKey].link}
            target="_blank"
            {...forwardedProps}
            onMouseEnter={() => {
              setShowTooltip(true)
              forwardedProps.onMouseEnter()
            }}
            onMouseLeave={() => {
              setShowTooltip(false)
              forwardedProps.onMouseLeave()
            }}
          >
            {links[props.linkKey].name}
          </Dynamic>
        )
      }}
    </Tooltip>
  )
}
