"use client";

import Image from "next/image";
import { useState } from "react";
import {
  HERO_LAYER_REV,
  layerSrc,
  useNarrowViewport,
} from "@/lib/heroLayerAssets";

const LAYER12_DESKTOP = "object-cover object-center";
const LAYER12_MOBILE_VERTICAL =
  "object-cover object-[center_38%] bg-[#e8ded1]";
const LAYER12_MOBILE_FALLBACK =
  "object-contain object-center bg-[#e8ded1]";

/**
 * Compact layered blueprint strip for blog layout — same assets / vibe as the homepage hero,
 * without scroll-driven animation.
 */
export default function BlogBlueprintBanner() {
  const narrow = useNarrowViewport();
  const [mobileVerticalFailed, setMobileVerticalFailed] = useState(false);

  const layer12Class =
    narrow && mobileVerticalFailed
      ? LAYER12_MOBILE_FALLBACK
      : narrow
        ? LAYER12_MOBILE_VERTICAL
        : LAYER12_DESKTOP;

  const srcL1 =
    narrow && !mobileVerticalFailed
      ? layerSrc("layer1-mobile.jpeg")
      : layerSrc("layer1.jpeg");
  const srcL2 =
    narrow && !mobileVerticalFailed
      ? layerSrc("layer2-mobile.jpeg")
      : layerSrc("layer2.jpeg");

  const onMobileLayerError = () => setMobileVerticalFailed(true);

  return (
    <div
      className="relative w-full h-28 sm:h-32 md:h-40 rounded-xl overflow-hidden border border-[#1e1e28] bg-[#060608] shadow-[0_0_0_1px_rgba(255,24,0,0.08)]"
      aria-hidden
    >
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none max-md:opacity-30 md:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse,transparent 40%,rgba(6,6,8,0.45) 100%)",
        }}
      />

      <div className="absolute inset-0 z-0 bg-[#e8ded1] md:bg-[#060608]" />

      <div className="absolute inset-0 z-[3]">
        <div className="absolute inset-0 z-[10]">
          <div className="relative h-full w-full min-h-0">
            <Image
              key={`blog-l1-${narrow ? "n" : "w"}-${mobileVerticalFailed ? "fb" : "v"}-${HERO_LAYER_REV}`}
              src={srcL1}
              alt=""
              fill
              className={layer12Class}
              sizes="(max-width: 768px) 100vw, 560px"
              onError={
                narrow && !mobileVerticalFailed ? onMobileLayerError : undefined
              }
            />
          </div>
        </div>
        <div className="absolute inset-0 z-[20] opacity-[0.9]">
          <div className="relative h-full w-full min-h-0">
            <Image
              key={`blog-l2-${narrow ? "n" : "w"}-${mobileVerticalFailed ? "fb" : "v"}-${HERO_LAYER_REV}`}
              src={srcL2}
              alt=""
              fill
              className={layer12Class}
              sizes="(max-width: 768px) 100vw, 560px"
              onError={
                narrow && !mobileVerticalFailed ? onMobileLayerError : undefined
              }
            />
          </div>
        </div>
      </div>

      <div className="absolute top-2 left-0 right-0 z-[30] flex items-center justify-center gap-2 pointer-events-none px-2">
        <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#FF1800]/45 shrink-0" />
        <span className="text-[6px] sm:text-[7px] tracking-[0.45em] uppercase text-[#FF1800]/75 font-mono">
          Blog
        </span>
        <div className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#FF1800]/45 shrink-0" />
      </div>
    </div>
  );
}
