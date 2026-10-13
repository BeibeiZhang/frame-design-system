# UtilityChip

Compact context action with optional pressed state for prompt toolbars.

Source: [components/utility-chip.tsx](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/components/utility-chip.tsx), commit 125a6f6d993851f567b32578a4f6e48515930337, tree 05cf4cdfface969115e2c4b0c376a0515ace4f01, SHA-256 eead1a3c18f80ef39d017e8c4eff510420ed997fe22d776ddc9f9bdc52d84a0f.

Install single: `npx shadcn@latest add @frame/utility-chip`. Full collection: `npx shadcn@latest add @frame/frame`. Configure `@frame` in your shadcn `components.json` registries as `"@frame": "https://system.beibeidesign.com/r/{name}.json"`. Reproducible fallback using the pinned released source: `npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/utility-chip.json`; [pinned full collection](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/frame.json). Source-copy, MIT; keep LICENSE and THIRD_PARTY_NOTICES.md.

Import from `./components/frame/utility-chip`; import `./components/frame/frame.css` once. Wrap in `frame-root` with a matching host background/text color. Add `dark` to wrapper or ancestor for dark mode. Dependencies: react@19.2.5, react-dom@19.2.5, lucide-react@1.14.0.

CSS provenance: single/manual 58bb14ac01da118320d3591b46a9be19f09536f8cfa37fb68ffeb857486c7c62 (32,246 bytes); collection ec3dff7d31cd670881fe4585919e3800d0030eb80f7deb75c1cceccadf1c6837 (31,762 bytes), embedded in registry/frame.json. Missing --motion-duration-normal, --motion-ease-decelerate, .message-appear/@keyframes frame-fadeInUp and .chip-selected additions. Do not rely on these additions for this installation route. No assertion of complete dynamic styling equivalence.

| Prop | Required | Exact declared type | Explicit parameter defaults |
| --- | --- | --- | --- |
| children | required | ReactNode | No explicit parameter default |
| icon | optional | ReactNode | No explicit parameter default |
| onClick | optional | (e: ReactMouseEvent<HTMLButtonElement>) => void | No explicit parameter default |
| title | optional | string | No explicit parameter default |
| ariaLabel | optional | string | No explicit parameter default |
| ariaPressed | optional | boolean | No explicit parameter default |
| maxWidth | optional | number \| string | No explicit parameter default |
| className | optional | string | UtilityChip: '' |

Only declared props are accepted; no inherited native HTML prop forwarding. An optional prop without an explicit default does not imply a false/default behavior. Branch-specific defaults retain the owning function.

Callbacks:
- `onClick`: `(e: ReactMouseEvent<HTMLButtonElement>) => void`

Referenced local type closure:

```tsx

```

Supported state props: ariaPressed. The exact types above constrain supported values.

Host responsibilities:
- Host manages pressed state and action; supply accessible name and mobile hit area.

Limitations:
- No disabled prop; no automatic toggling.

Semantic evidence: onClick, ariaPressed, ariaLabel in the bound source hash above.

Minimal released example (adjust imports as described):

```tsx
import { UtilityChip } from '../components/utility-chip';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><UtilityChip className="min-h-11" ariaPressed={true}>Local context</UtilityChip></div></div>;
}
```

Copy complete source closure to src/components/frame; change the example import to ./components/frame/<slug> and CSS import to ./components/frame/frame.css. Render inside frame-root with a matching host surface.

Additional exports in this single source-copy closure: none. They are dependency closure, not additional primary installation identities. Browser, accessibility, cold-model adoption and public integration require separate evidence.
