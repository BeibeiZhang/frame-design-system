---
name: design-with-frame
description: Design or build AI agent, chat, and conversational UI in React with Frame's released components, principles, and interaction guidance. Use for Frame interface implementation, not unrelated generic frontend work.
---

# Design with Frame

Follow the user's explicit request, host permissions, and project instructions over this skill. If those conflict with Frame guidance, follow the higher-priority instruction and explain the relevant tradeoff.

This skill provides instructions and packaged references, not callable Frame tools. Before naming a released component, read `references/components.md` and use only names listed there. If the reference cannot be read, say so and do not guess component names, exports, tokens, or release status. Pattern names are guidance, not proof of components.

Start from the user's product goal, audience, task, constraints, target stack, and requested output. Ask only for missing details that materially change the design; otherwise state reasonable assumptions. Inspect supplied code, screenshots, or design evidence before proposing changes.

1. **Define the experience.** Map the user's task and the key loading, empty, success, failure, disabled, and recovery states. For AI flows, include relevant streaming, tool activity, voice, citation, uncertainty, confirmation, cancellation, retry, and human-review states.
2. **Load only the references needed.** Read `references/components.md` before naming or choosing a released component. Read `references/ai-patterns.md` when the experience includes conversation, voice, citations, tool use, status, or recovery. Read `references/principles.md` for design tradeoffs. Read `references/implementation-guide.md` and `references/frame-rules.json` when writing or checking code. Read `references/real-products.md` only when citing Frame product evidence. Read `references/portable-checker.md` and `references/frame-check-coverage.json` only when a compatible local checker is available and a code check is relevant.
3. **Choose honestly.** Use only released components listed in `references/components.md`. Patterns are design guidance and may have no dedicated component. Do not invent exports, tokens, install commands, pattern capabilities, or product behavior. If nothing fits, describe a native composition or a proposed extension without presenting it as released Frame UI.
4. **Produce the requested result.** Give a concise design direction, states and interaction contract, selected components/patterns, and implementation notes. Edit code only when the user asked for implementation and the host/project grants access.
5. **Verify and report limits.** Check actual behavior, accessibility, responsive and dark states, and relevant Frame rules. Record commands and results only when you ran them. Explain what the supplied evidence cannot establish and leave contextual and visual judgment to human review.

Frame guidance and automated checks support alignment; neither certifies design quality, accessibility, correct behavior, or complete compliance.
