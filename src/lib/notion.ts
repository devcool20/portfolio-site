import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
const notion = process.env.NOTION_API_KEY
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null;

const databaseId = process.env.NOTION_DATABASE_ID || "";

/**
 * Resolve database ID to data source ID (required for Notion API 2025-09-03).
 * If the env has a database ID, we fetch the database and use its first data source.
 */
async function getDataSourceId(): Promise<string | null> {
  if (!notion || !databaseId) return null;
  try {
    const db = await notion.databases.retrieve({
      database_id: databaseId.trim(),
    });
    if (db.object === "database" && "data_sources" in db && db.data_sources?.length) {
      return db.data_sources[0].id;
    }
    return databaseId.trim();
  } catch {
    return databaseId.trim();
  }
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type NotionBlock = BlockObjectResponse & {
  _children?: NotionBlock[];
};

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  cover: string | null;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getPlainText(
  prop: PageObjectResponse["properties"][string],
  type: "title" | "rich_text",
): string {
  if (type === "title" && prop.type === "title") {
    return prop.title.map((t) => t.plain_text).join("");
  }
  if (type === "rich_text" && prop.type === "rich_text") {
    return prop.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

function getCover(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  if (page.cover.type === "external") return page.cover.external.url;
  if (page.cover.type === "file") return page.cover.file.url;
  return null;
}

function pageToPost(page: PageObjectResponse): BlogPost {
  const p = page.properties;
  return {
    id: page.id,
    title: getPlainText(p.Name, "title"),
    slug: getPlainText(p.Slug, "rich_text"),
    excerpt: getPlainText(p.Excerpt, "rich_text"),
    date:
      p.Date?.type === "date" && p.Date.date ? p.Date.date.start : "",
    cover: getCover(page),
  };
}

/* ------------------------------------------------------------------ */
/*  Fetch all blocks (recursive)                                       */
/* ------------------------------------------------------------------ */

async function getAllBlocks(blockId: string): Promise<NotionBlock[]> {
  if (!notion) return [];

  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const raw of res.results) {
      if (!("type" in raw)) continue;
      const block = raw as NotionBlock;

      if (
        block.has_children &&
        block.type !== "child_page" &&
        block.type !== "child_database"
      ) {
        block._children = await getAllBlocks(block.id);
      }

      blocks.push(block);
    }

    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!notion || !databaseId) return [];

  try {
    const dataSourceId = await getDataSourceId();
    if (!dataSourceId) return [];

    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    return res.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map(pageToPost);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Notion] getBlogPosts failed:", err);
    }
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
): Promise<{ post: BlogPost; blocks: NotionBlock[] } | null> {
  if (!notion || !databaseId) return null;

  try {
    const dataSourceId = await getDataSourceId();
    if (!dataSourceId) return null;

    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "Published", checkbox: { equals: true } },
        ],
      },
    });

    const page = res.results[0];
    if (!page || !("properties" in page)) return null;

    const post = pageToPost(page as PageObjectResponse);
    const blocks = await getAllBlocks(page.id);

    return { post, blocks };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Notion] getPostBySlug failed:", err);
    }
    return null;
  }
}
