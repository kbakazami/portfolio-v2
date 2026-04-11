"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type AnimatedTextProps = {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

export function AnimatedText({
  texts,
  className,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1500,
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || texts.length === 0) return;

    const current = texts[index % texts.length];

    if (!isDeleting && display === current) {
      const timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timer);
    }

    if (isDeleting && display === "") {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setDisplay((prev) =>
          isDeleting
            ? current.substring(0, prev.length - 1)
            : current.substring(0, prev.length + 1),
        );
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timer);
  }, [
    display,
    isDeleting,
    index,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    shouldReduceMotion,
  ]);

  if (shouldReduceMotion) {
    return <span className={className}>{texts[0] ?? ""}</span>;
  }

  return (
    <span className={className}>
      {display}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block animate-pulse text-[color:var(--accent-primary)]"
      >
        |
      </span>
    </span>
  );
}
