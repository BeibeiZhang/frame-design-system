"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { Clock } from 'lucide-react';
import { type ReactNode } from 'react';

export function SummaryFooter({ children }: {
    children: ReactNode;
}) {
    return (<div className="flex items-center justify-end gap-1.5 py-1.5 type-detail text-text-primary">
      <Clock size={12}/>
      <span>{children}</span>
    </div>);
}
