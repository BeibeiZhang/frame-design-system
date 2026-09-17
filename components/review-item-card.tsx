"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { AlertTriangle, ChevronRight, FileText, type LucideIcon, Mail, Ticket } from 'lucide-react';

const REVIEW_TYPE_ICONS: Record<string, LucideIcon> = {
    Document: FileText,
    Tickets: Ticket,
    Email: Mail,
    Error: AlertTriangle,
};

export function ReviewItemCard({ title, type, time, done = false, icon, interactive = false, }: {
    title: string;
    source?: string;
    type: string;
    time: string;
    done?: boolean;
    icon?: LucideIcon;
    interactive?: boolean;
}) {
    const Icon = icon ?? REVIEW_TYPE_ICONS[type] ?? FileText;
    return (<div className={`px-5 py-4 flex items-center gap-3.5 transition-all ${done ? 'opacity-50' : ''}`}>
      <Icon size={22} strokeWidth={1.75} className="text-text-primary shrink-0 icon-theme"/>
      <div className="flex-1 min-w-0">
        <div className={`type-detail-emphasized text-text-primary ${done ? 'line-through' : ''}`}>
          {title}
        </div>
        <div className="type-detail text-text-primary mt-1">
          {type} · {time}
        </div>
      </div>
      {interactive && <ChevronRight size={16} className="text-text-primary shrink-0"/>}
    </div>);
}
