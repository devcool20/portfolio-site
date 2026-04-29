"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tabs } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".slate-line").forEach((line) => {
        gsap.fromTo(line, { "--write": 0 }, {
          "--write": 1,
          duration: 0.75,
          ease: "power1.out",
          scrollTrigger: {
            trigger: line,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".slate-gif-frame").forEach((gif) => {
        gsap.fromTo(
          gif,
          { opacity: 0, y: 28, rotate: -5, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            rotate: -1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gif,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="slate-track blog-slate min-h-screen">
      <div className="slate-top-note">
        <Link href="/" className="blog-home-link">
          Clean Slate
        </Link>
        <nav className="blog-slate-nav" aria-label="Site sections">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.id === "blog" ? "/blog" : `/#${tab.id}`}
              aria-current={tab.id === "blog" ? "page" : undefined}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <main className="blog-slate-main">{children}</main>
    </div>
  );
}
