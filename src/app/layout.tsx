import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divyanshu Sharma — Engineer & Builder",
  description:
    "Portfolio website for Divyanshu Sharma featuring an about summary, selected projects, and social links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative min-h-screen overflow-x-hidden bg-[#060608] antialiased"
      >
        {children}
      </body>
    </html>
  );
}
