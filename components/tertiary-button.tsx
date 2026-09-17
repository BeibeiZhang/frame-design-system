"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode } from 'react';

export function TertiaryButton({ children, onClick, disabled, type = 'button', className: extra = '', fullWidth, }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    fullWidth?: boolean;
}) {
    return (<button type={type} onClick={onClick} disabled={disabled} className={`h-[48px] flex items-center justify-center px-5 rounded-[4px] border border-stroke-outline text-text-primary type-detail-emphasized cursor-pointer chip-gradient-hover transition-colors disabled:opacity-40 ${fullWidth ? 'w-full' : ''} ${extra}`}>
      {children}
    </button>);
}
