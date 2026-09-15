"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.
import { type ReactNode, useLayoutEffect, useRef } from 'react';

export function ChatPanel({ header, messages, input, }: {
    header?: ReactNode;
    messages: ReactNode;
    input: ReactNode;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const lastHeightRef = useRef(0);
    useLayoutEffect(() => {
        const el = scrollRef.current;
        if (!el)
            return;
        const grew = el.scrollHeight > lastHeightRef.current;
        const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
        if (grew && nearBottom) {
            el.scrollTop = el.scrollHeight;
        }
        lastHeightRef.current = el.scrollHeight;
    });
    return (<div className="flex-1 flex flex-col min-w-0 min-h-0 h-full">
      {header && (<div className="shrink-0 px-4 sm:px-8 pt-4 pb-3">
          <div className="max-w-[863px] mx-auto w-full">{header}</div>
        </div>)}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 scrollbar-autohide">
        <div className="max-w-[863px] mx-auto w-full px-4 sm:px-8 py-6 flex flex-col gap-4">
          {messages}
        </div>
      </div>
      <div className="shrink-0 px-4 sm:px-8 pt-2 pb-6">
        <div className="max-w-[863px] mx-auto w-full">{input}</div>
      </div>
    </div>);
}
