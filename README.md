# Frame React components

Small source-copy components for chat messages, prompt composition and AI result status. These components render UI and callbacks; they do not call a model or provide an agent runtime.

## Components

- **[ChatMessage](components/chat-message.tsx)** — User and assistant message presentation with a visual streaming state. [Example](examples/chat-message.tsx) · [Viewer](https://system.beibeidesign.com/#chat-message)
- **[ChatPanel](components/chat-panel.tsx)** — Conversation layout with message and composer slots and near-bottom scrolling. [Example](examples/chat-panel.tsx) · [Viewer](https://system.beibeidesign.com/#chat-panel)
- **[ChatInput](components/chat-input.tsx)** — Prompt composer with callback-based sending, optional attachments and mentions. No model provider is included. [Example](examples/chat-input.tsx) · [Viewer](https://system.beibeidesign.com/#chat-input)
- **[MessageCard](components/message-card.tsx)** — Inline event notice with information, success or warning tone and an optional action slot. [Example](examples/message-card.tsx) · [Viewer](https://system.beibeidesign.com/#message-card)
- **[StatusTag](components/status-tag.tsx)** — Semantic status pill for pending, processing, review and completed states. [Example](examples/status-tag.tsx) · [Viewer](https://system.beibeidesign.com/#status-tag)
- **[Tag](components/tag.tsx)** — Compact neutral label with an optional outline and tooltip. [Example](examples/tag.tsx) · [Viewer](https://system.beibeidesign.com/#tag)

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

Verified with shadcn 4.21.0 in clean React 19.2.5/Vite 8.0.10 apps using Tailwind 3.4.19 and Tailwind 4.3.3, including combined manual-copy builds and rendering. Source examples contain no private assets, provider calls or enabled microphone features.

## License

This exported collection is MIT licensed. See LICENSE and THIRD_PARTY_NOTICES.md.
