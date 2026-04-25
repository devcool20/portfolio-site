/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts, getPostBySlug } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import ShareButton from "@/components/ShareButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  if (!data) return { title: "Post not found" };
  return {
    title: `${data.post.title} - Divyanshu Sharma`,
    description: data.post.excerpt || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  if (!data) notFound();

  const { post, blocks } = data;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const postUrl = `${siteUrl}/blog/${slug}`;

  return (
    <article className="blog-post-page pb-12 md:pb-16">
      <section className="blog-reveal">
        <div className="telemetry-panel blog-post-shell">
          <header className="blog-post-compact-header">
            {post.cover ? (
              <div className="blog-post-thumb">
                <img src={post.cover} alt="" className="blog-post-thumb-image" />
              </div>
            ) : null}

            <div className="blog-post-meta">
              <div className="section-label">Article</div>
              <time className="blog-post-date" dateTime={post.date ?? undefined}>
                {post.date
                  ? new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Draft"}
              </time>
              <h1 className="blog-post-heading compact">{post.title}</h1>
              {post.excerpt ? <p className="blog-post-lead compact">{post.excerpt}</p> : null}

              <div className="blog-post-actions">
                <Link href="/blog" className="blog-stream-cta" style={{ textDecoration: "none" }}>
                  <span className="signal-dot" />
                  All posts
                </Link>
                <div className="blog-share-wrap">
                  <ShareButton title={post.title} url={postUrl} />
                </div>
              </div>
            </div>
          </header>

          {post.mediaFiles.length > 0 ? (
            <div className="blog-inline-media">
              {post.mediaFiles.slice(0, 4).map((url, index) => (
                <div key={index} className="blog-inline-media-card">
                  <img
                    src={url}
                    alt={`${post.title} media ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div className="blog-canvas-f1 blog-post-body compact">
            <NotionRenderer blocks={blocks} surface="f1" />
          </div>
        </div>
      </section>
    </article>
  );
}
