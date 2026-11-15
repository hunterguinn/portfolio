<!-- Section labels appear in italics below their titles. Bold labels within Supporting cards are card titles. -->

# Merrill Edge Asset Transfer

*Case Study*

I designed and delivered the new digital asset transfer experience for wealth management clients. The new experience modernizes how clients can transfer investments from their external financial institution to Merrill, supporting broader transfer types.

**The Team**

- VP, UXD (Me)
- SVP, Digital Director
- Product Managers
- Engineers

**The Timeline**

- 8 months
- Released 2027

## Relying on an API for transfer speed

*01 – The Problem*

Transferring assets between investment firms is inherently complex. Clients must manually enter the destination account, external account, ownership information, and securities to be compatible.

Our current transfer experience is old, antiquated, and only on the web. I designed a faster, responsive solution that leveraged an open finance API to prep-populate data from the client's external brokerage.

<!-- Supporting cards -->

**Account Eligibility**

Clients need to select corresponding account types, such as Roth IRA to Roth IRA, rather than choose an ineligible account from the start.

**Incomplete Data**

The API could return missing or incorrect data that wouldn't line up with Merrill's requirements, which could make the entire transfer void.

**Asset Selection**

Clients needed to specify what to transfer and how much to transfer, which could vary from very small to very large transfers.

## Starting with what we already knew

*02 – The Requirements*

With the API, clients only have to select an eligible external account and choose assets to transfer. But it wasn't that simple. What would happen if the API returns any missing or incorrect external account data? We might need clients to confirm their name if their external account didn't match their Merrill account, or provide us with their external account number or account type.

I worked with product partners to confirm which information was always required, what the API could capture, and when the experience needed to collect more details (Figure 2.0).

<!-- Figure placement -->

*Figure 2.0 · VISUAL*

| Step | Requirement | Figure copy |
| --- | --- | --- |
| 01 · Account Selection | Required | Merrill account selection, Connect with external `<FI>`, `<FI>` account selection |
| 02 · Asset Selection | Required | List of securities, Amount of shares/cash, Full transfer vs partial transfer |
| 03 · Account Details | Conditional | Primary account holder, Account number, Account type, Joint account holders, Margins and options |
| 04 · Review & Submit | Required | Destination account, External account, Assets in transfer, Terms & conditions |

## Making asset selection quick an easy

*03 – Design Exploration*

I leveraged a data table to organize and support dense financial information – asset name, ticker, selection status, checkbox selector, and input transfer amount. This also worked well for screen reader accessibility and for large and small breakpoints (Figure 3.0). Lastly, full transfers were the most common type, so preselecting assets on page-load reduced the work required for a full transfer while preserving the flexibility to make a partial one.

<!-- Figure placement -->

*Figure 3.0 · IMAGE*

## Making large transfers manageable

*04 – The Constraint*

The API backend imposed a limit on asset selection – clients exceeding 50 securities could only transfer their entire account or only up to 50 securities individually.

However, if a client's external account holds ineligible assets, such as cryptocurrency or proprietary funds, then clients with over 50 securities were forced to make a partial transfer. I created tailored experiences for both (Figure 4.0, 4.1).

<!-- Figure placement -->

**Full Transfer – No Asset Selection**  
*Figure 4.0 · IMAGE*

<!-- Figure placement -->

**Partial Transfer – Limited Asset Selection**  
*Figure 4.0 · IMAGE*

<!-- Supporting cards -->

**Adding an Interstitial**

While I explored other design solution, a radio question fulfilled the requirement without requiring the clients to understand underlying rules and complexity.

**Two Paths**

An asset counter made the selection limit visible, while contextual messaging explained when clients needed to change their selections and why.

**Tailored Asset Selection**

Choose a full transfer would take clients right to the last screen, while a partial transfer would allow clients to choose up to 50 securities.

## Finding the point where clients got stuck

*05 – Usability Testing*

I partnered with design research to test a click-through prototype of the new asset transfer experience. In the study, 65% of participants completed a transfer task with ease, but the remaining 35% of clients abandoned it at the same point.

> Clients entered $0 to not include a security, instead of deselecting a security. When the interface returned an error, they didn't know how to recover and abandoned the transfer.

I explored two ways to address this. One was to synchronize the checkbox and amount input (Figure 5.0). Selecting or deselecting a security would update the textbox, and changing the textbox would update its selection state. However, this idea introduced accessibility and dev implementation concern.

The second was removing the checkbox, using the amount field to determine which assets to transfer, which clients were already doing (Figure 5.1). Clients would enter the amount to transfer or enter "0" to exclude a security.

<!-- Prototype placement -->

*Figure 5.0 · INTERACTIVE*

**Prototype status:** 4 of 4 securities have an amount entered

<!-- Prototype placement -->

*Figure 5.1 · INTERACTIVE*

**Prototype status:** 4 of 4 securities transferred in full

**Copy shared by both prototypes**

| Asset | Name | Shares | Transfer amount |
| --- | --- | --- | --- |
| GOOG | Google Inc | 7 shares | 7 |
| FXAIX | Fidelity 500 Index Fund | 9 shares | 9 |
| FSPSX | Fidelity International… | 22 shares | 22 |
| AAPL | Apple Inc | 10 shares | 10 |

Keeping both controls gave clients more flexibility, it was just a matter of making them work together, so I prototyped the relationship between the checkbox and amount field (Figure 5.3).

Entering $0 deselects the asset, while deselecting an asset set its amount to $0. On the flip side, entering an amount greater than $0 reselects a deselected asset, while reselecting an asset requires users to enter a new amount. I created a prototype to walk accessibility and engineering teams through the behavior.

> After reviewing the prototype, accessibility and development teams confirmed the interaction was technically achievable – I documented the new interaction rules for implementation.

<!-- Figure placement -->

*Figure 5.3 · VIDEO*

## Designing for every transfer scenario

*06 – High-Fidelity Design*

I translated the experience into high-fidelity designs, covering the core transfer experience (Figure 6.0), conditional content (Figure 6.1), and errors states (Figure 6.2).

I walked product and technology partners through each screen and user flow, showing how the experience should work and respond as clients moved through the transfer process.

<!-- Figure placement -->

**Core Transfer Experience**  
*Figure 6.0 · IMAGE*

<!-- Figure placement -->

**Missing Account Details**  
*Figure 6.1 · IMAGE*

<!-- Figure placement -->

**Error Handling**  
*Figure 6.2 · IMAGE*

## Designing within constraints, without compromising the experience

*07 – The Result*

This project reinforced the importance of designing within technical realities, not just the happy path. By translating backend rules and imperfect data into clear interactions, I created an experience that determined what was possible and asked for additional information only when needed.

> The challenge wasn't to replace a manual flow – it was adapting to real-world scenarios without passing any of that complexity on to clients.

<!-- Metric cards -->

- **$80 billion** — Net assets transferred annually

- **4+ million** — Merrill clients supported

## 00 – Next Project

## Footer

**Pages**

- [Merrill Edge Asset Transfer](/merrill)
- [Enterprise Point-of-Sale Software](/pos)
- [Unified Client Application](/unified)

**Contact**

- Email
- Resume
- LinkedIn

© 2026 Hunter Guinn
