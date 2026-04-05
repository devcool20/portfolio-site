"use client";

import React, { Suspense } from "react";
import NavTabs from "@/components/NavTabs";
import SmartTracingBeam from "@/components/ui/smart-tracing-beam";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#060608] text-gray-300">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-4 py-8 sm:px-6 md:flex-row md:gap-0 md:px-8 md:py-10 lg:px-12">
        <aside className="mb-10 shrink-0 border-b border-[#1e1e28] pb-8 md:mb-0 md:w-48 md:border-b-0 md:border-r md:border-[#1e1e28]/90 md:pb-0 md:pr-8 lg:w-52 lg:pr-10">
          <div className="md:sticky md:top-10">
            <Suspense fallback={<div className="h-24 w-32 animate-pulse rounded bg-[#131318]" />}>
              <NavTabs activeTab="blog" isHome={false} />
            </Suspense>
          </div>
        </aside>

        <main className="min-w-0 flex-1 md:border-l md:border-[#1e1e28]/80 md:pl-8 lg:pl-12">
          <SmartTracingBeam className="pl-0">{children}</SmartTracingBeam>
        </main>
      </div>
    </div>
  );
}
