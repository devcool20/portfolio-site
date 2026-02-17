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
    title: `${data.post.title} — Divyanshu Sharma`,
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

  // In production, use the actual domain. For dev, localhost is fine.
  // You can set NEXT_PUBLIC_SITE_URL in env if you want.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const postUrl = `${siteUrl}/blog/${slug}`;

  return (
    <article className="max-w-3xl mx-auto">
      {/* ---- Header ---- */}
      <header className="mb-12 animate-fade-in text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[#a39990] hover:text-[#6f655c] transition-colors mb-8"
          style={{ textDecoration: "none" }}
        >
          <span aria-hidden>←</span>
          <span>Back to blog</span>
        </Link>

        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-[#a39990]">
            {post.date
              ? new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Draft"}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2f2822] leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg md:text-xl text-[#8d857a] leading-relaxed max-w-2xl mx-auto mt-4">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* ---- Cover image ---- */}
      {post.cover && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#e8e0d8] mb-12 animate-fade-in delay-1 bg-[#f0ebe4]">
          <img
            src={post.cover}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* ---- Body (Notion blocks) ---- */}
      <div className="animate-fade-in delay-2 prose prose-stone max-w-none">
        <NotionRenderer blocks={blocks} />
      </div>

      {/* ---- Footer ---- */}
      <footer className="mt-20 pt-10 border-t border-[#e8e0d8] animate-fade-in delay-3">
        <div className="flex justify-between items-center">
          <Link 
            href="/blog" 
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#8d857a] hover:text-[#2f2822] transition-colors no-underline"
          >
            <span aria-hidden className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to all posts
          </Link>
          <div className="flex gap-4">
            <ShareButton title={post.title} url={postUrl} />
          </div>
        </div>
      </footer>
    </article>
  );
}
