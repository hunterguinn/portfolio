<!-- Section labels appear in italics below their titles. Bold labels within Supporting cards are card titles. -->

# Enterprise Point-of-Sale System

*Case Study*

I turned an acquired point-of-sale product into a cohesive, bank-owned platform that provides payment process to our small business clients. Working with external product and technology teams, I established a design foundation across payment devices, creating consistency in the current experience and a scalable foundation for future enhancements.

**The Team**

- VP, UXD (Me)
- SWEs (External)
- Product Owners (External)

**The Timeline**

- 12 months
- Released 2026

## Unexpected scale, tight delivery

*01 – The Problem*

When NCR ended its point-of-sale contract with the bank, tens of thousands of small business clients risked losing access to payment processing. The bank quickly acquired third-party software to maintain service.

What seemed to be a straightforward transition expanded into a much larger design effort – hundreds of screens across multiple point-of-sale different devices (Figure 1.0).

<!-- Supporting cards -->

**Business Risk**

Losing the existing point-of-sale solution threatened payment processing for small businesses and put thousands of client relationships at risk.

**Aggressive Timeline**

The fast transition left us with very little time to define requirements, evaluate design options, and improve the existing experience.

**Sprawling Design Scope**

Hundreds of screens made it difficult to understand which features were available and how the acquired software worked.

<!-- Figure placement -->

*Figure 1.0 · TIMELINE*

**Timeline figure copy**

| Track | Q1 2024 | Q2 2024 |
| --- | --- | --- |
| Design | Design System; APK Vertical · 200+ screens · 72% scope; Handoff | APK Horizontal · 200+ screens · 80% scope; Handoff |
| Development | APK Vertical · 200+ screens | Code Freeze; APK Horizontal · 200+ screens |
| QA | | APK Vertical · Design defects; APK Horizontal · Design defects |

## Working from screenshots

*02 – The Challenge*

We only had screenshots of the acquired software, so every screen came with open questions. I started with screenshots that affected the most amount screens and core merchant tasks (Figure 2.0, Figure 2.1).

<!-- Supporting cards -->

**Understand Behaviors**

Confirm what each screen does, what action lead where, and what functionality was necessary.

**Repeat Where Possible**

Reuse page templates and design patterns so technology has less net-new development and the experience becomes predicable.

**Targeted Improvements**

Prioritize practical changes that simplify tasks, clarify actions, and improve consistency without adding complexity.

<!-- Figure placement -->

*Figure 2.0 · IMAGE*

<!-- Figure placement -->

*Figure 2.1 · IMAGE*

## Every review revealed something new

*03 – Design Process*

I quickly realized that the acquired product had severe accessibility issues, difficult workflows, and inconsistent UI (Figure 2.0). One example was the Order screen, where merchants build a customer’s order (Figure 3.0).

Several buttons were unnecessary or duplicative, and overlapped with interactive item rows. Adding an item required opening a separate search screen, and the customer's order total remained hidden until the merchant selected "Pay".

<!-- Figure placement -->

*Figure 3.0 · IMAGE*

In my redesign (Figure 3.1), I leveraged row components for each item, adding a quantity counter to the row for the needs of this workflow. Now, merchants could add items and adjust quantities directly on the Order screen using a counter, making the "Save" button irrelevant. Additionally, I replaced the previous "Type" sorting button with a segmented control, making the Category view more clear.

<!-- Figure placement -->

*Figure 3.1 · IMAGE*

**Order screen copy**

Customer · +Charge · +Custom

| Item | Price |
| --- | --- |
| (1) Custom Pizza - Large · Red sauce, mozzarella, pepperoni (double) | $28.00 |
| (2) House Salad · Grilled chicken, hot honey | $32.00 |
| (1) Garlic Knots | $12.00 |
| Tax Exempt | $4.00 |
| Subtotal | $72.00 |

PAYMENT · ADD ITEM

<!-- Supporting cards -->

**Clearer Actions**

Removed redundant controls and unnecessary item details, making the interface easier to scan while keeping essential functionality accessible.

**Less Visual Clutter**

Removed item thumbnails, since merchants rarely uploaded any, and decimal quantities, since items were always sold in whole numbers

**Fewer Steps**

Merchants could add items and adjust quantities on the screen, eliminating unnecessary navigation and keeping key actions in reach.

<!-- Figure placement -->

*Figure 3.2 · VIDEO*

## Too many actions, too little control

*04 – Design Process*

Functionality was there, but the vendor interface made it harder to understand. Split Check on larger 14" and 15.6" tablet devices was another example.

Merchants can distribute an order across guests by creating new tickets for each guest, dividing items, and moving them between tickets. However, we only had this one screenshot to understand all that behavior (Figure 4.0).

<!-- Figure placement -->

*Figure 4.0 · IMAGE*

<!-- Supporting cards -->

**Open Questions (Summary)**

- What's the difference between Guest Split, Split By Items, and Split Evenly?
- What do plus and minus icons do?
- Does the minus icon remove an entire item, decreate quantity, or return it to Master Ticket?
- What happens to assigned items when a ticket is deleted?
- Is there a maximum number of tickets?
- What if an item is split but not assigned to a child ticket?
- What is the difference between Save & Pay and Save & Print?

**Partner Meetings (Summary)**

- Split Evenly: Every new ticket divides each item – everyone splits the check evenly · *Confirmed*
- Split by Items: Merchant divides items and assigns them to which guest ordered what item · *Confirmed*
- Plus icon in a ticket header creates a ticket, minus icon deletes that ticket · *Confirmed*
- Plus icon beside an item splits an item in half, minus icon returns reduces it's split quantity · *Confirmed*
- Maximum of 10 tickets · *Confirmed*
- Deleted tickets with split items returns those split items back to the master ticket · *Unconfirmed*
- Save & Pay goes to payment screen. Save & Print prints individual checks to pay at the table · *Unconfirmed*

I focused on reducing visual complexity and making the core task easier. Action icons were in proximity with their item, while state changes made interactions more clear. Merchants can split an item, tap on it, and place it on another ticket (Figure 4.1).

I also reduced the amount of detail competing for attention, keeping item names, prices, color-coded quantities, and subtotals easy to scan (Figure 4.2).

<!-- Figure placement -->

*Figure 4.1 · IMAGE*

<!-- Figure placement -->

*Figure 5.1 · VIDEO*

## Consistency across devices

*05 – Design System*

Throughout the design process, I built and maintained a component library (Figure 6.0) across the point-of-sale experience. Our internal design system provided a starting point, but its components didn’t account for point-of-sale experiences or devices. I also referenced Google’s Material 3 for Android-specific patterns.

This library helped established make the experience coherent across multiple screens and devices, and made large updates easier to implement.

<!-- Figure placement -->

*Figure 5.0 · IMAGE*

<!-- Figure placement -->

*Figure 5.0 · IMAGE*

- A35 (3”) · 120x200
- A800 (5.7”) · 720x1440
- A920 (7”) · 720x1280

<!-- Figure placement -->

*Figure 5.0 · IMAGE*

- 3700 (7”) · 1280x800
- L1400 (14”) · 1920x1080

## Putting it all together

*06 – The Handoff*

I worked directly with external developers throughout the implementation. I walked developers through each device's screens, interaction behaviors, components, and design-to-dev discrepancies in their demo enviornment.

Because developers could reference the component library, they saw redesigned screens and went from asking “What is this? What does this do?” to “Should we use this component here too?” which accelerated development and handoff sessions.

<!-- Figure placement -->

**Order KDS Screen in Horizontal and Vertical Layouts**  
*Figure 6.0 · IMAGE*

<!-- Figure placement -->

*Figure 6.1 · IMAGE*

*1.0 Splash (A800)*

<!-- Figure placement -->

*Figure 6.2 · IMAGE*

*1.0 Splash (A800)*

<!-- Figure placement -->

*Figure 6.3 · IMAGE*

<!-- Draft figure note: A composition of screens across environments with annotations highlighting shared patterns / size differences -->

## Balancing urgency with intention

*07 – The Result*

The business need was to replace the point-of-sale software, but a replacement also meant making the inherited experience practical for customers and merchants using them.

I approached the work by looking for improvements that could scale – clearer workflows, reusable patterns, and decisions that engineering could carry consistently across the product.

> Hunter took vague requirements and created high-fidelity designs in roughly 6 weeks. This helped all of us get to final requirements, make decisions, and deliver so much faster than we possible could. He makes the design team look great, building trust with partners and programs that bring millions of dollars to the bank.
>
> **Nate Ernst, Design Principal at Bank of America**

> Close collaboration provided clarity and that systems created the greatest amount of leverage, allowing us to drive significant improvements for users.

<!-- Metric cards -->

- **$400 billion+** — Annual processing volume

- **20,000+** — Merchant clients empowered

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
