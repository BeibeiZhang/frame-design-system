"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode, type Ref } from 'react';

export function TextButton({ children, onClick, tone = 'secondary', disabled, className: extra = '', ariaExpanded, ariaControls, buttonRef, }: {
    children: ReactNode;
    onClick?: () => void;
    tone?: 'secondary' | 'primary';
    disabled?: boolean;
    className?: string;
    ariaExpanded?: boolean;
    ariaControls?: string;
    buttonRef?: Ref<HTMLButtonElement>;
}) {
    const toneClass = tone === 'primary'
        ? 'text-text-primary hover:opacity-70'
        : 'text-text-secondary hover:text-text-primary';
    return (<button type="button" ref={buttonRef} aria-expanded={ariaExpanded} aria-controls={ariaControls} onClick={onClick} disabled={disabled} className={`type-detail transition-colors cursor-pointer disabled:opacity-40 ${toneClass} ${extra}`}>
      {children}
    </button>);
}
