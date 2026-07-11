"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";

type CopyButtonProps = {
  /** The text placed on the clipboard when pressed. */
  value: string;
  /** Accessible label for the idle state, e.g. "Copy email address". */
  copyLabel: string;
  /** Accessible + visible label shown briefly after a successful copy. */
  copiedLabel: string;
  className?: string;
};

/**
 * Small, reliable clipboard button. Unlike `mailto:` this works in every
 * browser regardless of a configured mail client. Uses the async Clipboard
 * API with a legacy `execCommand` fallback for older/insecure contexts, and
 * announces success to assistive tech via `aria-live`.
 */
export function CopyButton({ value, copyLabel, copiedLabel, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for non-secure contexts / older browsers.
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? copiedLabel : copyLabel}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium",
        "text-muted transition-colors hover:bg-surface-subtle hover:text-ink",
        "focus-visible:outline-none",
        copied && "text-emerald-500",
        className,
      )}
    >
      <Icon aria-hidden className="size-4" />
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  );
}
