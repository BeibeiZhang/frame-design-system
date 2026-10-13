# Frame AI interaction patterns

Generated from the canonical Frame interaction-pattern source. Status describes existing component material; it does not promise that every pattern is a released component.

Source: https://system.beibeidesign.com/ai-interaction-patterns/ and https://system.beibeidesign.com/#ai-patterns

Status meanings: shipped = raw material exists in components; partial = pieces exist with gaps; placeholder = specified, with no dedicated component yet.

## Conversation layout — Prompt / Reply / Grow

- Status: shipped
- User problem: Every AI conversation unit follows a three-segment skeleton. This is the macro layout — the per-segment patterns below are how each segment fills in. All gaps are tokens from Foundations → Spacing : inter-segment --space-6 (24px), intra-segment --space-4 (16px).
- Guidance:
  - Keep suggested follow-up actions in a separate composer area, distinct from the preceding assistant message.
  - Keep one primary deliverable in each assistant reply.
  - Present follow-up suggestions as separate actionable options outside the message body.
  - Keep a retry action available on assistant replies as a recovery path when the model misunderstands the request.
- Released shared components: ChatMessage, ChatInput
- Other anatomy names (not listed in the public component catalog): ArtifactCard, Chip
- Public pattern: https://system.beibeidesign.com/#ai-pattern-conversation-layout

## Streaming

- Status: shipped
- User problem: The model produces tokens incrementally (200ms–10s). Users need to (a) see progress immediately, (b) stop generation, (c) trust that "no movement" means done, not stuck.
- Guidance:
  - Render streamed tokens as they arrive in the released ChatMessage assistant streaming state.
  - Before the first token arrives, use the released .typing-dot indicator when the host needs a visible waiting cue.
  - Treat arriving tokens as the active progress signal; an extra blinking caret is unnecessary during streaming.
  - Offer a Stop control in the composer while generation is cancellable, then restore the Send action when it completes.
- Avoid:
  - Don’t buffer tokens to render whole sentences. Buffering looks frozen and breaks the trust loop.
- Released shared components: ChatMessage, ChatInput
- Public pattern: https://system.beibeidesign.com/#ai-pattern-streaming

## Citation

- Status: partial
- User problem: Model output makes claims that need to be traceable to source material (a doc, an email, a meeting transcript, a URL). Without citations, every AI claim has the same trust level — which means none.
- Guidance:
  - Attach a clear source reference to claims that need verification.
  - Keep grouped citations together and place them where readers can associate them with the relevant claims.
  - Make source previews available on interaction when the host interface supports them.
  - Use the product’s established link treatment for citations.
- Other anatomy names (not listed in the public component catalog): Tooltip
- Public pattern: https://system.beibeidesign.com/#ai-pattern-citation

## Confirmation

- Status: shipped
- User problem: The agent is about to take a side-effecting action (create ticket, send email, run script). Doing it silently breaks user agency; asking before every action breaks the autonomy promise.
- Guidance:
  - For side-effecting actions, show a concise preview and explicit confirm and cancel controls.
  - Make the primary action easy to identify and cancellation easy to choose.
  - For reversible read-only actions such as search, summarizing, or drafting, present the result directly.
  - After an action is confirmed, show its outcome and the next useful step.
  - Offer a persistent “don’t ask again” choice only after repeated identical actions in the same session and with explicit user consent.
- Released shared components: TertiaryButton, StatusTag
- Other anatomy names (not listed in the public component catalog): PrimaryButton
- Public pattern: https://system.beibeidesign.com/#ai-pattern-confirmation

## Undo

- Status: placeholder
- User problem: Even with confirmation, the agent’s action lands in the real world (ticket created in Linear, email drafted in Gmail). User needs a way to back out within seconds without going to the source system.
- Guidance:
  - After a side-effecting action, offer a brief, clearly timed opportunity to undo it when the system can reverse the action.
  - Make the remaining undo time clear without implying that an expired action is still reversible.
  - Show a clear reverted outcome after undoing an action.
  - After the undo window expires, provide a link to the resulting item when available.
- Dedicated released component: none documented.
- Public pattern: https://system.beibeidesign.com/#ai-pattern-undo

## Confidence / Status

- Status: shipped
- User problem: Not every AI output is a finished result — some are guesses, some are partial, some are awaiting user input. A flat list of messages hides this distinction; users default to either over-trusting or never trusting.
- Guidance:
  - Use clear categorical labels to distinguish work in progress, awaiting review, approved, failed, submitted, and blocked states.
  - Choose state treatments that communicate the current status without relying on color alone.
  - Avoid raw probability scores unless they have a validated, user-understandable meaning.
  - Distinguish synthesized observations from unprocessed output using the host product’s available presentation patterns.
- Released shared components: StatusTag
- Other anatomy names (not listed in the public component catalog): InsightCard
- Public pattern: https://system.beibeidesign.com/#ai-pattern-confidence

## Tool transparency

- Status: placeholder
- User problem: The agent calls tools (search docs, query Calendar, run code). When something goes wrong — or even when it goes right — the user needs to know what the agent did, not just the final answer. Black-box agents collapse trust the moment they’re wrong once.
- Guidance:
  - Show which tool is running, a concise description of its input, and its current state.
  - Keep detailed inputs and outputs available on request, with long payloads truncated by default.
  - Present multiple tool steps in their execution order and make progress easy to follow.
  - Surface tool failures where they occur and explain the next useful action.
  - Visually distinguish agent-initiated work from user-initiated actions using the host product’s established styling.
- Other anatomy names (not listed in the public component catalog): TaskProgressCard
- Public pattern: https://system.beibeidesign.com/#ai-pattern-tool-transparency

## Hallucination / Uncertainty disclosure

- Status: placeholder
- User problem: The model produces confident-sounding output even when its source coverage is thin or it’s interpolating. A flat assistant bubble makes "confident facts" and "best guesses" look identical — users either over-trust everything or learn to under-trust everything.
- Guidance:
  - Distinguish sourced claims, synthesis, and unsupported inference with clear language or visual treatment.
  - When confidence is insufficient, state what is missing and offer a useful next step.
  - Avoid numeric confidence scores unless they have a validated, user-understandable meaning.
- Avoid:
  - Rendering inferred content in standard body text without any marker. Better to over-disclose and break user immersion than over-trust into a hallucination loop.
- Released shared components: StatusTag, ChatMessage
- Public pattern: https://system.beibeidesign.com/#ai-pattern-hallucination

## Memory surface

- Status: shipped
- User problem: An assistant that "remembers you" is hostile if the memory is invisible. Users can’t verify what’s stored, can’t correct stale facts, can’t remove sensitive entries — and silently-applied memory feels manipulative even when it’s working.
- Guidance:
  - Make stored memories visible, editable, and removable; identify each memory’s type and source.
  - Require an appropriate confirmation or re-authentication before changing sensitive memories.
  - When a response uses stored memory, provide a way to inspect the referenced memory.
  - Give users filters or search when the memory list grows.
  - Make every new memory visible in the same interaction; never save it silently.
- Avoid:
  - Silent memory writes ("I’ll remember that for next time") with no visible record. Always confirm or surface what’s being saved within the same turn.
- Other anatomy names (not listed in the public component catalog): FilterChip
- Public pattern: https://system.beibeidesign.com/#ai-pattern-memory-surface

## Retry / Regenerate / Fork

- Status: partial
- User problem: The model’s first attempt isn’t always right — wrong tone, missed constraint, hallucinated detail. Users need a low-friction escape to "try again" without re-typing the prompt or losing the original.
- Guidance:
  - Offer a retry that reuses the original request while clearly indicating that a new response is being generated.
  - Let users optionally steer a retry toward a different tone, level of detail, or approach.
  - Keep earlier responses available when showing regenerated alternatives.
  - After repeated retries, suggest refining the request instead of encouraging unbounded churn.
- Avoid:
  - In-place replacement that destroys the rejected reply. Loses the user’s anchor for "I didn’t like the part where you said X."
- Released shared components: ChatMessage
- Public pattern: https://system.beibeidesign.com/#ai-pattern-retry-regenerate

## Refusal & safety

- Status: placeholder
- User problem: Sometimes the assistant can’t or won’t help — out-of-scope task, missing connector, destructive action, sensitive content. A flat "I can’t help with that" feels dismissive and severs the conversation. Refusals are part of the trust loop, not error states.
- Guidance:
  - Explain refusals in a calm, direct way that names the relevant limitation and offers a useful next step.
  - Present a refusal as part of the interaction, with visual treatment distinct from system failures.
  - Avoid exposing internal implementation details or policy labels.
- Avoid:
  - Terse "I can’t help with that" with no reason and no path forward. Drops the user into a dead end and breaks the Voice & Tone → Brand philosophy promise of empathetic + structured.
- Released shared components: ChatMessage, StatusTag
- Public pattern: https://system.beibeidesign.com/#ai-pattern-refusal-safety
