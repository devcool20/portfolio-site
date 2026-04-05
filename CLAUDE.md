# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Divyanshu Sharma's personal portfolio site built with Next.js 16 (App Router), featuring a 3D F1-themed cockpit hero section, blog powered by Notion CMS, and GSAP scroll animations.

## Key Commands

```bash
npm run dev       # Start dev server (Next.js 16, runs on localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS v4, custom CSS in `globals.css`
- **3D**: Three.js + React Three Fiber + drei (F1 cockpit hero scene)
- **Animations**: GSAP with ScrollTrigger
- **Blog CMS**: Notion API via `@notionhq/client` — database-driven blog with `revalidate = 60`
- **State**: Zustand (available, used for theme/state management)

### Directory Structure

```
src/
  app/
    layout.tsx          # Root layout with fonts (Space Grotesk, Manrope, Geist Mono)
    page.tsx            # Homepage: image hero + section components (About, Skills, Projects, Experience, Contact, Blog CTA, Resume)
    globals.css         # F1 racing dark theme variables, component classes (f1-card, f1-btn, etc.)
    loading.tsx         # Global loading UI
    blog/
      layout.tsx        # Blog layout with sidebar nav + SmartTracingBeam
      page.tsx          # Blog listing page (server component, fetches from Notion)
      loading.tsx       # Blog loading UI
      [slug]/page.tsx   # Individual post page (server component, renders Notion blocks)
      [slug]/loading.tsx
  components/
    hero/               # 3D F1 cockpit scene (CockpitHero, NeonTunnel, F1PostProcessing, F1Navbar)
    ui/                 # TracingBeam, GlobalBackgroundEffects
    NotionRenderer.tsx  # Renders Notion blocks to React components
    NavTabs.tsx, HeaderSection.tsx, ShareButton.tsx, HandDrawnButton.tsx, HandDrawnGifBox.tsx
  lib/
    data.ts             # Static data: nav tabs, social links
    notion.ts           # Notion API client: getBlogPosts, getPostBySlug, getAllBlocks
```

### Key Patterns

- **Homepage** (`app/page.tsx`) uses a client component with a hero takeover pattern: the 3D cockpit hero displays first, then fades into scroll-based sections with a navbar. Sections are defined as inline components (AboutSection, SkillsSection, etc.) with content hardcoded in the file.
- **Blog** uses Notion as CMS. Requires `NOTION_API_KEY` and `NOTION_DATABASE_ID` env vars. Posts are fetched from a Notion database with properties: Name (title), Slug (rich_text), Excerpt (rich_text), Date (date), Published (checkbox), and cover image. The `NotionRenderer` recursively renders blocks.
- **Animations**: GSAP ScrollTrigger is used with class-based selectors (`.gsap-reveal`, `.gsap-skill-item`, `.gsap-project-card`, `.gsap-exp-item`). All GSAP animations are wrapped in `gsap.context()` with cleanup.
- **Styling**: F1 racing dark theme with CSS custom variables. Uses utility classes in `globals.css` (`.f1-card`, `.f1-btn`, `.f1-skill-tag`, `.section-label`, etc.) rather than component-level styling.

### Environment Variables

- `NOTION_API_KEY` — Notion API integration token
- `NOTION_DATABASE_ID` — Notion database ID for blog posts
- `NEXT_PUBLIC_SITE_URL` — Site URL (defaults to `http://localhost:3000`)
