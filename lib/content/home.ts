import type { ExperienceMetric, GalleryItem, ProjectSummary, StackTool, Testimonial } from "./types"

export const home = {
  headline: "Designing financial experiences that create clarity, build trust, and scale",
  welcome: "Welcome",
  greeting: "Hey, I'm Hunter 👋",
  currentCompany: "Bank of America",
  stack: [
    { name: "Figma", src: "/images/stack/figma-replacement.png" },
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
          "I helped redesign how clients transfer investments into Merrill, simplifying complex account connections, asset selection, and transfer requirements into a more streamlined digital experience.",
        team: ["Product Design (Lead) • Digital Product • Investment Operations • Engineers • API Tech Team"],
        background: "/images/home/project-bg-1.webp",
        metricIcons: ["landmark", "wallet"],
        insight: {
          icon: "database",
          title: "Data to Design",
          body: "I translated inconsistent API data and complex account requirements into clearer workflows.",
        },
        metrics: [
          {
            value: "$19B",
            label: "Annual net client flows",
            counter: { to: 19, prefix: "$", suffix: "B" },
          },
          {
            value: "4M+",
            label: "Accounts supported",
            counter: { to: 4, suffix: "M+" },
          },
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
          "Following a vendor exit, I helped bring a critical point-of-sale platform in-house, establishing a scalable design foundation across devices while maintaining continuity for small business merchants.",
        team: ["Product Design (Lead) • Merchant Services • Product Management • Engineers • Platform Architecture"],
        background: "/images/home/project-bg-2.webp",
        metricIcons: ["credit-card", "store"],
        insight: {
          icon: "blocks",
          title: "Building 1 to n",
          body: "I established reusable components to support consistent experiences across payment devices.",
        },
        metrics: [
          {
            value: "16.6B",
            label: "Annual payment transactions processed",
            counter: { to: 16.6, suffix: "B", decimals: 1 },
          },
          {
            value: "700K",
            label: "Merchant locations served",
            counter: { to: 700, suffix: "K" },
          },
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
        meta: "Web responsive · 2025",
        description:
          "I helped unify applications for business checking, credit cards, and payment services into a single digital experience, balancing simpler onboarding with complex eligibility and risk requirements.",
        team: ["Product Design (Lead) · Product Management · Small Business CXO · Risk & KYC • Sales"],
        background: "/images/home/project-bg-3.webp",
        metricIcons: ["layers", "briefcase"],
        insight: {
          icon: "workflow",
          title: "xFN Collaboration",
          body: "I aligned stakeholders around eligibility rules and competing scenarios to create a multi-product application.",
        },
        metrics: [
          {
            value: "8-in-1",
            label: "Multi-product experience",
            counter: { to: 8, suffix: "-in-1" },
          },
          {
            value: "3.4M+",
            label: "Small business clients served",
            counter: { to: 3.4, suffix: "M+", decimals: 1 },
          },
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
    title: "Scaling design through AI, systems, and people",
    label: "Experience",
    paragraphs: [
      "At Bank of America, I'm leading our Figma AI Enablement training and mentoring other designers on best practices, tooling, and efficiencies.",
      "I'm also using AI to build interactive prototypes, custom plugins, and workflow automations. These explorations bring complex product scenarios to life, connect design decisions to implementation, and give product, engineering, and leadership teams something tangible to evaluate.",
    ],
    metrics: [
      {
        icon: "code",
        title: "Concept to code",
        body: "Building AI-assisted prototypes, custom plugins, and automations that connect design and development.",
      },
      {
        icon: "users",
        count: 92,
        suffix: "+",
        title: "Designers supported",
        body: "Helping designers strengthen their skills, workflow, and technique.",
      },
      {
        icon: "graduation-cap",
        count: 10,
        suffix: "",
        title: "Learning sessions",
        body: "Sharing design efficiencies, best practices, and workflows to support AI adoption.",
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
        role: "Digital Executive, Bank of America",
      },
      {
        quote:
          "Hunter demonstrates leadership with a diverse range of stakeholders. He is the most sought-after and productive member of the team.",
        name: "Hunter Priester",
        role: "Design Director, Wells Fargo",
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
      { src: "/images/home/about/img-6173.webp", alt: "Hunter standing at a railing above Lake Como", placeholder: "Lake Como", caption: "Lake Como, IT", aspect: "7 / 10" },
      { src: "/images/home/about/img-1761.webp", alt: "Boston skyline across the harbor at sunset", placeholder: "Boston skyline", caption: "Boston, MA", aspect: "7 / 5" },
    ],
    [
      { src: "/images/home/about/img-4376.webp", alt: "Hunter sitting by the Beverly Hills sign", placeholder: "Beverly Hills", caption: "Los Angeles, CA", aspect: "1 / 1" },
      { src: "/images/home/about/img-4210.webp", alt: "Road bike handlebars on an empty country road", placeholder: "Road bike ride", caption: "Stowe, VT", aspect: "2 / 3" },
    ],
    [
      { src: "/images/home/about/img-7525.webp", alt: "Hunter in front of Hogwarts castle", placeholder: "Hogwarts", caption: "Anaheim, CA", aspect: "2 / 3" },
      { src: "/images/home/about/img-6203.webp", alt: "View over the Hudson River from a hilltop", placeholder: "Hudson River", caption: "Hudson Valley, NY", aspect: "1 / 1" },
    ],
    [
      { src: "/images/home/about/img-6280.webp", alt: "The Colosseum arena in Rome", placeholder: "Colosseum", caption: "Rome, IT", aspect: "4 / 5" },
      { src: "/images/home/about/img-4844.webp", alt: "The Trevi Fountain in Rome", placeholder: "Trevi Fountain", caption: "Rome, IT", aspect: "4 / 5" },
    ],
  ] as GalleryItem[][],
  },
}
