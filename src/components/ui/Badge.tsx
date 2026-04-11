import type { HTMLAttributes } from "react";

import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "category";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  category?: ProjectCategory;
}

const BASE_CLASSES =
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] leading-none sm:text-xs";

const VARIANT_CLASSES: Record<Exclude<BadgeVariant, "category">, string> = {
  default: "border-border bg-bg-tertiary text-text-secondary",
  accent:
    "border-[color:var(--accent-primary)]/30 bg-[color:var(--accent-primary)]/10 text-[color:var(--accent-primary)]",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

const CATEGORY_CLASSES: Record<ProjectCategory, string> = {
  pro: "border-[color:var(--accent-primary)]/30 bg-[color:var(--accent-primary)]/10 text-[color:var(--accent-primary)]",
  perso:
    "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400",
  lab: "border-amber-500/30 bg-amber-500/10 text-amber-400",
};

export function Badge({
  variant = "default",
  category,
  className,
  children,
  ...props
}: BadgeProps) {
  const variantClasses =
    variant === "category" && category
      ? CATEGORY_CLASSES[category]
      : VARIANT_CLASSES[variant === "category" ? "default" : variant];

  return (
    <span className={cn(BASE_CLASSES, variantClasses, className)} {...props}>
      {children}
    </span>
  );
}
