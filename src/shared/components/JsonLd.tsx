/**
 * Renders a JSON-LD structured-data script. JSON-LD requires raw HTML
 * injection; the payload is always app-controlled (never user input).
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data);
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: app-controlled JSON-LD payload
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
