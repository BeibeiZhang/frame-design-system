"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode } from 'react';

export function ChoiceCard({ icon, title, description, active = false, onClick, className: extra = '', }: {
    icon: ReactNode;
    title: string;
    description: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
}) {
    return (<button type="button" onClick={onClick} aria-pressed={active} className={`text-left rounded-xl border p-4 flex flex-col gap-2 transition-colors cursor-pointer ${active ? 'border-transparent' : 'chip-gradient-hover border-stroke-outline'} ${extra}`} style={active
            ? { background: 'var(--color-selected-bg)', color: 'var(--color-selected-text)' }
            : undefined}>
      <span className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: active ? 'var(--color-selected-icon-tint)' : 'var(--color-bg-hover)' }}>
        {icon}
      </span>
      <span className="type-h2-emphasized">{title}</span>
      <span className={`type-detail ${active ? '' : 'text-text-secondary'}`}>{description}</span>
    </button>);
}
