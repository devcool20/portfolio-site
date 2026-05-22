"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis with GSAP ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    // Disable lag smoothing in GSAP to keep them in sync
    gsap.ticker.lagSmoothing(0);

    // Expose lenis globally for page-level navigation
    (window as unknown as { lenis: Lenis | null }).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      if ((window as unknown as { lenis: Lenis | null }).lenis === lenis) {
        (window as unknown as { lenis: Lenis | null }).lenis = null;
      }
    };
  }, []);

  return null;
}
