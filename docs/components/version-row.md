# VersionRow

Version comparison and update-status presentation without a network or update client.

Source: [components/version-row.tsx](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/components/version-row.tsx), commit 125a6f6d993851f567b32578a4f6e48515930337, tree 05cf4cdfface969115e2c4b0c376a0515ace4f01, SHA-256 72ea0d821524367454844cb5b85b43b75fdad3aa479cf32bebe80a2595d90267.

Install single: `npx shadcn@latest add @frame/version-row`. Full collection: `npx shadcn@latest add @frame/frame`. Configure `@frame` in your shadcn `components.json` registries as `"@frame": "https://system.beibeidesign.com/r/{name}.json"`. Reproducible fallback using the pinned released source: `npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/version-row.json`; [pinned full collection](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/frame.json). Source-copy, MIT; keep LICENSE and THIRD_PARTY_NOTICES.md.

Import from `./components/frame/version-row`; import `./components/frame/frame.css` once. Wrap in `frame-root` with a matching host background/text color. Add `dark` to wrapper or ancestor for dark mode. Dependencies: react@19.2.5, react-dom@19.2.5, lucide-react@1.14.0.

CSS provenance: single/manual 58bb14ac01da118320d3591b46a9be19f09536f8cfa37fb68ffeb857486c7c62 (32,246 bytes); collection ec3dff7d31cd670881fe4585919e3800d0030eb80f7deb75c1cceccadf1c6837 (31,762 bytes), embedded in registry/frame.json. Missing --motion-duration-normal, --motion-ease-decelerate, .message-appear/@keyframes frame-fadeInUp and .chip-selected additions. Do not rely on these additions for this installation route. No assertion of complete dynamic styling equivalence.

| Prop | Required | Exact declared type | Explicit parameter defaults |
| --- | --- | --- | --- |
| label | required | string | No explicit parameter default |
| current | required | string | No explicit parameter default |
| latest | required | string \| null | No explicit parameter default |
| status | required | 'up-to-date' \| 'update-available' \| 'unknown' | No explicit parameter default |
| error | optional | string | No explicit parameter default |
| loading | optional | boolean | No explicit parameter default |

Only declared props are accepted; no inherited native HTML prop forwarding. An optional prop without an explicit default does not imply a false/default behavior. Branch-specific defaults retain the owning function.

Callbacks:
- None declared.

Referenced local type closure:

```tsx

```

Supported state props: status, error, loading. The exact types above constrain supported values.

Host responsibilities:
- Host supplies current/latest versions, loading and error values.

Limitations:
- No network check, updater or retry callback.

Semantic evidence: status, error, loading, latest in the bound source hash above.

Minimal released example (adjust imports as described):

```tsx
import { VersionRow } from '../components/version-row';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><div className="text-text-primary"><VersionRow label="Local editor" current="1.0" latest="1.1" status="update-available" /></div></div>;
}
```

Copy complete source closure to src/components/frame; change the example import to ./components/frame/<slug> and CSS import to ./components/frame/frame.css. Render inside frame-root with a matching host surface.

Additional exports in this single source-copy closure: StatusVariant, StatusTag. They are dependency closure, not additional primary installation identities. Browser, accessibility, cold-model adoption and public integration require separate evidence.
