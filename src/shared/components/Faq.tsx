import { Plus } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  items: FaqItem[];
};

/**
 * Accordion built on native `<details>`/`<summary>` — fully keyboard
 * accessible and requires zero client-side JavaScript.
 */
export function Faq({ items }: FaqProps) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-medium transition-colors hover:bg-surface-subtle [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <Plus
              aria-hidden
              className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <div className="px-6 pb-6 text-muted leading-relaxed">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
