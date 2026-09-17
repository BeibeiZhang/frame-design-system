"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { Check } from 'lucide-react';

export function StepIndicator({ status }: {
    status: 'done' | 'in-progress' | 'pending';
}) {
    if (status === 'done') {
        return <Check size={14} className="text-text-primary shrink-0"/>;
    }
    if (status === 'in-progress') {
        return (<div className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: 'var(--color-text-primary)' }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-text-primary)' }}/>
      </div>);
    }
    return <div className="w-3.5 h-3.5 rounded-full border-2 shrink-0" style={{ borderColor: 'var(--color-stroke-outline)' }}/>;
}
