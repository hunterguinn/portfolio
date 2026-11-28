import type { CaseStudy, TransferRow } from "./types"

const securities: TransferRow[] = [
  { symbol: "GOOG", name: "Google Inc", shares: 7, amount: 7 },
  { symbol: "FXAIX", name: "Fidelity 500 Index Fund", shares: 9, amount: 9 },
  { symbol: "FSPSX", name: "Fidelity International…", shares: 22, amount: 22 },
  { symbol: "AAPL", name: "Apple Inc", shares: 10, amount: 10 },
]

export const merrill: CaseStudy = {
  slug: "merrill",
  eyebrow: "Case Study / 2027",
  title: "Merrill Edge Asset Transfer",
  description:
    "Case study: a faster, responsive asset transfer experience for Merrill wealth management clients, powered by an open finance API.",
  intro:
    "I designed and delivered the new digital asset transfer experience for wealth management clients. The new experience modernizes how clients can transfer investments from their external financial institution to Merrill, supporting broader transfer types.",
  team: ["VP, UXD (Me)", "SVP, Digital Director", "Product Managers", "Engineers"],
  timeline: ["8 months", "Released 2027"],
  sections: [
    {
      id: "the-problem",
      label: "01 – The Problem",
      title: "Relying on an API for transfer speed",
      blocks: [
        {
          type: "p",
          text: "Our current transfer experience is old, *antiquated*, and only on the web. I designed a *faster*, responsive solution that leveraged an Open Finance API where clients could connect with their external brokerage, instead of entering that information manually.",
        },
        {
          type: "p",
          text: "With the API, clients only have choose assets they want to transfer into Merrill, but it wasn't that simple. What if the API returns *missing* data? What if the data wasn't clean? What if we needed clients to verify information? This introduced a new set of *issues*.",
        },
        {
          type: "cards",
          cards: [
            {
              title: "Account Eligibility",
              icon: "shield-check",
              tone: "problem",
              body: "Clients need to select corresponding account types, such as Roth IRA to Roth IRA, rather than choose an ineligible account from the start.",
            },
            {
              title: "Incomplete Data",
              icon: "unplug",
              tone: "problem",
              body: "The API could return missing or incorrect data that wouldn't line up with Merrill's requirements, which could make the entire transfer void.",
            },
            {
              title: "Transferring Assets",
              icon: "transfer",
              tone: "problem",
              body: "Clients needed a quick, simple way to specify what and how much to transfer, which could vary from very small to very large transfers.",
            },
          ],
        },
      ],
    },
    {
      id: "the-requirements",
      label: "02 – The Requirements",
      title: "Starting with what we already knew",
      blocks: [
        {
          type: "p",
          text: "I created a new asset transfer workflow with the open finance API, defining which information clients still needed to provide, what the API could capture, and when the experience needed to collect more details if the API *failed* (Figure 2.0).",
        },
        {
          type: "transfer-steps",
          figure: { number: "Figure 2.0" },
          steps: [
            {
              step: "01",
              title: "Account Selection",
              requirement: "Required",
              items: [
                { label: "Connect with external firm", source: "api" },
                { label: "External firm account(s)", source: "api" },
                { label: "Select Merrill account", source: "you" },
              ],
            },
            {
              step: "02",
              title: "Asset Selection",
              requirement: "Required",
              items: [
                { label: "List of securities", source: "api" },
                { label: "Share and cash amounts", source: "api" },
                { label: "Full or partial transfer", source: "you" },
                { label: "Assets to include or exclude", source: "you" },
              ],
            },
            {
              step: "03",
              title: "Account Details",
              requirement: "Conditional",
              items: [
                { label: "Primary account holder(s)", source: "api" },
                { label: "Account number", source: "api" },
                { label: "Account type", source: "api" },
                { label: "Margins and options", source: "conditional" },
                { label: "Joint account holders", source: "conditional" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "design-exploration",
      label: "03 – Design Exploration",
      title: "Making asset selection quick an easy",
      blocks: [
        {
          type: "pair",
          main: [
            {
              type: "p",
              text: "I leveraged a data table to organize and support dense financial information – asset name, ticker, selection status, checkbox selector, and input transfer amount. This also worked well for screen reader *accessibility* and for large and small breakpoints (Figure 3.0). Lastly, full transfers were the most common type, so *preselecting* assets on page-load reduced the work required for a full transfer while preserving the flexibility to make a partial one.",
            },
          ],
          aside: [
            {
              type: "figure",
              figure: {
                number: "Figure 3.0",
                reveal: true,
                slots: [
                  {
                    kind: "image",
                    alt: "Asset selection data table listing each security's name, ticker, selection checkbox, and transfer amount",
                    placeholder: "Merrill · Asset selection data table",
                    aspect: "4 / 5",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: "the-constraint",
      label: "04 – The Constraint",
      title: "Making large transfers manageable",
      blocks: [
        {
          type: "p",
          text: "The API backend imposed a *limit* on asset selection – clients exceeding 50 securities could only transfer their *entire* account or only up to 50 securities individually.",
        },
        {
          type: "p",
          text: "However, if a client's external account holds *ineligible* assets, such as cryptocurrency or proprietary funds, then clients with over 50 securities were *forced* to make a partial transfer. I created tailored experiences for both (Figure 4.0, 4.1).",
        },
        { type: "selection-limit", figure: {}, limit: 50 },
        {
          type: "figure",
          figure: {
            reveal: true,
            slots: [
              {
                kind: "image",
                alt: "Full transfer screen where the entire external account moves to Merrill with no individual asset selection",
                placeholder: "Merrill · Full Transfer – No Asset Selection",
                aspect: "9 / 16",
                label: "Figure 4.0 · Full Transfer – No Asset Selection",
              },
              {
                kind: "image",
                alt: "Partial transfer screen with an asset counter limiting selection to 50 securities",
                placeholder: "Merrill · Partial Transfer – Limited Asset Selection",
                aspect: "9 / 16",
                label: "Figure 4.0 · Partial Transfer – Limited Asset Selection",
              },
            ],
          },
        },
        {
          type: "cards",
          cards: [
            {
              title: "Adding an Interstitial",
              icon: "message",
              tone: "solution",
              body: "While I explored other design solution, a radio question fulfilled the requirement without requiring the clients to understand underlying rules and complexity.",
            },
            {
              title: "Two Paths",
              icon: "split",
              tone: "solution",
              body: "An asset counter made the selection limit visible, while contextual messaging explained when clients needed to change their selections and why.",
            },
            // Temporary duplicate: replace with new copy.
            {
              title: "Two Paths",
              icon: "split",
              tone: "solution",
              body: "An asset counter made the selection limit visible, while contextual messaging explained when clients needed to change their selections and why.",
            },
          ],
        },
      ],
    },
    {
      id: "usability-testing",
      label: "05 – Usability Testing",
      title: "Finding the point where clients got stuck",
      blocks: [
        {
          type: "p",
          text: "I partnered with design research to test a click-through prototype of the new asset transfer experience. In the study, 65% of participants completed a transfer task with ease, but the remaining 35% of clients abandoned it at the same point.",
        },
        {
          type: "callout",
          text: "Clients entered $0 to not include a security, instead of deselecting a security. When the interface returned an error, they didn't know how to recover and abandoned the transfer.",
        },
      ],
    },
    {
      id: "exploring-two-solutions",
      label: "06 – Exploring Two Solutions",
      title: "Exploring two solutions",
      blocks: [
        {
          type: "p",
          text: "One way was to sync-up the checkbox and amount input (Figure 5.0). Selecting a security would update the textbox, and changing the textbox would update its selection. However, this approach introduced accessibility and dev implementation concern.",
        },
        {
          type: "transfer-demo",
          figure: { number: "Figure 5.0" },
          mode: "synchronized",
          rows: securities,
          initialStatus: "4 of 4 securities have an amount entered",
          rules: {
            zeroDeselects: "Entering $0 deselects the asset",
            deselectZeroes: "deselecting an asset set its amount to $0",
            amountReselects: "entering an amount greater than $0 reselects a deselected asset",
            reselectRequiresAmount: "reselecting an asset requires users to enter a new amount",
          },
        },
        {
          type: "p",
          text: 'The second way was *removing* the checkbox entirely, which many clients were already doing in the mobile test. We could lean into this mental model – just use the amount field to determine which assets to transfer or not. Clients would enter the amount to transfer or enter "0" to exclude a security.',
        },
        {
          type: "transfer-demo",
          figure: { number: "Figure 5.1" },
          mode: "amount-only",
          rows: securities,
          initialStatus: "4 of 4 securities transferred in full",
          rules: {
            zeroDeselects: 'Clients would enter the amount to transfer or enter "0" to exclude a security.',
          },
        },
        {
          type: "pair",
          main: [
            {
              type: "p",
              text: "Keeping both controls gave clients more *flexibility*, it was just a matter of making them work together, so I prototyped the relationship between the checkbox and amount field (Figure 5.3).",
            },
            {
              type: "p",
              text: "Entering $0 deselects the asset, while deselecting an asset set its amount to $0. On the flip side, entering an amount greater than $0 reselects a deselected asset, while reselecting an asset requires users to enter a new amount. I created a prototype to walk accessibility and engineering teams through the *behavior*.",
            },
            {
              type: "callout",
              text: "After reviewing the prototype, accessibility and development teams confirmed the interaction was technically achievable – I documented the new interaction rules for implementation.",
            },
          ],
          aside: [
            {
              type: "figure",
              figure: {
                number: "Figure 5.3",
                slots: [
                  {
                    kind: "video",
                    alt: "Walkthrough of the checkbox and amount field interaction rules",
                    placeholder: "Merrill · Checkbox and amount interaction walkthrough",
                    aspect: "4 / 5",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      id: "high-fidelity-design",
      label: "07 – High-Fidelity Design",
      title: "Designing for every transfer scenario",
      blocks: [
        {
          type: "p",
          text: "I translated the experience into high-fidelity designs, covering the core transfer experience (Figure 6.0), conditional content (Figure 6.1), and errors states (Figure 6.2).",
        },
        {
          type: "p",
          text: "I walked product and technology partners through each screen and user flow, showing how the experience should work and respond as clients moved through the transfer process.",
        },
        ...(
          [
            ["Figure 6.0", "Core Transfer Experience", "core transfer flow"],
            ["Figure 6.1", "Missing Account Details", "missing account details prompts"],
            ["Figure 6.2", "Error Handling", "error states"],
          ] as const
        ).map(([number, title, subject]) => ({
          type: "figure" as const,
          figure: {
            number,
            title,
            reveal: true,
            slots: [
              {
                kind: "image" as const,
                alt: `High-fidelity desktop screens showing the ${subject}`,
                placeholder: `Merrill · ${title} (desktop)`,
                aspect: "16 / 10",
                label: "Desktop",
              },
              {
                kind: "image" as const,
                alt: `High-fidelity mobile screens showing the ${subject}`,
                placeholder: `Merrill · ${title} (mobile)`,
                aspect: "16 / 10",
                label: "Mobile",
              },
            ],
          },
        })),
      ],
    },
    {
      id: "the-result",
      label: "08 – The Result",
      title: "Designing within constraints, without compromising the experience",
      blocks: [
        {
          type: "p",
          text: "This project reinforced the importance of designing within *technical* realities, not just the happy path. By translating backend rules and imperfect data into clear interactions, I created an experience that determined what was possible and asked for additional information *only* when needed.",
        },
        {
          type: "callout",
          text: "The challenge wasn't to replace a manual flow – it was adapting to real-world scenarios without passing any of that complexity on to clients.",
        },
        {
          type: "metrics",
          metrics: [
            { value: "$80 billion", label: "Net assets transferred annually" },
            { value: "4+ million", label: "Merrill clients supported" },
            // Temporary duplicate: replace with new copy.
            { value: "4+ million", label: "Merrill clients supported" },
          ],
        },
      ],
    },
  ],
  chapters: [
    { name: "The Problem", sections: ["the-problem", "the-requirements"] },
    { name: "Design Exploration", sections: ["design-exploration", "the-constraint"] },
    { name: "Usability Testing", sections: ["usability-testing", "exploring-two-solutions"] },
    { name: "High-Fidelity Design", sections: ["high-fidelity-design"] },
    { name: "The Result", sections: ["the-result"] },
  ],
}
