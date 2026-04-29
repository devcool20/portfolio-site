/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
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
    <article className="slate-section blog-post-section accent-violet">
      <div className="slate-heading">
        <span>01</span>
        <p>Article</p>
        <div className="slate-gif-frame">
          <img src="/gif/f1(2).gif" alt="" loading="lazy" />
        </div>
      </div>

      <div className="slate-page blog-slate-page">
        <div className="slate-rule" aria-hidden="true" />

        <header className="blog-post-slate-header">
          {post.cover ? (
            <div className="blog-post-cover">
              <img src={post.cover} alt="" loading="lazy" />
            </div>
          ) : null}

          <div>
            <p className="slate-kicker">
              {post.date
                ? new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Draft"}
            </p>
            <h1 className="slate-title">{post.title}</h1>
            {post.excerpt ? (
              <div className="slate-line" style={{ "--write": 1 } as CSSProperties}>
                <p className="slate-line-copy">{post.excerpt}</p>
              </div>
            ) : null}

            <div className="slate-actions blog-post-actions">
              <Link href="/blog" className="slate-choice">
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
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="blog-post-body-slate">
          <NotionRenderer blocks={blocks} surface="paper" />
        </div>
      </div>
    </article>
  );
}
