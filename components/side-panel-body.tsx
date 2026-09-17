"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode } from 'react';

export function SidePanelBody({ children }: {
    children: ReactNode;
}) {
    return (<div className="flex-1 overflow-y-auto min-h-0 px-3 pb-6 flex flex-col gap-4 scrollbar-autohide">
      {children}
    </div>);
}
