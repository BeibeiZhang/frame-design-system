"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';

export function UtilityChip({ children, icon, onClick, title, ariaLabel, ariaPressed, maxWidth, className: extra = '', }: {
    children: ReactNode;
    icon?: ReactNode;
    onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
    title?: string;
    ariaLabel?: string;
    ariaPressed?: boolean;
    maxWidth?: number | string;
    className?: string;
}) {
    const style = maxWidth !== undefined ? { maxWidth } : undefined;
    return (<button type="button" onClick={onClick} aria-label={ariaLabel} aria-pressed={ariaPressed} title={title} style={style} className={`flex items-center gap-1.5 min-w-0 px-3 h-8 rounded-full border border-stroke-outline hover:bg-bg-hover transition-colors text-text-primary ${extra}`}>
      {icon}
      <span className="font-mono type-caption truncate">{children}</span>
    </button>);
}
