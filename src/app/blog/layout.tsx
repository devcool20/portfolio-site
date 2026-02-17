import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Divyanshu Sharma",
  description:
    "Articles, thoughts, and learnings by Divyanshu Sharma.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fbf7f2] px-6 py-16 text-[#2f2822] md:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-16 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-[#a39990] hover:text-[#6f655c] transition-colors"
            style={{ textDecoration: "none" }}
          >
            <span aria-hidden>←</span>
            <span>Back to portfolio</span>
          </Link>

          <h1 className="name-heading mt-6">Blog</h1>
          <p className="text-[#8d857a] text-lg md:text-xl mt-2">
            Thoughts, learnings &amp; insights
          </p>
        </header>

        {/* Page content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
