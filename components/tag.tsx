"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { AlertTriangle, BadgeCheck, Clock, type LucideIcon, Send, Smile, XCircle } from 'lucide-react';
import { type ReactNode } from 'react';

export type StatusVariant = 'pending' | 'in-progress' | 'submitted' | 'in-review' | 'success' | 'failed' | 'expired' | 'neutral';

const STATUS_ICONS: Record<StatusVariant, LucideIcon> = {
    'pending': AlertTriangle,
    'in-progress': Clock,
    'submitted': Send,
    'in-review': Smile,
    'success': BadgeCheck,
    'failed': XCircle,
    'expired': Clock,
    'neutral': Clock,
};

export function StatusTag({ variant, label, showIcon = true, size = 'md', icon, outline = false, tooltip, }: {
    variant: StatusVariant;
    label: ReactNode;
    showIcon?: boolean;
    size?: 'sm' | 'md';
    icon?: LucideIcon;
    outline?: boolean;
    tooltip?: string;
}) {
    const Icon = icon ?? STATUS_ICONS[variant];
    const isSmall = size === 'sm';
    const surface = outline
        ? { background: 'var(--color-bg-page)', color: 'var(--status-fg)', border: '1px solid var(--color-stroke-outline)' }
        : { background: 'var(--status-bg)', color: 'var(--status-fg)' };
    return (<span className={`status-${variant} inline-flex items-center whitespace-nowrap shrink-0 rounded-[4px] tracking-[-0.3px] font-normal ${isSmall ? 'gap-1 px-2 py-0.5 type-caption' : 'gap-1.5 px-3 py-1 type-detail'} ${tooltip ? 'cursor-help' : ''}`} style={surface} title={tooltip} tabIndex={tooltip ? 0 : undefined} role={tooltip ? 'note' : undefined}>
      {showIcon && <Icon size={isSmall ? 12 : 14} strokeWidth={2}/>}
      {label}
    </span>);
}

export function Tag({ children, outline = false, tooltip, }: {
    children: ReactNode;
    outline?: boolean;
    tooltip?: string;
}) {
    return (<StatusTag variant="neutral" label={children} size="sm" showIcon={false} outline={outline} tooltip={tooltip}/>);
}
