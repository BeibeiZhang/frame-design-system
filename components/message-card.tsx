"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { AlertTriangle, BadgeCheck, Info, type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

type MessageCardTone = 'info' | 'success' | 'warning';

const MESSAGE_CARD_TONE: Record<MessageCardTone, {
    accent: string;
    icon: LucideIcon;
}> = {
    info: { accent: 'var(--color-accent-blue)', icon: Info },
    success: { accent: 'var(--color-accent-green)', icon: BadgeCheck },
    warning: { accent: 'var(--color-warning)', icon: AlertTriangle },
};

export function MessageCard({ tone = 'info', title, body, action, }: {
    tone?: MessageCardTone;
    title?: ReactNode;
    body: ReactNode;
    action?: ReactNode;
}) {
    const { accent, icon: Icon } = MESSAGE_CARD_TONE[tone];
    return (<div role="status" className="panel-border rounded-[12px] overflow-hidden flex" style={{ background: 'var(--color-card-panel-bg)' }}>
      <div className="w-1 shrink-0" style={{ background: accent }} aria-hidden/>
      <div className="flex-1 min-w-0 flex items-start gap-3 p-4">
        <span className="shrink-0 mt-0.5" style={{ color: accent }} aria-hidden>
          <Icon size={16} strokeWidth={1.75}/>
        </span>
        <div className="flex-1 min-w-0">
          {title && (<p className="type-detail-emphasized text-text-primary">{title}</p>)}
          <div className={`type-detail text-text-secondary ${title ? 'mt-1' : ''}`}>
            {body}
          </div>
          {action && <div className="mt-3">{action}</div>}
        </div>
      </div>
    </div>);
}
