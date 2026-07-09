"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MEDIA = "pointer-events-none absolute inset-0 -z-20 size-full object-cover";

type Connection = { saveData?: boolean; effectiveType?: string };

/**
 * Decorative hero background, tuned for Core Web Vitals:
 *
 * - LCP: the poster is an optimized, `priority` <Image> that is always present,
 *   so the largest paint is a fast, correctly-sized image — never the 6 MB video.
 * - CLS: both layers are `absolute inset-0` inside the fixed-height hero, so
 *   nothing reflows; the video only cross-fades in (opacity), never resizes.
 * - INP / data: the video is mounted on idle (never competing with hydration or
 *   LCP) and is skipped entirely for `prefers-reduced-motion`, Data Saver, and
 *   slow (2g) connections. Skipping autoplay also keeps us clear of WCAG 2.2.2.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: Connection }).connection;
    if (reduce || conn?.saveData || (conn?.effectiveType && /(^|-)2g/.test(conn.effectiveType))) {
      return;
    }

    // Defer the video until the browser is idle so it never blocks LCP.
    let cancelled = false;
    const start = () => {
      if (!cancelled) setShowVideo(true);
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }
    const id = window.setTimeout(start, 800);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);

  return (
    <>
      <Image
        aria-hidden
        alt=""
        src={poster}
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover"
      />
      {showVideo ? (
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setReady(true)}
          className={`${MEDIA} transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}
