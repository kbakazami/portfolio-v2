import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SectionHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)] sm:text-sm">
        // {label}
      </span>
      <h2 className="font-mono text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
