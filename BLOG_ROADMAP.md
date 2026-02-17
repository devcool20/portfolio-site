# Blog section — Notion CMS setup

Everything is implemented. Follow the steps below to connect Notion and start publishing.

---

## 1. One-time Notion setup (5 minutes)

### Step A — Create an integration

1. Go to **https://www.notion.so/my-integrations**
2. Click **"+ New integration"**
3. Give it a name (e.g. `portfolio-blog`), choose your workspace
4. Copy the **Internal Integration Secret** — this is your `NOTION_API_KEY`

### Step B — Create a database

Create a new **full-page database** in Notion with these columns:

| Property name | Type       | Purpose                                      |
|---------------|------------|----------------------------------------------|
| **Name**      | Title      | Post title (default column)                  |
| **Slug**      | Text       | URL slug, e.g. `my-first-post`               |
| **Date**      | Date       | Publish date                                  |
| **Excerpt**   | Text       | Short summary shown on the blog list          |
| **Published** | Checkbox   | Only checked posts appear on the site         |

> You can also add a **Cover image** to any page (Notion's built-in cover) — it will render on the blog.

### Step C — Share database with your integration

1. Open the database page
2. Click the **···** menu → **Connections** → search for your integration → **Confirm**

### Step D — Get the database ID

From the database URL:

```
https://www.notion.so/<workspace>/<DATABASE_ID>?v=...
```

Copy the 32-character hex ID before `?v=`.

### Step E — Add environment variables

**Locally:** create a file called `.env.local` in the project root:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**On Vercel:** go to your project → Settings → Environment Variables → add both.

---

## 2. How to write a new blog post

1. Open the Notion database
2. Add a new row
3. Fill in **Name**, **Slug**, **Date**, **Excerpt**
4. Write your content in the page body (headings, text, images, links, code, quotes, callouts, etc.)
5. Check the **Published** checkbox
6. Wait ~60 seconds — the site revalidates automatically via ISR

That's it. No code changes, no redeployment needed.

---

## 3. What's supported in blog posts

Everything you write in a Notion page body renders on your blog:

- **Headings** (H1, H2, H3) — styled to match your portfolio
- **Paragraphs** with **bold**, *italic*, ~~strikethrough~~, `inline code`, and [links]()
- **Bulleted lists** and **numbered lists** (with nesting)
- **To-do checkboxes**
- **Images** (uploaded or external) with optional captions
- **Code blocks** with language labels
- **Quotes** — styled with a left border accent
- **Callouts** — with emoji icon support
- **Toggles** — expandable/collapsible sections
- **Bookmarks** — link cards
- **Dividers**
- **Embeds** (YouTube, etc.)
- **Videos**

---

## 4. File structure (what was added)

```
src/
├── lib/
│   └── notion.ts              ← Notion API client & data fetching
├── components/
│   └── NotionRenderer.tsx     ← Renders Notion blocks to React
├── app/
│   ├── page.tsx               ← (modified) added "blog" link in nav
│   ├── globals.css            ← (modified) added blog-specific styles
│   └── blog/
│       ├── layout.tsx         ← Shared blog layout (header, back link)
│       ├── page.tsx           ← Blog list page  (/blog)
│       └── [slug]/
│           └── page.tsx       ← Single post page (/blog/my-post)
.env.example                   ← Template for env variables
```

---

## 5. Design details

- **Font:** Inherits your portfolio font (same root layout)
- **Heading style:** Small uppercase label (date/category) + large lightweight title — matching Skills, Projects, Experience sections
- **Images:** Rounded corners, subtle border, optional captions
- **Links:** Uses your existing `project-link` underline style throughout
- **Colors:** All blog text, headings, and accents use the same palette (`#2f2822`, `#8d857a`, `#a39990`, `#d5cdc3`)
- **Navigation:** "blog" tab added to the portfolio sidebar with the same hand-drawn hover effect
- **ISR:** Pages revalidate every 60 seconds so new Notion content appears without redeploying
