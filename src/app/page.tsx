"use client";

import Image from "next/image";
import Link from "next/link";
import BlueprintHero from "@/components/hero/BlueprintHero";
import { socials } from "@/lib/data";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React / Next.js", "React Native", "TypeScript", "Python", "Node.js",
  "FastAPI", "PostgreSQL", "MongoDB", "Docker", "AWS", "Machine Learning", "Kafka",
];

const experience = [
  {
    role: "Co-Founder",
    company: "Loql",
    companyUrl: "https://loql.in/",
    period: "August 2025 \u2013 Present",
    description:
      `\u2022 Designed & developed full end-to-end peer-to-peer rental marketplace with React Native mobile app and Web App, with secure 2-way QR handshake for instant transaction verification.\n\u2022 Conducted user research in one major gated society to understand daily-use item management and short-term rental needs, identifying key bottlenecks to build localized trust networks that eliminate logistics overhead.`,
  },
  {
    role: "Software Developer Intern",
    company: "Zingvel Travels - Noida",
    companyUrl: "http://www.zingvel.com/",
    period: "December 2024 \u2013 May 2025",
    description:
      `\u2022 Engineered major UI/UX components, including a comprehensive ticketing system for airlines.\n\u2022 Developed and integrated 'Wanderlust', an AI-powered travel recommendation engine, to enhance user engagement and personalize booking experiences.`,
  },
];

const projects = [
  {
    title: "projF1",
    subtitle: "F1 Experience App",
    description:
      `(a) What it is: A real-time, one-stop dashboard for F1 fans featuring live race data, driver grids, track conditions, fan discussions (threads), community predictions (podium, pole, driver of the day), and local event screenings. Built as a Next.js + TypeScript web app.\n\n       (b) What problem it solves: F1 race weekends scatter critical info across 5+ platforms (official F1 app, X, Reddit, timing apps, local event pages). Fans waste time hunting updates instead of enjoying the race. projf1 consolidates everything into a single "command center" with zero-friction access.\n\n       (c) My exact contribution: I built the entire product solo (frontend, real-time data integration, UI/UX, deployment). It was my thesis project on community-driven sports engagement and is already live and gaining organic traction among Indian F1 communities.`,
    href: "https://projf1.online/",
  },
  {
    title: "Loql",
    subtitle: "Peer-to-Peer Neighborhood Rental Marketplace",
    description:
      `(a) What it is: An urban "bazaar" app where neighbors rent everyday items from each other. Features hyper-local discovery ("Aas-Paas"), story-rich listings ("Katha"), simple booking chat ("Samvaad"), and a warm onboarding ("The Dwar"). Full Next.js web app (with companion Android APK).\n(b) What problem it solves: People buy expensive items they use only a few times a year while identical items sit unused in their neighbors' homes. Loql turns hidden neighborhood inventory into a trust-based, money-saving sharing economy.\n(c) My exact contribution: I conceived the entire product (including the storytelling angle that differentiates it from generic rental apps), designed the UX, coded the full web platform, and shipped the Android build. It was my consumer thesis project on community commerce and is positioned for strong network-effect revenue (transaction fees + premium neighborhood features).`,
    href: "https://loql.in/",
  },
  {
    title: "ProofEstate",
    subtitle: "Real-World Asset (RWA) Tokenization Protocol on Solana",
    description:
      `(a) What it is: A complete end-to-end real-estate tokenization platform on Solana. Owners submit title deeds \u2192 government verifiers validate \u2192 properties are fractionalized into SPL Token-2022 tokens \u2192 rental yields are automatically distributed in USDC/USDT to token holders. Full-stack: Solana (Anchor) smart contracts + Rust/Axum backend + Next.js dashboard.\n(b) What problem it solves: Real estate is the largest asset class in the world but is extremely illiquid, inaccessible (minimum investment = entire property), and plagued by title fraud and manual rent distribution. ProofEstate makes any verified property ownable for as little as $50 with full transparency and automated passive income.\n(c) My exact contribution: I architected and coded the entire protocol solo (on-chain logic, verifier flow, backend automation, frontend dashboard, and security model using PDAs). It is my blockchain thesis project and is built for institutional-grade revenue (platform fees + yield automation).`,
    href: "https://proof-estate.vercel.app/",
  },
  {
    title: "Sales Doc",
    subtitle: "Sales call analysis and recommendations",
    description: "A web app that analyzes sales calls and provides recommendations for the sales team. Built using Next.js and RL-based machine learning model.",
    href: "https://salesdoc.vercel.app/",
  },
  {
    title: "FinStream",
    subtitle: "Real-Time Financial News Stream Aggregator",
    description: "A microservices-based backend system that aggregates financial news, performs NLP sentiment analysis, and delivers real-time updates via WebSocket. Built with Python FastAPI, Apache Kafka, PostgreSQL, and Docker.",
    href: "https://github.com/devcool20/fin-stream",
  },
];

/* ------------------------------------------------------------------- */
/*  Section components                                                  */
/* ------------------------------------------------------------------- */

function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-label">01 / About</div>
        <h2 className="section-heading mb-8 sm:mb-12">Who I Am</h2>
        <div className="grid gap-12 sm:gap-16 grid-cols-1 md:grid-cols-[2fr_1fr] md:items-start">
          <div className="space-y-5 text-gray-400 text-sm leading-7 md:text-base">
            <p>22. Application Developer and building{" "}<Link href="https://projf1.online/" target="_blank" rel="noreferrer" className="text-[#FF1800] hover:text-[#FF6B35] transition-colors">projectF1</Link>{" "}&mdash; the ultimate experience for formula 1 fans.</p>
            <p>I worked as a software developer intern at{" "}<Link href="http://www.zingvel.com/" target="_blank" rel="noreferrer" className="text-[#FF1800] hover:text-[#FF6B35] transition-colors">Zingvel Travels</Link>.</p>
            <p>I am a dedicated full-stack engineer who thrives on creating impactful and useful products. I approach development with a focus on both technical pragmatism and meticulous craft.</p>
            <p>I have a strong command over building both mobile and web applications. Furthermore, I possess valuable knowledge in integrating and deploying Machine Learning models to enhance product functionality, as seen in my project work.</p>
            <p>In my free time, you&apos;ll find me playing badminton, watching Formula 1 races on the weekends, and reading about philosophical content.</p>
            <p>You can find me on{" "}{socials.map((s, i) => { const isLast = i === socials.length - 1; const is2nd = i === socials.length - 2; return (<span key={s.label}><Link href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined} className="text-[#FF1800] hover:text-[#FF6B35] transition-colors">{s.label}</Link>{!isLast && (is2nd ? ", or " : ", ")}</span>); })}.</p>
          </div>
          <div className="relative mx-auto md:mx-0 aspect-[3/4] w-full max-w-[240px] rounded-lg overflow-hidden border border-[#1e1e28]">
            <Image src="https://drive.google.com/uc?export=view&id=1NIcBlQ7yCFEPoCB92DrOm4thO6tUDVoL" alt="Divyanshu Sharma" fill className="object-cover" sizes="(max-width: 768px) 240px, 280px" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF1800] via-[#FF6B35] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#0a0a0e]">
      <div className="max-w-6xl mx-auto">
        <div className="section-label">02 / Skills</div>
        <h2 className="section-heading mb-8 sm:mb-12">What I Work With</h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-8 sm:mb-10">I specialize in building full-stack applications with modern technologies. Here are the tools and frameworks I work with daily.</p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {skills.map((s) => (
            <span key={s} className="f1-skill-tag sk-item">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-label">03 / Projects</div>
        <h2 className="section-heading mb-12 sm:mb-16">Featured Work</h2>
        <div className="space-y-16 sm:space-y-20">
          {projects.map((p) => (
            <div key={p.title} className="f1-card pj-card">
              <Link href={p.href} target="_blank" rel="noreferrer" className="f1-project-link inline-flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                {p.title}<span className="text-[#FF1800] text-base sm:text-lg">\u2197</span>
              </Link>
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-gray-500 mt-1">{p.subtitle}</p>
              {renderProjectDescription(p.description)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderProjectDescription(description: string) {
  const trimmed = description.trim();
  if (!(/\(a\)/i.test(trimmed) && /\(b\)/i.test(trimmed) && /\(c\)/i.test(trimmed))) {
    return <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-gray-400">{description}</p>;
  }
  const parts = trimmed.replace(/\r\n/g, "\n").split(/\(\s*[abc]\s*\)\s*/i).map((s) => s.trim()).filter(Boolean);
  const labels = ["WHY IT EXISTS", "WHAT IT SOLVES", "MY ROLE"];
  return (
    <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-5 text-sm leading-relaxed text-gray-400">
      {parts.slice(0, 3).map((p, i) => (
        <div key={labels[i]} className="grid gap-1">
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FF1800]/70">{labels[i]}</p>
          <p className="whitespace-pre-wrap">{p}</p>
        </div>
      ))}
    </div>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#0a0a0e]">
      <div className="max-w-6xl mx-auto">
        <div className="section-label">04 / Experience</div>
        <h2 className="section-heading mb-12 sm:mb-16">Career Journey</h2>
        <div className="space-y-10 sm:space-y-12">
          {experience.map((exp) => (
            <div key={exp.company} className="flex gap-4 sm:gap-6 ex-item">
              <div className="flex flex-col items-center pt-2">
                <div className="f1-timeline-dot" />
                <div className="f1-timeline-line flex-1 mt-2" />
              </div>
              <div className="space-y-2 sm:space-y-3 pb-6 sm:pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <h3 className="text-base sm:text-lg text-white">{exp.role}</h3>
                  <span className="text-xs font-mono tracking-[0.1em] text-gray-600 uppercase">{exp.period}</span>
                </div>
                <Link href={exp.companyUrl} target="_blank" rel="noreferrer" className="text-sm text-[#FF1800] hover:text-[#FF6B35] transition-colors">{exp.company} \u2197</Link>
                <p className="text-sm leading-relaxed text-gray-400 whitespace-pre-wrap mt-2 sm:mt-3">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-label">05 / Contact</div>
        <h2 className="section-heading mb-8 sm:mb-12">Let&apos;s Connect</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-8 sm:mb-10">I&apos;m currently open to new opportunities. Whether you have a project in mind or just want to chat, feel free to reach out!</p>
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12">
          <a href="mailto:sharmadivyanshu265@gmail.com" className="f1-btn-primary"><span>\u2709</span> Send me an email</a>
          <Link href="https://www.linkedin.com/in/divyanshu-sharma-b9b534113/" target="_blank" rel="noreferrer" className="f1-btn"><span>in</span> Connect on LinkedIn</Link>
        </div>
        <div className="section-divider" />
        <div>
          <p className="text-xs tracking-[0.15em] uppercase text-gray-600 mb-3 sm:mb-4 font-mono">Or find me on</p>
          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
            {socials.map((s) => (
              <Link key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined} className="text-sm text-gray-400 hover:text-[#FF1800] transition-colors font-mono tracking-wide">{s.label}</Link>
            ))}
          </div>
        </div>
        <div className="pt-8 sm:pt-10 text-xs text-gray-600 font-mono tracking-wide">In my free time: Badminton \u2022 F1 \u2022 Philosophy</div>
      </div>
    </section>
  );
}

function BlogCTASection() {
  return (
    <section id="blog-cta" className="relative py-24 sm:py-32 px-4 sm:px-6 bg-[#0a0a0e]">
      <div className="max-w-6xl mx-auto">
        <div className="section-label">06 / Blog</div>
        <h2 className="section-heading mb-8 sm:mb-12">Thoughts &amp; Words</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-8 sm:mb-10">I write about engineering, product thinking, and things I&apos;m learning. Head over to the blog for the full experience.</p>
        <Link href="/blog" className="f1-btn-primary inline-flex items-center gap-2 text-sm">
          Read the Blog <span>\u2197</span>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- */
/*  GSAP Scroll Animations                                              */
/* ------------------------------------------------------------------- */

function ScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const enterOnce = { toggleActions: "play none none none" as const };

      // Hero reveal sections — trigger as soon as blocks enter the viewport (reliable on mobile)
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top bottom", ...enterOnce },
          },
        );
      });

      // Skills tags — staggered; shared trigger when #skills enters view
      gsap.utils.toArray<HTMLElement>(".sk-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: i * 0.04,
            ease: "power2.out",
            scrollTrigger: { trigger: "#skills", start: "top bottom", ...enterOnce },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".pj-card").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top bottom", ...enterOnce } },
        );
      });

      gsap.utils.toArray<HTMLElement>(".ex-item").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: el, start: "top bottom", ...enterOnce } },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}

/* ------------------------------------------------------------------- */
/*  Main Page                                                           */
/* ------------------------------------------------------------------- */

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div ref={contentRef} className="relative bg-[#060608] min-h-screen">
      <BlueprintHero onNavigate={handleNavigate} />
      <ScrollAnimations />

      <div className="gsap-reveal"><AboutSection /></div>
      <div className="gsap-reveal"><SkillsSection /></div>
      <div className="gsap-reveal"><ProjectsSection /></div>
      <div className="gsap-reveal"><ExperienceSection /></div>
      <div className="gsap-reveal"><ContactSection /></div>
      <div className="gsap-reveal"><BlogCTASection /></div>

      <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-[#1e1e28]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF1800]" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600">Divyanshu Sharma</span>
          </div>
          <span className="text-[10px] font-mono tracking-[0.1em] text-gray-700">Built with Next.js, Three.js, and Red Bull</span>
        </div>
      </footer>
    </div>
  );
}
