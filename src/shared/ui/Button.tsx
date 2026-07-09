import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors " +
  "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-soft",
  secondary: "bg-panel text-white hover:bg-panel/90 shadow-soft",
  outline: "border border-border bg-surface text-ink hover:bg-surface-subtle",
  ghost: "text-ink hover:bg-surface-subtle",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

/**
 * Class-only variant helper so the same styling can be applied to a
 * `<button>`, an `<a>`, or the locale-aware `<Link>` without prop drilling.
 */
export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />;
}
