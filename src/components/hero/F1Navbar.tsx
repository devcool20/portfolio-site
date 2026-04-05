"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
];

export default function F1Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      for (const item of [...navItems].reverse().filter((n) => !n.href.startsWith("/"))) {
        const el = document.getElementById(item.href.replace("#", ""));
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(item.href.replace("#", ""));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(6,6,8,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,24,0,0.15)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-2 h-2 rounded-full bg-[#FF1800] shadow-[0_0_8px_#FF1800] transition-shadow group-hover:shadow-[0_0_16px_#FF1800]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-gray-400 transition-colors group-hover:text-white">
            DS
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isBlog = item.href.startsWith("/");
            const isActive = !isBlog && activeSection === item.href.replace("#", "");
            return (
              <Link
                key={item.label}
                href={item.href}
                className="f1-nav-link relative"
                style={{
                  color: isActive ? "#FF1800" : undefined,
                }}
              >
                {item.label}
                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-[#FF1800] shadow-[0_0_6px_#FF1800]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger - simple version */}
        <div className="md:hidden flex items-center gap-4">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[9px] font-mono tracking-[0.15em] uppercase text-gray-500 hover:text-[#FF1800] transition-colors"
            >
              {item.label.slice(0, 3)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
