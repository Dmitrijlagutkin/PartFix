import { siteConfig } from "@/shared/constants/site";
import { cn } from "@/shared/lib/cn";

/** Wordmark with a small geometric monogram. Pure SVG/CSS — no image request. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-7 text-brand-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
        <path d="m3 7 9 5 9-5" />
        <path d="M12 12v10" />
      </svg>
      <span className="text-lg">{siteConfig.name}</span>
    </span>
  );
}
