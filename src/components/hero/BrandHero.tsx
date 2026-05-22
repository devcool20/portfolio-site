"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import FlagLogo from "@/components/ui/FlagLogo";
import PillButton from "@/components/ui/PillButton";

type BrandHeroProps = {
  onNavigate?: (s: string) => void;
};

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Open Source", id: "open-source" },
  { label: "Experience", id: "experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", id: "contact" },
];

export default function BrandHero({ onNavigate }: BrandHeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBgRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (item: typeof NAV_ITEMS[0]) => {
    setIsMenuOpen(false);
    if (item.href) return; // Standard link to blog

    if (item.id) {
      if (onNavigate) {
        onNavigate(item.id);
      } else {
        const el = document.getElementById(item.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    if (!menuRef.current || !menuBgRef.current || !linksRef.current) return;

    if (isMenuOpen) {
      // Disable body scroll when menu is open
      document.body.style.overflow = "hidden";
      const lenis = (window as unknown as { lenis: { stop: () => void } | null }).lenis;
      if (lenis) {
        lenis.stop();
      }

      // Open Animation
      gsap.killTweensOf([menuRef.current, menuBgRef.current, ".menu-nav-link"]);
      
      gsap.set(menuRef.current, { display: "block" });
      
      gsap.timeline()
        .fromTo(
          menuBgRef.current,
          { clipPath: "circle(0% at 100% 0%)" },
          { clipPath: "circle(150% at 100% 0%)", duration: 0.65, ease: "power3.inOut" }
        )
        .fromTo(
          ".menu-nav-link",
          { opacity: 0, y: 30, rotate: 2 },
          { opacity: 1, y: 0, rotate: 0, stagger: 0.05, duration: 0.45, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          ".menu-close-btn",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
          "-=0.3"
        );
    } else {
      // Re-enable scroll
      document.body.style.overflow = "";
      const lenis = (window as unknown as { lenis: { start: () => void } | null }).lenis;
      if (lenis) {
        lenis.start();
      }

      // Close Animation
      gsap.timeline({
        onComplete: () => {
          gsap.set(menuRef.current, { display: "none" });
        }
      })
      .to(".menu-nav-link", { opacity: 0, y: -20, stagger: 0.03, duration: 0.25, ease: "power2.in" })
      .to(menuBgRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.5,
        ease: "power3.inOut"
      }, "-=0.15");
    }
  }, [isMenuOpen]);

  // Clean up body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-between px-6 py-4 md:px-10 md:py-6 bg-[#F7F8F4]">
      {/* Top Header Navigation */}
      <header className="w-full flex items-center justify-end z-40 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <PillButton
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick({ label: "Projects", id: "projects" });
            }}
            variant="lime"
            className="hidden sm:inline-flex"
          >
            View my work
          </PillButton>

          {/* Circle Burger Button */}
          <button
            onClick={toggleMenu}
            className="w-12 h-12 rounded-full border-2 border-[#111111] bg-white flex flex-col items-center justify-center gap-1.5 hover:bg-[#B1FC54] hover:shadow-[3px_3px_0_0_rgba(17,17,17,1)] active:scale-95 transition-all duration-200"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <span className="w-5 h-0.5 bg-[#111111] rounded-full" />
            <span className="w-5 h-0.5 bg-[#111111] rounded-full" />
          </button>
        </div>
      </header>

      {/* Main Hero Display Area */}
      <main className="flex-grow flex flex-col justify-center items-center text-center max-w-4xl mx-auto py-8 md:py-16">
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] leading-none text-[#111111] font-display uppercase tracking-tight select-none mb-6">
          Divyanshu Sharma
        </h1>

        {/* F1 Lights SVG just below it */}
        <div className="w-full max-w-[420px] px-4 my-2">
          <Image src="/f1-lights.svg" alt="F1 lights telemetry" width={420} height={112} className="w-full h-auto" priority />
        </div>
      </main>

      {/* Hero Bottom Footer Indicators */}
      <footer className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#111111]/40 border-t border-[#111111]/10 pt-4 max-w-7xl mx-auto">
        <span>Divyanshu Sharma &copy; 2026</span>
        <div className="flex items-center gap-1 sm:gap-2">
          <span>Scroll to explore</span>
          <span>↓</span>
        </div>
      </footer>

      {/* Slide-out Overlay Menu Drawer */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-50 pointer-events-none hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Full-screen Dark Green BG */}
        <div
          ref={menuBgRef}
          className="absolute inset-0 bg-[#0B2519] pointer-events-auto"
          style={{ clipPath: "circle(0% at 100% 0%)" }}
        >
          <div className="w-full h-full flex flex-col justify-between px-6 py-6 md:px-12 md:py-8">
            {/* Menu Header */}
            <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
              <span className="flex items-center gap-2 font-display text-xl sm:text-2xl md:text-3xl tracking-widest text-[#B1FC54] uppercase select-none">
                <span>Menu</span>
                <FlagLogo size={20} className="text-[#B1FC54]" />
              </span>

              {/* Close Button */}
              <button
                onClick={toggleMenu}
                className="menu-close-btn w-12 h-12 rounded-full border-2 border-[#B1FC54] bg-[#0B2519] flex items-center justify-center hover:bg-[#B1FC54] hover:text-[#0B2519] active:scale-95 transition-all duration-200 text-[#B1FC54] text-lg font-bold"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links Grid */}
            <div
              ref={linksRef}
              className="flex-grow min-h-0 overflow-y-auto flex flex-col justify-start items-start max-w-7xl mx-auto w-full py-6 my-2 scrollbar-none"
            >
              <nav className="flex flex-col gap-3 sm:gap-4 md:gap-5 align-left text-left w-full py-4 my-auto pl-0">
                {NAV_ITEMS.map((item, index) => {
                  const labelMarkup = (
                    <span className="menu-nav-link inline-block font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-none text-[#B1FC54] uppercase hover:text-white transition-colors duration-200 cursor-pointer select-none">
                      <span className="font-sans text-[0.35em] font-extrabold opacity-40 mr-[0.5em] relative -top-[0.1em]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                  );

                  if (item.href) {
                    return (
                      <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                        {labelMarkup}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleLinkClick(item)}
                      className="text-left bg-transparent border-none p-0 cursor-pointer outline-none"
                    >
                      {labelMarkup}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#B1FC54]/60 border-t border-[#B1FC54]/10 pt-6 max-w-7xl mx-auto gap-4">
              <span>Made in 2026. Design inspired by Propaganda.</span>
              <div className="flex gap-4">
                <a href="https://github.com/devcool20" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/divyanshu-sharma-b9b534113/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="mailto:sharmadivyanshu265@gmail.com" className="hover:text-white transition-colors">Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
