"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_LAYER_REV, layerSrc, useNarrowViewport } from "@/lib/heroLayerAssets";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { label: "ABOUT", section: "about" },
  { label: "SKILLS", section: "skills" },
  { label: "PROJECTS", section: "projects" },
  { label: "EXP", section: "experience" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", section: "contact" },
];

/** Desktop: wide landscape art, full-bleed. */
const LAYER12_DESKTOP = "object-cover object-center";
/**
 * Mobile + 9:16 vertical assets (`layer1-mobile.jpeg` / `layer2-mobile.jpeg`): full screen, car in frame.
 * `object-position` nudges composition — tweak 30–45% if needed.
 */
const LAYER12_MOBILE_VERTICAL =
  "object-cover object-[center_38%] bg-[#e8ded1]";
/** Mobile + wide assets only: contain + parchment letterboxing so the car is never cropped. */
const LAYER12_MOBILE_FALLBACK =
  "object-contain object-center bg-[#e8ded1]";

const LAYER3_IMG = "object-cover object-center";

export default function BlueprintHero({
  onNavigate,
}: {
  onNavigate?: (s: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  /** Camera zoom — must apply to the whole stack, not layer1 alone, or layers drift apart. */
  const layerStackRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer2GlowRef = useRef<HTMLDivElement>(null);
  const layer3GlowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [navDone, setNavDone] = useState(false);
  const narrow = useNarrowViewport();
  /** If vertical mobile assets fail to load, use wide layers + contain (aligned stack). */
  const [mobileVerticalFailed, setMobileVerticalFailed] = useState(false);

  const layer12Class =
    narrow && mobileVerticalFailed
      ? LAYER12_MOBILE_FALLBACK
      : narrow
        ? LAYER12_MOBILE_VERTICAL
        : LAYER12_DESKTOP;

  const srcL1 =
    narrow && !mobileVerticalFailed ? layerSrc("layer1-mobile.jpeg") : layerSrc("layer1.jpeg");
  const srcL2 =
    narrow && !mobileVerticalFailed ? layerSrc("layer2-mobile.jpeg") : layerSrc("layer2.jpeg");

  const onMobileLayerError = () => setMobileVerticalFailed(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = window as unknown as { lenis?: { destroy?: () => void } | null };
    if (w.lenis) {
      try {
        w.lenis?.destroy?.();
      } catch {}
      w.lenis = null;
    }

    const ctx = gsap.context(() => {
      const ease = "sine.inOut";
      const easeOut = "power2.out";
      const zoomPeak =
        typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
          ? 1.03
          : 1.065;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          onUpdate: (st) => {
            const p = st.progress;
            setNavDone(p >= 0.77);
          },
        },
      });

      gsap.set(layer1Ref.current, {
        opacity: 1,
        scale: 1.035,
        filter: "brightness(0.9) saturate(0.92) contrast(1.04)",
      });
      gsap.set(layer2Ref.current, {
        opacity: 0,
        scale: 1.055,
        filter: "blur(18px) brightness(1.18) saturate(1.12)",
      });
      gsap.set(layer3Ref.current, {
        opacity: 0,
        scale: 1.035,
        filter: "blur(24px) brightness(1.22) saturate(1.08)",
      });
      gsap.set([layer2GlowRef.current, layer3GlowRef.current], { opacity: 0 });

      // ── State 0 (0–10%): only layer 1; subtle scene depth idle ──
      tl.fromTo(
        sceneRef.current,
        { rotateX: 0, transformPerspective: 1200 },
        { rotateX: 2.2, duration: 0.12, ease },
        0,
      );
      tl.to(
        layer1Ref.current,
        {
          scale: 1,
          filter: "brightness(1) saturate(1) contrast(1)",
          duration: 0.18,
          ease,
        },
        0,
      );

      // ── State 1 (10–40%): layer 2 fades in; “camera” pushes to 1.05 on base art ──
      tl.fromTo(
        layer2Ref.current,
        { opacity: 0, scale: 1.055, filter: "blur(18px) brightness(1.18) saturate(1.12)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px) brightness(1.03) saturate(1.04)",
          duration: 0.34,
          ease,
        },
        0.12,
      );
      tl.to(
        layer1Ref.current,
        {
          opacity: 0.74,
          filter: "brightness(0.96) saturate(0.96) contrast(1.02)",
          duration: 0.3,
          ease,
        },
        0.14,
      );
      tl.fromTo(
        layer2GlowRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 0.55, scale: 1.06, duration: 0.16, ease: "power2.out" },
        0.15,
      );
      tl.to(
        layer2GlowRef.current,
        { opacity: 0, scale: 1.12, duration: 0.2, ease: "power1.inOut" },
        0.31,
      );
      tl.fromTo(
        layerStackRef.current,
        { scale: 1, transformOrigin: "50% 50%" },
        { scale: zoomPeak, duration: 0.28, ease },
        0.12,
      );
      tl.fromTo(
        sceneRef.current,
        { rotateX: 2.2 },
        { rotateX: 0.9, duration: 0.34, ease },
        0.12,
      );

      // ── State 2 (50–80%): layer 3 in; zoom back to 1 (full blueprint + driver) ──
      tl.fromTo(
        layer3Ref.current,
        { opacity: 0, scale: 1.035, filter: "blur(24px) brightness(1.22) saturate(1.08)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px) brightness(1) saturate(1)",
          duration: 0.32,
          ease,
        },
        0.5,
      );
      tl.to(
        layer2Ref.current,
        {
          opacity: 0.84,
          filter: "blur(0px) brightness(0.99) saturate(0.98)",
          duration: 0.28,
          ease,
        },
        0.52,
      );
      tl.to(
        layer1Ref.current,
        {
          opacity: 0.58,
          filter: "brightness(0.92) saturate(0.92)",
          duration: 0.28,
          ease,
        },
        0.52,
      );
      tl.fromTo(
        layer3GlowRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 0.42, scale: 1.05, duration: 0.15, ease: "power2.out" },
        0.56,
      );
      tl.to(
        layer3GlowRef.current,
        { opacity: 0, scale: 1.12, duration: 0.22, ease: "power1.inOut" },
        0.68,
      );
      tl.fromTo(
        layerStackRef.current,
        { scale: zoomPeak },
        { scale: 1.01, duration: 0.34, ease },
        0.5,
      );
      tl.fromTo(
        sceneRef.current,
        { rotateX: 0.9 },
        { rotateX: 0, duration: 0.34, ease },
        0.5,
      );

      tl.fromTo(
        nameRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, duration: 0.15, ease: easeOut },
        0.5,
      );

      // ── State 3 (~77%+): nav when layer3 ≥ ~90% opacity; stagger from edges ──
      tl.fromTo(
        ".bhero-btn",
        { opacity: 0, y: 36, x: (i: number) => (i % 2 === 0 ? -28 : 28) },
        {
          opacity: 1,
          y: 0,
          x: 0,
          stagger: { each: 0.06, from: "center" },
          duration: 0.22,
          ease: easeOut,
        },
        0.77,
      );

      gsap.to(hintRef.current, {
        opacity: 0,
        y: -10,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "15% top",
          scrub: 0.4,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [narrow]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [narrow, mobileVerticalFailed]);

  const handleClick = (s: (typeof SECTIONS)[0]) => {
    if ("href" in s && s.href) {
      window.location.assign(s.href);
      return;
    }
    if (s.section && onNavigate) {
      onNavigate(s.section);
    } else if (s.section) {
      document.getElementById(s.section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full hero-hero"
      style={{ height: "300vh" }}
    >
      <input
        type="hidden"
        id="hero-nav-toggle"
        data-active={navDone ? "true" : "false"}
      />

      <div
        className="sticky top-0 h-[100dvh] min-h-screen w-full overflow-hidden bg-[#e8ded1] md:bg-[#060608] relative"
        style={{ perspective: "min(1400px, 120vw)" }}
      >
        <div
          className="absolute inset-0 z-[50] pointer-events-none"
          style={{
            opacity: 0.035,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div
          className="absolute inset-0 z-[45] pointer-events-none max-md:opacity-40 md:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse,transparent 25%,rgba(6,6,8,0.35) 100%)",
          }}
        />

        <div className="absolute top-5 left-0 right-0 z-[40] flex items-center justify-center gap-3 pointer-events-none px-2">
          <div className="h-px w-8 sm:w-12 md:w-20 bg-gradient-to-r from-transparent to-[#FF1800]/50 shrink-0" />
          <span className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.5em] uppercase text-[#FF1800]/60 font-mono whitespace-nowrap">
            Blueprint
          </span>
          <div className="h-px w-8 sm:w-12 md:w-20 bg-gradient-to-l from-transparent to-[#FF1800]/50 shrink-0" />
        </div>

        <div
          ref={sceneRef}
          className="absolute inset-0 z-[5] h-full w-full overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Single stack: shared transforms keep all layers pixel-locked */}
          <div
            ref={layerStackRef}
            className="absolute inset-0 h-full w-full min-h-0 will-change-transform"
            style={{ transformOrigin: "50% 50%" }}
          >
            <div className="absolute inset-0 z-[10] h-full w-full min-h-0 overflow-hidden">
              <div
                ref={layer1Ref}
                className="relative h-full min-h-0 w-full will-change-[transform,filter,opacity]"
              >
                <Image
                  key={`l1-${narrow ? "m" : "d"}-${mobileVerticalFailed ? "fb" : "v"}-${HERO_LAYER_REV}`}
                  src={srcL1}
                  alt="Blueprint base"
                  fill
                  className={layer12Class}
                  priority
                  quality={90}
                  sizes="100vw"
                  onError={narrow && !mobileVerticalFailed ? onMobileLayerError : undefined}
                />
              </div>
            </div>

            <div
              ref={layer2Ref}
              className="absolute inset-0 z-[20] h-full w-full min-h-0 overflow-hidden"
              style={{ opacity: 0, willChange: "transform, filter, opacity" }}
            >
              <div className="relative h-full min-h-0 w-full">
                <Image
                  key={`l2-${narrow ? "m" : "d"}-${mobileVerticalFailed ? "fb" : "v"}-${HERO_LAYER_REV}`}
                  src={srcL2}
                  alt="Blueprint technicals"
                  fill
                  className={layer12Class}
                  quality={90}
                  sizes="100vw"
                  onError={narrow && !mobileVerticalFailed ? onMobileLayerError : undefined}
                />
              </div>
            </div>
            <div
              ref={layer2GlowRef}
              className="absolute inset-0 z-[24] pointer-events-none"
              style={{
                opacity: 0,
                background:
                  "radial-gradient(circle at 50% 48%, rgba(255,240,220,0.28) 0%, rgba(255,24,0,0.12) 24%, rgba(255,24,0,0) 62%)",
                mixBlendMode: "screen",
                filter: "blur(34px)",
              }}
            />

            <div
              ref={layer3Ref}
              className="absolute inset-0 z-[30] h-full w-full min-h-0 overflow-hidden"
              style={{ opacity: 0, willChange: "transform, filter, opacity" }}
            >
              <div className="relative h-full min-h-0 w-full">
                <Image
                  key={`l3-${HERO_LAYER_REV}`}
                  src={layerSrc("layer3.jpeg")}
                  alt="Driver"
                  fill
                  className={LAYER3_IMG}
                  quality={90}
                  sizes="100vw"
                />
              </div>
            </div>
            <div
              ref={layer3GlowRef}
              className="absolute inset-0 z-[34] pointer-events-none"
              style={{
                opacity: 0,
                background:
                  "radial-gradient(circle at 50% 52%, rgba(255,250,245,0.24) 0%, rgba(255,84,38,0.12) 22%, rgba(255,24,0,0) 58%)",
                mixBlendMode: "screen",
                filter: "blur(40px)",
              }}
            />
          </div>
        </div>

        <div
          ref={nameRef}
          className="absolute bottom-10 sm:bottom-12 md:bottom-16 left-0 right-0 z-[35] flex flex-col items-center pointer-events-none px-4"
        >
          <p className="text-[8px] sm:text-[9px] font-mono tracking-[0.4em] uppercase text-[#FF1800]/70 mb-1">
            Full-Stack Engineer
          </p>
          <h1 className="section-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#FF1800]/70 leading-tight tracking-tight text-center">
            Divyanshu Sharma
          </h1>
        </div>

        <div
          className="absolute bottom-8 sm:bottom-10 md:bottom-14 left-0 right-0 z-[40] flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 px-3 sm:px-4 md:px-8"
          style={{ pointerEvents: navDone ? "auto" : "none" }}
        >
          {SECTIONS.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => handleClick(s)}
              className={`bhero-btn rounded border px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[6px] sm:text-[7px] md:text-[9px] font-mono uppercase tracking-[0.3em] opacity-0
                border-[#FF1800]/40 text-gray-200/90 bg-[#0a0a10]/85 backdrop-blur-sm
                hover:border-[#FF1800] hover:text-white hover:bg-[#FF1800]/12 hover:shadow-[0_0_12px_rgba(255,24,0,0.18)]
                active:scale-95 cursor-pointer
                ${navDone ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          ref={hintRef}
          className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-[50] flex flex-col items-center pointer-events-none"
        >
          <span className="text-[6px] sm:text-[7px] md:text-[8px] tracking-[0.3em] uppercase text-gray-500 font-mono">
            Scroll to reveal
          </span>
          <div className="mt-1.5 sm:mt-2 w-3 sm:w-3.5 md:w-4 h-4 sm:h-5 md:h-6 rounded-full border border-gray-700 flex justify-center pt-0.5 sm:pt-1">
            <div
              className="w-0.5 h-1 sm:h-1.5 rounded-full bg-[#FF1800] animate-bounce"
              style={{ animationDuration: "1.5s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
