"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import BlueprintHero from "@/components/hero/BlueprintHero";
import LinkPreview from "@/components/ui/LinkPreview";
import type { GitHubContributionData, GitHubPullRequest } from "@/lib/github";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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
  accent: string;
  gif: string;
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
    accent: "coral",
    gif: "/gif/f1.gif",
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
    accent: "mint",
    gif: "/gif/f1(2).gif",
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
    accent: "sky",
    gif: "/gif/f1(3).gif",
    title: "Projects Written On The Slate",
    kicker: "Scroll pace controls the writing. Once a card is fully written, choose where to go.",
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
    accent: "lime",
    gif: "/gif/f1(4).gif",
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
    accent: "violet",
    gif: "/gif/f1(4).gif",
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
  {
    id: "contact",
    number: "06",
    label: "Contact",
    accent: "gold",
    gif: "/gif/f1(5).gif",
    title: "Leave A Note",
    kicker: "Open for product engineering roles, founding teams, and ambitious builds.",
    lines: [
      "Best place to reach me: sharmadivyanshu265@gmail.com",
      "I am happiest around teams that care about taste, systems, shipping, and the details users actually feel.",
    ],
    actions: [
      { label: "Send Email", href: "mailto:sharmadivyanshu265@gmail.com" },
      { label: "Read Blog", href: "/blog" },
    ],
  },
];

const githubSearchUrl =
  "https://github.com/search?q=is%3Apr+author%3Adevcool20+is%3Apublic&type=pullrequests";

function SlateActionButton({ action }: { action: SlateAction }) {
  const className = "slate-choice";

  if (action.target) {
    const target = action.target;

    return (
      <button
        type="button"
        className={className}
        onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })}
      >
        {action.label}
      </button>
    );
  }

  return (
    <Link
      className={className}
      href={action.href ?? "#"}
      target={action.href?.startsWith("http") ? "_blank" : undefined}
      rel={action.href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {action.label}
    </Link>
  );
}

function WrittenLine({ children }: { children: string }) {
  return (
    <div className="slate-line" style={{ "--write": 0 } as CSSProperties}>
      <span className="slate-line-copy">{children}</span>
    </div>
  );
}

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
    { label: "Public PRs", value: contributions.summary.total },
    { label: "Merged", value: contributions.summary.merged },
    { label: "Open", value: contributions.summary.open },
    { label: "Repos", value: contributions.summary.uniqueRepos },
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

  if (contributions.prs.length === 0) {
    return (
      <div className="open-source-empty slate-line" style={{ "--write": 0 } as CSSProperties}>
        <div className="open-source-written">
          <p>
            GitHub contribution telemetry is taking a pit stop. The live board will retry on the
            next cached request.
          </p>
          <Link href={githubSearchUrl} target="_blank" rel="noreferrer" className="project-open">
            Open GitHub PRs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="open-source-ledger">
      <div className="open-source-stats" aria-label="Open source contribution stats">
        {stats.map((stat) => (
          <div className="open-source-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="open-source-board" aria-label="Recent public pull requests">
        {groupedPrs.map((group) => {
          const isExpanded = expandedRepos.has(group.repo);
          const visibleCount = isExpanded ? group.items.length : defaultVisiblePullRequests;
          const visibleItems = group.items.slice(0, visibleCount);
          const hiddenCount = group.items.length - visibleItems.length;

          return (
            <section className="open-source-group" key={group.repo}>
              <div className="open-source-group-shell">
                <div className="open-source-group-head">
                  <div>
                    <p className="open-source-group-label">Repository</p>
                    <h3>{group.repoName}</h3>
                  </div>
                  <span className="open-source-group-count">{formatPrCount(group.items.length)}</span>
                </div>

                <div className="open-source-group-list">
                  {visibleItems.map((pr) => (
                    <article className={`open-source-pr status-${pr.status}`} key={pr.url}>
                      <div className="open-source-written">
                        <div className="open-source-pr-meta">
                          <span className="open-source-repo">{pr.repo}</span>
                          <span className="open-source-number">#{pr.number}</span>
                          <span className="open-source-date">{formatDate(pr.createdAt)}</span>
                        </div>

                        <h4>
                          <Link href={pr.url} target="_blank" rel="noreferrer">
                            {pr.title}
                          </Link>
                        </h4>

                        <div className="open-source-pr-foot">
                          <span className="open-source-status">{statusLabel(pr)}</span>
                          <span>{pr.comments} review notes</span>
                          <span>{pr.authorAssociation.toLowerCase()}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {group.items.length > defaultVisiblePullRequests ? (
                  <button
                    type="button"
                    className="open-source-more"
                    aria-expanded={isExpanded}
                    onClick={() => toggleRepo(group.repo)}
                  >
                    {isExpanded ? "Show less" : `+${hiddenCount} more`}
                  </button>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function SlateSection({
  section,
  contributions,
}: {
  section: SlateSectionData;
  contributions: GitHubContributionData;
}) {
  return (
    <section id={section.id} className={`slate-section accent-${section.accent}`}>
      <div className="slate-sticker slate-sticker-one" aria-hidden="true" />
      <div className="slate-sticker slate-sticker-two" aria-hidden="true" />

      <div className="slate-heading">
        <span>{section.number}</span>
        <p>{section.label}</p>
        <div className="slate-gif-frame">
          <img src={section.gif} alt="" loading="lazy" />
        </div>
      </div>

      <div className="slate-page">
        <div className="slate-rule" aria-hidden="true" />
        <p className="slate-kicker">{section.kicker}</p>
        <h2 className="slate-title">{section.title}</h2>

        {section.projects ? (
          <div className="project-ledger">
            {section.projects.map((project) => (
              <article
                key={project.title}
                className="project-entry slate-line"
                style={{ "--write": 0 } as CSSProperties}
              >
                <div className="project-written">
                  <h3>
                    <LinkPreview
                      className="project-title-link"
                      imageSrc={project.previewImage}
                      title={project.title}
                      url={project.href}
                    >
                      {project.title}
                    </LinkPreview>
                  </h3>
                  <p>{project.note}</p>
                  <Link href={project.href} target="_blank" rel="noreferrer" className="project-open">
                    Open project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : section.openSource ? (
          <OpenSourceLedger contributions={contributions} />
        ) : (
          <div className="slate-copy">
            {section.lines?.map((line) => (
              <WrittenLine key={line}>{line}</WrittenLine>
            ))}
          </div>
        )}

        {section.actions ? (
          <div className="slate-actions">
            {section.actions.map((action) => (
              <SlateActionButton key={action.label} action={action} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function SlateAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".slate-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.82 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 35%",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".slate-line").forEach((line) => {
        gsap.fromTo(
          line,
          { "--write": 0 },
          {
            "--write": 1,
            duration: 0.85,
            ease: "power1.out",
            scrollTrigger: {
              trigger: line,
              start: "top 84%",
              once: true,
              onEnter: () => line.classList.add("is-written"),
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".open-source-stat").forEach((stat, index) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 18, rotate: index % 2 === 0 ? -1.5 : 1.5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.42,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".open-source-group-shell").forEach((group, index) => {
        gsap.fromTo(
          group,
          { opacity: 0, y: 20, rotate: index % 2 === 0 ? -1 : 1 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.48,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".slate-gif-frame").forEach((gif) => {
        gsap.fromTo(
          gif,
          { opacity: 0, y: 34, rotate: -4, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            rotate: -1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gif.closest(".slate-section"),
              start: "top 72%",
              once: true,
            },
          },
        );
      });

      gsap.to(".slate-track", {
        backgroundPosition: "0 220px, 0 140px, center top",
        ease: "none",
        scrollTrigger: {
          trigger: ".slate-track",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

export default function HomeClient({ contributions }: { contributions: GitHubContributionData }) {
  const rootRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setTimeout(() => {
      const el = document.getElementById(section);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 18,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div ref={rootRef} className="relative min-h-screen bg-[#060608]">
      <BlueprintHero onNavigate={handleNavigate} />
      <SlateAnimations />

      <main className="slate-track" aria-label="Portfolio slate">
        <div className="slate-top-note">
          <span>Clean Slate</span>
          <p>Scroll to write. Pause to choose.</p>
        </div>

        {slateSections.map((section) => (
          <SlateSection key={section.id} section={section} contributions={contributions} />
        ))}
      </main>
    </div>
  );
}
