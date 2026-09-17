"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { AlertTriangle, BadgeCheck, Clock, Loader2, type LucideIcon, Send, Smile, XCircle } from 'lucide-react';
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

export function VersionRow({ label, current, latest, status, error, loading, }: {
    label: string;
    current: string;
    latest: string | null;
    status: 'up-to-date' | 'update-available' | 'unknown';
    error?: string;
    loading?: boolean;
}) {
    const statusVariant = status === 'up-to-date' ? 'success' : status === 'update-available' ? 'pending' : 'neutral';
    const statusLabel = status === 'up-to-date' ? 'Up to date' : status === 'update-available' ? 'Update available' : 'Unknown';
    return (<div className="panel-border rounded-[12px] p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="type-detail-emphasized text-text-primary">{label}</p>
          <p className="type-caption text-text-secondary truncate mt-0.5">
            {current}
            {latest && latest !== current && (<span className="text-text-tertiary"> → {latest}</span>)}
          </p>
        </div>
        <div className="shrink-0">
          {loading ? (<Loader2 size={16} className="animate-spin text-text-secondary"/>) : (<StatusTag variant={statusVariant} label={statusLabel} size="sm"/>)}
        </div>
      </div>
      {error && (<p className="type-caption text-text-tertiary mt-2">{error}</p>)}
    </div>);
}
