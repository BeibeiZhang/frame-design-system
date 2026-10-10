# Build with Frame without a plugin

Frame provides source-copy React UI. No Frame plugin, Skill, account, private package or model credential is required. The catalog includes demonstrations and AI patterns beyond the installable collection; only the 23 published components listed below are offered here.

## Prerequisites

Use React 19, ReactDOM 19, TypeScript and lucide-react 1.14.0. The source was verified in React 19.2.5 / Vite 8.0.10 consumers with Tailwind 3.4.19 and 4.3.3. Frame supplies precompiled, scoped CSS generated with Tailwind 3; it works beside either host Tailwind version without replacing the host configuration. Node.js 20 or newer is required by the separate checker; the tested Vite 8 fixture uses Node.js 26.5.0. Install dependencies with npm registry access; scans need no network.

## Install in an existing configured shadcn app

Use your configured React/Vite app with TypeScript, src/ aliases and components.json. Install the full published collection:

```sh
npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/main/registry/frame.json
```

Or install a single component:

```sh
npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/main/registry/chat-message.json
```

The registry copies source to src/components/frame, including frame.css; the full install also includes FRAME_AI_GUIDE.md. It does not import the stylesheet for you. Registry URLs above refer to public main; internal candidate verification substitutes an exact staged loopback registry and does not claim these new guide bytes are live.

## Manual source copy

For an app without shadcn configuration:

```sh
npm install react@19.2.5 react-dom@19.2.5 lucide-react@1.14.0
```

Copy each complete components/<slug>.tsx file you need and styles/frame.css from the same repository revision into src/components/frame. A complete component file carries its helper closure; an example alone is insufficient. Keep LICENSE and THIRD_PARTY_NOTICES.md with redistributed source. Import from these local files; no private package installation is needed.

## Render a basic chat

Install ChatPanel, ChatMessage and ChatInput (the full registry includes all three). Import CSS once and put the surface token classes inside frame-root; the scoped stylesheet applies utilities to its descendants. The class dark on the wrapper or an ancestor selects dark mode.

```tsx
import { useState } from 'react';
import { ChatPanel } from './components/frame/chat-panel';
import { ChatMessage } from './components/frame/chat-message';
import { ChatInput } from './components/frame/chat-input';
import './components/frame/frame.css';

export default function App() {
  const [sent, setSent] = useState('');
  return <div className="frame-root">
    <div className="bg-bg-page text-text-primary" style={{ height: '100dvh' }}>
      <ChatPanel
        messages={<><ChatMessage role="user" content="Hello" /><ChatMessage role="assistant" content={sent || 'Ready for your message.'} /></>}
        input={<ChatInput features={{}} onSend={setSent} />}
      />
    </div>
  </div>;
}
```

This example echoes local input through a callback. Streaming visuals do not fetch or stream model data. Your host owns providers, persistence, tool execution, permission handling, cancellation and error recovery. Voice/microphone features are optional and disabled here.

## Optional portable checker

Obtain the repository's checks/ directory with its package.json and package-lock.json (for example from a public repository checkout), separately from component installation. Follow [the canonical checker README](../checks/README.md) for current prerequisites and coverage:

```sh
npm ci --ignore-scripts --prefix /path/to/frame-design-system/checks
cd /path/to/your-project
node /path/to/frame-design-system/checks/frame-check.mjs -- src/App.tsx
node /path/to/frame-design-system/checks/frame-check.mjs --format json -- src/App.tsx
```

Use explicit files within the invocation root, with the required -- separator; the CLI does not expand globs. Exit 0 means no findings in the supported subset, exit 1 means error or advisory findings, and exit 2 means an operational/input/parser failure. Never report an incomplete scan as clean. Coverage is partial FRAME-01–03 and one narrow FRAME-06 emoji advisory. Other rules and all 13 principles require human review. Manually check token existence, component reuse, surface hierarchy, themes/contrast, icons, touch targets, focus, accessibility and interaction behavior.

The [AI implementation guide](ai-implementation-guide.md) is a frozen release-era resource; its statement that no installable checker is published predates the separate checker release. Use the checker README above for current checker availability and commands. This entry does not revise that historical guide or certify full compliance.

## Published inventory

- **ChatMessage** — [source](../components/chat-message.tsx), [example](../examples/chat-message.tsx), [registry](../registry/chat-message.json)
- **ChatPanel** — [source](../components/chat-panel.tsx), [example](../examples/chat-panel.tsx), [registry](../registry/chat-panel.json)
- **ChatInput** — [source](../components/chat-input.tsx), [example](../examples/chat-input.tsx), [registry](../registry/chat-input.json)
- **MessageCard** — [source](../components/message-card.tsx), [example](../examples/message-card.tsx), [registry](../registry/message-card.json)
- **StatusTag** — [source](../components/status-tag.tsx), [example](../examples/status-tag.tsx), [registry](../registry/status-tag.json)
- **Tag** — [source](../components/tag.tsx), [example](../examples/tag.tsx), [registry](../registry/tag.json)
- **SidePanelBody** — [source](../components/side-panel-body.tsx), [example](../examples/side-panel-body.tsx), [registry](../registry/side-panel-body.json)
- **SectionCount** — [source](../components/section-count.tsx), [example](../examples/section-count.tsx), [registry](../registry/section-count.json)
- **TimePill** — [source](../components/time-pill.tsx), [example](../examples/time-pill.tsx), [registry](../registry/time-pill.json)
- **StepIndicator** — [source](../components/step-indicator.tsx), [example](../examples/step-indicator.tsx), [registry](../registry/step-indicator.json)
- **SecondaryButton** — [source](../components/secondary-button.tsx), [example](../examples/secondary-button.tsx), [registry](../registry/secondary-button.json)
- **TertiaryButton** — [source](../components/tertiary-button.tsx), [example](../examples/tertiary-button.tsx), [registry](../registry/tertiary-button.json)
- **GhostPillButton** — [source](../components/ghost-pill-button.tsx), [example](../examples/ghost-pill-button.tsx), [registry](../registry/ghost-pill-button.json)
- **HeaderIconButton** — [source](../components/header-icon-button.tsx), [example](../examples/header-icon-button.tsx), [registry](../registry/header-icon-button.json)
- **MenuRow** — [source](../components/menu-row.tsx), [example](../examples/menu-row.tsx), [registry](../registry/menu-row.json)
- **IconBadge** — [source](../components/icon-badge.tsx), [example](../examples/icon-badge.tsx), [registry](../registry/icon-badge.json)
- **TextButton** — [source](../components/text-button.tsx), [example](../examples/text-button.tsx), [registry](../registry/text-button.json)
- **UtilityChip** — [source](../components/utility-chip.tsx), [example](../examples/utility-chip.tsx), [registry](../registry/utility-chip.json)
- **SummaryFooter** — [source](../components/summary-footer.tsx), [example](../examples/summary-footer.tsx), [registry](../registry/summary-footer.json)
- **ChoiceCard** — [source](../components/choice-card.tsx), [example](../examples/choice-card.tsx), [registry](../registry/choice-card.json)
- **ReviewItemCard** — [source](../components/review-item-card.tsx), [example](../examples/review-item-card.tsx), [registry](../registry/review-item-card.json)
- **EmptyState** — [source](../components/empty-state.tsx), [example](../examples/empty-state.tsx), [registry](../registry/empty-state.json)
- **VersionRow** — [source](../components/version-row.tsx), [example](../examples/version-row.tsx), [registry](../registry/version-row.json)

For design demonstrations beyond this list, browse [the catalog](https://system.beibeidesign.com/#buttons) and [AI patterns](https://system.beibeidesign.com/#ai-patterns). A catalog pattern is not an installation promise. Retain the [MIT license](../LICENSE) and [dependency notices](../THIRD_PARTY_NOTICES.md).
