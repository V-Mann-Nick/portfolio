import { defaultLocale } from './i18n'
import { useLinkPreviews } from './link-preview-provider'
import { useLocale } from './locale-provider'
import { Tooltip } from './tooltip'

import clsx from 'clsx'
import {
  type Component,
  createEffect,
  createResource,
  createSignal,
  mergeProps,
  onCleanup,
  Show,
  type ValidComponent,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'

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
  baseweb: {
    name: 'Baseweb',
    link: 'https://baseweb.design/',
  },
  gitlabCi: {
    name: 'Gitlab CI',
    link: 'https://docs.gitlab.com/ee/ci/',
  },
  saas: {
    name: 'SaaS',
    link: 'https://en.wikipedia.org/wiki/Software_as_a_service',
  },
  myGithub: {
    name: 'Github',
    link: 'https://github.com/V-Mann-Nick',
  },
  myLinkedin: {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/nicklas-sedlock-53764b1a8',
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

  const { currentLocale } = useLocale()
  const linkPreviews = useLinkPreviews()
  const linkPreview = () =>
    linkPreviews[props.linkKey].previews[currentLocale()] ??
    linkPreviews[props.linkKey].previews[defaultLocale]

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
      tooltipContainerClass={clsx(
        'card-compact card w-80 bg-base-100 shadow-xl transition-opacity transition-transform'
      )}
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
    >
      {(anchorProps) => {
        return (
          <Dynamic
            component={props.as}
            href={links[props.linkKey].link}
            target="_blank"
            class={classes()}
            ref={anchorProps.ref}
            onMouseEnter={() => {
              setShowTooltip(true)
              anchorProps.onMouseEnter()
            }}
            onMouseLeave={() => {
              setShowTooltip(false)
              anchorProps.onMouseLeave()
            }}
          >
            {links[props.linkKey].name}
          </Dynamic>
        )
      }}
    </Tooltip>
  )
}
