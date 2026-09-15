"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { Sparkles } from 'lucide-react';
import { type ReactNode } from 'react';

export function ChatMessage({ role, content, streaming = false, avatar, showAvatar = true, meta, }: {
    role: 'user' | 'assistant';
    content?: ReactNode;
    streaming?: boolean;
    avatar?: ReactNode;
    showAvatar?: boolean;
    meta?: ReactNode;
}) {
    const isUser = role === 'user';
    const bubbleStyle = isUser
        ? { background: 'var(--color-selected-bg)', color: 'var(--color-selected-text)' }
        : undefined;
    const bubbleClass = isUser
        ? 'rounded-[16px] rounded-tr-[4px] px-4 py-3 type-body'
        : 'rounded-[16px] rounded-tl-[4px] px-4 py-3 type-body bg-bg-message text-text-primary';
    const defaultAvatar = (<div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-bg-message text-text-primary" aria-hidden>
      <Sparkles size={16} strokeWidth={1.5}/>
    </div>);
    return (<div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && showAvatar && (avatar ?? defaultAvatar)}
      <div className={`flex flex-col gap-1 max-w-[80%] min-w-0 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={bubbleClass} style={bubbleStyle}>
          {content}
          {streaming && (<span className={`inline-flex items-center gap-1 align-middle${content ? ' ml-1' : ''}`} role="status" aria-label="Assistant is typing">
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current opacity-60"/>
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current opacity-60"/>
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-current opacity-60"/>
            </span>)}
        </div>
        {meta && <div className="type-caption text-text-secondary px-1">{meta}</div>}
      </div>
    </div>);
}
