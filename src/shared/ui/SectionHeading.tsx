import { cn } from "@/shared/lib/cn";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Consistent eyebrow + title + description block for section headers. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2
        id={id}
        className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-relaxed text-muted text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
