<!-- Section labels appear in italics below their titles. Bold labels within Supporting cards are card titles. -->

# Unified Client Application

*Case Study*

I designed a new, digital application that allowed clients to apply for multiple business products in one session, rather than navigating separate applications for each credit, savings, and checking product. The result was a shared experience that reduced repetitive steps, boosted digital sales, and preserved risk controls.

**The Team**

- VP, UXD (Me)
- Digital Directors
- Product Managers
- AML/KYC Risk
- Engineers

**The Timeline**

- 13 months
- Limited pilot release

## Each product was its own application

*01 – The Problem*

Businesses often need several financial products, from checking accounts and credit cards to payment processing. Online applications for these products have many of the same questions. However, each application was built in its own space, with different business requirements and eligibility rules (Figure 1.0)

<!-- Supporting cards -->

**Digital-First Needs**

Fintechs like Toast and Square made getting started feel fast and straightforward, setting expectations for how quickly businesses could access financial services.

**Associate-Led Process**

Each application depended on sales associate review, even when some could be approved digitally, which accounted for the most friction.

**Disconnected Journeys**

Each product had its own application, questions, and requirements – there was no shared process.

<!-- Figure placement -->

*Figure 1.0 · IMAGE*

## One application built around shared logic

*02 – The Requirements*

The goal wasn't to combine separate applications into one interface, but instead to create shared foundation – one that could support multiple products in one experience, adapt to different business needs, and preserve the eligibility criteria each product required.

<!-- Supporting cards -->

**Enable Self-Service**

Allow eligible clients to complete the application independently, phile preserving a path to sales support when additional review is needed.

**Adapt to Each Client**

Use product selections and business information to determine which questions and setup steps appear.

**Preserve Product Rules**

Maintain each product's eligibility criteria and risk requirements within a shared architecture.

## Structuring the application around what changes

*03 – Design Exploration*

I worked with product managers to compare the existing applications and identify which requirements could be shared vs product-specific (Figure 3.0).

Applicant details, business information, business activities, and ownership formed the common foundation. From there, the application adapted to the products selected and the client's answers.

<!-- Figure placement -->

*Figure 3.0 · VISUAL*

**Figure copy**

- **All Products · Information Collected Once:** Applicant, Business Profile, Business Activities, Owners & Signers
- **All Products · Product Selection:** Checking Accounts (3), Savings Accounts (2), Credit Cards (3), Merchant Services (1)
  - **Checking / Savings · Deposit:** Account purpose, Funding
  - **Credit Card:** Income, Housing, Employee cards, Security deposit
  - **Merchant · Merchant Services:** Locations, Transaction size, Payment methods, Payment equipment
- **All Products · Review & Submit:** Product disclosures, Terms and conditions, Consent

## Knowing when a form should hand the client to a person

*04 – The Challenge*

Not every business qualified for the same digital application path. I worked with Risk and Compliance to define the conditions that determined whether a client could continue, needed specialist review, or fell outside the bank's supported criteria.

The shared application also created an opportunity to present instant counteroffers. When a client didn't qualify for their selected product, the bank could assess whether an alternative was appropriate and present it within the same journey, rather than requiring the client to start over.

<!-- Figure placement -->

*Figure 4.0 · MATRIX*

| Trigger | Reason | Decision |
| --- | --- | --- |
| **Applicant:** Multiple active business accounts already exist under the same SIN/ITIN | Requires manual review to avoid duplicate setup or incorrect account ownership | Sales |
| **Business Profile:** Business is less than 6 months old | Newer businesses may require additional verification before products can be opened | Sales |
| **Business Activities:** Business has more than 10,000 employees | Operation scale requires dedicated relationship management and custom pricing | Sales |
| **Business Activities:** Annual revenue exceeds $10M | Exceeds small business threshold and requires global banking intake process | Sales |
| **Business Activities:** Business operates in a high-risk or restricted industry | Regulatory and compliance restrictions prohibit restricted industries | Stop |
| **Business Activities:** Business provides money services or currency transmission | Money-services activity requires additional regulatory review | Sales |
| **Owners & Signers:** Owner or control person cannot provide accepted U.S. identification | Businesses outside the U.S. are not supported at this time | Stop |

## Cards – consistent and responsive

*05 – Layout Design*

The card component was highly critical from a content-organization and responsive perspective. At large breakpoints, I used a 12-column grid to constrain the card to roughly half the viewport. This reduced eye movement between labels and inputs, kept the form readable, and easily adaptable to smaller screens.

<!-- Draft figure note: Show large and small screens with 12-column grid -->

<!-- Figure placement -->

*Figure 5.0 · IMAGE*

<!-- Figure placement -->

*Figure 5.0 · IMAGE*

<!-- The source repeats section number 05 and figure number 5.0. -->

## The bank's new look and feel

*05 – Layout Design*

I leveraged our bank's new design system

<!-- Draft figure note: Show progress stepper + component parts -->

<!-- Figure placement -->

*Figure 5.0 · IMAGE*

<!-- Draft figure note: Show Helix tags, etc. -->

<!-- Figure placement -->

*Figure 5.0 · IMAGE*

## Replacing the wait with next steps

*06 – Design Refinement*

Previously, submitting an application left clients with little visibility into what happened next. Their status remained “Application pending” while a sales associate reviewed the application, determined next steps, and contacted them, even when a client could be approved without review.

We created an Action Center to change that experience through a link emailed after application submission (Figure 5.0). I designed the dashboard where clients could track the status of each product they applied for, finish outstanding actions, and complete additional requirements without waiting for an associate.

<!-- Supporting cards -->

**Self-Service After Submission**

Clients could complete outstanding actions without waiting for an associate to contact them, helping eligible applications progress faster.

**Status & Visibility**

Clients could see the status of each product they applied for, making progress and outstanding requirements easier to understand.

**Support If Needed**

Clients could contact a Merchant Associate with questions, preserving human support for situations that needed guidance or additional review.

<!-- Figure placement -->

*Figure 6.0 · IMAGE*

## Showing how every product works together

*07 – High-Fidelity Design*

I translated the shared application structure into high-fidelity screens, applying our internal design system components. I focused on consistent navigation and clear progress indicators, while showing additional questions only when they were relevant to the client's selections or answers.

I reviewed the entire flow with product, technology, risk, and compliance partners. For each review, I walked through product combinations, ownership scenarios, unsupported business types, validation errors, and other cases that changed how the application should behave. These reviews helped us make small adjustments, uncover gaps and clarify requirements before implementation.

<!-- Figure placement -->

*Figure 7.0 · IMAGE*

<!-- Figure placement -->

*Figure 7.1 · IMAGE*

<!-- Figure placement -->

*Figure 7.2 · IMAGE*

<!-- Copy extracted from a citizenship form visual. Exact figure association could not be confirmed. -->

**Citizenship form copy**

- About your citizenship
- * Response required
- Country of citizenship*
- United States
- Select United States if you have dual citizenship with the United States and another country.
- U.S. citizenship status
- U.S. citizen
- Why can't I change this?
- When United States is selected for country of citizenship, this indicates the person is a U.S. citizen. If the person is not a U.S. citizen, select a different country of citizenship.
- Social Security number (SSN)*
- XXX-XX-XXXX

## One application, more banking opportunities.

*08 – The Result*

Bringing multiple products into one self-service application meant determining how the experience should respond to different products, applicant circumstances, and risk requirements. I translated those variables into which information could be collected once, where product-specific requirements needed to branch, and when an applicant could continue digitally or stop by eligibility rules.

For clients, the self-service journey saved time, reduced friction, and increased approval rates. For the bank, it boosted digital sales and allowed sales associates to support clients that need it most.

> Hunter's proactiveness and attention to detail were a critical part of the project's success, with shifting requirements and multiple application releases. We truly couldn't have done it without you.
>
> **Chelsea Brierton, Design Lead @ Bank of America**

> The result wasn't just a redesigned application – it was a stronger foundation for how small businesses establish and grow their relationship with the bank.

<!-- Source displays zero-valued metrics. Verify before publishing. -->

<!-- Metric cards -->

- **0% faster** — Submission in pilot testing

- **0+** — Small business clients supported

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
