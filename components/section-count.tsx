"use client";

// Frame component source. Keep the accompanying LICENSE and frame.css.


export function SectionCount({ n }: {
    n: number;
}) {
    return (<span className="type-caption px-2 py-0.5 rounded-[4px] bg-bg-hover text-text-primary">
      {n}
    </span>);
}
