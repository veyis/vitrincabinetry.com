"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    vitrinGaConfigured?: string;
  }
}

function initializeGtagQueue(gaId: string) {
  if (typeof window === "undefined" || window.vitrinGaConfigured === gaId) return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
  window.gtag("js", new Date());
  window.gtag("config", gaId);
  window.vitrinGaConfigured = gaId;
}

/**
 * DeferredAnalytics — Loads GA4 and optional Clarity only after the first real
 * user interaction (scroll, pointerdown, or keydown), keeping third-party JS
 * off the critical mobile LCP window.
 */
export default function DeferredAnalytics({
  gaId,
  clarityId,
}: {
  gaId?: string;
  clarityId?: string;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!gaId && !clarityId) return;

    if (gaId) {
      initializeGtagQueue(gaId);
    }

    const events = ["scroll", "pointerdown", "keydown"] as const;
    const enable = () => setShouldLoad(true);

    events.forEach((event) => {
      window.addEventListener(event, enable, { once: true, passive: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, enable);
      });
    };
  }, [gaId, clarityId]);

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      {gaId && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="lazyOnload"
        />
      )}
      {clarityId && (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}
