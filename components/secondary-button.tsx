"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode } from 'react';

export function SecondaryButton({ children, onClick, disabled, type = 'button', className: extra = '', fullWidth, }: {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    fullWidth?: boolean;
}) {
    return (<button type={type} onClick={onClick} disabled={disabled} className={`inverted-btn h-[48px] flex items-center justify-center px-5 rounded-[4px] type-detail-emphasized cursor-pointer disabled:opacity-40 ${fullWidth ? 'w-full' : ''} ${extra}`}>
      {children}
    </button>);
}
