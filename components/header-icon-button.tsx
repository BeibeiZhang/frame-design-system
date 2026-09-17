"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode } from 'react';

export function HeaderIconButton({ onClick, ariaLabel, title, children, className: extra = '', }: {
    onClick?: () => void;
    ariaLabel: string;
    title?: string;
    children: ReactNode;
    className?: string;
}) {
    return (<button type="button" onClick={onClick} aria-label={ariaLabel} title={title} className={`w-11 h-11 md:w-10 md:h-10 flex items-center justify-center rounded-xl hover:bg-bg-hover transition-colors shrink-0 text-text-primary cursor-pointer ${extra}`}>
      {children}
    </button>);
}
