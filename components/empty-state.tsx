"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type LucideIcon } from 'lucide-react';

export function EmptyState({ icon: Icon, title, description, className = '', }: {
    icon: LucideIcon;
    title: string;
    description?: string;
    className?: string;
}) {
    return (<div className={`flex flex-col items-center justify-center gap-2 py-8 px-4 text-center ${className}`}>
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-hover text-text-primary">
        <Icon size={20} strokeWidth={1.5}/>
      </div>
      <div className="type-detail-emphasized text-text-primary">{title}</div>
      {description && (<div className="type-detail text-text-secondary max-w-[280px]">{description}</div>)}
    </div>);
}
