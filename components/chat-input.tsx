"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { ArrowUp, AtSign, AudioLines, Camera, Download, FileText, FileUp, Image as ImageIcon, Loader2, Mic, Plus, Square, User, X } from 'lucide-react';
import { type ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export function Tooltip({ label, children, className = '', decorative = false, }: {
    label: string;
    children: ReactNode;
    className?: string;
    decorative?: boolean;
}) {
    return (<div className={`relative group ${className}`}>
      {children}
      <div role={decorative ? undefined : 'tooltip'} aria-hidden={decorative || undefined} className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-md bg-tooltip text-white type-footnote whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
        {label}
      </div>
    </div>);
}

export function ToolbarIconButton({ onClick, ariaLabel, children, className, }: {
    onClick?: () => void;
    ariaLabel?: string;
    children: ReactNode;
    className?: string;
}) {
    const base = 'flex items-center justify-center rounded-full hover:bg-bg-hover toolbar-gradient-hover transition-all shrink-0 cursor-pointer text-text-primary';
    const merged = [base, className].filter(Boolean).join(' ');
    return (<button type="button" onClick={onClick} aria-label={ariaLabel} className={merged} style={{ width: 'var(--toolbar-btn-h)', height: 'var(--toolbar-btn-h)' }}>
      {children}
    </button>);
}

export function Chip({ label, icon, active, disabled = false, onClick, onRemove, draggable = false, onDragStart, className: extra = '', }: {
    label: ReactNode;
    icon?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    onRemove?: () => void;
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent) => void;
    className?: string;
}) {
    const isActive = active === true;
    const ariaPressed = active === undefined ? undefined : active;
    const stateClass = isActive
        ? 'border-transparent'
        : 'border-stroke-outline text-text-primary chip-gradient-hover';
    const stateStyle = isActive
        ? { background: 'var(--color-selected-bg)', color: 'var(--color-selected-text)' }
        : undefined;
    const cursor = disabled ? 'cursor-not-allowed' : draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer';
    const base = `flex items-center gap-1 px-4 py-2 md:px-3 md:py-1 rounded-full border type-h2 transition-colors select-none ${cursor} ${disabled ? 'opacity-40' : ''} ${stateClass} ${extra}`;
    const inner = (<>
      {icon}
      <span>{label}</span>
      {onRemove && (<button type="button" disabled={disabled} onClick={disabled ? undefined : (e) => { e.stopPropagation(); onRemove(); }} className="ml-1 -mr-1 flex items-center justify-center rounded-full hover:opacity-70" style={{ width: 16, height: 16, color: 'inherit' }} aria-label="Remove">
          <X size={14}/>
        </button>)}
    </>);
    const useDiv = draggable || Boolean(onRemove);
    if (useDiv) {
        return (<div role="button" aria-pressed={ariaPressed} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : 0} draggable={!disabled && draggable ? true : undefined} onDragStart={disabled ? undefined : onDragStart} onClick={disabled ? undefined : onClick} onKeyDown={disabled ? undefined : (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } }} className={base} style={stateStyle}>
        {inner}
      </div>);
    }
    return (<button type="button" aria-pressed={ariaPressed} disabled={disabled} onClick={disabled ? undefined : onClick} className={base} style={stateStyle}>
      {inner}
    </button>);
}

export type ChatInputAttachSource = 'photo' | 'camera' | 'upload';

export interface ChatInputAttachment {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    kind: 'image' | 'file';
    dataUrl: string;
}

export interface ChatInputActionChip {
    label: string;
    action: string;
}

export interface ChatInputMentionOption {
    id: string;
    label: string;
    subtitle?: string;
    avatarUrl?: string;
    keywords?: string[];
}

export interface ChatInputMention {
    id: string;
    label: string;
}

export interface ChatInputSendMeta {
    mentions?: ChatInputMention[];
}

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

function formatBytes(bytes: number): string {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AttachmentChip({ attachment, onRemove, showDownload, maxNameWidth = 160, }: {
    attachment: ChatInputAttachment;
    onRemove?: () => void;
    showDownload?: boolean;
    maxNameWidth?: number;
}) {
    return (<div className="relative group inline-flex items-center gap-2 pr-2 py-1.5 rounded-lg bg-bg-message overflow-hidden">
      {attachment.kind === 'image' ? (<img src={attachment.dataUrl} alt={attachment.name} className="w-12 self-stretch -my-1.5 object-cover shrink-0"/>) : (<div className="w-12 self-stretch -my-1.5 shrink-0 flex items-center justify-center text-text-primary">
          <FileText size={22} strokeWidth={1.5}/>
        </div>)}
      <div className="min-w-0 pr-1" style={{ maxWidth: maxNameWidth }}>
        <div className="type-detail text-text-primary truncate">{attachment.name}</div>
        <div className="type-detail text-text-secondary">{formatBytes(attachment.size)}</div>
      </div>
      {showDownload && (<Download size={14} className="text-text-secondary shrink-0 ml-1"/>)}
      {onRemove && (<button type="button" onClick={onRemove} aria-label={`Remove ${attachment.name}`} className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center bg-bg-page border border-stroke-outline text-text-primary opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer">
          <X size={12}/>
        </button>)}
    </div>);
}

export function ChatInput(props: ChatInputProps) {
    if (props.features === undefined)
        return <BaselineChatInput {...props}/>;
    return <RichChatInput {...props}/>;
}

const quickChipsContainerClass = (fillHeight?: boolean) => fillHeight
    ? 'flex flex-wrap content-start gap-2 flex-1 min-h-0 overflow-y-auto p-1'
    : 'flex flex-wrap gap-2';

function BaselineChatInput({ value = '', onChange, onSend, placeholder = 'Type a message…', disabled = false, chips, fillHeight, modeSlot, }: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [focused, setFocused] = useState(false);
    const [isMultiline, setIsMultiline] = useState(false);
    const canSend = !disabled && value.trim().length > 0;
    const isActive = focused || canSend;
    const isClickable = canSend;
    useLayoutEffect(() => {
        const el = textareaRef.current;
        if (!el)
            return;
        if (value === '') {
            el.style.height = 'auto';
            setIsMultiline(false);
            return;
        }
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
        setIsMultiline(el.scrollHeight > 30);
    }, [value]);
    const submit = () => {
        if (!isClickable)
            return;
        onSend(value, undefined);
    };
    return (<div className={`w-full flex flex-col gap-4 ${fillHeight ? 'flex-1 min-h-0' : ''}`}>
      {chips && (<div className={quickChipsContainerClass(fillHeight)}>
          {chips}
        </div>)}
      <div className={`px-3 py-2 flex gap-2 transition-[border-radius,background-color,box-shadow] duration-200 ease-out ${fillHeight ? 'shrink-0' : ''} ${isMultiline ? 'items-end' : 'items-center'} ${isActive
            ? `input-gradient-border ${isMultiline ? 'rounded-lg' : 'rounded-full'}`
            : 'rounded-full input-gradient-hover'}`} style={{
            border: '2px solid transparent',
            backgroundColor: isActive ? 'var(--color-input-bg-active)' : 'var(--color-bg-message)',
            backgroundClip: 'padding-box',
        }}>
        <textarea ref={textareaRef} value={value} onChange={(e) => onChange?.(e.target.value)} onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit();
            }
        }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} disabled={disabled} rows={1} aria-label="Chat message — type a message and press Enter to send" className="flex-1 min-w-0 resize-none bg-transparent outline-none focus-visible:outline-none type-h2 text-text-primary placeholder-text-tertiary chat-textarea py-[11px] disabled:opacity-50"/>
        <div className="flex items-center gap-2 shrink-0">
          <Tooltip label="Send" decorative>
            <button type="button" onClick={isClickable ? submit : undefined} aria-label="Send message" aria-disabled={!isClickable} className={`flex items-center justify-center shrink-0 w-12 h-12 md:w-9 md:h-9 rounded-full transition-all ${isClickable ? 'gradient-btn cursor-pointer' : 'cursor-default'}`} style={{ color: isClickable ? '#fff' : 'var(--color-text-primary)' }}>
              <ArrowUp strokeWidth={2} className="w-6 h-6 md:w-[18px] md:h-[18px]"/>
            </button>
          </Tooltip>
        </div>
      </div>
      {modeSlot && <div className="flex items-center">{modeSlot}</div>}
    </div>);
}

type MentionSearchState = {
    start: number;
    query: string;
};

function getActiveMentionSearch(value: string, caret: number): MentionSearchState | null {
    const beforeCaret = value.slice(0, caret);
    const match = beforeCaret.match(/(^|\s)@([^\s@]*)$/);
    if (!match)
        return null;
    return {
        start: beforeCaret.length - match[2].length - 1,
        query: match[2],
    };
}

function filterMentionOptions(options: ChatInputMentionOption[], query: string): ChatInputMentionOption[] {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle)
        return options.slice(0, 8);
    return options
        .filter((option) => {
        const haystack = [
            option.label,
            option.subtitle,
            ...(option.keywords ?? []),
        ]
            .filter(Boolean)
            .join(' ')
            .toLocaleLowerCase();
        return haystack.includes(needle);
    })
        .slice(0, 8);
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsMentionToken(value: string, label: string): boolean {
    return new RegExp(`(^|\\s)@${escapeRegExp(label)}(?=$|[\\s.,!?;:)\\]}])`).test(value);
}

function resolveMentionMeta(value: string, selected: ChatInputMention[], options: ChatInputMentionOption[]): ChatInputMention[] {
    const byId = new Map<string, ChatInputMention>();
    for (const mention of selected) {
        if (!containsMentionToken(value, mention.label))
            continue;
        byId.set(mention.id, mention);
    }
    const labelCounts = new Map<string, number>();
    for (const option of options) {
        labelCounts.set(option.label, (labelCounts.get(option.label) ?? 0) + 1);
    }
    for (const option of options) {
        if (byId.has(option.id))
            continue;
        if (labelCounts.get(option.label) !== 1)
            continue;
        if (!containsMentionToken(value, option.label))
            continue;
        byId.set(option.id, { id: option.id, label: option.label });
    }
    return [...byId.values()];
}

function RichChatInput({ value: valueProp, onChange: onChangeProp, onSend, placeholder = 'Type a message…', disabled = false, features = {}, fillHeight, modeSlot, }: ChatInputProps) {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(features.draft?.initial ?? '');
    const v = isControlled ? valueProp! : internalValue;
    const setV = (next: string) => {
        if (isControlled)
            onChangeProp?.(next);
        else
            setInternalValue(next);
    };
    const [focused, setFocused] = useState(false);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [isMultiline, setIsMultiline] = useState(false);
    const [attachError, setAttachError] = useState<string | null>(null);
    const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'processing'>('idle');
    const [voiceInputError, setVoiceInputError] = useState<string | null>(null);
    const [mentionSearch, setMentionSearch] = useState<MentionSearchState | null>(null);
    const [mentionActiveIndex, setMentionActiveIndex] = useState(0);
    const [selectedMentions, setSelectedMentions] = useState<ChatInputMention[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const attachRef = useRef<HTMLDivElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const sendingRef = useRef(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordingTimerRef = useRef<number | null>(null);
    const recordingCancelledRef = useRef(false);
    const latestValueRef = useRef('');
    useEffect(() => {
        if (!features.isAiResponding || features.voiceModeActive)
            sendingRef.current = false;
    }, [features.isAiResponding, features.voiceModeActive]);
    useEffect(() => {
        latestValueRef.current = v;
    }, [v]);
    const lastDraftKeyRef = useRef(features.draft?.key);
    useEffect(() => {
        if (isControlled)
            return;
        if (features.draft?.key === lastDraftKeyRef.current)
            return;
        lastDraftKeyRef.current = features.draft?.key;
        setInternalValue(features.draft?.initial ?? '');
        setSelectedMentions([]);
        setMentionSearch(null);
    }, [features.draft?.key, features.draft?.initial, isControlled]);
    useEffect(() => {
        const ta = textareaRef.current;
        if (!ta)
            return;
        if (v === '') {
            ta.style.height = 'auto';
            setIsMultiline(false);
            return;
        }
        ta.style.height = 'auto';
        const next = Math.min(ta.scrollHeight, 120);
        ta.style.height = next + 'px';
        setIsMultiline(ta.scrollHeight > 30);
    }, [v]);
    useEffect(() => {
        if (!attachError)
            return;
        const t = window.setTimeout(() => setAttachError(null), 4000);
        return () => window.clearTimeout(t);
    }, [attachError]);
    useEffect(() => {
        if (!voiceInputError)
            return;
        const t = window.setTimeout(() => setVoiceInputError(null), 4000);
        return () => window.clearTimeout(t);
    }, [voiceInputError]);
    useEffect(() => {
        if (!showAttachMenu)
            return;
        const handleClick = (e: globalThis.MouseEvent) => {
            if (attachRef.current && !attachRef.current.contains(e.target as Node)) {
                setShowAttachMenu(false);
            }
        };
        const handleKey = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape')
                setShowAttachMenu(false);
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [showAttachMenu]);
    useEffect(() => {
        return () => {
            if (audioStreamRef.current) {
                audioStreamRef.current.getTracks().forEach((t) => t.stop());
                audioStreamRef.current = null;
            }
            if (recordingTimerRef.current !== null) {
                window.clearTimeout(recordingTimerRef.current);
                recordingTimerRef.current = null;
            }
        };
    }, []);
    const attachFeat = features.attach;
    const voiceInputFeat = features.voiceInput;
    const voiceFeat = features.voice;
    const mentionFeat = features.mentions;
    const mentionOptions = mentionFeat?.options ?? [];
    const visibleMentionOptions = useMemo(() => filterMentionOptions(mentionOptions, mentionSearch?.query ?? ''), [mentionOptions, mentionSearch?.query]);
    const showMentionPicker = !!mentionFeat && !!mentionSearch;
    useEffect(() => {
        setMentionActiveIndex(0);
    }, [mentionSearch?.query]);
    const handleFileInput = (source: ChatInputAttachSource) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        e.target.value = '';
        if (!attachFeat || files.length === 0)
            return;
        const limit = attachFeat.limit;
        const maxCount = limit?.maxCount;
        const maxBytes = limit?.maxBytes;
        const remaining = maxCount !== undefined ? maxCount - attachFeat.attachments.length : files.length;
        if (remaining <= 0) {
            setAttachError(maxCount !== undefined ? `Up to ${maxCount} attachments per message` : 'Attachment limit reached');
            return;
        }
        const toProcess = files.slice(0, remaining);
        const droppedForLimit = files.length - toProcess.length;
        const oversized: string[] = [];
        const accepted: File[] = [];
        for (const f of toProcess) {
            if (maxBytes !== undefined && f.size > maxBytes)
                oversized.push(f.name);
            else
                accepted.push(f);
        }
        const problems: string[] = [];
        if (oversized.length)
            problems.push(`${oversized.length} file${oversized.length > 1 ? 's' : ''}${maxBytes !== undefined ? ` over ${formatBytes(maxBytes)}` : ' rejected'}`);
        if (droppedForLimit)
            problems.push(`${droppedForLimit} skipped${maxCount !== undefined ? ` (limit ${maxCount})` : ''}`);
        setAttachError(problems.length ? problems.join(' • ') : null);
        if (accepted.length)
            attachFeat.onAdd(accepted, source);
    };
    const openPicker = (source: ChatInputAttachSource) => {
        setShowAttachMenu(false);
        const ref = source === 'photo' ? photoInputRef : source === 'camera' ? cameraInputRef : fileInputRef;
        ref.current?.click();
    };
    const refreshMentionSearch = (value: string, caret: number) => {
        if (!mentionFeat || mentionOptions.length === 0) {
            setMentionSearch(null);
            return;
        }
        setMentionSearch(getActiveMentionSearch(value, caret));
    };
    const openMentionPicker = () => {
        if (!mentionFeat || mentionOptions.length === 0)
            return;
        setShowAttachMenu(false);
        const caret = textareaRef.current?.selectionStart ?? v.length;
        setMentionSearch({ start: caret, query: '' });
        setMentionActiveIndex(0);
        window.requestAnimationFrame(() => textareaRef.current?.focus());
    };
    const insertMention = (option: ChatInputMentionOption) => {
        const caret = textareaRef.current?.selectionStart ?? v.length;
        const search = mentionSearch ?? { start: caret, query: '' };
        const before = v.slice(0, search.start);
        const after = v.slice(caret);
        const prefix = before.length > 0 && !/\s$/.test(before) ? ' ' : '';
        const token = `@${option.label} `;
        const nextValue = `${before}${prefix}${token}${after}`;
        const nextCursor = before.length + prefix.length + token.length;
        flushSync(() => setV(nextValue));
        latestValueRef.current = nextValue;
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(nextCursor, nextCursor);
        }
        setSelectedMentions((prev) => {
            if (prev.some((mention) => mention.id === option.id))
                return prev;
            return [...prev, { id: option.id, label: option.label }];
        });
        setMentionSearch(null);
    };
    const canSend = v.trim().length > 0 || (attachFeat && attachFeat.attachments.length > 0);
    const isActive = focused || canSend || !!features.forceSendActive;
    const sendActive = canSend || !!features.forceSendActive;
    const responseLock = !!features.isAiResponding && !features.voiceModeActive;
    const isClickable = sendActive && !responseLock && !disabled;
    const handleSend = () => {
        if (responseLock || sendingRef.current || disabled)
            return;
        if (!sendActive)
            return;
        const trimmed = v.trim();
        const mentions = mentionFeat
            ? resolveMentionMeta(v, selectedMentions, mentionOptions)
            : [];
        sendingRef.current = true;
        onSend(trimmed, attachFeat?.attachments, mentions.length ? { mentions } : undefined);
        setV('');
        setSelectedMentions([]);
        setMentionSearch(null);
        setIsMultiline(false);
        if (textareaRef.current)
            textareaRef.current.style.height = 'auto';
        if (features.voiceModeActive) {
            queueMicrotask(() => { sendingRef.current = false; });
        }
    };
    const startRecording = async () => {
        if (!voiceInputFeat || recordingState !== 'idle')
            return;
        setVoiceInputError(null);
        recordingCancelledRef.current = false;
        if (!navigator.mediaDevices?.getUserMedia) {
            setVoiceInputError('Microphone is unavailable in this browser. Try a recent Chrome / Safari over HTTPS.');
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStreamRef.current = stream;
            audioChunksRef.current = [];
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            recorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0)
                    audioChunksRef.current.push(e.data);
            };
            recorder.onstop = async () => {
                const stream = audioStreamRef.current;
                if (stream) {
                    stream.getTracks().forEach((t) => t.stop());
                    audioStreamRef.current = null;
                }
                if (recordingTimerRef.current !== null) {
                    window.clearTimeout(recordingTimerRef.current);
                    recordingTimerRef.current = null;
                }
                const cancelled = recordingCancelledRef.current;
                recordingCancelledRef.current = false;
                if (cancelled) {
                    audioChunksRef.current = [];
                    setRecordingState('idle');
                    return;
                }
                const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
                audioChunksRef.current = [];
                if (blob.size === 0) {
                    setRecordingState('idle');
                    return;
                }
                setRecordingState('processing');
                try {
                    const transcript = await voiceInputFeat.onAudioBuffer(blob);
                    if (transcript) {
                        const prev = latestValueRef.current;
                        setV(prev ? `${prev} ${transcript}` : transcript);
                    }
                }
                catch (err) {
                    setVoiceInputError(err instanceof Error ? err.message : 'Transcription failed');
                }
                finally {
                    setRecordingState('idle');
                }
            };
            recorder.start();
            setRecordingState('recording');
            const maxMs = voiceInputFeat.maxDurationMs ?? 60000;
            recordingTimerRef.current = window.setTimeout(() => {
                if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                    mediaRecorderRef.current.stop();
                }
            }, maxMs);
        }
        catch (err) {
            setVoiceInputError(err instanceof Error ? err.message : 'Microphone access denied');
            setRecordingState('idle');
        }
    };
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };
    const cancelRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            recordingCancelledRef.current = true;
            mediaRecorderRef.current.stop();
        }
    };
    const showQuickChips = !!features.actionChips?.quickItems?.length &&
        v.length === 0 &&
        !(attachFeat && attachFeat.attachments.length > 0) &&
        !voiceFeat?.active &&
        !showMentionPicker;
    const showSendInsteadOfVoice = voiceFeat?.active || focused || canSend || features.forceSendActive;
    const errorMsg = attachError || voiceInputError;
    return (<div className={`w-full flex flex-col gap-4 ${fillHeight ? 'flex-1 min-h-0' : ''}`}>
      {attachFeat && (<>
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileInput('photo')} aria-label="Attach photos"/>
          <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileInput('camera')} aria-label="Take a photo"/>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInput('upload')} aria-label="Attach files"/>
        </>)}

      {attachFeat && attachFeat.attachments.length > 0 && (<div className="flex flex-wrap gap-2" aria-label="Pending attachments">
          {attachFeat.attachments.map((att) => (<AttachmentChip key={att.id} attachment={att} onRemove={() => attachFeat.onRemove(att.id)}/>))}
        </div>)}

      {errorMsg && (<div className="type-caption text-error" role="status">{errorMsg}</div>)}

      {showQuickChips && (<div className={quickChipsContainerClass(fillHeight)}>
          {features.actionChips!.quickItems!.map((chip) => {
                const ic = features.actionChips?.iconMap?.[chip];
                return (<Chip key={chip} label={chip} onClick={() => onSend(chip, undefined)} icon={ic ? (<div className="relative overflow-hidden w-4 h-4 shrink-0 flex items-center justify-center">
                      {typeof ic === 'string' ? (<img src={ic} alt="" className="max-w-full max-h-full object-contain opacity-70 icon-theme"/>) : (ic)}
                    </div>) : undefined}/>);
            })}
        </div>)}

      {features.actionChips?.items && features.actionChips.items.length > 0 && (<div className="flex gap-2 overflow-x-auto scrollbar-autohide -mx-4 px-4">
          {features.actionChips.items.map((chip) => (<Chip key={chip.action} label={chip.label} onClick={() => features.actionChips!.onClick?.(chip)} className="shrink-0 whitespace-nowrap"/>))}
        </div>)}

      <div className={`relative px-3 py-2 flex gap-2 transition-[border-radius,background-color,box-shadow] duration-200 ease-out ${fillHeight ? 'shrink-0' : ''} ${isMultiline ? 'items-end' : 'items-center'} ${isActive
            ? `input-gradient-border ${isMultiline ? 'rounded-lg' : 'rounded-full'}`
            : 'rounded-full input-gradient-hover'}`} style={{
            border: '2px solid transparent',
            backgroundColor: isActive ? 'var(--color-input-bg-active)' : 'var(--color-bg-message)',
            backgroundClip: 'padding-box',
        }}>
        {showMentionPicker && (<div role="listbox" aria-label="Mention someone" className="panel-border absolute bottom-full left-0 right-0 mb-2 max-h-72 overflow-y-auto rounded-xl z-50" style={{ background: 'var(--color-sidebar-bg)', boxShadow: 'var(--shadow-popup)' }}>
            {visibleMentionOptions.length > 0 ? (visibleMentionOptions.map((option, index) => (<button key={option.id} type="button" role="option" aria-selected={index === mentionActiveIndex} onMouseDown={(e) => e.preventDefault()} onClick={() => insertMention(option)} className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${index === mentionActiveIndex ? 'bg-bg-hover' : 'hover:bg-bg-hover'}`}>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-bg-message shrink-0 flex items-center justify-center text-text-secondary">
                    {option.avatarUrl ? (<img src={option.avatarUrl} alt="" className="w-full h-full object-cover"/>) : (<User size={16} strokeWidth={1.75}/>)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="type-detail-emphasized text-text-primary truncate">
                      {option.label}
                    </div>
                    {option.subtitle && (<div className="type-caption text-text-secondary truncate">
                        {option.subtitle}
                      </div>)}
                  </div>
                </button>))) : (<div className="px-3 py-3 type-detail text-text-secondary">
                {mentionFeat?.emptyLabel ?? 'No matches found'}
              </div>)}
          </div>)}
        {attachFeat && (<div ref={attachRef} className="relative shrink-0">
            <Tooltip label="Attach" decorative>
              <button type="button" onClick={() => setShowAttachMenu((s) => !s)} aria-label="Attach" className="flex items-center justify-center shrink-0 w-12 h-12 md:w-9 md:h-9 rounded-full transition-all cursor-pointer hover:bg-bg-hover text-text-primary">
                <Plus strokeWidth={2} className="w-6 h-6 md:w-5 md:h-5"/>
              </button>
            </Tooltip>
            {showAttachMenu && (<div role="menu" className="panel-border absolute bottom-full left-0 mb-2 min-w-[220px] py-1 rounded-xl overflow-hidden z-50" style={{ background: 'var(--color-sidebar-bg)', boxShadow: 'var(--shadow-popup)' }}>
                {([
                    ...(mentionFeat && mentionOptions.length > 0
                        ? [{ Icon: AtSign, label: 'Mention', action: 'mention' as const }]
                        : []),
                    { Icon: ImageIcon, label: 'Photo', action: 'photo' as const },
                    { Icon: Camera, label: 'Camera', action: 'camera' as const },
                    { Icon: FileUp, label: 'Upload File', action: 'upload' as const },
                ]).map(({ Icon, label, action }) => (<button key={label} type="button" role="menuitem" onClick={() => {
                        if (action === 'mention') {
                            openMentionPicker();
                            return;
                        }
                        openPicker(action);
                    }} className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-bg-hover">
                    <Icon size={16} strokeWidth={2} className="shrink-0 text-text-primary"/>
                    <span className="type-detail text-text-primary">{label}</span>
                  </button>))}
              </div>)}
          </div>)}

        <textarea ref={textareaRef} value={v} onChange={(e) => {
            const nextValue = e.target.value;
            setV(nextValue);
            latestValueRef.current = nextValue;
            refreshMentionSearch(nextValue, e.target.selectionStart ?? nextValue.length);
        }} onKeyDown={(e) => {
            if (showMentionPicker) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    setMentionSearch(null);
                    return;
                }
                if (visibleMentionOptions.length > 0) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        setMentionActiveIndex((index) => (index + 1) % visibleMentionOptions.length);
                        return;
                    }
                    if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        setMentionActiveIndex((index) => (index - 1 + visibleMentionOptions.length) %
                            visibleMentionOptions.length);
                        return;
                    }
                    if (e.key === 'Enter' || e.key === 'Tab') {
                        e.preventDefault();
                        insertMention(visibleMentionOptions[Math.min(mentionActiveIndex, visibleMentionOptions.length - 1)]);
                        return;
                    }
                }
            }
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        }} onPaste={(e) => {
            if (!attachFeat)
                return;
            const files = Array.from(e.clipboardData?.files ?? []);
            if (files.length === 0)
                return;
            e.preventDefault();
            const dt = new DataTransfer();
            files.forEach((f) => dt.items.add(f));
            const synthetic = { target: { files: dt.files, value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleFileInput('upload')(synthetic);
        }} onFocus={() => setFocused(true)} onBlur={() => {
            setFocused(false);
            window.setTimeout(() => {
                if (document.activeElement !== textareaRef.current) {
                    setMentionSearch(null);
                }
            }, 120);
        }} onClick={(e) => {
            refreshMentionSearch(v, e.currentTarget.selectionStart ?? v.length);
        }} onKeyUp={(e) => {
            if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                refreshMentionSearch(v, e.currentTarget.selectionStart ?? v.length);
            }
        }} placeholder={placeholder} disabled={disabled} rows={1} aria-label="Chat message — type a message and press Enter to send" className="flex-1 min-w-0 bg-transparent resize-none outline-none focus-visible:outline-none type-h2 text-text-primary placeholder-text-tertiary chat-textarea py-[11px] disabled:opacity-50"/>

        <div className="flex items-center gap-2 shrink-0">
          {recordingState !== 'idle' ? (<RichRecordingControls state={recordingState} onCancel={cancelRecording} onStop={stopRecording}/>) : (<>
              {voiceInputFeat && (<Tooltip label="Voice input" decorative>
                  <button type="button" onClick={startRecording} aria-label="Start voice input" className="flex items-center justify-center shrink-0 w-12 h-12 md:w-9 md:h-9 rounded-full transition-all cursor-pointer hover:bg-bg-hover text-text-primary">
                    <Mic strokeWidth={2} className="w-6 h-6 md:w-[18px] md:h-[18px]"/>
                  </button>
                </Tooltip>)}
              {showSendInsteadOfVoice ? (<Tooltip label="Send" decorative>
                  <button type="button" onClick={isClickable ? handleSend : undefined} aria-label="Send message" aria-disabled={!isClickable} className={`flex items-center justify-center shrink-0 w-12 h-12 md:w-9 md:h-9 rounded-full transition-all ${isClickable ? 'gradient-btn cursor-pointer' : 'cursor-default'}`} style={{ color: isClickable ? '#fff' : 'var(--color-text-primary)' }}>
                    <ArrowUp strokeWidth={2} className="w-6 h-6 md:w-[18px] md:h-[18px]"/>
                  </button>
                </Tooltip>) : voiceFeat ? (<Tooltip label="Voice mode" decorative>
                  <button type="button" onClick={voiceFeat.onActivate} aria-label="Start voice mode" className={`flex items-center justify-center shrink-0 w-12 h-12 md:w-9 md:h-9 rounded-full transition-all cursor-pointer ${voiceFeat.emphasized ? 'gradient-btn' : 'hover:bg-bg-hover text-text-primary'}`} style={voiceFeat.emphasized ? { color: '#fff' } : undefined}>
                    <AudioLines strokeWidth={2} className="w-6 h-6 md:w-[18px] md:h-[18px]"/>
                  </button>
                </Tooltip>) : (<Tooltip label="Send" decorative>
                  <button type="button" onClick={isClickable ? handleSend : undefined} aria-label="Send message" aria-disabled={!isClickable} className={`flex items-center justify-center shrink-0 w-12 h-12 md:w-9 md:h-9 rounded-full transition-all ${isClickable ? 'gradient-btn cursor-pointer' : 'cursor-default'}`} style={{ color: isClickable ? '#fff' : 'var(--color-text-primary)' }}>
                    <ArrowUp strokeWidth={2} className="w-6 h-6 md:w-[18px] md:h-[18px]"/>
                  </button>
                </Tooltip>)}
            </>)}
        </div>
      </div>

      {modeSlot && <div className="flex items-center">{modeSlot}</div>}
    </div>);
}

function RichRecordingControls({ state, onCancel, onStop }: {
    state: 'recording' | 'processing';
    onCancel: () => void;
    onStop: () => void;
}) {
    if (state === 'processing') {
        return (<span className="inline-flex items-center gap-1.5 type-caption text-text-secondary px-2">
        <Loader2 size={14} className="animate-spin"/>
        Transcribing…
      </span>);
    }
    return (<div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 type-caption text-error px-2">
        <span className="inline-block w-2 h-2 rounded-full bg-error animate-pulse"/>
        Recording
      </span>
      <Tooltip label="Cancel" decorative>
        <ToolbarIconButton ariaLabel="Cancel recording" onClick={onCancel}>
          <X size={16}/>
        </ToolbarIconButton>
      </Tooltip>
      <button type="button" onClick={onStop} aria-label="Stop recording" className="gradient-btn w-9 h-9 rounded-full flex items-center justify-center cursor-pointer" style={{ color: '#fff' }}>
        <Square size={12} strokeWidth={2.5} fill="currentColor"/>
      </button>
    </div>);
}
