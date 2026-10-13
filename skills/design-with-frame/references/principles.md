# Frame design principles

These 13 design-judgment principles are distinct from the 11 implementation constraints in `frame-rules.json`. Every principle requires contextual human review.

Source: https://system.beibeidesign.com/#principles

## 1. Shared-first

Build reusable UI in a shared design system and compose it in product interfaces. Never copy component code inline.

Why: One shared source of truth keeps system changes consistent across the product.
## 2. Tokens-first

Use CSS variables and utility classes for every color, size, and spacing. Never hardcode hex, px font sizes, or arbitrary spacing values.

Why: Tokens are the only way light/dark mode and future rebrands stay coherent.
## 3. One Primary button per view

Use at most one primary action per view. Repeated emphasis weakens the focal point.

Why: The gradient is a visual anchor — duplicating it creates ambiguity about the primary action.
## 4. 1–2% gradient budget

The brand gradient (#7652B9 → #B46470 → #CA9D8C) is reserved for the single focal element per view: the primary CTA, a hover affordance, or a hero title.

Why: Gradient saturation breaks the hierarchy and reads as decorative rather than meaningful.
## 5. Callouts are blue, not gradient

Use --color-accent-blue (#3171FF) for selected chips, links, progress, and focus rings. Never substitute the brand gradient for these signals.
## 6. StatusTag success green is unique

Reserve success green and its background for the success state. Do not repurpose them for unrelated UI.

Why: Reserving the color keeps "success" visually unambiguous across the product.
## 7. 13 text styles only

Use .type-display-xl, .type-display, .type-h1, .type-h1--emphasized, .type-body, .type-body-emphasized, .type-h2, .type-h2-emphasized, .type-h3, .type-detail, .type-detail-emphasized, .type-caption, .type-footnote. Never use raw px sizes or Tailwind’s native type/weight scale (text-sm, text-base, font-bold, font-medium …). Forbidden running-text sizes: 9, 10, 13, 17, 18, 24, 28, 32 px. 11/12 are valid only via .type-footnote / .type-caption. ("13" here counts the text-style tiers — it is a coincidence that there are also 13 principles.)
## 8. Icons = lucide-react

All icons come from lucide-react. No emoji in product UI. Never render letters or abbreviations as icon stand-ins. Never import another icon library or inline SVG.
## 9. Dark-mode is automatic

All colors must come from CSS variables bound to :root / .dark. Monochrome PNG assets use .icon-theme for auto-inversion. Lucide SVGs inherit currentColor.
## 10. Three-panel shell

Fit each feature inside the existing product shell. Do not introduce competing top-level chrome.
## 11. Review queue for new components

When existing shared components cannot meet a need, propose a reusable component in the shared design system and review it before broad adoption. Keep accepted components in the shared system; replace rejected candidates with the closest existing primitive.
## 12. Bg fill or border, not both

A card / panel uses EITHER a background fill (bg-bg-hover, bg-bg-page, bg-card, etc.) OR a border (border-stroke-outline) — never both on the same surface. Pick whichever creates the right visual separation in the surrounding context. Default for an inline mini-preview, intro card, or hover zone is bg fill; default for a free-standing card on the page background is border-only. Exception: dashed borders (border-dashed) carry placeholder/skeleton/drop-zone semantics and may coexist with bg fills.

Why: Stacking bg-change + border on the same element produces a redundant double-frame — either signal alone is enough to lift the element from its surroundings. Doubling competes with surrounding chrome and breaks the design's quiet hierarchy.
## 13. Tab structure — Pattern A or Pattern B

Choose one consistent structure for documentation tabs: either an intro, a section heading, and one outlined content region; or an intro followed by flat cards with in-card titles. Keep same-level styling consistent across tabs.

Why: Consistent structures help people understand how documentation sections relate, while consistent styling clarifies which content belongs together.
