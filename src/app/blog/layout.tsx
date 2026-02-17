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
        <main>{children}</main>
      </div>
    </div>
  );
}
