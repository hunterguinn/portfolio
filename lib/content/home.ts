import type { Card, GalleryItem, Metric, ProjectSummary, Testimonial } from "./types"

const team = [
  { role: "Product Designer", name: "Me" },
  { role: "Digital Leadership", name: "Richard Hattaway Malivika" },
]

export const home = {
  headline: "Designing financial interfaces and experiences that create clarity, build trust, and scale",
  currently: "Currently at Bank of America",
  work: {
    title: "Selected Works",
    label: "Projects",
    projects: [
      {
        slug: "merrill",
        href: "/merrill",
        title: "Merrill Edge Asset Transfer",
        meta: "Native app · 2027",
        description:
          "I designed a faster, responsive asset transfer experience that leveraged an open finance API to prep-populate data from the client's external brokerage, rethinking how clients connect external accounts, select assets, and move investments into Merrill.",
        team,
        metrics: [
          { value: null, label: "Net assets transferred annually", sourceValue: "$0 billion" },
          { value: null, label: "Investment accounts supported", sourceValue: "0 million+" },
        ],
        highlight: {
          title: "Data to Design",
          body: "I worked through imperfect API data and different client account types to support faster, better transfers.",
        },
        cover: {
          kind: "image",
          src: "/images/home/merrill-cover.webp",
          fit: "contain",
          alt: "Three phone screens from the Merrill Edge asset transfer flow: choosing a financial institution, selecting assets, and reviewing the transfer",
          placeholder: "Merrill · Project cover",
          aspect: "16 / 10",
        },
      },
      {
        slug: "pos",
        href: "/pos",
        title: "Point-of-Sale Software",
        meta: "Android responsive · 2026",
        description:
          "I helped bring a critical platform in-house following a vendor exit, providing point-of-sale continuity for small business clients and their customers.",
        team,
        metrics: [
          { value: null, label: "Annual transactions", sourceValue: "$0 billion+" },
          { value: null, label: "Merchant locations worldwide", sourceValue: "0k+" },
        ],
        highlight: {
          title: "Building 1 to n",
          body: "I established reusable components and patterns that enabled consistent implementation across terminals, devices, and web experiences.",
        },
        cover: {
          kind: "image",
          src: "/images/home/pos-cover.webp",
          fit: "contain",
          alt: "Three PAX point-of-sale terminals running the Bank of America payment software",
          placeholder: "POS · Project cover",
          aspect: "16 / 10",
        },
      },
      {
        slug: "unified",
        href: "/unified",
        title: "Unified Client Application",
        meta: "Web responsive · 2026",
        description:
          "I helped build a multi-product application that transformed how clients apply for banking services, balancing digital efficiency with the bank's eligibility and risk criteria.",
        team,
        metrics: [
          { value: null, label: "Net assets transferred annually", sourceValue: "$0 billion" },
          { value: null, label: "Investment accounts supported", sourceValue: "0 million+" },
        ],
        highlight: {
          title: "xFN Collaboration",
          body: "Aligned product, business, and technology on rules and edge cases, creating a seamless experience.",
        },
        cover: {
          kind: "image",
          src: "/images/home/unified-cover.webp",
          fit: "contain",
          alt: "Business Advantage application flow showing the select products step with credit card options",
          placeholder: "Unified · Project cover",
          aspect: "16 / 10",
        },
      },
    ] satisfies ProjectSummary[],
  },
  ai: {
    title: "Scaling design through AI, systems, and people.",
    label: "AI Experiments",
    paragraphs: [
      "At Bank of America, I'm leading our Figma AI Enablement training and mentoring other designers on best practices, tooling, and efficiencies.",
      "I'm also building with AI to improve our design handoff, custom plugins, and workflow automation",
    ],
    metrics: [
      {
        metric: { value: null, label: "Designers empowered", sourceValue: "0" } satisfies Metric,
        body: "Mentored and supported in their professional growth.",
      },
      {
        metric: { value: null, label: "Learning sessions", sourceValue: "0" } satisfies Metric,
        body: "Advancing design capabilities and AI adoption across the organization.",
      },
      {
        metric: { value: null, label: "AI experiences built", sourceValue: "0" } satisfies Metric,
        body: "Using AI to improve design demos and build plugins that improve workflow automation",
      },
    ],
    stack: { title: "Stack", items: [] as Card[], pending: "Stack list pending" },
  },
  testimonials: {
    title: "Testimonials",
    items: [
      {
        quote:
          "Hunter is an exceptional design leader and educator. His learning and development sessions have raised design skills across the organization.",
        name: "Natasha McMichael",
        role: "Digital Exectuive @ Bank of America",
      },
      {
        quote:
          "Hunter demonstrates leadership with a diverse range of stakeholders. He is the most sought-after and productive member of the team.",
        name: "Hunter Priester",
        role: "Design Director @ Wells Fargo",
      },
      {
        quote:
          "Hunter serves as a model of what a great designer on our team is able to achieve. He worked smart and efficiently to deliver months ahead of schedule.",
        name: "Nate Ernst",
        role: "Senior Design Principal, Bank of America",
      },
    ] satisfies Testimonial[],
  },
  about: {
    title: "When I'm not at my desk",
    label: "About Me",
    body: "I play tennis, pickleball, and go out on 50 mile rides on my road bike when the weather is nice. I also love having a trip on the calendar, whether it's a weekend getaway or a longer vacation.",
    actions: [
      { label: "Contact me", href: null as string | null },
  { label: "Download CV", href: null as string | null },
  ],
  /** Four bento columns, each stacking two photos. Add `src` to a photo to replace its placeholder. */
  gallery: [
  [
  { alt: "Hunter standing at a railing above Lake Como", placeholder: "Lake Como", aspect: "7 / 10" },
  { alt: "Boston skyline across the harbor at sunset", placeholder: "Boston skyline", aspect: "7 / 5" },
  ],
  [
  { alt: "Hunter sitting by the Beverly Hills sign", placeholder: "Beverly Hills", aspect: "1 / 1" },
  { alt: "Road bike handlebars on an empty country road", placeholder: "Road bike ride", aspect: "2 / 3" },
  ],
  [
  { alt: "Hunter in front of Hogwarts castle", placeholder: "Hogwarts", aspect: "2 / 3" },
  { alt: "View over the Hudson River from a hilltop", placeholder: "Hudson River", aspect: "1 / 1" },
  ],
  [
  { alt: "The Colosseum arena in Rome", placeholder: "Colosseum", aspect: "4 / 5" },
  { alt: "The Trevi Fountain in Rome", placeholder: "Trevi Fountain", aspect: "4 / 5" },
  ],
  ] as GalleryItem[][],
  },
}
