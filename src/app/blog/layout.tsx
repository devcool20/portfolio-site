"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tabs } from "@/lib/data";
import FlagLogo from "@/components/ui/FlagLogo";

gsap.registerPlugin(ScrollTrigger);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".blog-note-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="blog-slate min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto border-b border-[#111111]/10 pb-6 mb-8">
        <Link href="/" className="blog-home-link flex items-center gap-2 group decoration-transparent">
          <span>Divyanshu Sharma</span>
          <FlagLogo size={16} className="text-[#111111] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
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

