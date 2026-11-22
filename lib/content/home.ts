import type { AiCard, ProjectSummary, StackTool, Testimonial } from "./types"

export const home = {
  headline: "Designing financial experiences that create clarity, build trust, and scale",
  greeting: "Hey, I'm Hunter 👋",
  current: {
    role: "Vice President, Product Designer",
    company: "@ Bank of America",
    period: "2022 - Present",
  },
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
    title: "Scaling design through AI",
    label: "AI",
    intro:
      "I'm currently leading Figma AI Enablement training and mentoring other designers across our design organization. Read more about the work I've been doing and how it's helping our organization.",
    cards: [
      {
        count: 10,
        topic: "Learning sessions hosted",
        body: "Sharing design efficiencies, best practices, and workflows to support AI adoption.",
        articleTitle: "Learning sessions hosted",
      },
      {
        count: 92,
        suffix: "+",
        topic: "Designers supported",
        body: "Helping designers strengthen their skills, workflow, and technique.",
        articleTitle: "Designers supported",
      },
      {
        topic: "Concept to Code",
        body: "Building AI-assisted prototypes, custom plugins, and automations that connect design and development.",
        articleTitle: "Concept to Code",
      },
      {
        topic: "System to delivery",
        body: null,
        articleTitle: "System to delivery",
      },
    ] satisfies AiCard[],
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
      {
        quote:
          "Hunter demonstrates leadership with a diverse range of stakeholders. He is the most sought-after and productive member of the team.",
        name: "Hunter Priester",
        role: "Design Director, Wells Fargo",
      },
    ] satisfies Testimonial[],
  },
}
