# Hunter Guinn portfolio

Next.js 16 / React 19 / Tailwind CSS 4. Install with `pnpm install --frozen-lockfile`, run with `pnpm dev`, and validate with `pnpm exec tsc --noEmit` and `pnpm build`.

## Design system

[`styles/tokens.css`](styles/tokens.css) is the shared source for exactly four token categories: typography, colors, spacing, and border radius. [`app/globals.css`](app/globals.css) imports it and retains the site's layout, interactions, and animation rules. Existing theme variables and Tailwind color aliases remain available for compatibility.

### Typography

| Class | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| `text-display` | 2.25rem (36px) | 500 | 1.15 | normal |
| `text-heading` | 24px | 500 | 1.25 | normal |
| `text-body` | 16px | 400 | 1.5 | normal |
| `text-caption` | 0.875rem (14px) | 400 | 1.5 | normal |
| `text-eyebrow` | 0.75rem (12px) | 500 | 1.35 | normal |

`text-eyebrow` retains uppercase text. `text-strong` applies 600 weight; `font-medium` applies 500 where the existing button requires it. Body defaults retain 16px / 1.55. The system font stack remains `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`; the existing mono alias uses the same stack. All former `type-*` roles now use these classes.

### Colors

| Utility / variable | Dark | Light |
| --- | --- | --- |
| `bg-page` / `--background` | #0a0a0a | #f5f5f7 |
| `bg-surface` / `--surface` | #1a1a1a | #ffffff |
| `bg-surface-strong` / `--surface-strong` | #252525 | #ebebef |
| `text-primary` / `--foreground` | #f0f0f0 | #1d1d1f |
| `text-secondary` / `--muted` | #8a8a8a | #515154 |
| `border-subtle` / `--border` | #303030 | #d2d2d7 |
| `--primary-hover` | secondary text | #6e6e73 |
| `--blue` | #66b3ff | #0066cc |
| `--red` | #ff6961 | #c22b32 |
| `--yellow` | #ffd60a | #805b00 |
| `--green` | #5ddb7d | #1a7336 |

The exact existing cover gradient colors, pure white/black overlays, #fafafa quotation color, and #ecebe7 media canvas are also centralized. No palette colors were added. Use Tailwind opacity modifiers such as `text-secondary/50` or `bg-page/85`. `bg-tone/16 text-tone` uses a shared semantic color chosen through `--tone` for existing card states.

`.dark` and `.light` select the palettes; the default is dark, matching the original site. `bg-page` and `text-primary` intentionally use separate color names so background and foreground utilities, including opacity modifiers, remain unambiguous. The browser `themeColor` metadata in `app/layout.tsx` retains the same two literal background colors: browser metadata cannot reference CSS custom properties.

### Spacing

`--spacing: 0.25rem` is the 4px base at the default root size. Tailwind's numeric utilities derive from it: `p-1` = 4px, `gap-3` = 12px, `px-5` = 20px, `gap-7` = 28px, and `gap-x-42` = 168px. Use whole-number multiples for layout padding, margins, and gaps.

| Semantic spacing | Value | Usage |
| --- | --- | --- |
| `gutter` | 20px | mobile page padding |
| `gutter-desktop` | 40px | desktop page padding |
| `section` | 56px | section padding |
| `section-lg` | 80px | larger / desktop sections |
| `section-xl` | 96px | desktop case-study intro |

Layout spacing formerly using 2px, 6px, and 10px now uses 4px, 8px, and 12px respectively (a 2px increase per affected gap or padding side). All other layout spacing, content widths, breakpoints, and section rhythm are retained. Icon sizes, 6px status dots, the 14px cursor, image proportions, and animation geometry are preserved; those are dimensions rather than layout spacing.

### Border radius

| Token / Tailwind utility | Radius |
| --- | --- |
| `radius-xs` / `rounded-xs` | 6px |
| `radius-icon` / `rounded-icon` | 8px |
| `radius-sm` / `rounded-sm` | 10px |
| `radius-md` / `rounded-md` | 16px |
| `radius-lg` / `rounded-lg` | 28px |
| `radius-xl` / `rounded-xl` | 36px |
| `radius-2xl` / `rounded-2xl` | 40px |
| `radius-3xl` / `rounded-3xl` | 44px |
| `radius-4xl` / `rounded-4xl` | 48px |
| `radius-full` / `rounded-full` | fully rounded |

Existing radii are retained exactly, including the 8px tool-logo radius and 10px icon badges. Continuous corners and pill behavior remain in the site stylesheet. The animated page curtain retains its original percentage / viewport-based keyframe geometry.

## Reuse in Vercel v0

Copy `styles/tokens.css` into a Tailwind CSS v4 project and import it from the global stylesheet after Tailwind:

```css
@import "tailwindcss";
@import "../styles/tokens.css";
```

Apply `font-sans` to the root/body and select `.dark` or `.light` on the root (or use `next-themes` as this site does). Use the roles and tokens directly:

```tsx
<article className="rounded-lg bg-surface p-5 text-primary">
  <h2 className="text-heading">Project title</h2>
  <p className="mt-3 text-body text-secondary">Project description</p>
</article>
```

The token file is independent of Next.js and requires no dependencies beyond the existing Tailwind v4 setup. Site-specific animation and layout classes remain in `app/globals.css`.

## Icons

All UI icons use `@phosphor-icons/react` with explicit `weight="regular"`, default `currentColor`, and the existing Tailwind `size-*` classes. Lucide has been removed. Tool logos, images, custom cursor graphics, and illustrations remain intact.

Use direct SSR imports in Server Components and direct CSR imports in Client Components:

```tsx
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight"
// In a "use client" file: @phosphor-icons/react/dist/csr/CaretRight

<CaretRight weight="regular" className="size-4 text-secondary" aria-hidden="true" />
```

Keep icon weight explicit and preserve the accessible label on the surrounding control. Do not override stroke width or add alternative weights.

## Validation of the migration

- `pnpm build` passes, including TypeScript and static generation of all four routes.
- Before/after browser comparisons cover `/`, `/merrill`, `/pos`, and `/unified` in dark and light mode at 390px, 768px, and 1440px (24 scenarios). All return HTTP 200, with no browser runtime errors and identical icon dimensions, text metrics, and rendered text/background/border colors.
- Theme persistence, email clipboard confirmation, anchor links, project navigation, arrow hover animation, page curtain transitions, and synchronized transfer controls were checked in Chrome.
- Content and image/logo files are unchanged. Existing page-level horizontal overflow on `/merrill` and `/pos` at 390px is present in both the source and migrated versions and is outside this styling migration.
