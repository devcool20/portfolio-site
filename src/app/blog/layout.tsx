"use client";

import React, { Suspense } from "react";
import HeaderSection from "@/components/HeaderSection";
import NavTabs from "@/components/NavTabs";
import SmartTracingBeam from "@/components/ui/smart-tracing-beam";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-6 py-16 text-[#2f2822] md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <HeaderSection />

        <div className="flex w-full flex-col gap-16 md:flex-row md:items-start md:gap-28">
          <aside className="md:sticky md:top-16 self-start md:w-40 md:flex-none">
            <Suspense fallback={<div />}>
              <NavTabs activeTab="blog" isHome={false} />
            </Suspense>
          </aside>
          <main className="flex-1 overflow-visible" style={{ minWidth: 0 }}>
            <SmartTracingBeam className="pl-10 md:pl-12">{children}</SmartTracingBeam>
          </main>
        </div>
      </div>
    </div>
  );
}
