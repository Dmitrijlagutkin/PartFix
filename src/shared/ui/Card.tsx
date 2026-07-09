import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type CardProps = {
  as?: ElementType;
  className?: string;
  /** Adds a hover elevation — only use for interactive cards. */
  interactive?: boolean;
  children: ReactNode;
};

/** Rounded, softly-shadowed surface used for feature/service/step cards. */
export function Card({ as: Tag = "div", className, interactive = false, children }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8",
        interactive && "transition-shadow hover:shadow-card",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
