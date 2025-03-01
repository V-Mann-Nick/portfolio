import { Fragment } from "react/jsx-runtime";
import { getDirName } from "../common/utils.ts";
import { type CurriculumVitaeProps } from "../templates/cv/index.ts";
import process from "node:process";

const phoneNumber = process.env["PHONE_NUMBER"];

const dirName = getDirName(import.meta.url);

export default {
  documentMeta: {
    title: "Nicklas Sedlock - Curriculum Vitae",
    author: "Nicklas Sedlock",
    subject:
      "Curriculum Vitae of Nicklas Sedlock - a detail-oriented and versatile programmer with a wide range of expertise",
  },
  config: {},
  header: {
    title: "Nicklas Sedlock",
    subtitle: "Senior Software Engineer",
    picture: `${dirName}/me.jpg`,
  },
  overview: {
    contact: {
      contactInfo: [
        {
          icon: { name: "location-pin" },
          text: "Berlin, Germany",
        },
        {
          icon: { name: "envelope" },
          get href() {
            return `mailto:${this.text}`;
          },
          text: "nicklas.sedlock@posteo.net",
        },
        !!phoneNumber && {
          icon: { name: "phone" },
          get href() {
            return `tel:${this.text.replace(" ", "")}`;
          },
          text: phoneNumber,
        },
        {
          icon: { name: "globe" },
          get href() {
            return `https://${this.text}`;
          },
          text: "nicklas.sedlock.xyz",
        },
        {
          icon: { name: "github", iconSet: "brands" as const },
          href: "https://github.com/V-Mann-Nick",
          text: "V-Mann-Nick",
        },
        {
          icon: { name: "linkedin", iconSet: "brands" as const },
          href: "https://www.linkedin.com/in/nicklas-sedlock-53764b1a8/",
          text: "nicklas-sedlock-53764b1a8",
        },
      ].filter((i): i is Exclude<typeof i, false> => !!i),
    },
    overviewBlocks: [
      {
        title: "Core Skills",
        content: [
          "Coding",
          "Teaching & Mentoring",
          "Innovation",
          "Resourcefulness",
        ],
        isHighlightedList: true,
      },
      {
        title: "Technical Skills",
        content: [
          {
            title: "Programming Languages",
            content: ["Rust", "Typescript", "Python", "Zig"],
          },
          {
            title: "Frameworks",
            content: ["React", "Solid", "Next", "Astro", "FastAPI", "Fastify"],
          },
          {
            title: "Databases",
            content: ["PostgreSQL", "MongoDB", "Elasticsearch"],
          },
          {
            title: "DevOps",
            content: [
              "Podman",
              "Docker",
              "Terraform",
              "Nomad",
              "CI/CD",
              "Grafana",
              "Kubernetes",
            ],
          },
          {
            title: "Testing",
            content: [
              "E2E (Cypress, Gherkin)",
              "Property-based (Hypothesis)",
              "Unit (Vitest, Pytest)",
            ],
          },
          {
            title: "Other",
            content: ["Linux", "Git", "Neovim", "Nix", "..."],
          },
        ],
      },
      {
        title: "Languages",
        content: [
          { title: "German", content: "- native", oneLine: true },
          { title: "English", content: "- native", oneLine: true },
          { title: "Spanish", content: "- advanced", oneLine: true },
        ],
      },
    ],
  },
  content: {
    contentBlocks: [
      {
        title: "Experience",
        content: [
          {
            title: "Nelly Solutions GmbH",
            keyProperties: [
              {
                icon: { name: "user" },
                content: "Senior Software Engineer",
              },
              {
                icon: { name: "calendar" },
                content: {
                  from: new Date(Date.UTC(2024, 0)),
                },
              },
            ],
            isList: true,
            content: [
              <Fragment key="0">
                Designed and implemented a Rust-based transaction framework to
                integrate patient data with dozens of practice management
                systems.
              </Fragment>,
              <Fragment key="1">
                Overhauled our Rust integration client architecture, serving as
                a bridge to practice management systems running on many
                platforms.
              </Fragment>,
              <Fragment key="2">
                Built a Tauri based application registering a fake printer with
                Windows to receive practice documents for send out.
              </Fragment>,
            ],
          },
          {
            title: "Citywalx GmbH",
            keyProperties: [
              {
                icon: { name: "user" },
                content: "Senior Fullstack-Engineer",
              },
              {
                icon: { name: "calendar" },
                content: {
                  from: new Date(Date.UTC(2021, 11)),
                  to: new Date(Date.UTC(2023, 7)),
                },
              },
            ],
            isList: true,
            content: [
              <Fragment key="0">
                Solely developed and maintained a comprehensive SaaS platform,
                integrating with Stripe for subscription-based payments and
                Keycloak for authentication and authorization, managing the full
                stack, including UI, back-end services, monitoring, and
                infrastructure.
              </Fragment>,
              <Fragment key="1">
                Engineered a map-based location analysis tool with a fully
                accessible, multi-lingual, and mobile-optimized interface,
                complete with an export function to generate comprehensive PDF
                reports.
              </Fragment>,
            ],
          },
          {
            title: "delphai (aqcuired by Intapp)",
            keyProperties: [
              {
                icon: { name: "user" },
                content: "Fullstack-Engineer",
              },
              {
                icon: { name: "calendar" },
                content: {
                  from: new Date(Date.UTC(2020, 6)),
                  to: new Date(Date.UTC(2022, 4)),
                },
              },
            ],
            isList: true,
            content: [
              <Fragment key="0">
                Overhauled the front-end architecture through a modular
                approach, significantly enhancing system flexibility and
                boosting overall productivity, resulting in more efficient
                development and improved user experiences.
              </Fragment>,
              <Fragment key="1">
                Configured and managed Keycloak for user authentication and
                authorization, and developed a custom, no-code access management
                system on top of it, allowing stakeholders to create and assign
                product licenses, followed by onboarding and learning sessions.
              </Fragment>,
            ],
          },
        ],
      },
      {
        title: "Education",
        content: [
          {
            title: "BA Culture and technology: Philosophy",
            keyProperties: [
              {
                icon: { name: "building-columns" },
                content: "TU Berlin",
              },
              {
                icon: { name: "calendar" },
                content: { date: new Date(2020, 3) },
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies CurriculumVitaeProps;
