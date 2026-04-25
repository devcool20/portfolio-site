"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmartTracingBeam from "@/components/ui/smart-tracing-beam";
import BlogBlueprintBanner from "@/components/blog/BlogBlueprintBanner";
import { tabs } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const enterOnce = { toggleActions: "play none none none" as const };

      gsap.utils.toArray<HTMLElement>(".blog-reveal").forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: index * 0.03,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 90%", ...enterOnce },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="blog-shell min-h-screen text-gray-300">
      <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6 md:px-8">
        <div className="blog-layout-grid">
          <aside className="blog-sidebar-column">
            <div className="telemetry-panel blog-sidebar-panel blog-reveal">
              <div className="blog-sidebar-copy">
                <p className="section-label">Pit Wall</p>
                <h2 className="panel-title">Field Notes</h2>
                <p className="panel-copy">
                  Dispatches, build logs, and longer notes from the same world as the homepage.
                </p>
              </div>

              <div className="blog-sidebar-banner">
                <BlogBlueprintBanner />
              </div>

              <nav className="blog-side-nav" aria-label="Site sections">
                {tabs.map((tab) => {
                  const href = tab.id === "blog" ? "/blog" : `/?tab=${tab.id}`;
                  const isActive = tab.id === "blog";
                  return (
                    <Link
                      key={tab.id}
                      href={href}
                      className={`blog-side-link ${isActive ? "active" : ""}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span className="blog-side-link-dot" />
                      <span>{tab.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="blog-main-column">
            <SmartTracingBeam className="blog-content-shell">
              {children}
            </SmartTracingBeam>
          </main>
        </div>
      </div>
    </div>
  );
}
