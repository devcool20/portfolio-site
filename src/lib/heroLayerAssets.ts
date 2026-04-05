import { useSyncExternalStore } from "react";

/**
 * Bump via `.env.local`: NEXT_PUBLIC_HERO_LAYER_REV=3 when replacing files in `public/layer/`.
 */
export const HERO_LAYER_REV = process.env.NEXT_PUBLIC_HERO_LAYER_REV ?? "2";

export type LayerFile =
  | "layer1.jpeg"
  | "layer2.jpeg"
  | "layer3.jpeg"
  | "layer1-mobile.jpeg"
  | "layer2-mobile.jpeg";

export function layerSrc(filename: LayerFile) {
  return `/layer/${filename}?v=${encodeURIComponent(HERO_LAYER_REV)}`;
}

export function useNarrowViewport() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
}
