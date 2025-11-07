'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divyanshu-sharma-b9b534113/" },
  { label: "X (Twitter)", href: "https://x.com/dshxrmx" },
  { label: "Instagram", href: "https://instagram.com/d1vyanshu_sharma" },
  { label: "Email", href: "mailto:sharmadivyanshu265@gmail.com" },
  { label: "GitHub", href: "https://github.com/devcool20" },
  { label: "Leetcode", href: "https://leetcode.com/u/devcool20/" },
];

const projects = [
  {
    title: "projectF1",
    subtitle: "F1 community app",
    description:
      "A formula 1 community app that allows users to create and share their views on the ongoing season and get all the latest stuff about the season. Also provides a platform to know about screening events, merchandise, and world championship standings. Built using react native and expo.",
    href: "https://projectfone.vercel.app/",
  },
  {
    title: "Sales Doc",
    subtitle: "Sales call analysis and recommendations",
    description:
      "A web app that analyzes sales calls and provides recommendations for the sales team. Built using Next.js and RL-based machine learning model.",
    href: "https://salesdoc.vercel.app/",
  },
  {
    title: "Stocker",
    subtitle: "Stock market sentiment analysis",
    description:
      "A Mobile app that analyzes stock market sentiment using news articles and social media posts. Built using React Native and machine learning model.",
    href: "https://github.com/devcool20/stocker",
  },
];

const tabs = [
  { id: "about", label: "about" },
  { id: "projects", label: "projects" },
];

function NavTabs({
  activeTab,
  onChange,
}: {
  activeTab: string;
  onChange: (value: string) => void;
}) {
  return (
    <nav className="flex flex-row gap-6 text-sm text-[#8d857a] md:flex-col md:text-base">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`nav-tab relative px-3 py-1 lowercase transition-colors ${
              isActive ? "text-[#2f2822]" : "hover:text-[#2f2822]"
            }`}
            aria-pressed={isActive}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

function AboutSection() {
  return (
    <section className="grid gap-12 text-[#8d857a] md:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] md:items-start">
      <div className="space-y-6 text-sm leading-7 md:text-base md:leading-[1.85]">
        <p>
          22. Application Developer and creator of{" "}
          <Link
            className="project-link underline decoration-[#cfc5b9] decoration-2 underline-offset-4"
            href="https://projectfone.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            projectF1
          </Link>
          — building the ultimate experience for formula 1 fans.
        </p>
        <p>
          I worked as a mobile application developer intern
          {" "}at{" "}
          <Link
            className="project-link underline decoration-[#cfc5b9] decoration-2 underline-offset-4"
            href="http://www.zingvel.com/"
            target="_blank"
            rel="noreferrer"
          >
            ZingVel
          </Link>
          .
        </p>
        <p>
          I am a dedicated full-stack engineer who thrives on creating impactful and
          useful products. I approach development with a focus on both technical
          pragmatism and meticulous craft.
        </p>
        <p>
          I have a strong command over building both mobile and web
          applications. Furthermore, I possess valuable knowledge in
          integrating and deploying Machine Learning models to enhance product
          functionality, as seen in my project work.
        </p>
        <p>
          In my free time, you&apos;ll find me playing badminton, watching Formula 1 races
          on the weekends, and reading about philosophical content.
        </p>
        <p>
          You can find me on{" "}
          {socials.map((social, index) => {
            const isLast = index === socials.length - 1;
            const isSecondToLast = index === socials.length - 2;
            return (
              <span key={social.label}>
                <Link
                  className="project-link underline decoration-[#cfc5b9] decoration-2 underline-offset-4"
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {social.label}
                </Link>
                {!isLast && (isSecondToLast ? ", or " : ", ")}
              </span>
            );
          })}
          .
        </p>
      </div>
      <div className="relative mx-auto aspect-3/4 w-full max-w-xs">
        <Image
          src="https://drive.google.com/uc?export=view&id=1awyg5jF4I3RfhfNGVYUjPkN0FpwAKGvj"
          alt="Portrait"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 240px, 320px"
        />
        <span className="pointer-events-none absolute" />
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="space-y-16 text-[#8d857a]">
      {projects.map((project) => (
        <div key={project.title} className="space-y-3">
          <Link
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="project-link inline-flex items-center gap-2 text-lg font-medium text-black no-underline decoration-none md:text-xl"
            style={{ textDecoration: 'none', color: '#000000' }}
          >
            <span>{project.title}</span>
            <span aria-hidden className="text-xl">
              ↗
            </span>
          </Link>
          <p className="text-sm font-small uppercase tracking-[0.1em] text-[#a39990]">
            {project.subtitle}
          </p>
          <p className="max-w-2xl text-sm leading-7 text-[#9c9187] md:text-base md:leading-7">
            {project.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("about");

  return (
    <div className="min-h-screen bg-[#fbf7f2] px-6 py-16 text-[#2f2822] md:px-10 lg:px-16">
      <div className="flex w-full max-w-5xl flex-col gap-16 md:flex-row md:items-start md:gap-28">
        <aside className="sticky top-16 self-start md:w-40 md:flex-none">
          <NavTabs activeTab={activeTab} onChange={setActiveTab} />
        </aside>
        <main className="flex-1 overflow-hidden">
          {activeTab === "about" ? <AboutSection /> : <ProjectsSection />}
        </main>
      </div>
    </div>
  );
}
