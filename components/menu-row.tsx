"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode } from 'react';

export function MenuRow({ icon, label, sublabel, onClick, trailing, active = false, muted = false, className: extra = '', }: {
    icon?: ReactNode;
    label: ReactNode;
    sublabel?: ReactNode;
    onClick?: () => void;
    trailing?: ReactNode;
    active?: boolean;
    muted?: boolean;
    className?: string;
}) {
    return (<button type="button" onClick={onClick} aria-current={active ? true : undefined} className={`flex ${sublabel ? 'items-start' : 'items-center'} gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-bg-hover transition-colors text-left ${active ? 'bg-bg-hover' : ''} ${extra}`}>
      {icon}
      <span className="flex flex-col flex-1 min-w-0">
        <span className={`type-h2 truncate ${muted ? 'text-text-tertiary' : 'text-text-primary'}`}>{label}</span>
        {sublabel && <span className="type-detail text-text-secondary">{sublabel}</span>}
      </span>
      {trailing}
    </button>);
}
