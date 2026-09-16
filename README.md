# Frame Design System

Frame is an open React design system and component library for AI products. The exported React component collection is open-source and MIT licensed. People and AI can read, reuse, verify, and evolve its design language together. Browse the live catalog to compare components, patterns, foundations and real product usage before installing source.

**[Browse components](https://system.beibeidesign.com/#buttons)** · **[Explore AI patterns](https://system.beibeidesign.com/#ai-patterns)** · **[Read the design principles](https://system.beibeidesign.com/#principles)**

An elegant design language and clear structure let the product speak for itself. Frame pairs AI-readable implementation guidance with automated design checks for machine-checkable rules to help generated interfaces stay aligned with the system. Passing these checks does not guarantee full compliance; human review remains necessary. These source-copy components render UI and callbacks; they do not call a model or provide an agent runtime.

## Components

- **[ChatMessage](https://system.beibeidesign.com/#chat-message)** — User and assistant message presentation with a visual streaming state. [Source](components/chat-message.tsx) · [Example](examples/chat-message.tsx)
- **[ChatPanel](https://system.beibeidesign.com/#chat-panel)** — Conversation layout with message and composer slots and near-bottom scrolling. [Source](components/chat-panel.tsx) · [Example](examples/chat-panel.tsx)
- **[ChatInput](https://system.beibeidesign.com/#chat-input)** — Prompt composer with callback-based sending, optional attachments and mentions. No model provider is included. [Source](components/chat-input.tsx) · [Example](examples/chat-input.tsx)
- **[MessageCard](https://system.beibeidesign.com/#message-card)** — Inline event notice with information, success or warning tone and an optional action slot. [Source](components/message-card.tsx) · [Example](examples/message-card.tsx)
- **[StatusTag](https://system.beibeidesign.com/#status-tag)** — Semantic status pill for pending, processing, review and completed states. [Source](components/status-tag.tsx) · [Example](examples/status-tag.tsx)
- **[Tag](https://system.beibeidesign.com/#tag)** — Compact neutral label with an optional outline and tooltip. [Source](components/tag.tsx) · [Example](examples/tag.tsx)

## Setup

React 19, ReactDOM 19, TypeScript and lucide-react 1.14.0. Import the accompanying frame.css once and wrap Frame content in a div with className="frame-root". Add dark to an ancestor or that wrapper for dark mode. CSS is generated from Tailwind 3 and scoped; it does not replace your Tailwind config or global theme. Optional microphone and voice features are off in examples.

### Install with shadcn

The per-component registry installs into src/components/frame. Start with a configured React/Vite shadcn app, then run:

```sh
npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/main/registry/chat-message.json
```

Replace chat-message with the component slug listed above. Import src/components/frame/frame.css once. The registry deliberately does not rewrite your existing stylesheet.

### Copy source manually

Install react@19.2.5 react-dom@19.2.5 lucide-react@1.14.0, copy the complete component file plus styles/frame.css, then import the CSS once and add the frame-root wrapper. Each component file includes its helper closure; copying a usage example alone is insufficient. Keep LICENSE with redistributed source.

## Maintenance

This repository is a one-way generated export. The canonical source is maintained separately; public pull requests do not become upstream code. The only maintained catalog is https://system.beibeidesign.com/.

## Compatibility

Verified with shadcn 4.21.0 in clean React 19.2.5/Vite 8.0.10 apps using Tailwind 3.4.19 and 4.3.3, including combined manual-copy builds and rendering. Source examples contain no private assets, provider calls or enabled microphone features.

## License

This exported collection is MIT licensed. See LICENSE and THIRD_PARTY_NOTICES.md.
