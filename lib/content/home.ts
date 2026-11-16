import type { ExperienceMetric, GalleryItem, ProjectSummary, StackTool, Testimonial } from "./types"

export const home = {
  headline: "Designing financial experiences that create clarity, build trust, and scale",
  welcome: "Welcome",
  intro:
    "I'm building products across native and web platforms that empower consumers and wealth management clients at Bank of America.",
  greeting: "Hey, I'm Hunter 👋",
  stack: [
    { name: "Figma", src: "/images/stack/figma.png" },
    { name: "Codex", src: "/images/stack/codex.png" },
    { name: "Sketch", src: "/images/stack/sketch.png" },
    { name: "Adobe", src: "/images/stack/adobe.png" },
    { name: "Jira", src: "/images/stack/jira.png" },
    { name: "Vercel", src: "/images/stack/vercel.png" },
    { name: "Framer", src: "/images/stack/framer.png" },
  ] satisfies StackTool[],
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
        metrics: [
          { value: null, label: "Net assets transferred annually", sourceValue: "$0 billion" },
          { value: null, label: "Investment accounts supported", sourceValue: "0 million+" },
        ],
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
        metrics: [
          { value: null, label: "Annual transactions", sourceValue: "$0 billion+" },
          { value: null, label: "Merchant locations worldwide", sourceValue: "0k+" },
        ],
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
        metrics: [
          { value: null, label: "Net assets transferred annually", sourceValue: "$0 billion" },
          { value: null, label: "Investment accounts supported", sourceValue: "0 million+" },
        ],
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
    label: "Experience",
    paragraphs: [
      "At Bank of America, I'm leading our Figma AI Enablement training and mentoring other designers on best practices, tooling, and efficiencies.",
      "I'm also building with AI to improve our design handoff, custom plugins, and workflow automation",
    ],
    metrics: [
      {
        icon: "users",
        count: 92,
        suffix: "+",
        title: "Designers empowered",
        body: "Mentored and supported in their professional growth.",
      },
      {
        icon: "graduation-cap",
        count: 10,
        suffix: "",
        title: "Learning sessions",
        body: "Advancing design capabilities and AI adoption across the organization.",
      },
      {
        icon: "sparkles",
        count: 3,
        suffix: "+",
        title: "AI experiences built",
        body: "Using AI to improve design demos and build plugins that improve workflow automation",
      },
    ] satisfies ExperienceMetric[],
  },
  testimonials: {
    label: "Testimonials",
    title: "What others say",
    items: [
      {
        quote:
          "Hunter is an exceptional design leader and educator. His learning and development sessions have raised design skills across the organization.",
        name: "Natasha McMichael",
        role: "Digital Executive @ Bank of America",
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
    label: "About",
    body: "I play tennis, pickleball, and go out on 50 mile rides on my road bike when the weather is nice. I also love having a trip on the calendar, whether it's a weekend getaway or a longer vacation.",
  /** Four bento columns, each stacking two photos. Add `src` to a photo to replace its placeholder. */
  gallery: [
  [
  { src: "/images/home/about/img-6173.webp", alt: "Hunter standing at a railing above Lake Como", placeholder: "Lake Como", aspect: "7 / 10" },
  { src: "/images/home/about/img-1761.webp", alt: "Boston skyline across the harbor at sunset", placeholder: "Boston skyline", aspect: "7 / 5" },
  ],
  [
  { src: "/images/home/about/img-4376.webp", alt: "Hunter sitting by the Beverly Hills sign", placeholder: "Beverly Hills", aspect: "1 / 1" },
  { src: "/images/home/about/img-4210.webp", alt: "Road bike handlebars on an empty country road", placeholder: "Road bike ride", aspect: "2 / 3" },
  ],
  [
  { src: "/images/home/about/img-7525.webp", alt: "Hunter in front of Hogwarts castle", placeholder: "Hogwarts", aspect: "2 / 3" },
  { src: "/images/home/about/img-6203.webp", alt: "View over the Hudson River from a hilltop", placeholder: "Hudson River", aspect: "1 / 1" },
  ],
  [
  { src: "/images/home/about/img-6280.webp", alt: "The Colosseum arena in Rome", placeholder: "Colosseum", aspect: "4 / 5" },
  { src: "/images/home/about/img-4844.webp", alt: "The Trevi Fountain in Rome", placeholder: "Trevi Fountain", aspect: "4 / 5" },
  ],
  ] as GalleryItem[][],
  },
}
