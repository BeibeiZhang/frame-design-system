"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode } from 'react';

export function GhostPillButton({ onClick, icon, children, ariaLabel, disabled, size = 'md', className: extra = '', }: {
    onClick?: () => void;
    icon?: ReactNode;
    children: ReactNode;
    ariaLabel?: string;
    disabled?: boolean;
    size?: 'md' | 'sm';
    className?: string;
}) {
    const sizeClass = size === 'sm' ? 'px-3 py-1 gap-1.5' : 'h-10 px-4 gap-2';
    return (<button type="button" onClick={onClick} aria-label={ariaLabel} disabled={disabled} className={`${sizeClass} flex items-center rounded-full border border-stroke-outline enabled:hover:bg-bg-hover transition-colors text-text-primary type-detail cursor-pointer disabled:opacity-40 ${extra}`}>
      {icon}
      {children}
    </button>);
}
