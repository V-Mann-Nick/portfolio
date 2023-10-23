import { defaultLocale } from './i18n'
import { useLinkPreviews } from './link-preview-provider'
import { useLocale } from './locale-provider'

import {
  type Component,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
  Show,
} from 'solid-js'
import { Portal } from 'solid-js/web'
import usePopper from 'solid-popper'

type Tech = {
  name: string
  link: string
}

export const techStack = {
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
} satisfies Record<string, Tech>

export type TechKey = keyof typeof techStack

type TechLinkProps = {
  techKey: TechKey
  asTag?: boolean
}

export const TechLink: Component<TechLinkProps> = (props) => {
  const { currentLocale } = useLocale()
  const linkPreviews = useLinkPreviews()
  const linkPreview = () =>
    linkPreviews[props.techKey].previews[currentLocale()] ??
    linkPreviews[props.techKey].previews[defaultLocale]

  let hoverTimeout: NodeJS.Timeout | undefined
  const [isHovered, setIsHovered] = createSignal(false)
  const [isAnimatedIn, setIsAnimatedIn] = createSignal(false)
  const [anchor, setAnchor] = createSignal<HTMLElement>()
  const [popper, setPopper] = createSignal<HTMLElement>()

  createEffect(() => {
    if (isHovered()) {
      requestAnimationFrame(() => setIsAnimatedIn(true))
    } else {
      setIsAnimatedIn(false)
    }
  })

  usePopper(anchor, popper, {
    placement: 'bottom',
    modifiers: [
      { name: 'offset', options: { offset: [0, 10] } },
      { name: 'preventOverflow', options: { padding: 10 } },
      {
        name: 'addZIndex',
        enabled: true,
        phase: 'write',
        fn({ state }) {
          state.elements.popper.classList.add('z-50')
        },
      },
    ],
  })

  const classes = () =>
    props.asTag ? 'badge badge-outline no-underline hover:underline' : ''

  const imageLink = () => (isHovered() ? linkPreview()?.image : undefined)
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
    if (!linkPreview() || !isHovered() || image.loading) return false
    const hasImage = imageLink() && !image.loading && !image.error
    const hasDescription = linkPreview()?.description?.length
    return hasImage || hasDescription
  }

  return (
    <>
      <a
        href={techStack[props.techKey].link}
        target="_blank"
        ref={setAnchor}
        class={classes()}
        onMouseEnter={() => {
          hoverTimeout = setTimeout(() => setIsHovered(true), 500)
        }}
        onMouseLeave={() => {
          clearTimeout(hoverTimeout)
          setIsHovered(false)
        }}
      >
        {techStack[props.techKey].name}
      </a>
      <Show when={showLinkPreview()}>
        <Portal ref={setPopper}>
          <div
            class="card-compact card w-96 bg-base-100 shadow-xl transition-opacity transition-transform"
            classList={{
              'opacity-0': !isAnimatedIn(),
              'opacity-100': isAnimatedIn(),
              'scale-95': !isAnimatedIn(),
              'scale-100': isAnimatedIn(),
            }}
          >
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
          </div>
        </Portal>
      </Show>
    </>
  )
}
