import { Link } from "../link.tsx";

export default {
  meta: {
    description:
      "Meet Nicklas, a programmer who's passionate about the great outdoors. With a self-taught programming background, he's a problem solver and lifelong learner. Explore his unique journey.",
  },
  darkModeToggleTooltip: {
    light: "Switch to light mode",
    dark: "Switch to dark mode",
  },
  localeSwitcher: {
    label: "Change language",
  },
  mobileNavigation: {
    label: "Navigation",
  },
  landing: {
    subtitle: "Programmer",
    scrollDownTooltip: "Scroll down",
  },
  aboutMe: {
    title: "About Me",
    content: {
      p1: () => (
        <p>
          Hello! I'm Nicklas, and I'm not your typical programmer. I believe
          that life is all about the journey, and that's why you'll often find
          me on the road less traveled, exploring the great outdoors through my
          favorite hobbies: climbing, hiking, and canoeing. These experiences
          teach me valuable lessons about determination, persistence, and the
          thrill of pushing my limits.
        </p>
      ),
      p2: () => (
        <p>
          My academic background might surprise you – I studied philosophy. It's
          a discipline that encourages critical thinking, problem-solving, and
          the exploration of abstract concepts, skills that have proven to be
          incredibly valuable in my programming career. My journey into the
          world of programming was an unconventional one, as I'm entirely
          self-taught. I love the challenge of unraveling complex problems and
          building solutions from scratch. It's a passion that's only grown
          stronger over the years.
        </p>
      ),
      p3: () => (
        <p>
          In my work as a programmer, I prioritize effective communication, both
          through documentation and conversation, and I embrace a structured
          approach that includes rigorous testing and meticulous code reviews. I
          place great value on creating clean and user-friendly interfaces,
          whether it's APIs for fellow programmers or UIs for end users, to
          provide seamless and satisfying experiences.
        </p>
      ),
      p4: () => (
        <p>
          I'm not just a programmer; I'm a problem solver, a lifelong learner,
          and an enthusiast of the great outdoors. My journey from philosophy to
          self-taught programming has given me a unique perspective that I bring
          to every project I work on. I'm excited to continue my exploration of
          the digital world and collaborate with others who share the same
          passion for innovation and problem-solving.
        </p>
      ),
    },
  },
  experience: {
    title: "Experience",
    box: {
      position: "Position",
      dates: "Dates",
      techStack: "Tech Stack",
      more: "More",
      less: "Less",
    },
    fullstackEngineer: "Fullstack Engineer",
    delphai: {
      more: () => (
        <ul>
          <li>
            Rewrote the user interface using a modular approach. The base is a
            {" "}
            <Link linkKey="react" />{" "}
            component library providing the company's design system and base
            components. It utilizes <Link linkKey="storybook" />{" "}
            for visual testing.
          </li>
          <li>
            Configured and managed <Link linkKey="keycloak" />{" "}
            - an OpenID Connect implementation - for authentication and
            authorization.
          </li>
          <li>
            Planned and executed a migration of the user database from{" "}
            <Link linkKey="auth0" /> to Keycloak with no downtime.
          </li>
          <li>
            Rewrote the search service based on <Link linkKey="elasticsearch" />
            {" "}
            providing intelligent company search to the user.
          </li>
          <li>
            Developed the front-end and back-end for a data driven sales
            application.
          </li>
          <li>
            Implemented, documented and published the open-source library{" "}
            <Link linkKey="keycloakAdminAio" />{" "}
            which I maintain and further develop to this day.
          </li>
          <li>
            Conceptualized and implemented an access management application
            based on top of{" "}
            <Link linkKey="keycloak" />. It provides stakeholders a no-code
            solution to compose detailed product licenses and assign them to
            users.
          </li>
        </ul>
      ),
    },
    citywalx: {
      more: () => (
        <>
          <ul>
            <li>
              Developed <Link linkKey="pydantic" />{" "}
              models for data cleaning and importing of open datasets to the
              {" "}
              <Link linkKey="postgresql" />{" "}
              database after conducting initial data analysis with{" "}
              <Link linkKey="pandas" />.
            </li>
            <li>
              Implemented a PDF generating service using{" "}
              <Link linkKey="reactPdf" /> and{" "}
              <Link linkKey="fastify" />. It generates real estate reports
              providing location information and analysis.
            </li>
          </ul>
          <p>
            In my role, I single-handedly undertook the development and
            maintenance of a comprehensive <Link linkKey="saas" />{" "}
            platform and the company's flagship product, a map-based web
            application for location analysis:
          </p>
          <ul>
            <li>
              Managed the entire <Link linkKey="saas" />{" "}
              platform's stack, setting up the code repository with{" "}
              <Link linkKey="turborepo" />{" "}
              to efficiently manage our monorepo structure.
            </li>
            <li>
              Built the core UI component library on top of{" "}
              <Link linkKey="baseweb" />{" "}
              and tested it for regressions with snapshots.
            </li>
            <li>
              Built the platform with <Link linkKey="nextjs" />{" "}
              featuring key integrations with <Link linkKey="keycloak" />{" "}
              for authentication and <Link linkKey="stripe" />{" "}
              for subscription based payments.
            </li>
            <li>
              Developed the product - a map based location analysis tool - with
              {" "}
              <Link linkKey="mapbox" />{" "}
              featuring multi language support and a fully accessible and mobile
              optimized interface. It integrates with our central data warehouse
              implemented by my colleague as a data back-end. Features were
              specified with <Link linkKey="gherkinCucumber" /> and tested with
              {" "}
              <Link linkKey="cypress" /> in integration.
            </li>
            <li>
              Contributed to the infrastructure configured with{" "}
              <Link linkKey="terraform" />{" "}
              consiting of bare metal servers hosting the{" "}
              <Link linkKey="nomad" /> cluster, a <Link linkKey="consul" />{" "}
              service mesh and a <Link linkKey="vault" />{" "}
              secret store. Deployments were done with{" "}
              <Link linkKey="gitlabCi" />.
            </li>
          </ul>
        </>
      ),
    },
    openSource: {
      title: "Open Source Contributions",
      pullRequests: {
        lokiDocs: "Contribution to Loki documentation",
        baseweb: "Fix for Baseweb react component library",
        jotaiLocation: "API extension for jotai-location",
        jotaiTanstackQuery: "Fix for jotai-tanstack-query",
      },
    },
  },
  projects: {
    title: "Projects",
  },
  privacyPolicy: {
    title: "Privacy Policy",
    content: () => (
      <>
        <h2>1. Responsible Person</h2>
        <p>
          Nicklas Sedlock<br />Email: nicklas.sedlock@posteo.net
        </p>
        <h2>
          2. General: No Active Data Collection
        </h2>
        <p>
          This website does not collect personal data through forms, analytics
          tools, tracking pixels, or cookies. No cookies are set and no user
          behaviour is tracked. All content on this website (images, link
          previews) is served from the site&#39;s own server; no external
          third-party resources are loaded.
        </p>
        <h2>3. Hosting (GitHub Pages)</h2>
        <p>
          This website is hosted via <strong>GitHub Pages</strong>{" "}
          (GitHub Inc., 88 Colin P. Kelly Jr. St, San Francisco, CA 94107, USA).
          When you visit this website, GitHub automatically records technical
          access data in server log files, including the IP address of the
          requesting device, date and time of access, page requested, and
          browser and operating system.
        </p>
        <p>
          This data is processed by GitHub to ensure stable technical operation
          and is outside the control of this website&#39;s operator. The legal
          basis is Art. 6(1)(f) GDPR (legitimate interest in stable website
          operation).
        </p>
        <p>
          For more information on GitHub&#39;s privacy practices:{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
            https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
          </a>
        </p>
        <h2>4. External Links</h2>
        <p>
          This website contains links to external services such as GitHub and
          LinkedIn. When you click these links you leave this website; the
          respective provider is responsible for data processing on the linked
          pages.
        </p>
        <h2>5. Your Rights</h2>
        <p>
          Under the GDPR you have the right of access (Art. 15), rectification
          (Art. 16), erasure (Art. 17), restriction of processing (Art. 18),
          data portability (Art. 20), and the right to object (Art. 21). To
          exercise your rights, please contact the responsible person via email
          above.
        </p>
        <p>
          You also have the right to lodge a complaint with a data protection
          supervisory authority. The competent authority for Berlin is the
          Berliner Beauftragte für Datenschutz und Informationsfreiheit,
          Friedrichstr. 219, 10969 Berlin,{" "}
          <a href="https://www.datenschutz-berlin.de">
            https://www.datenschutz-berlin.de
          </a>.
        </p>
        <hr />
        <p>
          <em>Last updated: May 2026</em>
        </p>
      </>
    ),
    back: "Back",
  },
};
