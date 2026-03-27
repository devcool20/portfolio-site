'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { socials } from "@/lib/data";
import NavTabs from "@/components/NavTabs";
import HeaderSection from "@/components/HeaderSection";
import SmartTracingBeam from "@/components/ui/smart-tracing-beam";

const projects = [
  {
    title: "projF1",
    subtitle: "F1 Experience App",
    description:
      `(a) What it is: A real-time, one-stop dashboard for F1 fans featuring live race data, driver grids, track conditions, fan discussions (threads), community predictions (podium, pole, driver of the day), and local event screenings. Built as a Next.js + TypeScript web app.
      
       (b) What problem it solves: F1 race weekends scatter critical info across 5+ platforms (official F1 app, X, Reddit, timing apps, local event pages). Fans waste time hunting updates instead of enjoying the race. projf1 consolidates everything into a single “command center” with zero-friction access.
      
       (c) My exact contribution: I built the entire product solo (frontend, real-time data integration, UI/UX, deployment). It was my thesis project on community-driven sports engagement and is already live and gaining organic traction among Indian F1 communities.`,
    href: "https://projf1.online/",
  },
  {
    title: "Loql",
    subtitle: "Peer-to-Peer Neighborhood Rental Marketplace",
    description:
      `(a) What it is: An urban “bazaar” app where neighbors rent everyday items from each other. Features hyper-local discovery (“Aas-Paas”), story-rich listings (“Katha”), simple booking chat (“Samvaad”), and a warm onboarding (“The Dwar”). Full Next.js web app (with companion Android APK).
(b) What problem it solves: People buy expensive items they use only a few times a year while identical items sit unused in their neighbors’ homes. Loql turns hidden neighborhood inventory into a trust-based, money-saving sharing economy.
(c) My exact contribution: I conceived the entire product (including the storytelling angle that differentiates it from generic rental apps), designed the UX, coded the full web platform, and shipped the Android build. It was my consumer thesis project on community commerce and is positioned for strong network-effect revenue (transaction fees + premium neighborhood features).`,
    href: "https://loql.in/",
  },
  {
    title: "ProofEstate",
    subtitle: "Real-World Asset (RWA) Tokenization Protocol on Solana",
    description:
      `(a) What it is: A complete end-to-end real-estate tokenization platform on Solana. Owners submit title deeds → government verifiers validate → properties are fractionalized into SPL Token-2022 tokens → rental yields are automatically distributed in USDC/USDT to token holders. Full-stack: Solana (Anchor) smart contracts + Rust/Axum backend + Next.js dashboard.
(b) What problem it solves: Real estate is the largest asset class in the world but is extremely illiquid, inaccessible (minimum investment = entire property), and plagued by title fraud and manual rent distribution. ProofEstate makes any verified property ownable for as little as $50 with full transparency and automated passive income.
(c) My exact contribution: I architected and coded the entire protocol solo (on-chain logic, verifier flow, backend automation, frontend dashboard, and security model using PDAs). It is my blockchain thesis project and is built for institutional-grade revenue (platform fees + yield automation).`,
    href: "https://proof-estate.vercel.app/",
  },
  {
    title: "Sales Doc",
    subtitle: "Sales call analysis and recommendations",
    description:
      "A web app that analyzes sales calls and provides recommendations for the sales team. Built using Next.js and RL-based machine learning model.",
    href: "https://salesdoc.vercel.app/",
  },
  {
    title: "FinStream",
    subtitle: "Real-Time Financial News Stream Aggregator",
    description: "A microservices-based backend system that aggregates financial news, performs NLP sentiment analysis, and delivers real-time updates via WebSocket. Built with Python FastAPI, Apache Kafka, PostgreSQL, and Docker.",
    href: "https://github.com/devcool20/fin-stream"
  }
];

const skills = [
  "React / Next.js",
  "React Native",
  "TypeScript",
  "Python",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Machine Learning",
  "Kafka",
];

const experience = [
  {
    role: "Mobile Application Developer Intern",
    company: "ZingVel",
    companyUrl: "http://www.zingvel.com/",
    period: "2024",
    description: "Developed mobile applications using React Native and contributed to the company's product development lifecycle.",
  },
];

function AboutSection() {
  return (
    <section className="grid gap-12 text-[#8d857a] md:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] md:items-start">
      <div className="space-y-6 text-sm leading-7 md:text-base md:leading-[1.85]">
        <p className="animate-fade-in delay-1">
          22. Application Developer and building{" "}
          <Link
            className="project-link underline decoration-[#cfc5b9] decoration-2 underline-offset-4"
            href="https://projf1.online/"
            target="_blank"
            rel="noreferrer"
          >
            projectF1
          </Link>
          — the ultimate experience for formula 1 fans.
        </p>
        <p className="animate-fade-in delay-2">
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
        <p className="animate-fade-in delay-3">
          I am a dedicated full-stack engineer who thrives on creating impactful and
          useful products. I approach development with a focus on both technical
          pragmatism and meticulous craft.
        </p>
        <p className="animate-fade-in delay-4">
          I have a strong command over building both mobile and web
          applications. Furthermore, I possess valuable knowledge in
          integrating and deploying Machine Learning models to enhance product
          functionality, as seen in my project work.
        </p>
        <p className="animate-fade-in delay-5">
          In my free time, you&apos;ll find me playing badminton, watching Formula 1 races
          on the weekends, and reading about philosophical content.
        </p>
        <p className="animate-fade-in delay-5">
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
      <div className="relative mx-auto aspect-3/4 w-full max-w-xs animate-fade-in delay-3 image-fade">
        <Image
          src="https://drive.google.com/uc?export=view&id=1NIcBlQ7yCFEPoCB92DrOm4thO6tUDVoL"
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

function SkillsSection() {
  return (
    <section className="text-[#8d857a]">
      <div className="space-y-8">
        <div className="animate-fade-in">
          <p className="text-sm uppercase tracking-[0.15em] text-[#a39990] mb-2">
            What I work with
          </p>
          <h2 className="text-2xl text-[#2f2822] font-light">
            Skills & Technologies
          </h2>
        </div>
        
        <p className="text-sm leading-7 md:text-base md:leading-[1.85] max-w-2xl animate-fade-in delay-1">
          I specialize in building full-stack applications with modern technologies. 
          Here are the tools and frameworks I work with daily.
        </p>

        <div className="flex flex-wrap gap-3 animate-fade-in delay-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="skill-tag"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const renderProjectDescription = (description: string) => {
    const trimmed = description.trim();
    const hasStructured =
      /\(a\)/i.test(trimmed) && /\(b\)/i.test(trimmed) && /\(c\)/i.test(trimmed);

    if (!hasStructured) {
      return (
        <p className="max-w-2xl text-sm leading-7 text-[#9c9187] md:text-base md:leading-7">
          {description}
        </p>
      );
    }

    const cleaned = trimmed.replace(/\r\n/g, "\n");
    const parts = cleaned
      .split(/\(\s*[abc]\s*\)\s*/i)
      .map((s) => s.trim())
      .filter(Boolean);

    const labels = ["a", "b", "c"] as const;

    return (
      <div className="max-w-2xl space-y-3 text-sm leading-7 text-[#9c9187] md:text-base md:leading-7">
        {parts.slice(0, 3).map((part, i) => (
          <div key={labels[i]} className="grid gap-1">
            <p className="text-xs uppercase tracking-[0.14em] text-[#a39990]">
              {labels[i]}
            </p>
            <p className="whitespace-pre-wrap">{part}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="space-y-16 text-[#8d857a]">
      <div className="animate-fade-in">
        <p className="text-sm uppercase tracking-[0.15em] text-[#a39990] mb-2">
          Featured work
        </p>
        <h2 className="text-2xl text-[#2f2822] font-light mb-8">
          Projects
        </h2>
      </div>
      
      {projects.map((project, index) => (
        <div key={project.title} className={`space-y-3 animate-fade-in delay-${index + 1}`}>
          <Link
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="project-link inline-flex items-center gap-2 text-lg font-normal text-black no-underline decoration-none md:text-xl"
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
          {renderProjectDescription(project.description)}
        </div>
      ))}
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="text-[#8d857a]">
      <div className="space-y-8">
        <div className="animate-fade-in">
          <p className="text-sm uppercase tracking-[0.15em] text-[#a39990] mb-2">
            Career journey
          </p>
          <h2 className="text-2xl text-[#2f2822] font-light">
            Experience
          </h2>
        </div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div 
              key={exp.company} 
              className={`flex gap-4 animate-fade-in delay-${index + 1}`}
            >
              <div className="flex flex-col items-center pt-2">
                <div className="timeline-dot" />
                <div className="timeline-line flex-1 mt-2" />
              </div>
              <div className="space-y-2 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-lg text-[#2f2822]">{exp.role}</h3>
                  <span className="text-sm text-[#a39990]">{exp.period}</span>
                </div>
                <Link
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link text-sm underline decoration-[#cfc5b9] decoration-2 underline-offset-4"
                >
                  {exp.company} ↗
                </Link>
                <p className="text-sm leading-7 text-[#9c9187] md:text-base md:leading-7 mt-2">
                  {exp.description}
                </p>
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
    <section className="text-[#8d857a]">
      <div className="space-y-8">
        <div className="animate-fade-in">
          <p className="text-sm uppercase tracking-[0.15em] text-[#a39990] mb-2">
            Get in touch
          </p>
          <h2 className="text-2xl text-[#2f2822] font-light">
            Let&apos;s Connect
          </h2>
        </div>

        <p className="text-sm leading-7 md:text-base md:leading-[1.85] max-w-2xl animate-fade-in delay-1">
          I&apos;m currently open to new opportunities. Whether you have a project in mind 
          or just want to chat, feel free to reach out!
        </p>

        <div className="flex flex-wrap gap-4 animate-fade-in delay-2">
          <a
            href="mailto:sharmadivyanshu265@gmail.com"
            className="contact-btn"
          >
            <span>✉</span>
            Send me an email
          </a>
          <Link
            href="https://www.linkedin.com/in/divyanshu-sharma-b9b534113/"
            target="_blank"
            rel="noreferrer"
            className="contact-btn"
          >
            <span>in</span>
            Connect on LinkedIn
          </Link>
        </div>

        <div className="section-divider" />

        <div className="animate-fade-in delay-3">
          <p className="text-sm text-[#a39990] mb-4">Or find me on</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-sm animated-underline text-[#8d857a] hover:text-[#6f655c]"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-8 text-sm text-[#a39990] animate-fade-in delay-4">
          <p>In my free time: 🏸 Badminton • 🏎️ F1 • 📚 Philosophy</p>
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section className="text-[#8d857a]">
      <div className="space-y-8">
        <div className="animate-fade-in">
          <p className="text-sm uppercase tracking-[0.15em] text-[#a39990] mb-2">
            My Resume
          </p>
          <h2 className="text-2xl text-[#2f2822] font-light">
            Resume / CV
          </h2>
        </div>

        <p className="text-sm leading-7 md:text-base md:leading-[1.85] max-w-2xl animate-fade-in delay-1">
          View my complete professional resume below.
        </p>

        <div className="animate-fade-in delay-2 w-full">
          <div className="relative w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
            <iframe
              src="https://drive.google.com/file/d/1kPsHonu9yurrcqwUA45GgAfil9HmjwGrwr28QFGMLIo/preview"
              className="w-full h-full border-2 border-[#d5cdc3] rounded-lg"
              title="Resume"
              style={{
                backgroundColor: '#fff',
              }}
              allow="autoplay"
            />
          </div>
          <div className="mt-4">
            <a
              href="https://drive.google.com/uc?export=download&id=1sS2sGZyXnQKOBNo8iuYYr_CzrJBRpgOP"
              className="contact-btn"
              target="_blank"
              rel="noreferrer"
            >
              <span>⬇</span>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderSection(activeTab: string) {
  switch (activeTab) {
    case "about":
      return <AboutSection />;
    case "skills":
      return <SkillsSection />;
    case "projects":
      return <ProjectsSection />;
    case "experience":
      return <ExperienceSection />;
    case "contact":
      return <ContactSection />;
    case "resume":
      return <ResumeSection />;
    default:
      return <AboutSection />;
  }
}

function HomeContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") ?? "about";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <div className="min-h-screen px-6 py-16 text-[#2f2822] md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <HeaderSection />
        
        <div className="flex w-full flex-col gap-16 md:flex-row md:items-start md:gap-28">
          <aside className="md:sticky md:top-16 self-start md:w-40 md:flex-none">
            <NavTabs activeTab={activeTab} onChange={setActiveTab} isHome={true} />
          </aside>
          <main className="flex-1 overflow-visible" key={activeTab}>
            <SmartTracingBeam className="pl-10 md:pl-12">
              {renderSection(activeTab)}
            </SmartTracingBeam>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HomeContent />
    </Suspense>
  );
}
