"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * HeroVideo — Renders an instant priority poster `<Image>` as the LCP element on
 * both mobile and desktop, then progressively loads and fades in the desktop
 * ambient MP4 only after hydration/idle when viewport >= 900px and motion is allowed.
 */
export default function HeroVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const [shouldMountVideo, setShouldMountVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setShouldMountVideo(true);
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(activate, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = globalThis.setTimeout(activate, 1200);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!shouldMountVideo) return;
    const el = videoRef.current;
    if (!el) return;
    el.load();
    void el.play().catch(() => {});
  }, [shouldMountVideo]);

  return (
    <>
      <Image
        src={poster}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="hero__image"
      />
      {shouldMountVideo && (
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  );
}
