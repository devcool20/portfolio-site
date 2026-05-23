"use client";

import Link from "next/link";
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

  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Auto-scroll to #about at 6.5s (when lights go out)
    const scrollTimer = setTimeout(() => {
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const lenis = (window as unknown as { lenis: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void } | null }).lenis;
        if (lenis) {
          lenis.scrollTo(aboutEl, { offset: -24 });
        } else {
          aboutEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 6500);

    // 2. Entrance Animation: Motion Blur Focus
    if (nameRef.current) {
      gsap.fromTo(
        nameRef.current,
        { filter: "blur(20px)", opacity: 0, scale: 0.95 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.2, delay: 0.2, ease: "power3.out" }
      );
    }

    return () => clearTimeout(scrollTimer);
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
        {/* F1 Split-Horizon Speed Shear Text */}
        <div
          ref={nameRef}
          className="group/hero-name relative inline-block cursor-pointer select-none mb-6 max-w-full overflow-visible"
        >
          {/* Invisible placeholder for sizing */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] leading-none text-[#111111] font-display uppercase tracking-tight opacity-0 pointer-events-none select-none whitespace-nowrap">
            DIVYANSHU SHARMA
          </h1>

          {/* Top Half Slice */}
          <div className="absolute top-0 left-0 w-full h-[50%] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero-name:-translate-x-3 select-none pointer-events-none">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] leading-none text-[#111111] font-display uppercase tracking-tight whitespace-nowrap transition-[text-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero-name:[text-shadow:-1px_0_2px_rgba(225,6,0,0.4),1px_0_2px_rgba(177,252,84,0.4)]">
              DIVYANSHU SHARMA
            </h1>
          </div>

          {/* Bottom Half Slice */}
          <div className="absolute bottom-0 left-0 w-full h-[50%] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero-name:translate-x-3 select-none pointer-events-none">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] leading-none text-[#111111] font-display uppercase tracking-tight whitespace-nowrap transition-[text-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero-name:[text-shadow:-1px_0_2px_rgba(225,6,0,0.4),1px_0_2px_rgba(177,252,84,0.4)]"
              style={{ transform: "translateY(-50%)" }}
            >
              DIVYANSHU SHARMA
            </h1>
          </div>

          {/* Glowing Split F1 Red Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#E10600] scale-x-0 group-hover/hero-name:scale-x-100 origin-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_12px_#E10600] pointer-events-none" />
        </div>

        {/* F1 Lights SVG just below it */}
        <div className="w-full max-w-[420px] px-4 my-2">
          <svg viewBox="0 0 600 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <defs>
              <filter id="red-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="green-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <style>{`
              @keyframes f1-l1 {
                0%, 12.5% { fill: #220505; filter: none; }
                12.6%, 81.25% { fill: #FF0D00; filter: url(#red-glow); }
                81.26%, 100% { fill: #220505; filter: none; }
              }
              @keyframes f1-l2 {
                0%, 25% { fill: #220505; filter: none; }
                25.1%, 81.25% { fill: #FF0D00; filter: url(#red-glow); }
                81.26%, 100% { fill: #220505; filter: none; }
              }
              @keyframes f1-l3 {
                0%, 37.5% { fill: #220505; filter: none; }
                37.6%, 81.25% { fill: #FF0D00; filter: url(#red-glow); }
                81.26%, 100% { fill: #220505; filter: none; }
              }
              @keyframes f1-l4 {
                0%, 50% { fill: #220505; filter: none; }
                50.1%, 81.25% { fill: #FF0D00; filter: url(#red-glow); }
                81.26%, 100% { fill: #220505; filter: none; }
              }
              @keyframes f1-l5 {
                0%, 62.5% { fill: #220505; filter: none; }
                62.6%, 81.25% { fill: #FF0D00; filter: url(#red-glow); }
                81.26%, 100% { fill: #220505; filter: none; }
              }
              @keyframes text-anim {
                0%, 81.25% { opacity: 0.1; fill: #555; }
                81.26%, 99% { opacity: 1; fill: #00FF66; filter: url(#green-glow); }
                100% { opacity: 0.1; fill: #555; }
              }
              .f1-l1-light { animation: f1-l1 8s infinite; }
              .f1-l2-light { animation: f1-l2 8s infinite; }
              .f1-l3-light { animation: f1-l3 8s infinite; }
              .f1-l4-light { animation: f1-l4 8s infinite; }
              .f1-l5-light { animation: f1-l5 8s infinite; }
              .f1-race-text {
                font-family: var(--font-display), Impact, sans-serif;
                font-weight: 700;
                font-size: 20px;
                letter-spacing: 2px;
                text-transform: uppercase;
                animation: text-anim 8s infinite;
              }
            `}</style>

            {/* Telemetry Details on Gantry */}
            <text x="50" y="25" fill="#E10600" fontFamily="monospace" fontSize="9" letterSpacing="1">LIVE TELEMETRY</text>
            <text x="550" y="25" fill="#8B949E" fontFamily="monospace" fontSize="9" letterSpacing="1" textAnchor="end">ENG REV // V10.2</text>

            {/* Gantry Structure */}
            {/* Horizontal Main Beam */}
            <rect x="50" y="38" width="500" height="10" rx="2" fill="none" stroke="#30363D" strokeWidth="1"/>
            {/* Structure Lines (Truss) */}
            <line x1="80" y1="38" x2="100" y2="48" stroke="#30363D" strokeWidth="1"/>
            <line x1="120" y1="38" x2="140" y2="48" stroke="#30363D" strokeWidth="1"/>
            <line x1="180" y1="38" x2="200" y2="48" stroke="#30363D" strokeWidth="1"/>
            <line x1="220" y1="38" x2="240" y2="48" stroke="#30363D" strokeWidth="1"/>
            <line x1="280" y1="38" x2="300" y2="48" stroke="#30363D" strokeWidth="1"/>
            <line x1="320" y1="38" x2="340" y2="48" stroke="#30363D" strokeWidth="1"/>
            <line x1="380" y1="38" x2="400" y2="48" stroke="#30363D" strokeWidth="1"/>
            <line x1="420" y1="38" x2="440" y2="48" stroke="#30363D" strokeWidth="1"/>
            <line x1="480" y1="38" x2="500" y2="48" stroke="#30363D" strokeWidth="1"/>

            {/* Light Units hanging from gantry */}
            {/* Unit 1 */}
            <line x1="180" y1="48" x2="180" y2="58" stroke="#30363D" strokeWidth="2"/>
            <rect x="160" y="58" width="40" height="52" rx="4" fill="none" stroke="#30363D" strokeWidth="1"/>
            <circle cx="180" cy="71" r="9" className="f1-l1-light" fill="#220505" stroke="#000" strokeWidth="1"/>
            <circle cx="180" cy="95" r="9" className="f1-l1-light" fill="#220505" stroke="#000" strokeWidth="1"/>

            {/* Unit 2 */}
            <line x1="240" y1="48" x2="240" y2="58" stroke="#30363D" strokeWidth="2"/>
            <rect x="220" y="58" width="40" height="52" rx="4" fill="none" stroke="#30363D" strokeWidth="1"/>
            <circle cx="240" cy="71" r="9" className="f1-l2-light" fill="#220505" stroke="#000" strokeWidth="1"/>
            <circle cx="240" cy="95" r="9" className="f1-l2-light" fill="#220505" stroke="#000" strokeWidth="1"/>

            {/* Unit 3 */}
            <line x1="300" y1="48" x2="300" y2="58" stroke="#30363D" strokeWidth="2"/>
            <rect x="280" y="58" width="40" height="52" rx="4" fill="none" stroke="#30363D" strokeWidth="1"/>
            <circle cx="300" cy="71" r="9" className="f1-l3-light" fill="#220505" stroke="#000" strokeWidth="1"/>
            <circle cx="300" cy="95" r="9" className="f1-l3-light" fill="#220505" stroke="#000" strokeWidth="1"/>

            {/* Unit 4 */}
            <line x1="360" y1="48" x2="360" y2="58" stroke="#30363D" strokeWidth="2"/>
            <rect x="340" y="58" width="40" height="52" rx="4" fill="none" stroke="#30363D" strokeWidth="1"/>
            <circle cx="360" cy="71" r="9" className="f1-l4-light" fill="#220505" stroke="#000" strokeWidth="1"/>
            <circle cx="360" cy="95" r="9" className="f1-l4-light" fill="#220505" stroke="#000" strokeWidth="1"/>

            {/* Unit 5 */}
            <line x1="420" y1="48" x2="420" y2="58" stroke="#30363D" strokeWidth="2"/>
            <rect x="400" y="58" width="40" height="52" rx="4" fill="none" stroke="#30363D" strokeWidth="1"/>
            <circle cx="420" cy="71" r="9" className="f1-l5-light" fill="#220505" stroke="#000" strokeWidth="1"/>
            <circle cx="420" cy="95" r="9" className="f1-l5-light" fill="#220505" stroke="#000" strokeWidth="1"/>

            {/* Live Race Text */}
            <text x="300" y="138" className="f1-race-text" textAnchor="middle">LIGHTS OUT AND AWAY WE GO!</text>
          </svg>
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
              <span>.</span>
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
