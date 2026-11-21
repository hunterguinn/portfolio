import type { CaseStudy } from "./types"

export const orderScreen = {
  actions: ["Customer", "+Charge", "+Custom"],
  items: [
    { qty: 1, name: "Custom Pizza - Large", detail: "Red sauce, mozzarella, pepperoni (double)", price: "$28.00" },
    { qty: 2, name: "House Salad", detail: "Grilled chicken, hot honey", price: "$32.00" },
    { qty: 1, name: "Garlic Knots", price: "$12.00" },
  ],
  totals: [
    { label: "Tax Exempt", value: "$4.00" },
    { label: "Subtotal", value: "$72.00" },
  ],
  buttons: ["PAYMENT", "ADD ITEM"],
}

export const pos: CaseStudy = {
  slug: "pos",
  eyebrow: "Case Study",
  title: "Enterprise Point-of-Sale System",
  description:
    "Case study: turning an acquired point-of-sale product into a cohesive, bank-owned platform across payment devices for small business clients.",
  intro:
    "I turned an acquired point-of-sale product into a cohesive, bank-owned platform that provides payment process to our small business clients. Working with external product and technology teams, I established a design foundation across payment devices, creating consistency in the current experience and a scalable foundation for future enhancements.",
  team: ["VP, UXD (Me)", "SWEs (External)", "Product Owners (External)"],
  timeline: ["12 months", "Released 2026"],
  sections: [
    {
      id: "the-problem",
      label: "01 – The Problem",
      title: "Unexpected scale, tight delivery",
      blocks: [
        {
          type: "p",
          text: "When NCR ended its point-of-sale contract with the bank, tens of thousands of small business clients risked losing access to payment processing. The bank quickly acquired third-party software to maintain service.",
        },
        {
          type: "p",
          text: "What seemed to be a straightforward transition expanded into a much larger design effort – hundreds of screens across multiple point-of-sale different devices (Figure 1.0).",
        },
        {
          type: "cards",
          cards: [
            {
              title: "Business Risk",
              icon: "shield-alert",
              tone: "problem",
              body: "Losing the existing point-of-sale solution threatened payment processing for small businesses and put thousands of client relationships at risk.",
            },
            {
              title: "Aggressive Timeline",
              icon: "timer",
              tone: "problem",
              body: "The fast transition left us with very little time to define requirements, evaluate design options, and improve the existing experience.",
            },
          ],
        },
        {
          type: "delivery-timeline",
          figure: { number: "Figure 1.0" },
          periods: ["Q1 2024", "Q2 2024"],
          lanes: [
            {
              track: "Design",
              cells: [
                [
                  { label: "Design System" },
                  { label: "APK Vertical", detail: ["200+ screens", "72% scope"] },
                  { label: "Handoff", milestone: true },
                ],
                [
                  { label: "APK Horizontal", detail: ["200+ screens", "80% scope"] },
                  { label: "Handoff", milestone: true },
                ],
              ],
            },
            {
              track: "Development",
              cells: [
                [{ label: "APK Vertical", detail: ["200+ screens"] }],
                [
                  { label: "Code Freeze", milestone: true },
                  { label: "APK Horizontal", detail: ["200+ screens"] },
                ],
              ],
            },
            {
              track: "QA",
              cells: [
                [],
                [
                  { label: "APK Vertical", detail: ["Design defects"] },
                  { label: "APK Horizontal", detail: ["Design defects"] },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "the-challenge",
      label: "02 – The Challenge",
      title: "Working from screenshots",
      blocks: [
        {
          type: "p",
          text: "We only had screenshots of the acquired software, so every screen came with open questions. I started with screenshots that affected the most amount screens and core merchant tasks (Figure 2.0, Figure 2.1).",
        },
        {
          type: "cards",
          cards: [
            {
              title: "Repeat Where Possible",
              icon: "repeat",
              tone: "approach",
              body: "Reuse page templates and design patterns so technology has less net-new development and the experience becomes predicable.",
            },
            {
              title: "Targeted Improvements",
              icon: "target",
              tone: "approach",
              body: "Prioritize practical changes that simplify tasks, clarify actions, and improve consistency without adding complexity.",
            },
          ],
        },
        {
          type: "figure",
          figure: {
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Screenshot of the acquired point-of-sale software",
                placeholder: "POS · Acquired software screenshot (Figure 2.0)",
                aspect: "16 / 10",
                label: "Figure 2.0",
              },
              {
                kind: "image",
                alt: "Second screenshot of the acquired point-of-sale software",
                placeholder: "POS · Acquired software screenshot (Figure 2.1)",
                aspect: "16 / 10",
                label: "Figure 2.1",
              },
            ],
          },
        },
      ],
    },
    {
      id: "order-redesign",
      label: "03 – Design Process",
      title: "Every review revealed something new",
      blocks: [
        {
          type: "p",
          text: "I quickly realized that the acquired product had severe accessibility issues, difficult workflows, and inconsistent UI (Figure 2.0). One example was the Order screen, where merchants build a customer’s order (Figure 3.0).",
        },
        {
          type: "p",
          text: 'Several buttons were unnecessary or duplicative, and overlapped with interactive item rows. Adding an item required opening a separate search screen, and the customer\'s order total remained hidden until the merchant selected "Pay".',
        },
        {
          type: "pair",
          main: [
            {
              type: "p",
              text: 'In my redesign (Figure 3.1), I leveraged row components for each item, adding a quantity counter to the row for the needs of this workflow. Now, merchants could add items and adjust quantities directly on the Order screen using a counter, making the "Save" button irrelevant. Additionally, I replaced the previous "Type" sorting button with a segmented control, making the Category view more clear.',
            },
            {
              type: "cards",
              cards: [
                    {
                  title: "Less Visual Clutter",
                  icon: "minimize",
                  tone: "solution",
                  body: "Removed item thumbnails, since merchants rarely uploaded any, and decimal quantities, since items were always sold in whole numbers",
                },
                {
                  title: "Fewer Steps",
                  icon: "route",
                  tone: "solution",
                  body: "Merchants could add items and adjust quantities on the screen, eliminating unnecessary navigation and keeping key actions in reach.",
                },
              ],
            },
          ],
          aside: [
            {
              type: "figure",
              figure: {
                reveal: true,
                slots: [
                  {
                    kind: "image",
                    alt: "Original acquired Order screen with duplicative buttons and a hidden order total",
                    placeholder: "POS · Original Order screen",
                    aspect: "9 / 16",
                    label: "Figure 3.0 · Original",
                  },
                  {
                    kind: "image",
                    alt: "Redesigned Order screen with item rows, quantity counters, and a visible subtotal",
                    placeholder: "POS · Redesigned Order screen",
                    aspect: "9 / 16",
                    label: "Figure 3.1 · Redesign",
                    fallback: "order-screen",
                  },
                ],
              },
            },
          ],
        },
        {
          type: "figure",
          figure: {
            number: "Figure 3.2",
            slots: [
              {
                kind: "video",
                alt: "Walkthrough of adding items and adjusting quantities on the redesigned Order screen",
                placeholder: "POS · Order redesign walkthrough",
                aspect: "16 / 9",
              },
            ],
          },
        },
      ],
    },
    {
      id: "split-check",
      label: "04 – Design Process",
      title: "Too many actions, too little control",
      blocks: [
        {
          type: "p",
          text: 'Functionality was there, but the vendor interface made it harder to understand. Split Check on larger 14" and 15.6" tablet devices was another example.',
        },
        {
          type: "p",
          text: "Merchants can distribute an order across guests by creating new tickets for each guest, dividing items, and moving them between tickets. However, we only had this one screenshot to understand all that behavior (Figure 4.0).",
        },
        {
          type: "figure",
          figure: {
            number: "Figure 4.0",
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Original vendor Split Check screen on a large tablet",
                placeholder: "POS · Original Split Check screenshot",
                aspect: "16 / 9",
              },
            ],
          },
        },
        {
          type: "research-summary",
          questions: {
            title: "Open Questions (Summary)",
            items: [
              "What's the difference between Guest Split, Split By Items, and Split Evenly?",
              "What do plus and minus icons do?",
              "Does the minus icon remove an entire item, decreate quantity, or return it to Master Ticket?",
              "What happens to assigned items when a ticket is deleted?",
              "Is there a maximum number of tickets?",
              "What if an item is split but not assigned to a child ticket?",
              "What is the difference between Save & Pay and Save & Print?",
            ],
          },
          findings: {
            title: "Partner Meetings (Summary)",
            items: [
              {
                text: "Split Evenly: Every new ticket divides each item – everyone splits the check evenly",
                status: "Confirmed",
              },
              {
                text: "Split by Items: Merchant divides items and assigns them to which guest ordered what item",
                status: "Confirmed",
              },
              {
                text: "Plus icon in a ticket header creates a ticket, minus icon deletes that ticket",
                status: "Confirmed",
              },
              {
                text: "Plus icon beside an item splits an item in half, minus icon returns reduces it's split quantity",
                status: "Confirmed",
              },
              { text: "Maximum of 10 tickets", status: "Confirmed" },
              {
                text: "Deleted tickets with split items returns those split items back to the master ticket",
                status: "Unconfirmed",
              },
              {
                text: "Save & Pay goes to payment screen. Save & Print prints individual checks to pay at the table",
                status: "Unconfirmed",
              },
            ],
          },
        },
        {
          type: "pair",
          main: [
            {
              type: "p",
              text: "I focused on reducing visual complexity and making the core task easier. Action icons were in proximity with their item, while state changes made interactions more clear. Merchants can split an item, tap on it, and place it on another ticket (Figure 4.1).",
            },
            {
              type: "p",
              text: "I also reduced the amount of detail competing for attention, keeping item names, prices, color-coded quantities, and subtotals easy to scan (Figure 4.2).",
            },
          ],
          aside: [
            {
              type: "figure",
              figure: {
                number: "Figure 4.1",
                reveal: true,
                slots: [
                  {
                    kind: "image",
                    alt: "Redesigned Split Check screen with item actions beside each item and color-coded quantities",
                    placeholder: "POS · Split Check redesign",
                    aspect: "16 / 9",
                  },
                ],
              },
            },
            {
              type: "figure",
              figure: {
                number: "Figure 5.1",
                slots: [
                  {
                    kind: "video",
                    alt: "Walkthrough of splitting an item and moving it to another ticket",
                    placeholder: "POS · Split Check walkthrough",
                    aspect: "16 / 9",
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
      label: "05 – Design System",
      title: "Consistency across devices",
      blocks: [
        {
          type: "p",
          text: "Throughout the design process, I built and maintained a component library (Figure 6.0) across the point-of-sale experience. Our internal design system provided a starting point, but its components didn’t account for point-of-sale experiences or devices. I also referenced Google’s Material 3 for Android-specific patterns.",
        },
        {
          type: "p",
          text: "This library helped established make the experience coherent across multiple screens and devices, and made large updates easier to implement.",
        },
        {
          type: "figure",
          figure: {
            number: "Figure 5.0",
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Point-of-sale component library",
                placeholder: "POS · Component library",
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
                alt: "Screen layout on the A35 3-inch device",
                placeholder: "POS · A35 device layout",
                aspect: "120 / 200",
                label: "A35 (3”) · 120x200",
              },
              {
                kind: "image",
                alt: "Screen layout on the A800 5.7-inch device",
                placeholder: "POS · A800 device layout",
                aspect: "720 / 1440",
                label: "A800 (5.7”) · 720x1440",
              },
              {
                kind: "image",
                alt: "Screen layout on the A920 7-inch device",
                placeholder: "POS · A920 device layout",
                aspect: "720 / 1280",
                label: "A920 (7”) · 720x1280",
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
                alt: "Screen layout on the 3700 7-inch device",
                placeholder: "POS · 3700 device layout",
                aspect: "1280 / 800",
                label: "3700 (7”) · 1280x800",
              },
              {
                kind: "image",
                alt: "Screen layout on the L1400 14-inch device",
                placeholder: "POS · L1400 device layout",
                aspect: "1920 / 1080",
                label: "L1400 (14”) · 1920x1080",
              },
            ],
          },
        },
      ],
    },
    {
      id: "the-handoff",
      label: "06 – The Handoff",
      title: "Putting it all together",
      blocks: [
        {
          type: "p",
          text: "I worked directly with external developers throughout the implementation. I walked developers through each device's screens, interaction behaviors, components, and design-to-dev discrepancies in their demo enviornment.",
        },
        {
          type: "p",
          text: "Because developers could reference the component library, they saw redesigned screens and went from asking “What is this? What does this do?” to “Should we use this component here too?” which accelerated development and handoff sessions.",
        },
        {
          type: "figure",
          figure: {
            number: "Figure 6.0",
            title: "Order KDS Screen in Horizontal and Vertical Layouts",
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Order kitchen display screen in a horizontal layout",
                placeholder: "POS · Order KDS (horizontal)",
                aspect: "16 / 10",
                label: "Horizontal",
              },
              {
                kind: "image",
                alt: "Order kitchen display screen in a vertical layout",
                placeholder: "POS · Order KDS (vertical)",
                aspect: "16 / 10",
                label: "Vertical",
              },
            ],
          },
        },
        {
          type: "figure",
          figure: {
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Splash screen on the A800 device, design version",
                placeholder: "POS · 1.0 Splash (A800) – Figure 6.1",
                aspect: "720 / 1440",
                label: "Figure 6.1 · 1.0 Splash (A800)",
              },
              {
                kind: "image",
                alt: "Splash screen on the A800 device, comparison version",
                placeholder: "POS · 1.0 Splash (A800) – Figure 6.2",
                aspect: "720 / 1440",
                label: "Figure 6.2 · 1.0 Splash (A800)",
              },
            ],
          },
        },
        {
          type: "figure",
          figure: {
            number: "Figure 6.3",
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Composition of screens across devices with annotations",
                placeholder: "POS · Cross-device screen composition with annotations",
                aspect: "16 / 9",
              },
            ],
          },
        },
      ],
    },
    {
      id: "the-result",
      label: "07 – The Result",
      title: "Balancing urgency with intention",
      blocks: [
        {
          type: "p",
          text: "The business need was to replace the point-of-sale software, but a replacement also meant making the inherited experience practical for customers and merchants using them.",
        },
        {
          type: "p",
          text: "I approached the work by looking for improvements that could scale – clearer workflows, reusable patterns, and decisions that engineering could carry consistently across the product.",
        },
        {
          type: "testimonial",
          testimonial: {
            quote:
              "Hunter took vague requirements and created high-fidelity designs in roughly 6 weeks. This helped all of us get to final requirements, make decisions, and deliver so much faster than we possible could. He makes the design team look great, building trust with partners and programs that bring millions of dollars to the bank.",
            name: "Nate Ernst",
            role: "Design Principal at Bank of America",
          },
        },
        {
          type: "callout",
          text: "Close collaboration provided clarity and that systems created the greatest amount of leverage, allowing us to drive significant improvements for users.",
        },
        {
          type: "metrics",
          metrics: [
            { value: "$400 billion+", label: "Annual processing volume" },
            { value: "20,000+", label: "Merchant clients empowered" },
          ],
        },
      ],
    },
  ],
  chapters: [
    { name: "The Problem", sections: ["the-problem"] },
    { name: "The Challenge", sections: ["the-challenge"] },
    { name: "Design Process", sections: ["order-redesign", "split-check"] },
    { name: "Design System", sections: ["design-system", "the-handoff"] },
    { name: "The Result", sections: ["the-result"] },
  ],
}
