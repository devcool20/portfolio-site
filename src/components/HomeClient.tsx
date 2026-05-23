"use client";

import Link from "next/link";
import BrandHero from "@/components/hero/BrandHero";
import LinkPreview from "@/components/ui/LinkPreview";
import PillButton from "@/components/ui/PillButton";
import type { GitHubContributionData, GitHubPullRequest } from "@/lib/github";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SlateAction = {
  label: string;
  href?: string;
  target?: string;
};

type SlateProject = {
  title: string;
  href: string;
  previewImage?: string;
  note: string;
};

type SlateSectionData = {
  id: string;
  number: string;
  label: string;
  title: string;
  kicker: string;
  lines?: string[];
  projects?: SlateProject[];
  openSource?: true;
  actions?: SlateAction[];
};

const slateSections: SlateSectionData[] = [
  {
    id: "about",
    number: "01",
    label: "About",
    title: "Divyanshu Sharma",
    kicker: "Full-stack product builder, F1 obsessive, and maker of useful interfaces.",
    lines: [
      "I build web and mobile products with a bias for clean interaction, sharp systems, and real users.",
      "I have started contributing to open source by picking up real issues in unfamiliar codebases, writing tests, fixing edge cases, and pushing through review.",
      "My favorite work lives where product taste, engineering depth, and speed sit at the same table.",
      "Outside the editor: Formula 1 weekends, badminton, and long philosophical rabbit holes.",
    ],
    actions: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/divyanshu-sharma-b9b534113/" },
      { label: "GitHub", href: "https://github.com/devcool20" },
      { label: "Email", href: "mailto:sharmadivyanshu265@gmail.com" },
    ],
  },
  {
    id: "skills",
    number: "02",
    label: "Skills",
    title: "Things I Reach For",
    kicker: "A compact toolbox for shipping products that feel alive.",
    lines: [
      "Frontend: React, Next.js, React Native, TypeScript, animation-heavy product interfaces.",
      "Backend: Node.js, FastAPI, Python, Kafka, real-time flows, API design, and service glue.",
      "Data and infra: PostgreSQL, MongoDB, Docker, AWS, and ML integrations when they earn their place.",
    ],
    actions: [
      { label: "Open Projects", target: "projects" },
      { label: "Open Source", target: "open-source" },
      { label: "Open Experience", target: "experience" },
    ],
  },
  {
    id: "projects",
    number: "03",
    label: "Projects",
    title: "Selected Projects",
    kicker: "A collection of web applications, protocols, and developer tools.",
    projects: [
      {
        title: "projF1",
        href: "https://projf1.online/",
        previewImage: "/preview-projects/projf1.png",
        note: "A Formula 1 weekend command center with race context, predictions, community, and live fan surfaces.",
      },
      {
        title: "Loql",
        href: "https://loql.in/",
        previewImage: "/preview-projects/loql.png",
        note: "A neighborhood rental marketplace built around trust, nearby discovery, and QR handshakes.",
      },
      {
        title: "ProofEstate",
        href: "https://proof-estate.vercel.app/",
        previewImage: "/preview-projects/proofestate.png",
        note: "A Solana real-estate tokenization protocol for verified fractional ownership and yield rails.",
      },
      {
        title: "Sales Doc",
        href: "https://salesdoc.vercel.app/",
        previewImage: "/preview-projects/salesdoc.png",
        note: "A sales-call analysis product that turns conversations into recommendations for teams.",
      },
      {
        title: "FinStream",
        href: "https://github.com/devcool20/fin-stream",
        previewImage: "/preview-projects/finstream.png",
        note: "A real-time financial news stream with Kafka, sentiment analysis, and WebSocket delivery.",
      },
    ],
  },
  {
    id: "open-source",
    number: "04",
    label: "Open Source",
    title: "PR Pit Wall",
    kicker: "Live public pull requests from GitHub, cached hourly and arranged like a review board.",
    openSource: true,
    actions: [
      {
        label: "Full PR Search",
        href: "https://github.com/search?q=is%3Apr+author%3Adevcool20+is%3Apublic&type=pullrequests",
      },
      { label: "GitHub Profile", href: "https://github.com/devcool20" },
    ],
  },
  {
    id: "experience",
    number: "05",
    label: "Experience",
    title: "Work Timeline",
    kicker: "Two chapters, both product-heavy, both built under real constraints.",
    lines: [
      "Co-Founder at Loql, August 2025 - Present: building a local peer-to-peer rental marketplace.",
      "Software Developer Intern at Zingvel Travels, December 2024 - May 2025: shipped product UX and AI travel features.",
      "The through-line is simple: find the messy workflow, make it understandable, then make it fast.",
    ],
    actions: [
      { label: "Visit Loql", href: "https://loql.in/" },
      { label: "Visit Zingvel", href: "http://www.zingvel.com/" },
    ],
  },
];

const githubSearchUrl =
  "https://github.com/search?q=is%3Apr+author%3Adevcool20+is%3Apublic&type=pullrequests";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function statusLabel(pr: GitHubPullRequest) {
  if (pr.status === "merged") return "Merged";
  if (pr.status === "closed") return "Closed";
  return "Open";
}

function getRepoName(repo: string) {
  const [, name = repo] = repo.split("/");
  return name;
}

function groupPullRequests(prs: GitHubPullRequest[]) {
  const groups = new Map<string, GitHubPullRequest[]>();

  for (const pr of prs) {
    const key = pr.repo;
    const existing = groups.get(key);
    if (existing) {
      existing.push(pr);
    } else {
      groups.set(key, [pr]);
    }
  }

  return Array.from(groups.entries()).map(([repo, items]) => ({
    repo,
    repoName: getRepoName(repo),
    items: [...items].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ),
  }));
}

const defaultVisiblePullRequests = 1;

function formatPrCount(count: number) {
  return `${count} ${count === 1 ? "PR" : "PRs"}`;
}

function OpenSourceLedger({ contributions }: { contributions: GitHubContributionData }) {
  const [expandedRepos, setExpandedRepos] = useState<Set<string>>(() => new Set());
  const groupedPrs = groupPullRequests(contributions.prs);
  
  const stats = [
    { label: "Public PRs", value: contributions.summary.total, color: "var(--card-peach)" },
    { label: "Merged", value: contributions.summary.merged, color: "var(--card-yellow)" },
    { label: "Open", value: contributions.summary.open, color: "var(--card-lavender)" },
    { label: "Repos", value: contributions.summary.uniqueRepos, color: "var(--card-mint)" },
  ];

  const toggleRepo = (repo: string) => {
    setExpandedRepos((current) => {
      const next = new Set(current);
      if (next.has(repo)) {
        next.delete(repo);
      } else {
        next.add(repo);
      }
      return next;
    });
  };

  const renderRepoCard = (group: typeof groupedPrs[0]) => {
    const isExpanded = expandedRepos.has(group.repo);
    const visibleCount = isExpanded ? group.items.length : defaultVisiblePullRequests;
    const visibleItems = group.items.slice(0, visibleCount);
    const hiddenCount = group.items.length - visibleItems.length;

    return (
      <div
        className="bg-white border-2 border-[#111111] rounded-[20px] p-4 sm:p-5 flex flex-col gap-3 shadow-[4px_4px_0_0_rgba(17,17,17,1)] w-full"
        key={group.repo}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#111111]/10 pb-3">
          <div>
            <span className="font-body text-[9px] font-bold uppercase tracking-wider text-[#111111]/50">Repository</span>
            <h4 className="font-display text-lg sm:text-xl text-[#111111] uppercase leading-none mt-1">
              {group.repoName}
            </h4>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-[#111111] bg-[#B1FC54]/20 font-body text-[9px] font-extrabold uppercase tracking-wider text-[#111111] select-none">
            {formatPrCount(group.items.length)}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {visibleItems.map((pr) => {
            const statusColors = {
              merged: "bg-[#B1FC54] text-[#111111]",
              closed: "bg-[#FFEAE1] text-[#111111]",
              open: "bg-[#FFF5A9] text-[#111111]",
            };

            return (
              <div
                key={pr.url}
                className="border border-[#111111]/10 rounded-xl p-3 bg-gray-50/50 hover:bg-[#B1FC54]/5 transition-colors duration-200"
              >
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-normal tracking-wide text-[#111111]/50 mb-1.5">
                  <span className="text-[#111111]/65">{pr.repo}</span>
                  <span>•</span>
                  <span>#{pr.number}</span>
                  <span>•</span>
                  <span>{formatDate(pr.createdAt)}</span>
                </div>

                <h5 className="font-body text-xs sm:text-sm font-normal text-[#111111] hover:text-[#B1FC54] transition-colors leading-snug mb-2.5">
                  <Link href={pr.url} target="_blank" rel="noreferrer">
                    {pr.title}
                  </Link>
                </h5>

                <div className="flex items-center gap-2.5 text-[10px] font-normal tracking-wide text-[#111111]/50">
                  <span className={`inline-flex px-1.5 py-0.5 rounded border border-[#111111] font-bold uppercase text-[9px] leading-none select-none ${statusColors[pr.status as "merged" | "closed" | "open"] || "bg-white"}`}>
                    {statusLabel(pr)}
                  </span>
                  <span>{pr.comments} comments</span>
                  <span>{pr.authorAssociation.toLowerCase()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {group.items.length > defaultVisiblePullRequests ? (
          <button
            type="button"
            className="self-start text-[9px] font-bold uppercase tracking-wider text-[#111111] hover:text-[#B1FC54] transition-colors mt-1"
            aria-expanded={isExpanded}
            onClick={() => toggleRepo(group.repo)}
          >
            {isExpanded ? "Show less" : `+${hiddenCount} more PRs`}
          </button>
        ) : null}
      </div>
    );
  };

  if (contributions.prs.length === 0) {
    return (
      <div className="bg-white border-2 border-[#111111] rounded-[20px] p-6 shadow-[4px_4px_0_0_rgba(17,17,17,1)] gsap-reveal">
        <p className="font-body text-base text-[#111111]/80 mb-4">
          GitHub contribution telemetry is taking a pit stop. The live board will retry on the next cached request.
        </p>
        <PillButton href={githubSearchUrl} variant="outline">
          Open GitHub PRs
        </PillButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Telemetry Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 gsap-reveal">
        {stats.map((stat) => (
          <div
            className="border-2 border-[#111111] rounded-2xl p-3 sm:p-4 flex flex-col justify-between min-h-[85px] shadow-[3px_3px_0_0_rgba(17,17,17,1)]"
            style={{ backgroundColor: stat.color }}
            key={stat.label}
          >
            <strong className="font-display text-2xl sm:text-3xl leading-none text-[#111111]">
              {stat.value}
            </strong>
            <span className="font-body text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* PR Cards Bulletin Board */}
      <div className="w-full gsap-reveal">
        {/* Desktop Layout: 2 Independent Columns */}
        <div className="hidden md:grid grid-cols-2 gap-4 w-full items-start">
          <div className="flex flex-col gap-4 w-full">
            {groupedPrs
              .filter((_, idx) => idx % 2 === 0)
              .map((group) => renderRepoCard(group))}
          </div>
          <div className="flex flex-col gap-4 w-full">
            {groupedPrs
              .filter((_, idx) => idx % 2 === 1)
              .map((group) => renderRepoCard(group))}
          </div>
        </div>

        {/* Mobile Layout: 1 Column (Flat Sequential) */}
        <div className="flex md:hidden flex-col gap-4 w-full">
          {groupedPrs.map((group) => renderRepoCard(group))}
        </div>
      </div>
    </div>
  );
}

export default function HomeClient({ contributions }: { contributions: GitHubContributionData }) {
  const rootRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setTimeout(() => {
      const el = document.getElementById(section);
      if (!el) return;
      const lenis = (window as unknown as { lenis: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void } | null }).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -24 });
      } else {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 24,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General section reveal animations
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      // Special cards reveal animations (staggered)
      gsap.utils.toArray<HTMLElement>(".gsap-reveal-cards").forEach((container) => {
        const cards = container.querySelectorAll(".gsap-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
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
    <div ref={rootRef} className="relative min-h-screen bg-[#F7F8F4]">
      {/* Mockup 4 Hero Section */}
      <BrandHero onNavigate={handleNavigate} />

      <main className="w-full bg-[#F7F8F4] overflow-hidden" aria-label="Portfolio content">
        
        {/* 01 / ABOUT SECTION */}
        <section id="about" className="portfolio-section border-t border-[#111111]/10" style={{ backgroundColor: "var(--card-mint)" }}>
          <div className="portfolio-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sticky Label */}
            <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:sticky lg:top-24 select-none">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#111111]/25 leading-none">01</span>
              <h2 className="font-display text-lg sm:text-xl lg:text-2xl text-[#111111] leading-none uppercase tracking-wider">About</h2>
            </div>
            
            {/* Content Area */}
            <div className="lg:col-span-9 flex flex-col gap-6">
              <p className="font-display text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-snug uppercase tracking-tight max-w-4xl gsap-reveal">
                {slateSections[0].kicker}
              </p>
              
              <div className="font-body text-sm sm:text-base text-[#111111]/75 max-w-2xl space-y-4 mt-2 gsap-reveal">
                {slateSections[0].lines?.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>

              {/* Action Pill Buttons */}
              <div className="flex flex-wrap gap-4 mt-6 gsap-reveal">
                {slateSections[0].actions?.map((action) => (
                  <PillButton key={action.label} href={action.href} variant="outline">
                    {action.label}
                  </PillButton>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 / SKILLS SECTION */}
        <section id="skills" className="portfolio-section border-t border-[#111111]/10">
          <div className="portfolio-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sticky Label */}
            <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:sticky lg:top-24 select-none">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#111111]/25 leading-none">02</span>
              <h2 className="font-display text-lg sm:text-xl lg:text-2xl text-[#111111] leading-none uppercase tracking-wider">Skills</h2>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              <div className="gsap-reveal">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-tight mb-2 uppercase">
                  {slateSections[1].title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#111111]/60">
                  {slateSections[1].kicker}
                </p>
              </div>

              {/* Mockup 1 Grid of Pastel Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full gsap-reveal-cards">
                {/* Frontend Card */}
                <div className="gsap-card bg-white border-2 border-[#111111] rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[220px] shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)] hover:bg-[var(--card-peach)] transition-all duration-300">
                  <div>
                    <span className="inline-flex px-2 py-0.5 rounded-full border border-[#111111] bg-white font-body text-[9px] font-bold uppercase tracking-wider text-[#111111] mb-4 select-none">
                      01 / STACK
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-[#111111] leading-none mb-3 uppercase">
                      Frontend
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-[#111111]/85 leading-relaxed font-normal">
                      React, Next.js, React Native, TypeScript, animation-heavy product interfaces.
                    </p>
                  </div>
                </div>

                {/* Backend Card */}
                <div className="gsap-card bg-white border-2 border-[#111111] rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[220px] shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)] hover:bg-[var(--card-yellow)] transition-all duration-300">
                  <div>
                    <span className="inline-flex px-2 py-0.5 rounded-full border border-[#111111] bg-white font-body text-[9px] font-bold uppercase tracking-wider text-[#111111] mb-4 select-none">
                      02 / STACK
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-[#111111] leading-none mb-3 uppercase">
                      Backend
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-[#111111]/85 leading-relaxed font-normal">
                      Node.js, FastAPI, Python, Kafka, real-time flows, API design, and service glue.
                    </p>
                  </div>
                </div>

                {/* Data/Infra Card */}
                <div className="gsap-card bg-white border-2 border-[#111111] rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[220px] shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)] hover:bg-[var(--card-lavender)] transition-all duration-300">
                  <div>
                    <span className="inline-flex px-2 py-0.5 rounded-full border border-[#111111] bg-white font-body text-[9px] font-bold uppercase tracking-wider text-[#111111] mb-4 select-none">
                      03 / STACK
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-[#111111] leading-none mb-3 uppercase">
                      Data & Infra
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-[#111111]/85 leading-relaxed font-normal">
                      PostgreSQL, MongoDB, Docker, AWS, and ML integrations when they earn their place.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons to navigate sections */}
              <div className="flex flex-wrap gap-4 mt-4 gsap-reveal">
                {slateSections[1].actions?.map((action) => (
                  <PillButton
                    key={action.label}
                    onClick={(e) => {
                      e.preventDefault();
                      if (action.target) handleNavigate(action.target);
                    }}
                    variant="outline"
                  >
                    {action.label}
                  </PillButton>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 / PROJECTS SECTION */}
        <section id="projects" className="portfolio-section border-t border-[#111111]/10" style={{ backgroundColor: "var(--card-peach)" }}>
          <div className="portfolio-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sticky Label */}
            <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:sticky lg:top-24 select-none">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#111111]/25 leading-none">03</span>
              <h2 className="font-display text-lg sm:text-xl lg:text-2xl text-[#111111] leading-none uppercase tracking-wider">Projects</h2>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              <div className="gsap-reveal">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-tight mb-2 uppercase">
                  {slateSections[2].title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#111111]/60">
                  {slateSections[2].kicker}
                </p>
              </div>

              {/* Projects Grid with alternating pastel hover background colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full gsap-reveal-cards">
                {slateSections[2].projects?.map((project, idx) => {
                  const pastelColors = [
                    "hover:bg-[var(--card-peach)]",
                    "hover:bg-[var(--card-yellow)]",
                    "hover:bg-[var(--card-lavender)]",
                    "hover:bg-[var(--card-mint)]",
                  ];
                  const hoverColorClass = pastelColors[idx % pastelColors.length];

                  return (
                    <article
                      key={project.title}
                      className={`gsap-card bg-white border-2 border-[#111111] rounded-[20px] p-5 sm:p-6 flex flex-col justify-between min-h-[220px] shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:scale-[1.01] hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)] transition-all duration-300 ${hoverColorClass}`}
                    >
                      <div>
                        <span className="inline-flex px-2 py-0.5 rounded-full border border-[#111111] bg-white font-body text-[9px] font-bold uppercase tracking-wider text-[#111111] mb-4 select-none">
                          PROJECT {String(idx + 1).padStart(2, "0")}
                        </span>
                        {/* Interactive Title with Image Preview */}
                        <h4 className="font-display text-xl sm:text-2xl text-[#111111] leading-none mb-3 uppercase">
                          <LinkPreview
                            className="text-inherit hover:underline decoration-[#111111] decoration-2 underline-offset-4 decoration-transparent hover:decoration-[#111111]"
                            imageSrc={project.previewImage}
                            title={project.title}
                            url={project.href}
                          >
                            {project.title}
                          </LinkPreview>
                        </h4>
                        <p className="font-body text-xs sm:text-sm text-[#111111]/85 leading-relaxed mt-2 font-normal">
                          {project.note}
                        </p>
                      </div>

                      <PillButton href={project.href} variant="outline" className="mt-6 self-start">
                        Open Project
                      </PillButton>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 04 / OPEN SOURCE SECTION */}
        <section id="open-source" className="portfolio-section border-t border-[#111111]/10">
          <div className="portfolio-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sticky Label */}
            <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:sticky lg:top-24 select-none">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#111111]/25 leading-none">04</span>
              <h2 className="font-display text-lg sm:text-xl lg:text-2xl text-[#111111] leading-none uppercase tracking-wider">OSS</h2>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              <div className="gsap-reveal">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-tight mb-2 uppercase">
                  {slateSections[3].title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#111111]/60">
                  {slateSections[3].kicker}
                </p>
              </div>

              {/* Contributions telemetry board */}
              <OpenSourceLedger contributions={contributions} />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 gsap-reveal">
                {slateSections[3].actions?.map((action) => (
                  <PillButton key={action.label} href={action.href} variant="outline">
                    {action.label}
                  </PillButton>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 05 / EXPERIENCE SECTION */}
        <section id="experience" className="portfolio-section border-t border-[#111111]/10" style={{ backgroundColor: "#EFEAFF" }}>
          <div className="portfolio-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sticky Label */}
            <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-3 lg:sticky lg:top-24 select-none">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#111111]/25 leading-none">05</span>
              <h2 className="font-display text-lg sm:text-xl lg:text-2xl text-[#111111] leading-none uppercase tracking-wider">Experience</h2>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 flex flex-col gap-8">
              <div className="gsap-reveal">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-[#111111] leading-tight mb-2 uppercase">
                  {slateSections[4].title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#111111]/60">
                  {slateSections[4].kicker}
                </p>
              </div>

              {/* Experience timeline grid */}
              <div className="grid grid-cols-1 gap-6 w-full gsap-reveal-cards">
                {/* Loql Experience Card */}
                <div className="gsap-card bg-white border-2 border-[#111111] rounded-[20px] p-5 sm:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)] hover:bg-[var(--card-yellow)] transition-all duration-300">
                  <div className="flex-grow">
                    <span className="inline-flex px-2 py-0.5 rounded-full border border-[#111111] bg-white font-body text-[9px] font-bold uppercase tracking-wider text-[#111111] mb-4 select-none">
                      Co-Founder
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-[#111111] leading-none mb-2 uppercase">Loql</h4>
                    <p className="font-body text-xs sm:text-sm text-[#111111]/80 max-w-xl font-normal leading-relaxed">
                      building a local peer-to-peer rental marketplace built around trust, nearby discovery, and QR handshakes.
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end justify-between h-full min-w-[160px] shrink-0 text-left md:text-right gap-4">
                    <span className="font-body text-[9px] font-bold uppercase tracking-wider text-[#111111]/50">
                      August 2025 - Present
                    </span>
                    <PillButton href="https://loql.in/" variant="outline" className="self-start md:self-end">
                      Visit Loql
                    </PillButton>
                  </div>
                </div>

                {/* Zingvel Experience Card */}
                <div className="gsap-card bg-white border-2 border-[#111111] rounded-[20px] p-5 sm:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)] hover:bg-[var(--card-peach)] transition-all duration-300">
                  <div className="flex-grow">
                    <span className="inline-flex px-2 py-0.5 rounded-full border border-[#111111] bg-white font-body text-[9px] font-bold uppercase tracking-wider text-[#111111] mb-4 select-none">
                      Software Developer Intern
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-[#111111] leading-none mb-2 uppercase">Zingvel Travels</h4>
                    <p className="font-body text-xs sm:text-sm text-[#111111]/80 max-w-xl font-normal leading-relaxed">
                      Shipped production travel booking UX flow and custom AI travel planning helpers.
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end justify-between h-full min-w-[160px] shrink-0 text-left md:text-right gap-4">
                    <span className="font-body text-[9px] font-bold uppercase tracking-wider text-[#111111]/50">
                      Dec 2024 - May 2025
                    </span>
                    <PillButton href="http://www.zingvel.com/" variant="outline" className="self-start md:self-end">
                      Visit Zingvel
                    </PillButton>
                  </div>
                </div>

                {/* Through-line Summary Card */}
                <div className="gsap-card bg-white border-2 border-[#111111] rounded-[20px] p-5 sm:p-6 flex flex-col justify-between shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)] hover:bg-[var(--card-lavender)] transition-all duration-300">
                  <div>
                    <span className="inline-flex px-2 py-0.5 rounded-full border border-[#111111] bg-white font-body text-[9px] font-bold uppercase tracking-wider text-[#111111] mb-4 select-none">
                      Philosophy
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-[#111111] leading-none mb-3 uppercase">
                      Core Philosophy
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-[#111111]/85 leading-relaxed font-normal italic">
                      &quot;{slateSections[4].lines?.[2]}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 / CONTACT & REDESIGNED MINIMAL FOOTER SECTION */}
        <section id="contact" className="w-full bg-[#0B2519] pt-20 pb-24 px-6 md:pt-32 md:pb-36 md:px-12 relative flex flex-col justify-between overflow-hidden min-h-[75vh] md:min-h-[80vh]">
          {/* Main CTA */}
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center py-16 md:py-24">
            <h2 className="font-display text-[#B1FC54] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] uppercase tracking-tight select-none mb-8 max-w-2xl">
              Ready to build something that hits different?
            </h2>
            <PillButton href="mailto:sharmadivyanshu265@gmail.com" variant="white">
              Get in touch
            </PillButton>
          </div>

          {/* Redesigned Minimal Footer Panel */}
          <div className="w-full border-t border-[#B1FC54]/10 pt-12 mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-[#F7F8F4]">
            {/* Left Column: Branding and Copyright */}
            <div className="md:col-span-5 flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-2">
                <span className="font-display text-3xl text-[#B1FC54] tracking-wider uppercase select-none">
                  Divyanshu Sharma
                </span>
                <span className="font-body text-[11px] text-[#F7F8F4]/60 font-normal tracking-wide block">
                  Full-stack product builder // F1 obsessive
                </span>
              </div>
              <div className="font-body text-[10px] text-[#F7F8F4]/40 font-normal tracking-wide flex flex-col gap-1.5 mt-2">
                <span>&copy; 2026 Divyanshu Sharma. All Rights Reserved.</span>
                <span>Built with guts. Design to disrupt.</span>
              </div>
            </div>

            {/* Right Columns: Links Grid */}
            <div className="md:col-span-7 md:pl-10 grid grid-cols-2 sm:grid-cols-3 gap-8 font-sans text-sm font-normal tracking-wide text-[#F7F8F4]/80">
              {/* Navigation Links Column */}
              <div className="flex flex-col gap-4">
                <span className="text-[#B1FC54] text-[10px] font-bold uppercase tracking-widest select-none">Directory</span>
                <nav className="flex flex-col gap-2.5">
                  <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigate("about"); }} className="hover:text-[#B1FC54] transition-colors self-start">About</a>
                  <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavigate("skills"); }} className="hover:text-[#B1FC54] transition-colors self-start">Skills</a>
                  <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavigate("projects"); }} className="hover:text-[#B1FC54] transition-colors self-start">Work</a>
                  <Link href="/blog" className="hover:text-[#B1FC54] transition-colors self-start">Blog</Link>
                </nav>
              </div>

              {/* Social Links Column */}
              <div className="flex flex-col gap-4">
                <span className="text-[#B1FC54] text-[10px] font-bold uppercase tracking-widest select-none">Connect</span>
                <div className="flex flex-col gap-2.5">
                  <a href="https://github.com/devcool20" target="_blank" rel="noreferrer" className="hover:text-[#B1FC54] transition-colors self-start">GitHub</a>
                  <a href="https://www.linkedin.com/in/divyanshu-sharma-b9b534113/" target="_blank" rel="noreferrer" className="hover:text-[#B1FC54] transition-colors self-start">LinkedIn</a>
                  <a href="mailto:sharmadivyanshu265@gmail.com" className="hover:text-[#B1FC54] transition-colors self-start">Email</a>
                </div>
              </div>

              {/* Legal Links Column */}
             
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
