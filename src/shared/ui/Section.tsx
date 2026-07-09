import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Subtle background tint, useful for alternating sections. */
  tone?: "default" | "subtle";
  /** Renders a plain section with no inner Container when false. */
  bare?: boolean;
  "aria-labelledby"?: string;
  children: ReactNode;
};

/** Vertical rhythm wrapper for page sections. */
export function Section({
  id,
  className,
  containerClassName,
  tone = "default",
  bare = false,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24 lg:py-28", tone === "subtle" && "bg-surface-subtle", className)}
      {...rest}
    >
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
