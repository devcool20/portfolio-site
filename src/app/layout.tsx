import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalBackgroundEffects from "@/components/ui/global-background-effects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen overflow-x-hidden bg-[#fbf7f2] antialiased`}
      >
        <GlobalBackgroundEffects />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
