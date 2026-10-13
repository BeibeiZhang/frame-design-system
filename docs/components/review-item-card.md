# ReviewItemCard

Presentational review-result row with type, time and completed state; does not implement a review workflow.

Source: [components/review-item-card.tsx](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/components/review-item-card.tsx), commit 125a6f6d993851f567b32578a4f6e48515930337, tree 05cf4cdfface969115e2c4b0c376a0515ace4f01, SHA-256 ae3cf9f7b75892c918d2711a046740a019a0057cc4f3350afb60f15529bfbfe6.

Install single: `npx shadcn@latest add @frame/review-item-card`. Full collection: `npx shadcn@latest add @frame/frame`. Configure `@frame` in your shadcn `components.json` registries as `"@frame": "https://system.beibeidesign.com/r/{name}.json"`. Reproducible fallback using the pinned released source: `npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/review-item-card.json`; [pinned full collection](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/frame.json). Source-copy, MIT; keep LICENSE and THIRD_PARTY_NOTICES.md.

Import from `./components/frame/review-item-card`; import `./components/frame/frame.css` once. Wrap in `frame-root` with a matching host background/text color. Add `dark` to wrapper or ancestor for dark mode. Dependencies: react@19.2.5, react-dom@19.2.5, lucide-react@1.14.0.

CSS provenance: single/manual 58bb14ac01da118320d3591b46a9be19f09536f8cfa37fb68ffeb857486c7c62 (32,246 bytes); collection ec3dff7d31cd670881fe4585919e3800d0030eb80f7deb75c1cceccadf1c6837 (31,762 bytes), embedded in registry/frame.json. Missing --motion-duration-normal, --motion-ease-decelerate, .message-appear/@keyframes frame-fadeInUp and .chip-selected additions. Do not rely on these additions for this installation route. No assertion of complete dynamic styling equivalence.

| Prop | Required | Exact declared type | Explicit parameter defaults |
| --- | --- | --- | --- |
| title | required | string | No explicit parameter default |
| source | optional | string | No explicit parameter default |
| type | required | string | No explicit parameter default |
| time | required | string | No explicit parameter default |
| done | optional | boolean | ReviewItemCard: false |
| icon | optional | LucideIcon | No explicit parameter default |
| interactive | optional | boolean | ReviewItemCard: false |

Only declared props are accepted; no inherited native HTML prop forwarding. An optional prop without an explicit default does not imply a false/default behavior. Branch-specific defaults retain the owning function.

Callbacks:
- None declared.

Referenced local type closure:

```tsx

```

Supported state props: done. The exact types above constrain supported values.

Host responsibilities:
- Host provides review result; interactive only draws a chevron.

Limitations:
- source is declared but not rendered or destructured.
- No onClick or link prop; no review execution or navigation.

Semantic evidence: source, interactive, done in the bound source hash above.

Minimal released example (adjust imports as described):

```tsx
import { ReviewItemCard } from '../components/review-item-card';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><ReviewItemCard title="Draft summary" type="Document" time="Just now" interactive={false} /></div></div>;
}
```

Copy complete source closure to src/components/frame; change the example import to ./components/frame/<slug> and CSS import to ./components/frame/frame.css. Render inside frame-root with a matching host surface.

Additional exports in this single source-copy closure: none. They are dependency closure, not additional primary installation identities. Browser, accessibility, cold-model adoption and public integration require separate evidence.
