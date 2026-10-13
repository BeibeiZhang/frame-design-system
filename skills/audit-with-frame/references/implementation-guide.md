# Implement interfaces with Frame

Frame connects design principles, reusable React components and machine-readable
implementation rules. An AI can help select and compose components; the guide and rules
do not establish design quality, accessibility, correct behavior, complete compliance or
fitness for a user's task. Human review remains necessary.

## 1. Establish what is available

Start with the [Frame catalog](https://system.beibeidesign.com/) and the
[public source repository](https://github.com/BeibeiZhang/frame-design-system).
Read the current component's source, props, example, dependencies and license before use.
A catalog demonstration or AI pattern is not proof of an installable component. Use only
installation instructions attached to a released item; do not invent package names,
registry URLs, exports or an `npx design-lint` command. Confirm the chosen version actually
contains the tokens and utilities the composition needs.

## 2. Choose and compose

Describe the user goal and the loading, empty, success, failure and disabled states first.
Then select the smallest available components that express it:

| Need | Candidate to inspect in the catalog |
|---|---|
| Conversation container, message, composer | ChatPanel, ChatMessage, ChatInput |
| Structured output | MessageCard |
| Semantic progress or outcome | StatusTag; use Tag for a neutral label |
| Action | Appropriate button primitive, if present in the released source |
| Citation, tool activity, reasoning or workflow | Read the pattern and verify an actual export exists; pattern names alone are not components |

Keep application data, streaming, permissions, persistence and side effects in the consumer.
A visual status is not evidence that an operation succeeded. Test the handler and show the
state supported by its result. Compose an existing primitive before introducing a new one;
keep reusable extensions in one shared module in your project and review their contract.
Frame's internal app shell and component promotion process are not required consumer architecture.

## 3. Apply the implementation constraints

Read the public [Frame implementation rules](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/main/rules/frame-rules.json).
Their identifiers map to Frame's 11 implementation constraints; they are distinct from the
[13 design principles](https://system.beibeidesign.com/#principles).

- **FRAME-01–03:** use semantic token classes and available `.type-*` styles. Avoid literal
  colors, native Tailwind typography and `/NN` opacity modifiers on Frame color tokens.
  For example, use `text-text-secondary type-detail`, not `text-text-primary/60 text-sm`.
  If a token is absent, add and review it in the shared theme and mapping before use.
- **FRAME-04–05:** a card or panel uses a fill or a border. Dashed placeholder/drop zones
  may use both. Compose shared primitives instead of copying their implementation.
- **FRAME-06–08:** use Lucide for UI chrome. Generated message text is a separate voice
  decision. On media, use a released IconButton's overlay/inverted tone when available;
  light backplates require dark glyphs. `.brand-gradient` is a backdrop utility;
  `.gradient-btn` is a button skin that also changes descendant glyphs. Check that the
  installed release includes a utility before referencing it.
- **FRAME-09–11:** measure at least 44×44 CSS pixels of effective touch area on mobile;
  preserve visible keyboard focus; name icon-only controls and expose selected state.
  Do not infer accessibility from a component name or optional prop type. Use `ariaLabel`
  on Frame icon buttons; use the native `aria-label` when authoring a native control.
  Keep the control's identity when adding a disabled reason. A visible label must remain
  in its accessible name. Plain Lucide icons normally hide themselves from assistive
  technology; verify the rendered tree when passing accessibility props or children.

Use one primary action per view, keep gradients scarce, and reserve semantic colors for
consistent meanings. Verify hierarchy, readable contrast, spacing, dark mode and responsive
layout in context. None of these visual judgments is certified by the rule file.

## 4. Verify the real flow

1. Build/type-check against the actual installed exports, CSS and Tailwind configuration.
2. Exercise handlers and state transitions, including failures, retry/cancel, long content,
   empty data and rapid repeated input where applicable. Check streaming and completion
   independently; never label a failed tool result as success.
3. Inspect light/dark and mobile/desktop rendering, measured touch bounds, overflow and
   text contrast. Test Tab, Enter/Space, Escape where appropriate, visible focus and
   accessible names/states. Respect reduced motion.
4. Review design decisions against the principles, including whether one clear action
   and minimal framing help the task. Humans assess context and visual quality.
5. Record the exact revision, commands, results, runtime observations, exceptions and
   remaining limitations. A checker failure needs investigation; an empty scan or a
   successful exit with missing prerequisites is not a clean bill of health.

## 5. Understand the automation boundary

The public [Frame implementation rules](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/main/rules/frame-rules.json)
describe which constraints are partially machine-checkable, advisory or human-only. The
file is not executable checker configuration, and Frame does not publish an installable
checker with this guide. Do not claim a check ran unless the consumer project provides a
compatible tool and you ran its documented command with all prerequisites satisfied.

Automation can miss invalid code and flag harmless examples. A passing command, an empty
scan or a successful exit with missing inputs is not a clean bill of health. Record the
actual files, prerequisites, command and result, then complete the behavioral,
accessibility, responsive and visual review described above.
