import type { AiCard, ProjectSummary, StackTool, Testimonial } from "./types"

export const home = {
  headline:
    "I design financial experiences by connecting customer needs, business priorities, and technical realities, turning complex requirements into interfaces that are easier to use and build.",
  greeting: "Hey, I'm Hunter 👋",
  current: {
    role: "Vice President, Product Designer",
    company: "Bank of America",
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
        category: "Native app",
        description:
          "I helped redesign how clients move investments into Merrill, simplifying external account connections, asset selection, and complex transfer requirements into a more manageable digital experience.",
        team: ["Product Design (Lead) • Digital Product • Investment Operations • Engineers • API Tech Team"],
        background: "/images/home/merrill-bg.webp",
        mockup: { width: 1800, height: 2176, left: "27%", top: "14%", size: "46%" },
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
          aspect: "3 / 2",
        },
      },
      {
        slug: "pos",
        href: "/pos",
        title: "Point-of-Sale Software",
        category: "Responsive web",
        description:
          "Following a vendor exit, I helped bring a critical point-of-sale platform in-house, establishing reusable design patterns across payment devices while supporting business continuity for merchants.",
        team: ["Product Design (Lead) • Merchant Services • Product Management • Engineers • Platform Architecture"],
        background: "/images/home/pos-bg.webp",
        mockup: { width: 1800, height: 1049, left: "14%", top: "22%", size: "72%" },
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
          aspect: "3 / 2",
        },
      },
      {
        slug: "unified",
        href: "/unified",
        title: "Unified Client Application",
        category: "Responsive web",
        description:
          "I helped consolidate applications for business checking, credit cards, and payment services into a single experience, balancing simpler onboarding with complex eligibility, risk, and compliance requirements.",
        team: ["Product Design (Lead) · Product Management · Small Business CXO · Risk & KYC • Sales"],
        background: "/images/home/unified-bg.webp",
        mockup: { width: 1800, height: 2760, left: "19.5%", top: "20%", size: "61%" },
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
          aspect: "3 / 2",
        },
      },
    ] satisfies ProjectSummary[],
  },
  ai: {
    title: "Scaling design through AI",
    label: "AI",
    intro:
      "At Bank of America, I'm leading Figma AI enablement through hands-on learning sessions, designer mentorship, and practical tooling. Alongside this work, I'm exploring how AI-assisted prototyping, reusable components, and automation can improve the way teams design, communicate, and build products.",
    cards: [
      {
        body: "Supporting designers as they strengthen their Figma skills, adopt more consistent practices, and discover opportunities to improve their workflows.",
        articleTitle: "Helping designers adopt AI",
        articleContent: [
          { body: "I've been leading Figma AI enablement and learning sessions across our design organization, helping designers explore emerging capabilities through practical examples." },
          { body: "Rather than focusing on AI features in isolation, I've approached these sessions around everyday design challenges: reducing repetitive work, accelerating early exploration, working more effectively with components, and finding opportunities to simplify existing processes." },
          { body: "My goal has been to make the learning immediately relevant. A new capability becomes more useful when designers understand not just how it works, but where it belongs in their process." },
          { heading: "Creating space for experimentation", body: "One thing I've been thinking about is how differently designers approach emerging technology. Some are eager to experiment, while others want a clear use case before changing a workflow they already trust. Both perspectives are valuable. That's influenced how I think about enablement. Effective learning requires more than demonstrating what's new. It means connecting capabilities to familiar problems, encouraging questions, and giving designers room to form their own judgment about what works. It also means being realistic about limitations. Not every task benefits from AI, and faster output isn't necessarily better output." },
          { heading: "What I'm learning", body: "The more I work with these tools, the more I see AI enablement as a design challenge itself. It requires understanding the audience, identifying barriers to adoption, simplifying complex information, and creating repeatable ways for people to learn. The opportunity isn't simply to help designers use AI. It's to help teams become more deliberate about where technology can improve the way they work, while keeping design judgment at the center of the process." },
        ],
      },
      {
        body: "Strengthening Figma skills, component practices, and shared workflows to help designers work more consistently and effectively across teams.",
        articleTitle: "Building a stronger design team",
        articleContent: [
          { body: "Design tools are becoming increasingly capable. Tasks that once required substantial manual effort can now be completed faster through automation, reusable components, and AI-assisted workflows. But greater capability also creates a new challenge: knowing how to use these tools thoughtfully." },
          { body: "I've been helping designers strengthen the fundamentals behind their work, particularly in Figma: component structure, reusable patterns, consistent design practices, and more efficient ways to organize and maintain files." },
          { heading: "Improving the way we work", body: "Small workflow decisions can have consequences beyond the individual designer. Component structure affects whether others can reuse it; file organization affects how easily teammates can understand it; and consistent patterns influence the effort required to maintain an experience. My approach is to help designers understand the reasoning behind these practices rather than simply introducing another set of rules." },
          { heading: "Teaching principles, not shortcuts", body: "A tool might generate a component quickly, but that component still needs appropriate structure, naming, behavior, and alignment with an existing design system. Strong fundamentals help designers evaluate and improve outputs, whether they are working on components, prototypes, documentation, or emerging workflows." },
          { heading: "The broader opportunity", body: "Shared knowledge creates opportunities for teams to work more consistently. A technique learned by one designer can become a repeatable practice adopted by others. The goal isn't to make every designer work identically; it's to create a stronger foundation that gives people more time to focus on the decisions that require design thinking." },
        ],
      },
      {
        body: "Building interactive prototypes that bring complex workflows, application states, and design decisions to life beyond static mockups.",
        articleTitle: "Prototyping beyond Figma",
        articleContent: [
          { body: "Static designs are effective at communicating visual direction, but they can leave some of the most important product questions unanswered. What happens when an API fails? How does an experience respond to different account types? What changes between loading, success, and error states? These details often require extensive annotations, additional frames, or conversations to fully explain. In complex products, the behavior behind the interface can be just as important as the interface itself. Recently, I've been exploring how AI-assisted development can help communicate that complexity more effectively." },
          { heading: "Moving from mockups to working experiences", body: "Using tools such as Codex and Vercel, I've been building interactive JavaScript prototypes that go beyond individual screens. These projects can demonstrate conditional workflows, responsive behavior, component variations, and application states within a single working experience. What interests me most isn't simply that AI makes it easier to produce code. It's that designers can explore and communicate product behavior in ways that previously required more technical support. Instead of describing how an experience should respond to a particular scenario, I can build a working representation of it. That changes the nature of the conversation. Stakeholders can interact with an idea rather than relying entirely on static representations or explanations." },
          { heading: "Making prototypes useful beyond the presentation", body: "I've also been creating documentation sites alongside these projects. The documentation explains how components are structured, how interaction patterns work, and how someone else could build or adapt the experience. I see this as an important distinction between a prototype created for a single review and one designed to become a reusable resource. Where appropriate, I'm making these projects open source so others can examine the implementation, learn from the approach, and build on the work. The documentation is part of the design, not something added after development is complete." },
          { heading: "Designing with a better understanding of implementation", body: "Working more directly with code has also changed how I approach design decisions. It encourages me to think earlier about component architecture, application states, responsive behavior, and the relationship between individual interactions and the larger system. At the same time, AI-generated code isn't automatically good code. It still requires evaluation for quality, accessibility, maintainability, and consistency with established patterns. That's an important part of the experimentation." },
          { heading: "What I'm exploring next", body: "I'm interested in how working prototypes can become a more useful bridge between design, product, and engineering. The opportunity isn't to turn every designer into a full-time developer. It's to reduce the distance between an idea and a testable experience, making requirements more concrete and implementation questions easier to identify. For complex products, that could change how teams explore solutions, communicate decisions, and prepare experiences for development." },
        ],
      },
      {
        body: "Exploring how shared tokens, reusable components, and AI-assisted tooling can connect design decisions with implementation.",
        articleTitle: "Building systems that scale",
        articleContent: [
          { body: "Design systems have traditionally helped teams create more consistent experiences through shared foundations, components, and interaction patterns. But consistency in a design file doesn't always translate into consistency in a working product. Design decisions still need to be interpreted, implemented, and maintained across different tools and environments. Each handoff introduces opportunities for variation, duplicated work, or unnecessary complexity. I've been exploring how design systems can play a more active role in connecting design to development." },
          { heading: "Building a shared foundation", body: "My recent work has focused on structuring design foundations around reusable tokens for typography, color, spacing, and corner radius. The principle is straightforward: values that appear repeatedly throughout an interface should be defined once and reused consistently. A change to a spacing token, for example, should be intentional and traceable rather than requiring multiple individual adjustments. The same thinking applies to components. Reusable elements are most effective when their structure, variations, and expected behavior are clearly defined." },
          { heading: "Connecting design and code", body: "I've been experimenting with ways to carry these foundations into working applications using AI-assisted development tools. That includes exploring how existing visual styles can be translated into reusable code, how components can reference shared tokens, and how documentation can make implementation decisions more explicit. The objective is not to eliminate the distinction between design and development. Each discipline contributes different expertise. Instead, I'm interested in reducing unnecessary interpretation between them. When the same underlying decisions can inform both the design file and the implementation, teams have a clearer foundation for maintaining consistency." },
          { heading: "Automation needs structure", body: "One observation from this work is that AI-assisted development becomes more useful when the underlying system is well defined. Without clear conventions, generated output can introduce one-off styles, inconsistent components, and patterns that are difficult to maintain. A structured design system provides constraints that can help guide those outputs. That changes how I think about automation. The value isn't just generating an interface faster; it's producing work that fits within an established product system." },
          { heading: "Where this could lead", body: "I'm continuing to explore how design tokens, documentation, component libraries, and AI-assisted tooling can work together as a more connected process. There are still important questions around governance, accessibility, code quality, and how changes should be managed across tools. But I see an opportunity to make design systems useful beyond the design environment itself. Rather than serving primarily as a reference for how products should look, they can become a more practical foundation for how products are built, maintained, and evolved." },
        ],
      },
    ] satisfies AiCard[],
  },
  testimonials: {
    label: "Testimonials",
    title: "Hear it from others",
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
