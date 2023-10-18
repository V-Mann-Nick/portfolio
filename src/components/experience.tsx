import citywalxLogo from '../assets/citywalx.svg'
import delphaiLogo from '../assets/delphai.svg'

import { ExperienceBox } from './experience-box'

import type { Component } from 'solid-js'

export const Experience: Component = () => (
  <div class="py-12">
    <div class="flex flex-col gap-8">
      <ExperienceBox
        title="delphai"
        key="delphai"
        image={delphaiLogo.src}
        link="https://delphai.com"
        position="Fullstack Developer"
        techStack={['react', 'keycloak']}
        more={
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse posuere faucibus semper. Quisque ultrices finibus
              laoreet. Mauris orci enim, porta ut ex vitae, scelerisque
              vulputate lorem. Nam et eros id nisl dictum pharetra. Praesent
              eleifend mollis elementum. Etiam tristique arcu a rhoncus mollis.
              Quisque malesuada nisi nec odio aliquet semper.
            </p>
            <p>
              Cras eget tempor neque. Suspendisse eget lectus congue, tincidunt
              massa at, ornare velit. Pellentesque scelerisque, metus at
              efficitur commodo, justo odio porttitor lacus, ac molestie justo
              risus vitae risus. Nunc sollicitudin sapien sit amet lobortis
              varius. Aliquam auctor ligula sed leo mollis placerat. Duis
              fringilla turpis elit, vitae ornare lacus finibus vestibulum.
              Aenean luctus consectetur est. Duis quis ante mattis, aliquet
              turpis id, sodales lectus. Nulla eu magna nec nunc vestibulum
              malesuada.
            </p>
          </>
        }
      />
      <ExperienceBox
        title="Citywalx"
        key="citywalx"
        image={citywalxLogo.src}
        link="https://citywalx.net"
        position="Fullstack Developer"
        techStack={['react', 'keycloak']}
        more={
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse posuere faucibus semper. Quisque ultrices finibus
              laoreet. Mauris orci enim, porta ut ex vitae, scelerisque
              vulputate lorem. Nam et eros id nisl dictum pharetra. Praesent
              eleifend mollis elementum. Etiam tristique arcu a rhoncus mollis.
              Quisque malesuada nisi nec odio aliquet semper.
            </p>
            <p>
              Cras eget tempor neque. Suspendisse eget lectus congue, tincidunt
              massa at, ornare velit. Pellentesque scelerisque, metus at
              efficitur commodo, justo odio porttitor lacus, ac molestie justo
              risus vitae risus. Nunc sollicitudin sapien sit amet lobortis
              varius. Aliquam auctor ligula sed leo mollis placerat. Duis
              fringilla turpis elit, vitae ornare lacus finibus vestibulum.
              Aenean luctus consectetur est. Duis quis ante mattis, aliquet
              turpis id, sodales lectus. Nulla eu magna nec nunc vestibulum
              malesuada.
            </p>
          </>
        }
      />
    </div>
  </div>
)
