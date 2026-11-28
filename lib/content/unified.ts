import type { CaseStudy } from "./types"

export const unified: CaseStudy = {
  slug: "unified",
  eyebrow: "Case Study / 2025",
  title: "Unified Client Application",
  description:
    "Case study: one digital application that lets businesses apply for multiple banking products in a single session while preserving eligibility and risk controls.",
  intro:
    "I designed a new, digital application that allowed clients to apply for multiple business products in one session, rather than navigating separate applications for each credit, savings, and checking product. The result was a shared experience that reduced repetitive steps, boosted digital sales, and preserved risk controls.",
  team: ["VP, UXD (Me)", "Digital Directors", "Product Managers", "AML/KYC Risk", "Engineers"],
  timeline: ["13 months", "Limited pilot release"],
  sections: [
    {
      id: "the-problem",
      label: "01 – The Problem",
      title: "Each product was its own application",
      blocks: [
        {
          type: "p",
          text: "Businesses often need several financial products, from checking accounts and credit cards to payment processing. Online applications for these products have many of the same questions. However, each application was built in its *own* space, with different business requirements and *eligibility* rules (Figure 1.0)",
        },
        {
          type: "cards",
          cards: [
            {
              title: "Digital-First Needs",
              icon: "smartphone",
              tone: "problem",
              body: "Fintechs like Toast and Square made getting started feel fast and straightforward, setting expectations for how quickly businesses could access financial services.",
            },
            {
              title: "Associate-Led Process",
              icon: "users",
              tone: "problem",
              body: "Each application depended on sales associate review, even when some could be approved digitally, which accounted for the most friction.",
            },
            // Temporary duplicate: replace with new copy.
            {
              title: "Associate-Led Process",
              icon: "users",
              tone: "problem",
              body: "Each application depended on sales associate review, even when some could be approved digitally, which accounted for the most friction.",
            },
          ],
        },
        {
          type: "figure",
          figure: {
            number: "Figure 1.0",
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Separate legacy applications for each business banking product",
                placeholder: "Unified · Separate product applications",
                aspect: "16 / 9",
              },
            ],
          },
        },
      ],
    },
    {
      id: "the-requirements",
      label: "02 – The Requirements",
      title: "One application built around shared logic",
      blocks: [
        {
          type: "p",
          text: "The goal wasn't to combine separate applications into one interface, but instead to create shared *foundation* – one that could support multiple products in one experience, adapt to different business needs, and *preserve* the eligibility criteria each product required.",
        },
        {
          type: "cards",
          cards: [
            {
              title: "Enable Self-Service",
              icon: "pointer",
              tone: "approach",
              body: "Allow eligible clients to complete the application independently, phile preserving a path to sales support when additional review is needed.",
            },
            {
              title: "Preserve Product Rules",
              icon: "shield-check",
              tone: "approach",
              body: "Maintain each product's eligibility criteria and risk requirements within a shared architecture.",
            },
            // Temporary duplicate: replace with new copy.
            {
              title: "Preserve Product Rules",
              icon: "shield-check",
              tone: "approach",
              body: "Maintain each product's eligibility criteria and risk requirements within a shared architecture.",
            },
          ],
        },
      ],
    },
    {
      id: "design-exploration",
      label: "03 – Design Exploration",
      title: "Structuring the application around what changes",
      blocks: [
        {
          type: "p",
          text: "I worked with product managers to compare the existing applications and identify which requirements could be *shared* vs product-specific (Figure 3.0).",
        },
        {
          type: "p",
          text: "Applicant details, business information, business activities, and ownership formed the common *foundation*. From there, the application *adapted* to the products selected and the client's answers.",
        },
        {
          type: "application-flow",
          figure: { number: "Figure 3.0" },
          once: {
            label: "All Products",
            title: "Information Collected Once",
            items: ["Applicant", "Business Profile", "Business Activities", "Owners & Signers"],
          },
          selection: {
            label: "All Products",
            title: "Product Selection",
            products: [
              { name: "Checking Accounts", count: 3 },
              { name: "Savings Accounts", count: 2 },
              { name: "Credit Cards", count: 3 },
              { name: "Merchant Services", count: 1 },
            ],
          },
          paths: [
            {
              label: "Checking / Savings · Deposit",
              items: ["Account purpose", "Funding"],
              appliesTo: ["Checking Accounts", "Savings Accounts"],
            },
            {
              label: "Credit Card",
              items: ["Income", "Housing", "Employee cards", "Security deposit"],
              appliesTo: ["Credit Cards"],
            },
            {
              label: "Merchant · Merchant Services",
              items: ["Locations", "Transaction size", "Payment methods", "Payment equipment"],
              appliesTo: ["Merchant Services"],
            },
          ],
          review: {
            label: "All Products",
            title: "Review & Submit",
            items: ["Product disclosures", "Terms and conditions", "Consent"],
          },
        },
      ],
    },
    {
      id: "the-challenge",
      label: "04 – The Challenge",
      title: "Knowing when a form should hand the client to a person",
      blocks: [
        {
          type: "p",
          text: "Not every business *qualified* for the same digital application path. I worked with Risk and Compliance to define the conditions that determined whether a client could continue, needed *specialist* review, or fell outside the bank's supported criteria.",
        },
        {
          type: "p",
          text: "The shared application also created an opportunity to present instant *counteroffers*. When a client didn't qualify for their selected product, the bank could assess whether an alternative was appropriate and present it within the same journey, rather than requiring the client to start *over*.",
        },
        {
          type: "decision-matrix",
          figure: { number: "Figure 4.0" },
          rows: [
            {
              category: "Applicant",
              trigger: "Multiple active business accounts already exist under the same SIN/ITIN",
              reason: "Requires manual review to avoid duplicate setup or incorrect account ownership",
              decision: "Sales",
            },
            {
              category: "Business Profile",
              trigger: "Business is less than 6 months old",
              reason: "Newer businesses may require additional verification before products can be opened",
              decision: "Sales",
            },
            {
              category: "Business Activities",
              trigger: "Business has more than 10,000 employees",
              reason: "Operation scale requires dedicated relationship management and custom pricing",
              decision: "Sales",
            },
            {
              category: "Business Activities",
              trigger: "Annual revenue exceeds $10M",
              reason: "Exceeds small business threshold and requires global banking intake process",
              decision: "Sales",
            },
            {
              category: "Business Activities",
              trigger: "Business operates in a high-risk or restricted industry",
              reason: "Regulatory and compliance restrictions prohibit restricted industries",
              decision: "Stop",
            },
            {
              category: "Business Activities",
              trigger: "Business provides money services or currency transmission",
              reason: "Money-services activity requires additional regulatory review",
              decision: "Sales",
            },
            {
              category: "Owners & Signers",
              trigger: "Owner or control person cannot provide accepted U.S. identification",
              reason: "Businesses outside the U.S. are not supported at this time",
              decision: "Stop",
            },
          ],
        },
      ],
    },
    {
      id: "layout-design",
      label: "05 – Layout Design",
      title: "Cards – consistent and responsive",
      blocks: [
        {
          type: "pair",
          main: [
            {
              type: "p",
              text: "The card component was highly *critical* from a content-organization and responsive perspective. At large breakpoints, I used a 12-column grid to constrain the card to roughly half the viewport. This reduced eye movement between labels and inputs, kept the form *readable*, and easily adaptable to smaller screens.",
            },
          ],
          aside: [
            {
              type: "figure",
              figure: {
                number: "Figure 5.0",
                reveal: true,
                slots: [
                  {
                    kind: "image",
                    alt: "Large-screen application card constrained to half the viewport on a 12-column grid",
                    placeholder: "Unified · Large screen with 12-column grid",
                    aspect: "16 / 10",
                    label: "Large screen",
                  },
                ],
              },
            },
            {
              type: "figure",
              figure: {
                number: "Figure 5.0",
                reveal: true,
                slots: [
                  {
                    kind: "image",
                    alt: "Small-screen application card filling the mobile grid",
                    placeholder: "Unified · Small screen with grid",
                    aspect: "16 / 10",
                    label: "Small screen",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: "design-system",
      label: "05 – Layout Design",
      title: "The bank's new look and feel",
      blocks: [
        { type: "p", text: "I leveraged our bank's new design system" },
        {
          type: "figure",
          figure: {
            number: "Figure 5.0",
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Progress stepper and its component parts from the bank's design system",
                placeholder: "Unified · Progress stepper and component parts",
                aspect: "16 / 9",
              },
            ],
          },
        },
        {
          type: "figure",
          figure: {
            number: "Figure 5.0",
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Helix tags and related design system components",
                placeholder: "Unified · Helix tags and components",
                aspect: "16 / 9",
              },
            ],
          },
        },
      ],
    },
    {
      id: "design-refinement",
      label: "06 – Design Refinement",
      title: "Replacing the wait with next steps",
      blocks: [
        {
          type: "pair",
          main: [
            {
              type: "p",
              text: "Previously, submitting an application left clients with little *visibility* into what happened next. Their status remained “Application pending” while a sales associate reviewed the application, determined next steps, and contacted them, even when a client could be *approved* without review.",
            },
            {
              type: "p",
              text: "We created an Action Center to change that experience through a link emailed after application submission (Figure 5.0). I designed the dashboard where clients could *track* the status of each product they applied for, finish outstanding actions, and complete additional requirements without *waiting* for an associate.",
            },
          ],
          aside: [
            {
              type: "figure",
              figure: {
                number: "Figure 6.0",
                reveal: true,
                slots: [
                  {
                    kind: "image",
                    alt: "Action Center dashboard showing each product's application status and outstanding actions",
                    placeholder: "Unified · Action Center screenshot",
                    aspect: "4 / 3",
                  },
                ],
              },
            },
          ],
        },
        {
          type: "cards",
          cards: [
            {
              title: "Self-Service After Submission",
              icon: "user-check",
              tone: "solution",
              body: "Clients could complete outstanding actions without waiting for an associate to contact them, helping eligible applications progress faster.",
            },
            {
              title: "Support If Needed",
              icon: "life-buoy",
              tone: "solution",
              body: "Clients could contact a Merchant Associate with questions, preserving human support for situations that needed guidance or additional review.",
            },
            // Temporary duplicate: replace with new copy.
            {
              title: "Support If Needed",
              icon: "life-buoy",
              tone: "solution",
              body: "Clients could contact a Merchant Associate with questions, preserving human support for situations that needed guidance or additional review.",
            },
          ],
        },
      ],
    },
    {
      id: "high-fidelity-design",
      label: "07 – High-Fidelity Design",
      title: "Showing how every product works together",
      blocks: [
        {
          type: "p",
          text: "I translated the shared application structure into high-fidelity screens, applying our internal design system components. I focused on *consistent* navigation and clear progress indicators, while showing additional questions *only* when they were relevant to the client's selections or answers.",
        },
        {
          type: "p",
          text: "I reviewed the entire flow with product, technology, risk, and compliance partners. For each review, I walked through product combinations, ownership scenarios, unsupported business types, validation errors, and other cases that changed how the application should behave. These reviews helped us make small adjustments, uncover *gaps* and *clarify* requirements before implementation.",
        },
        ...(["7.0", "7.1", "7.2"] as const).map((n) => ({
          type: "figure" as const,
          figure: {
            number: `Figure ${n}`,
            reveal: true,
            slots: [
              {
                kind: "image" as const,
                alt: `High-fidelity application screens, figure ${n}`,
                placeholder: `Unified · High-fidelity screens (Figure ${n})`,
                aspect: "16 / 10",
              },
            ],
          },
        })),
        {
          type: "citizenship-form",
          figure: {},
          copy: {
            heading: "About your citizenship",
            required: "* Response required",
            countryLabel: "Country of citizenship*",
            countryValue: "United States",
            countryHint:
              "Select United States if you have dual citizenship with the United States and another country.",
            statusLabel: "U.S. citizenship status",
            statusValue: "U.S. citizen",
            statusHelpLabel: "Why can't I change this?",
            statusHelp:
              "When United States is selected for country of citizenship, this indicates the person is a U.S. citizen. If the person is not a U.S. citizen, select a different country of citizenship.",
            ssnLabel: "Social Security number (SSN)*",
            ssnPlaceholder: "XXX-XX-XXXX",
          },
        },
        {
          type: "prototype",
          title: "Application prototype",
          figure: {},
          status: "Prototype pending · click map and screens not supplied",
          slots: [
            { device: "Desktop", placeholder: "Unified · Desktop prototype", aspect: "16 / 10" },
            { device: "Mobile", placeholder: "Unified · Mobile prototype", aspect: "9 / 19.5" },
          ],
        },
      ],
    },
    {
      id: "the-result",
      label: "08 – The Result",
      title: "One application, more banking opportunities.",
      blocks: [
        {
          type: "p",
          text: "Bringing multiple products into one self-service application meant determining how the experience should respond to different products, applicant circumstances, and risk requirements. I translated those variables into which information could be collected *once*, where product-specific requirements needed to *branch*, and when an applicant could continue digitally or stop by eligibility rules.",
        },
        {
          type: "p",
          text: "For clients, the self-service journey saved time, reduced friction, and increased *approval* rates. For the bank, it *boosted* digital sales and allowed sales associates to support clients that need it most.",
        },
        {
          type: "testimonial",
          testimonial: {
            quote:
              "Hunter's proactiveness and attention to detail were a critical part of the project's success, with shifting requirements and multiple application releases. We truly couldn't have done it without you.",
            name: "Chelsea Brierton",
            role: "Design Lead @ Bank of America",
          },
        },
        {
          type: "callout",
          text: "The result wasn't just a redesigned application – it was a stronger foundation for how small businesses establish and grow their relationship with the bank.",
        },
        {
          type: "metrics",
          metrics: [
            { value: null, label: "Submission in pilot testing", sourceValue: "0% faster" },
            { value: null, label: "Small business clients supported", sourceValue: "0+" },
            // Temporary duplicate: replace with new copy.
            { value: null, label: "Small business clients supported", sourceValue: "0+" },
          ],
        },
      ],
    },
  ],
  chapters: [
    { name: "The Problem", sections: ["the-problem"] },
    { name: "The Requirements", sections: ["the-requirements", "design-exploration"] },
    { name: "The Challenge", sections: ["the-challenge"] },
    { name: "Layout Design", sections: ["layout-design", "design-system"] },
    { name: "Design Refinement", sections: ["design-refinement"] },
    { name: "High-Fidelity Design", sections: ["high-fidelity-design"] },
    { name: "The Result", sections: ["the-result"] },
  ],
}
