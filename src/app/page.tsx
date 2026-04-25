"use client";

import Image from "next/image";
import Link from "next/link";
import BlueprintHero from "@/components/hero/BlueprintHero";
import { socials } from "@/lib/data";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    label: "Frontend Systems",
    description: "Interfaces that feel fast, composed, and deliberate.",
    items: ["React / Next.js", "React Native", "TypeScript"],
  },
  {
    label: "Backend Engines",
    description: "APIs, real-time flows, and product-grade service layers.",
    items: ["Node.js", "FastAPI", "Python", "Kafka"],
  },
  {
    label: "Data + Infra",
    description: "Storage, deployment, and systems that hold up under load.",
    items: ["PostgreSQL", "MongoDB", "Docker", "AWS"],
  },
  {
    label: "Applied Intelligence",
    description: "ML workflows embedded into actual user experiences.",
    items: ["Machine Learning"],
  },
];

const experience = [
  {
    role: "Co-Founder",
    company: "Loql",
    companyUrl: "https://loql.in/",
    period: "August 2025 - Present",
    summary: "Built a neighborhood rental marketplace around trust, speed, and on-ground behavior.",
    bullets: [
      "Designed and developed a full peer-to-peer rental marketplace across mobile and web.",
      "Built a secure two-way QR handshake so transactions could be verified instantly in person.",
      "Ran user research inside a gated society to shape a trust-first local network product.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Zingvel Travels - Noida",
    companyUrl: "http://www.zingvel.com/",
    period: "December 2024 - May 2025",
    summary: "Shipped product-facing UX and AI-led travel features inside a live business workflow.",
    bullets: [
      "Engineered core UI and UX surfaces, including a ticketing system for airlines.",
      "Developed and integrated Wanderlust, an AI travel recommendation engine.",
      "Focused on engagement and personalization instead of feature volume alone.",
    ],
  },
];

const projects = [
  {
    title: "projF1",
    subtitle: "F1 Experience App",
    href: "https://projf1.online/",
    stats: ["Live race context", "Community predictions", "Weekend command center"],
    sections: [
      {
        label: "What It Is",
        text: "A real-time dashboard for Formula 1 fans with race data, driver grids, track context, threads, predictions, and local event discovery in one place.",
      },
      {
        label: "What It Solves",
        text: "Race weekends scatter important context across too many platforms. projF1 turns that chaos into a single viewing surface with no friction.",
      },
      {
        label: "My Role",
        text: "I built the product solo across frontend, real-time integrations, UI and UX, and deployment. It began as my thesis project and is already earning organic traction.",
      },
    ],
  },
  {
    title: "Loql",
    subtitle: "Peer-to-Peer Neighborhood Rental Marketplace",
    href: "https://loql.in/",
    stats: ["Hyper-local discovery", "Trust-led commerce", "Android companion app"],
    sections: [
      {
        label: "What It Is",
        text: "A warm neighborhood rental platform where people discover nearby items, browse story-rich listings, and transact through a simple local-first flow.",
      },
      {
        label: "What It Solves",
        text: "Useful products sit idle while people nearby buy the same things for rare use. Loql turns hidden neighborhood inventory into a working shared economy.",
      },
      {
        label: "My Role",
        text: "I conceived the product direction, designed the storytelling-led UX, built the web platform, and shipped the Android build as a thesis-driven consumer product.",
      },
    ],
  },
  {
    title: "ProofEstate",
    subtitle: "Real-World Asset Tokenization Protocol on Solana",
    href: "https://proof-estate.vercel.app/",
    stats: ["On-chain ownership", "Verifier workflow", "Automated yield rails"],
    sections: [
      {
        label: "What It Is",
        text: "An end-to-end real-estate tokenization platform where properties are verified, fractionalized, and connected to automated rental-yield distribution.",
      },
      {
        label: "What It Solves",
        text: "Real estate is illiquid, expensive to access, and packed with manual processes. ProofEstate makes verified ownership smaller, clearer, and more transparent.",
      },
      {
        label: "My Role",
        text: "I architected and built the protocol solo, covering smart contracts, verifier logic, backend automation, the dashboard, and the security model.",
      },
    ],
  },
  {
    title: "Sales Doc",
    subtitle: "Sales Call Analysis and Recommendations",
    href: "https://salesdoc.vercel.app/",
    stats: ["Call analysis", "Recommendation loops", "Team-facing insights"],
    sections: [
      {
        label: "What It Is",
        text: "A web app that analyzes sales calls and turns conversations into actionable recommendations for the team.",
      },
      {
        label: "What It Solves",
        text: "Important sales signals often get buried in raw recordings. This product surfaces coaching direction without forcing manual review of every call.",
      },
      {
        label: "My Role",
        text: "I built the experience around structured call feedback and integrated an RL-based machine learning model into the workflow.",
      },
    ],
  },
  {
    title: "FinStream",
    subtitle: "Real-Time Financial News Stream Aggregator",
    href: "https://github.com/devcool20/fin-stream",
    stats: ["Streaming ingestion", "Sentiment analysis", "WebSocket delivery"],
    sections: [
      {
        label: "What It Is",
        text: "A microservices backend that aggregates financial news, runs NLP sentiment analysis, and pushes updates in real time.",
      },
      {
        label: "What It Solves",
        text: "Financial signals move fast, but source discovery and sentiment interpretation are fragmented. FinStream compresses collection and analysis into one system.",
      },
      {
        label: "My Role",
        text: "I designed the backend architecture around FastAPI, Kafka, PostgreSQL, Docker, and WebSocket delivery for live downstream consumption.",
      },
    ],
  },
];

function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="section-label">{index} / {label}</div>
      <h2 className="section-heading flow-title">{title}</h2>
      {description ? <p className="flow-intro">{description}</p> : null}
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="flow-section section-band" data-band="warm">
      <div className="section-orbit section-orbit-left" aria-hidden="true" />
      <div className="section-orbit section-orbit-right" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          index="01"
          label="About"
          title="Who I Am"
          description="The story after the hero is still the same machine: product-first engineering, race-weekend obsession, and carefully built systems that feel alive."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_0.95fr]">
          <div className="telemetry-panel interactive-panel blueprint-copy-panel">
            <div className="panel-chip-row">
              <span className="metric-chip">Full-stack product builder</span>
              <span className="metric-chip">Formula 1 systems thinking</span>
              <span className="metric-chip">Shipping with intent</span>
            </div>

            <div className="story-copy">
              <p>
                22. Application Developer and building{" "}
                <Link href="https://projf1.online/" target="_blank" rel="noreferrer">
                  projectF1
                </Link>{" "}
                for people who want race weekends to feel sharper, richer, and more connected.
              </p>
              <p>
                I worked as a software developer intern at{" "}
                <Link href="http://www.zingvel.com/" target="_blank" rel="noreferrer">
                  Zingvel Travels
                </Link>
                , where I learned how product constraints and speed sit together in real work.
              </p>
              <p>
                I build mobile and web applications with a strong bias toward useful detail,
                clean interaction, and products that hold together under actual usage.
              </p>
              <p>
                I also work comfortably around machine learning integrations when the model helps
                the product feel more capable rather than simply more complex.
              </p>
              <p>
                Outside work: badminton, Formula 1 weekends, and long stretches of philosophical reading.
              </p>
            </div>

            <div className="signal-links">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="signal-link micro-button"
                >
                  <span className="signal-dot" />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="portrait-stack">
            <div className="telemetry-panel interactive-panel portrait-panel">
              <div className="portrait-frame">
                <Image
                  src="https://drive.google.com/uc?export=view&id=1NIcBlQ7yCFEPoCB92DrOm4thO6tUDVoL"
                  alt="Divyanshu Sharma"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 380px"
                />
              </div>
              <div className="portrait-caption">
                <span>Driver profile</span>
                <strong>Building products with rhythm and precision.</strong>
              </div>
            </div>

            <div className="telemetry-panel interactive-panel stat-panel">
              <div className="mini-stat">
                <span className="mini-stat-value">3</span>
                <span className="mini-stat-label">Product lanes I care about most</span>
              </div>
              <div className="mini-stat-grid">
                <div>
                  <span>01</span>
                  <p>Community-led consumer apps</p>
                </div>
                <div>
                  <span>02</span>
                  <p>Realtime and systems-heavy experiences</p>
                </div>
                <div>
                  <span>03</span>
                  <p>Interfaces with a point of view</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="flow-section section-band" data-band="sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          index="02"
          label="Skills"
          title="What I Work With"
          description="These are grouped like systems inside the car, not a random pile of badges. The goal is always the same: turn complexity into something smooth to use."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.label} className="telemetry-panel interactive-panel skill-system">
              <div className="panel-header">
                <div>
                  <p className="panel-kicker">System</p>
                  <h3 className="panel-title">{group.label}</h3>
                </div>
                <span className="panel-count">{group.items.length.toString().padStart(2, "0")}</span>
              </div>
              <p className="panel-copy">{group.description}</p>
              <div className="skill-pill-grid">
                {group.items.map((item) => (
                  <span key={item} className="skill-pill sk-item micro-button">
                    <span className="signal-dot" />
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="flow-section section-band" data-band="warm">
      <div className="section-orbit section-orbit-center" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          index="03"
          label="Projects"
          title="Featured Work"
          description="Each build is presented like a live system readout: what it is, why it matters, and where my hands were on the wheel."
        />

        <div className="mt-12 space-y-8">
          {projects.map((project, index) => (
            <article key={project.title} className="telemetry-panel interactive-panel project-card pj-card">
              <div className="project-topline">
                <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="project-heading">
                  <Link href={project.href} target="_blank" rel="noreferrer" className="f1-project-link project-link">
                    {project.title} <span aria-hidden="true">↗</span>
                  </Link>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>
              </div>

              <div className="project-stat-row">
                {project.stats.map((stat) => (
                  <span key={stat} className="metric-chip">
                    {stat}
                  </span>
                ))}
              </div>

              <div className="project-story-grid">
                {project.sections.map((section) => (
                  <div key={section.label} className="project-story-block">
                    <p className="project-story-label">{section.label}</p>
                    <p className="project-story-copy">{section.text}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="flow-section section-band" data-band="sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          index="04"
          label="Experience"
          title="Career Journey"
          description="The visual language here follows the hero too: a guided progression, signal nodes, and motion that makes the timeline feel active instead of archived."
        />

        <div className="timeline-shell mt-12">
          <div className="timeline-rail" aria-hidden="true" />
          <div className="space-y-6">
            {experience.map((item, index) => (
              <article key={item.company} className="timeline-card ex-item interactive-panel">
                <div className="timeline-node">
                  <span />
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <p className="panel-kicker">Checkpoint {String(index + 1).padStart(2, "0")}</p>
                      <h3 className="panel-title">{item.role}</h3>
                    </div>
                    <span className="timeline-period">{item.period}</span>
                  </div>
                  <p className="timeline-summary">{item.summary}</p>
                  <Link href={item.companyUrl} target="_blank" rel="noreferrer" className="timeline-link micro-button">
                    <span className="signal-dot" />
                    {item.company}
                  </Link>
                  <div className="timeline-bullets">
                    {item.bullets.map((bullet) => (
                      <div key={bullet} className="timeline-bullet">
                        <span className="signal-dot" />
                        <p>{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="flow-section section-band" data-band="warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          index="05"
          label="Contact"
          title="Let&apos;s Connect"
          description="This section should feel like the cockpit opening up, not the page running out of ideas."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="telemetry-panel interactive-panel cta-panel">
            <div className="panel-chip-row">
              <span className="metric-chip">Open to new opportunities</span>
              <span className="metric-chip">Product builds</span>
              <span className="metric-chip">Founding teams</span>
            </div>
            <p className="panel-copy large-copy">
              I&apos;m currently interested in roles and collaborations where product taste,
              engineering depth, and speed of execution all matter at the same time.
            </p>
            <div className="cta-cluster">
              <a href="mailto:sharmadivyanshu265@gmail.com" className="f1-btn-primary micro-button">
                <span className="signal-dot" />
                Send me an email
              </a>
              <Link
                href="https://www.linkedin.com/in/divyanshu-sharma-b9b534113/"
                target="_blank"
                rel="noreferrer"
                className="f1-btn micro-button"
              >
                <span className="signal-dot" />
                Connect on LinkedIn
              </Link>
            </div>
          </div>

          <div className="telemetry-panel interactive-panel side-panel">
            <p className="panel-kicker">Elsewhere</p>
            <div className="signal-links compact">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="signal-link micro-button"
                >
                  <span className="signal-dot" />
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="section-divider compact-divider" />
            <p className="panel-copy">In my free time: Badminton, Formula 1, and philosophy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogCTASection() {
  return (
    <section id="blog-cta" className="flow-section section-band" data-band="sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="telemetry-panel interactive-panel blog-panel">
          <div className="blog-panel-copy">
            <div className="section-label">06 / Blog</div>
            <h2 className="section-heading flow-title">Thoughts &amp; Words</h2>
            <p className="panel-copy large-copy">
              I write about engineering, product thinking, and the things I learn while building.
              The blog should feel like stepping into the pit wall after the lap.
            </p>
          </div>
          <Link href="/blog" className="f1-btn-primary micro-button blog-button">
            <span className="signal-dot" />
            Read the Blog
          </Link>
        </div>
      </div>
    </section>
  );
}

function ScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const enterOnce = { toggleActions: "play none none none" as const };
      const listeners: Array<() => void> = [];

      gsap.utils.toArray<HTMLElement>(".flow-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 56, clipPath: "inset(0 0 10% 0 round 36px)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0 round 36px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 82%", ...enterOnce },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".telemetry-panel").forEach((panel, index) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 34, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: index % 3 === 0 ? 0 : 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 88%", ...enterOnce },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".sk-item").forEach((pill, index) => {
        gsap.fromTo(
          pill,
          { opacity: 0, y: 16, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            delay: index * 0.03,
            ease: "power2.out",
            scrollTrigger: { trigger: pill.closest(".skill-system"), start: "top 88%", ...enterOnce },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".section-orbit").forEach((orbit) => {
        gsap.to(orbit, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: orbit.closest(".section-band"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".interactive-panel").forEach((panel) => {
        panel.style.setProperty("transform-style", "preserve-3d");

        const move = (event: PointerEvent) => {
          const rect = panel.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const px = (x / rect.width) * 100;
          const py = (y / rect.height) * 100;
          const rotateY = ((x / rect.width) - 0.5) * 7;
          const rotateX = (0.5 - y / rect.height) * 6;

          panel.style.setProperty("--mx", `${px}%`);
          panel.style.setProperty("--my", `${py}%`);

          gsap.to(panel, {
            transformPerspective: 1400,
            rotationY: rotateY,
            rotationX: rotateX,
            y: -4,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const leave = () => {
          gsap.to(panel, {
            transformPerspective: 1400,
            rotationX: 0,
            rotationY: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          });
          panel.style.setProperty("--mx", "50%");
          panel.style.setProperty("--my", "50%");
        };

        panel.addEventListener("pointermove", move);
        panel.addEventListener("pointerleave", leave);
        listeners.push(() => {
          panel.removeEventListener("pointermove", move);
          panel.removeEventListener("pointerleave", leave);
        });
      });

      return () => {
        listeners.forEach((dispose) => dispose());
      };
    });

    return () => ctx.revert();
  }, []);

  return null;
}

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div ref={contentRef} className="relative min-h-screen bg-[#060608]">
      <BlueprintHero onNavigate={handleNavigate} />
      <ScrollAnimations />

      <main className="flow-shell">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <BlogCTASection />
      </main>

      <footer className="footer-shell px-4 py-8 sm:px-6 sm:py-10">
        <div className="max-w-6xl mx-auto footer-inner">
          <div className="footer-mark">
            <span className="signal-dot" />
            <span>Divyanshu Sharma</span>
          </div>
          <span className="footer-copy">Built with Next.js, Three.js, and race-weekend energy.</span>
        </div>
      </footer>
    </div>
  );
}
