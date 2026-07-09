import { notFound } from "next/navigation";

/** Any unmatched path within a locale renders the localized 404 page. */
export default function CatchAllPage() {
  notFound();
}
