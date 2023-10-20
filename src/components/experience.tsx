import citywalxLogo from '../assets/citywalx.svg'
import delphaiLogo from '../assets/delphai.svg'

import { ExperienceBox } from './experience-box'
import { useLocale } from './locale-provider'

import type { Component } from 'solid-js'
import { For } from 'solid-js'

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
          more={
            <ul>
              <For each={messages().experience.delphai.more}>
                {(Paragraph) => (
                  <li>
                    <Paragraph />
                  </li>
                )}
              </For>
            </ul>
          }
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
          techStack={['react', 'keycloak']}
          more={
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse posuere faucibus semper. Quisque ultrices finibus
                laoreet. Mauris orci enim, porta ut ex vitae, scelerisque
                vulputate lorem. Nam et eros id nisl dictum pharetra. Praesent
                eleifend mollis elementum. Etiam tristique arcu a rhoncus
                mollis. Quisque malesuada nisi nec odio aliquet semper.
              </p>
              <p>
                Cras eget tempor neque. Suspendisse eget lectus congue,
                tincidunt massa at, ornare velit. Pellentesque scelerisque,
                metus at efficitur commodo, justo odio porttitor lacus, ac
                molestie justo risus vitae risus. Nunc sollicitudin sapien sit
                amet lobortis varius. Aliquam auctor ligula sed leo mollis
                placerat. Duis fringilla turpis elit, vitae ornare lacus finibus
                vestibulum. Aenean luctus consectetur est. Duis quis ante
                mattis, aliquet turpis id, sodales lectus. Nulla eu magna nec
                nunc vestibulum malesuada.
              </p>
            </>
          }
        />
      </div>
    </div>
  )
}
