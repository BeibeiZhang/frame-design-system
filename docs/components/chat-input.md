# ChatInput

Prompt composer with callback-based sending, optional attachments and mentions. No model provider is included.

Source: [components/chat-input.tsx](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/components/chat-input.tsx), commit 125a6f6d993851f567b32578a4f6e48515930337, tree 05cf4cdfface969115e2c4b0c376a0515ace4f01, SHA-256 364e5a0666b02be19265a7552791a7a696f16a676033d307a2d8f69582e42b6d.

Install single: `npx shadcn@latest add @frame/chat-input`. Full collection: `npx shadcn@latest add @frame/frame`. Configure `@frame` in your shadcn `components.json` registries as `"@frame": "https://system.beibeidesign.com/r/{name}.json"`. Reproducible fallback using the pinned released source: `npx shadcn@4.21.0 add https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/chat-input.json`; [pinned full collection](https://raw.githubusercontent.com/BeibeiZhang/frame-design-system/125a6f6d993851f567b32578a4f6e48515930337/registry/frame.json). Source-copy, MIT; keep LICENSE and THIRD_PARTY_NOTICES.md.

Import from `./components/frame/chat-input`; import `./components/frame/frame.css` once. Wrap in `frame-root` with a matching host background/text color. Add `dark` to wrapper or ancestor for dark mode. Dependencies: react@19.2.5, react-dom@19.2.5, lucide-react@1.14.0.

CSS provenance: single/manual 58bb14ac01da118320d3591b46a9be19f09536f8cfa37fb68ffeb857486c7c62 (32,246 bytes); collection ec3dff7d31cd670881fe4585919e3800d0030eb80f7deb75c1cceccadf1c6837 (31,762 bytes), embedded in registry/frame.json. Missing --motion-duration-normal, --motion-ease-decelerate, .message-appear/@keyframes frame-fadeInUp and .chip-selected additions. Do not rely on these additions for this installation route. No assertion of complete dynamic styling equivalence.

| Prop | Required | Exact declared type | Explicit parameter defaults |
| --- | --- | --- | --- |
| value | optional | string | BaselineChatInput: '' |
| onChange | optional | (value: string) => void | No explicit parameter default |
| onSend | required | (value: string, attachments?: ChatInputAttachment[], meta?: ChatInputSendMeta) => void | No explicit parameter default |
| placeholder | optional | string | BaselineChatInput: 'Type a message…'; RichChatInput: 'Type a message…' |
| disabled | optional | boolean | BaselineChatInput: false; RichChatInput: false |
| chips | optional | ReactNode | No explicit parameter default |
| fillHeight | optional | boolean | No explicit parameter default |
| modeSlot | optional | ReactNode | No explicit parameter default |
| features | optional | ChatInputFeatures | RichChatInput: {} |

Only declared props are accepted; no inherited native HTML prop forwarding. An optional prop without an explicit default does not imply a false/default behavior. Branch-specific defaults retain the owning function.

Callbacks:
- `features.actionChips.onClick`: `(chip: ChatInputActionChip) => void`
- `features.attach.onAdd`: `(files: File[], source: ChatInputAttachSource) => void`
- `features.attach.onRemove`: `(id: string) => void`
- `features.voice.onActivate`: `() => void`
- `features.voiceInput.onAudioBuffer`: `(blob: Blob) => Promise<string>`
- `onChange`: `(value: string) => void`
- `onSend`: `(value: string, attachments?: ChatInputAttachment[], meta?: ChatInputSendMeta) => void`

Referenced local type closure:

```tsx
export interface ChatInputActionChip {
    label: string;
    action: string;
}

export interface ChatInputAttachment {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    kind: 'image' | 'file';
    dataUrl: string;
}

export type ChatInputAttachSource = 'photo' | 'camera' | 'upload';

export interface ChatInputFeatures {
    voice?: {
        onActivate: () => void;
        active: boolean;
        emphasized?: boolean;
    };
    voiceInput?: {
        onAudioBuffer: (blob: Blob) => Promise<string>;
        maxDurationMs?: number;
    };
    attach?: {
        attachments: ChatInputAttachment[];
        onAdd: (files: File[], source: ChatInputAttachSource) => void;
        onRemove: (id: string) => void;
        limit?: {
            maxBytes?: number;
            maxCount?: number;
        };
    };
    actionChips?: {
        items?: ChatInputActionChip[];
        onClick?: (chip: ChatInputActionChip) => void;
        quickItems?: string[];
        iconMap?: Record<string, string | ReactNode>;
    };
    mentions?: {
        options: ChatInputMentionOption[];
        emptyLabel?: string;
    };
    forceSendActive?: boolean;
    isAiResponding?: boolean;
    voiceModeActive?: boolean;
    draft?: {
        key?: string;
        initial?: string;
    };
}

export interface ChatInputMention {
    id: string;
    label: string;
}

export interface ChatInputMentionOption {
    id: string;
    label: string;
    subtitle?: string;
    avatarUrl?: string;
    keywords?: string[];
}

export interface ChatInputProps {
    value?: string;
    onChange?: (value: string) => void;
    onSend: (value: string, attachments?: ChatInputAttachment[], meta?: ChatInputSendMeta) => void;
    placeholder?: string;
    disabled?: boolean;
    chips?: ReactNode;
    fillHeight?: boolean;
    modeSlot?: ReactNode;
    features?: ChatInputFeatures;
}

export interface ChatInputSendMeta {
    mentions?: ChatInputMention[];
}
```

Supported state props: disabled. The exact types above constrain supported values.

Host responsibilities:
- features omitted selects BaselineChatInput: host must provide value and onChange to edit text.
- features provided (including {}) selects RichChatInput: value !== undefined is controlled; otherwise internal draft state is used.
- Host implements sending, attachment storage/removal and optional voice/transcription callbacks; sending does not execute a model.

Limitations:
- No suggestion prop in this released revision.
- Baseline does not clear value on send; rich branch clears via its state/onChange path.
- Voice needs browser permission and host transcription; draft key does not implement durable persistence.

Semantic evidence: ChatInput, BaselineChatInput, RichChatInput, ChatInputFeatures, onSend in the bound source hash above.

Minimal released example (adjust imports as described):

```tsx
import { ChatInput } from '../components/chat-input';
import '../styles/frame.css';

export default function Example() {
  return <div className="frame-root"><ChatInput features={{}} onSend={() => {}} /></div>;
}
```

Copy complete source closure to src/components/frame; change the example import to ./components/frame/<slug> and CSS import to ./components/frame/frame.css. Render inside frame-root with a matching host surface.

Additional exports in this single source-copy closure: Tooltip, ToolbarIconButton, Chip, ChatInputAttachSource, ChatInputAttachment, ChatInputActionChip, ChatInputMentionOption, ChatInputMention, ChatInputSendMeta, ChatInputFeatures, ChatInputProps, AttachmentChip. They are dependency closure, not additional primary installation identities. Browser, accessibility, cold-model adoption and public integration require separate evidence.
