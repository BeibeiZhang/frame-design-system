"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode } from 'react';

export function IconBadge({ children, size = 40, className: extra = '', }: {
    children: ReactNode;
    size?: number;
    className?: string;
}) {
    return (<span aria-hidden="true" className={`inline-flex items-center justify-center shrink-0 rounded-full bg-bg-hover text-text-primary ${extra}`} style={{ width: size, height: size }}>
      {children}
    </span>);
}
