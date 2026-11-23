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
    label: "Recently",
    intro:
      "At Bank of America, I'm leading Figma AI enablement through hands-on learning sessions, designer mentorship, and practical tooling. Alongside this work, I'm exploring how AI-assisted prototyping, reusable components, and automation can improve the way teams design, communicate, and build products.",
    cards: [
      {
        body: "Supporting designers as they strengthen their Figma skills, adopt more consistent practices, and discover opportunities to improve their workflows.",
        articleTitle: "Leading Figma AI adoption through hands-on learning",
        modalTitle: "Making AI practical for everyday design",
        articleContent: [
          {
            body: "Since adopting Figma AI at Bank of America, I've led multi-day learning sessions for designers, researchers, and content strategists, focusing on how AI can reduce repetitive work, accelerate exploration, and support product delivery.",
          },
          {
            heading: "Integrating AI into the design lifecycle",
            body: "I structured the sessions around three stages—discovery, design, and delivery—to demonstrate where AI could provide meaningful value throughout our existing processes.\n\nUsing Figma's canvas agent, I demonstrated how written requirements and our internal design system could inform early design concepts, how simple wireframes could accelerate high-fidelity exploration, and how existing designs could be extended into interactive prototypes, edge cases, and error states.",
          },
          {
            heading: "Establishing repeatable practices",
            body: "The quality of AI-generated output depends heavily on the context and guidance it receives. I demonstrated several techniques that designers could incorporate into their workflows:",
            items: [
              "Attach written requirements and reference existing designs.",
              "Define which frames to use, what to change, and what must remain unchanged.",
              "Establish layout direction through simple wireframes.",
              "Reference existing design system components rather than generating new ones.",
            ],
            conclusion: "To make these practices reusable, I distributed shared instructions, prepared examples, and prompt templates tailored to the work our organization does.",
            demonstration: "contextual-prompt",
          },
          {
            heading: "Designing for different levels of adoption",
            body: "Not everyone approaches emerging technology with the same level of confidence or curiosity.\n\nI created a shared Figma playground with prepared screens where designers could experiment with prompts, explore different techniques, and learn alongside one another. This created a low-risk environment for experimentation while encouraging questions and knowledge sharing.",
          },
          {
            heading: "Efficiency meets design judgment",
            body: "The most valuable application of AI isn't automating every design task. It's recognizing which tasks can be accelerated and which decisions still require human judgment.\n\nI see AI as a way to spend less time producing design artifacts and more time evaluating solutions, challenging requirements, and making informed product decisions.\n\nThe opportunity is to reach meaningful design milestones sooner without compromising the quality of the thinking behind them.",
          },
        ],
      },
      {
        body: "Strengthening Figma skills, component practices, and shared workflows to help designers work more consistently and effectively across teams.",
        articleTitle: "Helping designers build stronger Figma practices",
        modalTitle: "Building a stronger design team",
        articleContent: [
          {
            body: "Modern design tools are increasingly informed by the principles of frontend development. Designers have greater control over how interfaces are structured, how they respond to different conditions, and how design decisions translate into implementation.\n\nTaking advantage of these capabilities requires more than learning new features. It requires a deeper understanding of the technical principles behind them.",
          },
          {
            heading: "Establishing a culture of continuous learning",
            body: "Recognizing an opportunity to strengthen our organization's proficiency in Figma, I lead Figma Office Hours and learning and development initiatives.",
            blocks: [
              {
                type: "metrics",
                metrics: [
                  {
                    value: "7",
                    label: "Learning and development sessions",
                  },
                  {
                    value: "20–50",
                    label: "Attendees per session",
                  },
                ],
                note: "These figures represent participation and program activity at the time of recognition, not measured improvements in designer performance.",
              },
              {
                type: "p",
                text: "Tools like Figma, Framer, and Webflow have helped narrow the gap between design and development by introducing shared methodologies and technical concepts.",
              },
              {
                type: "p",
                text: "Frames behave similarly to HTML containers, nested layers reflect the hierarchical structure of the DOM, and auto layout shares principles with CSS flexbox. Components and their properties encourage the same patterns of reusability and configurability found in frontend frameworks, while variables provide a foundation for connecting design tokens to their implementation in code.",
              },
              {
                type: "p",
                text: "I incorporate these parallels into my learning sessions to help designers understand not only how to construct interfaces, but how those interfaces are ultimately built.",
              },
            ],
          },
          {
            heading: "Developing technical proficiency",
            body: "I structure my learning sessions around introductory and advanced topics to accommodate different levels of experience across the organization.",
            blocks: [
              {
                type: "p",
                text: "Introductory sessions focus on establishing strong technical foundations:",
              },
              {
                type: "list",
                items: [
                  "Frame structure, nesting, and layer hierarchy.",
                  "Auto layout, alignment, padding, and spacing.",
                  "Responsive behavior, resizing, and layout constraints.",
                  "Components, instances, and design system adoption.",
                  "File organization and efficient working practices.",
                ],
              },
              {
                type: "p",
                text: "Advanced sessions build upon these fundamentals:",
              },
              {
                type: "list",
                items: [
                  "Nested components, component properties, and variants.",
                  "More complex auto layout and responsive interface patterns.",
                  "Variables, modes, and their relationship to design tokens.",
                  "Advanced prototyping and interaction logic.",
                  "Workflow optimization and reducing unnecessary manual effort.",
                ],
              },
              {
                type: "p",
                text: "Rather than teaching these capabilities in isolation, I connect them to practical design problems and the decisions designers encounter throughout their work.",
              },
            ],
          },
          {
            heading: "Developing independent problem-solvers",
            body: "My approach to teaching emphasizes the reasoning behind a technique rather than simply demonstrating how to execute it.\n\nFor example, understanding the relationship between fixed, hug, and fill sizing gives designers a foundation for constructing responsive interfaces without manually adjusting layouts. Understanding the value behind component properties and variants, and when an interface requires a new configuration rather than an entirely new component.\n\nThese concepts become increasingly valuable as junior designers take on more complex projects. The objective is to develop the technical knowledge and judgment to solve unfamiliar problems independently.",
            blocks: [
              {
                type: "callout",
                text: "Leadership testimonial pending: insert the original approved quote about assessing the team's needs and transitioning from Office Hours to Lunch & Learn.",
                attribution: "Original author and title pending.",
              },
            ],
          },
          {
            heading: "Investing in collective capability",
            body: "As design tools become more sophisticated, technical literacy becomes an increasingly important part of design craft.\n\nThrough learning and development, I aim to establish a shared understanding of how interfaces are structured, how design decisions translate into development, and how designers can work more efficiently without compromising quality.\n\nThe goal isn't to turn designers into developers. It's to equip them with the knowledge, confidence, and technical judgment to become more effective product designers.",
          },
        ],
      },
      {
        body: "Building interactive prototypes that bring complex workflows, application states, and design decisions to life beyond static mockups.",
        articleTitle: "Prototyping complex workflows beyond Figma",
        modalTitle: "Prototyping beyond Figma",
        articleContent: [
          {
            body: "Static mockups are effective at communicating visual direction, supporting initial development estimates, and facilitating stakeholder conversations. But they often leave important product questions unanswered.\n\nWhat happens when an API fails? How does the experience differ for an existing client? What happens when someone enters an unexpected value? How does a workflow adapt to different account types?\n\nThese scenarios often require extensive annotations, additional design artifacts, or conversations to fully explain. In complex financial products, the behavior behind the interface can be just as important as the interface itself.",
          },
          {
            heading: "Moving from mockups to working experiences",
            body: "I've been exploring how AI-assisted development can help communicate that complexity more effectively.\n\nUsing Codex, Claude Code, and Vercel, I've built interactive JavaScript prototypes that extend beyond individual screens. These projects bring conditional workflows, responsive layouts, component variations, application states, and product documentation into a single working experience.\n\nRather than creating separate designs for every possible scenario, I can construct a prototype that responds dynamically to user inputs, business rules, and simulated system responses.",
            blocks: [
              {
                type: "figure",
                figure: {
                  caption: "An interactive JavaScript prototype bringing product workflows, application states, and design documentation into a single working experience.",
                  showCaptionText: true,
                  slots: [
                    {
                      kind: "image",
                      // Add src: "/images/prototype.webp" when the screenshot is available.
                      alt: "Landscape screenshot of an interactive JavaScript prototype or documentation site showing connected product workflows and application states.",
                      placeholder: "JavaScript prototype screenshot",
                      aspect: "16 / 9",
                    },
                  ],
                },
              },
            ],
          },
          {
            heading: "Translating requirements into behavior",
            body: "Building a working prototype requires a different way of thinking about design. Written requirements need to become conditional logic, user interactions need to trigger state changes, and individual screens need to function as part of a connected experience.\n\nThis involves exploring technical concepts such as:",
            items: [
              "Conditional rendering based on client eligibility, account types, and business rules.",
              "State management to maintain user selections, input values, and workflow progress.",
              "Form validation, error handling, and recovery paths.",
              "Simulated API responses to demonstrate successful, incomplete, and failed system interactions.",
              "Responsive layouts and reusable interface components.",
            ],
            conclusion: "Translating requirements into working behavior encourages me to evaluate those requirements more critically, identify overlooked scenarios, and explore functional questions earlier in the design process.",
            blocks: [
              {
                type: "callout",
                text: "Instead of designing every possible screen, I can design the conditions that determine which screen a client experiences.",
              },
            ],
          },
          {
            heading: "Connecting prototypes and documentation",
            body: "Beyond the experience itself, I've been building documentation sites that bring interactive prototypes, product requirements, component references, and application states together.\n\nRather than distributing information across design files, presentations, and written specifications, these sites provide a centralized resource where teams can explore an experience, understand its underlying logic, and reference the design system components used throughout it.\n\nI've used these materials to communicate design concepts and product complexity to stakeholders, product managers, and digital leadership, giving them an opportunity to interact with an experience rather than relying entirely on static representations or explanations.",
          },
          {
            heading: "Making the approach reproducible",
            body: "An important part of this exploration is making the process accessible to other designers.\n\nAlongside these prototypes, I've been documenting the tools, project structure, development workflows, and instructions needed to build similar experiences using AI-assisted development.\n\nBy sharing reusable resources and open-source approaches, I aim to make this methodology something other designers can independently adopt, experiment with, and build upon.",
          },
          {
            heading: "Choosing the right medium",
            body: "Not every design problem requires a working prototype. Figma remains an effective environment for visual exploration, rapid iteration, and design collaboration.\n\nI turn to code when the behavior of an experience becomes difficult to communicate through individual screens alone—particularly when multiple business rules, system responses, or user inputs influence what happens next.\n\nThese prototypes aren't intended to replace production engineering or formal design deliverables. They're another medium for exploring ideas, evaluating assumptions, and establishing a shared understanding of how a product should work.\n\nWhat interests me most isn't simply that AI makes it easier to produce code. It's that designers can explore, build, and communicate ideas through mediums that previously required considerably more technical support.",
          },
        ],
      },
      {
        body: "Exploring how shared tokens, reusable components, and AI-assisted tooling can connect design decisions with implementation.",
        articleTitle: "Connecting design systems to code with AI",
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
          "Hunter took the lead the Figma routine, identifying the needs of the team and creating opportunities for designers to continuously learn, collaborate, and deepen their expertise.",
        name: "Elsy Lao",
        role: "Design Leadership, Bank of America",
      },
      {
        quote:
          "The direction Hunter gave helped all associated teams get to final requirements, make decisions, and deliver so much faster than they possibly could have in any other circumstance.",
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
