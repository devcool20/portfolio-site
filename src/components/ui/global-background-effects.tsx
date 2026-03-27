"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DynamicBackgroundBeams = dynamic(
  () =>
    import("@/components/ui/background-beams").then(
      (module) => module.BackgroundBeams,
    ),
  { ssr: false },
);

export default function GlobalBackgroundEffects() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const browserWindow = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const prefersReducedMotion = browserWindow.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isDesktop = browserWindow.innerWidth >= 1024;

    if (prefersReducedMotion || !isDesktop) {
      return;
    }

    const enableEffects = () => setShouldRender(true);

    if (typeof browserWindow.requestIdleCallback === "function") {
      const idleId = browserWindow.requestIdleCallback(enableEffects);
      return () => browserWindow.cancelIdleCallback?.(idleId);
    }

    const timer = browserWindow.setTimeout(enableEffects, 250);
    return () => browserWindow.clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <DynamicBackgroundBeams className="opacity-45" />
    </div>
  );
}
