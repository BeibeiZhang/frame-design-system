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
- **[SidePanelBody](https://system.beibeidesign.com/#side-panel-body)** — Scrollable conversation inspector body with spacing and an automatic scrollbar. [Source](components/side-panel-body.tsx) · [Example](examples/side-panel-body.tsx)
- **[SectionCount](https://system.beibeidesign.com/#section-count)** — Compact count label for grouped messages, references or workflow steps. [Source](components/section-count.tsx) · [Example](examples/section-count.tsx)
- **[TimePill](https://system.beibeidesign.com/#time-pill)** — Compact time or effort label using the shared status presentation. [Source](components/time-pill.tsx) · [Example](examples/time-pill.tsx)
- **[StepIndicator](https://system.beibeidesign.com/#step-indicator)** — Visual pending, active and completed workflow step marker; pair with a text label. [Source](components/step-indicator.tsx) · [Example](examples/step-indicator.tsx)
- **[SecondaryButton](https://system.beibeidesign.com/#secondary-button)** — Secondary action button for prompt or workflow decisions. [Source](components/secondary-button.tsx) · [Example](examples/secondary-button.tsx)
- **[TertiaryButton](https://system.beibeidesign.com/#tertiary-button)** — Outlined action button for quieter conversation and workflow actions. [Source](components/tertiary-button.tsx) · [Example](examples/tertiary-button.tsx)
- **[GhostPillButton](https://system.beibeidesign.com/#ghost-pill-button)** — Pill-shaped secondary action with optional icon and disabled state. [Source](components/ghost-pill-button.tsx) · [Example](examples/ghost-pill-button.tsx)
- **[HeaderIconButton](https://system.beibeidesign.com/#header-icon-button)** — Named icon action for conversation headers; size the mobile hit area to at least 44 pixels. [Source](components/header-icon-button.tsx) · [Example](examples/header-icon-button.tsx)
- **[MenuRow](https://system.beibeidesign.com/#menu-row)** — Workflow or conversation selection row with optional secondary text and current state. [Source](components/menu-row.tsx) · [Example](examples/menu-row.tsx)
- **[IconBadge](https://system.beibeidesign.com/#icon-badge)** — Decorative icon badge for message context or workflow groups; not an interactive control. [Source](components/icon-badge.tsx) · [Example](examples/icon-badge.tsx)
- **[TextButton](https://system.beibeidesign.com/#text-button)** — Quiet text action with disabled and disclosure attributes. [Source](components/text-button.tsx) · [Example](examples/text-button.tsx)
- **[UtilityChip](https://system.beibeidesign.com/#utility-chip)** — Compact context action with optional pressed state for prompt toolbars. [Source](components/utility-chip.tsx) · [Example](examples/utility-chip.tsx)
- **[SummaryFooter](https://system.beibeidesign.com/#summary-footer)** — Compact elapsed-time or summary line beneath a conversation result. [Source](components/summary-footer.tsx) · [Example](examples/summary-footer.tsx)
- **[ChoiceCard](https://system.beibeidesign.com/#choice-card)** — Selectable title and description card for choosing a prompt or workflow option. [Source](components/choice-card.tsx) · [Example](examples/choice-card.tsx)
- **[ReviewItemCard](https://system.beibeidesign.com/#review-item-card)** — Presentational review-result row with type, time and completed state; does not implement a review workflow. [Source](components/review-item-card.tsx) · [Example](examples/review-item-card.tsx)
- **[EmptyState](https://system.beibeidesign.com/#empty-state)** — Icon and explanation for an empty message, result or reference area. [Source](components/empty-state.tsx) · [Example](examples/empty-state.tsx)
- **[VersionRow](https://system.beibeidesign.com/#version-row)** — Version comparison and update-status presentation without a network or update client. [Source](components/version-row.tsx) · [Example](examples/version-row.tsx)

## Setup

React 19, ReactDOM 19, TypeScript and lucide-react 1.14.0. Import the accompanying frame.css once and wrap Frame content in a div with className="frame-root". Set the wrapper background to var(--color-bg-page) and color to var(--color-text-primary), or supply a matching host surface. Add dark to an ancestor or that wrapper for dark mode. CSS is generated from Tailwind 3 and scoped; it does not replace your Tailwind config or global theme. Optional microphone and voice features are off in examples.

### Install all published components

Start with a configured React/Vite shadcn app, then run:

```sh
npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/main/registry/frame.json
```

This installs the public design foundation, every published component and Frame's AI-readable guide into src/components/frame. Import src/components/frame/frame.css once. The registry deliberately does not rewrite your existing stylesheet.

### Install one component

Replace frame with a published component slug, for example:

```sh
npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/main/registry/chat-message.json
```

### Copy source manually

Install react@19.2.5 react-dom@19.2.5 lucide-react@1.14.0, copy the complete component file plus styles/frame.css, then import the CSS once and add the frame-root wrapper. Each component file includes its helper closure; copying a usage example alone is insufficient. Keep LICENSE with redistributed source.

## Maintenance

This repository is a one-way generated export. The canonical source is maintained separately; public pull requests do not become upstream code. The only maintained catalog is https://system.beibeidesign.com/.

## Compatibility

Verified with shadcn 4.21.0 in clean React 19.2.5/Vite 8.0.10 apps using Tailwind 3.4.19 and 4.3.3, including combined manual-copy builds and rendering. Source examples contain no private assets, provider calls or enabled microphone features.

## License

This exported collection is MIT licensed. See LICENSE and THIRD_PARTY_NOTICES.md.
