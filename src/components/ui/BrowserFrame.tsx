import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface BrowserFrameProps extends HTMLAttributes<HTMLDivElement> {
  url?: string;
  children: ReactNode;
}

export function BrowserFrame({
  url,
  children,
  className,
  ...props
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-bg-secondary shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3 border-b border-border bg-bg-tertiary px-3 py-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="w-full max-w-xs truncate rounded-md border border-border bg-bg-primary px-3 py-1 text-center font-mono text-[10px] text-text-secondary sm:text-xs">
            {url ?? "localhost:3000"}
          </div>
        </div>
        <div className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="relative bg-bg-primary">{children}</div>
    </div>
  );
}
