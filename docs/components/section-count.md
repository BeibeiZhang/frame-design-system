# SectionCount

Compact count label for grouped messages, references or workflow steps.

Source: [components/section-count.tsx](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/components/section-count.tsx), commit 125a6f6d993851f567b32578a4f6e48515930337, tree 05cf4cdfface969115e2c4b0c376a0515ace4f01, SHA-256 64c15ed8d9c8fb5f020fabf91454cdbd59ccf344c2bc4a1d4defb4c015d9daee.

Install single: `npx shadcn@latest add @frame/section-count`. Full collection: `npx shadcn@latest add @frame/frame`. Configure `@frame` in your shadcn `components.json` registries as `"@frame": "https://system.beibeidesign.com/r/{name}.json"`. Reproducible fallback using the pinned released source: `npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/section-count.json`; [pinned full collection](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/frame.json). Source-copy, MIT; keep LICENSE and THIRD_PARTY_NOTICES.md.

Import from `./components/frame/section-count`; import `./components/frame/frame.css` once. Wrap in `frame-root` with a matching host background/text color. Add `dark` to wrapper or ancestor for dark mode. Dependencies: react@19.2.5, react-dom@19.2.5, lucide-react@1.14.0.

CSS provenance: single/manual 58bb14ac01da118320d3591b46a9be19f09536f8cfa37fb68ffeb857486c7c62 (32,246 bytes); collection ec3dff7d31cd670881fe4585919e3800d0030eb80f7deb75c1cceccadf1c6837 (31,762 bytes), embedded in registry/frame.json. Missing --motion-duration-normal, --motion-ease-decelerate, .message-appear/@keyframes frame-fadeInUp and .chip-selected additions. Do not rely on these additions for this installation route. No assertion of complete dynamic styling equivalence.

| Prop | Required | Exact declared type | Explicit parameter defaults |
| --- | --- | --- | --- |
| n | required | number | No explicit parameter default |

Only declared props are accepted; no inherited native HTML prop forwarding. An optional prop without an explicit default does not imply a false/default behavior. Branch-specific defaults retain the owning function.

Callbacks:
- None declared.

Referenced local type closure:

```tsx

```

Supported state props: none. The exact types above constrain supported values.

Host responsibilities:
- Host computes count.

Limitations:
- No automatic counting or pluralization.

Semantic evidence: n in the bound source hash above.

Minimal released example (adjust imports as described):

```tsx
import { SectionCount } from '../components/section-count';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><SectionCount n={3} /></div></div>;
}
```

Copy complete source closure to src/components/frame; change the example import to ./components/frame/<slug> and CSS import to ./components/frame/frame.css. Render inside frame-root with a matching host surface.

Additional exports in this single source-copy closure: none. They are dependency closure, not additional primary installation identities. Browser, accessibility, cold-model adoption and public integration require separate evidence.
