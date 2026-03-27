"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DynamicTracingBeam = dynamic(
  () => import("@/components/ui/tracing-beam").then((module) => module.TracingBeam),
  { ssr: false },
);

type SmartTracingBeamProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SmartTracingBeam({
  children,
  className,
}: SmartTracingBeamProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const timer = window.setTimeout(() => setReady(true), 150);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return <DynamicTracingBeam className={className}>{children}</DynamicTracingBeam>;
}
