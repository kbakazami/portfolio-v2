"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg font-sans font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)] disabled:cursor-not-allowed disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "text-white shadow-[0_8px_24px_-12px_rgba(59,130,246,0.6)] [background:var(--accent-gradient)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(59,130,246,0.7)] active:translate-y-0",
  outline:
    "border border-border bg-transparent text-text-primary hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)]",
  ghost:
    "bg-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      asChild = false,
      leftIcon,
      rightIcon,
      className,
      children,
      type,
      ...props
    },
    ref,
  ) {
    const classes = cn(
      BASE_CLASSES,
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      className,
    );

    const content = (
      <>
        {leftIcon ? (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}
        <span className="inline-flex items-center">{children}</span>
        {rightIcon ? (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </>
    );

    if (asChild) {
      const child = Children.only(children) as ReactElement<{
        className?: string;
        children?: ReactNode;
      }>;

      if (!isValidElement(child)) {
        return null;
      }

      return cloneElement(child, {
        className: cn(classes, child.props.className),
        children: (
          <>
            {leftIcon ? (
              <span className="inline-flex shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            ) : null}
            <span className="inline-flex items-center">
              {child.props.children}
            </span>
            {rightIcon ? (
              <span className="inline-flex shrink-0" aria-hidden="true">
                {rightIcon}
              </span>
            ) : null}
          </>
        ),
      });
    }

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  },
);
