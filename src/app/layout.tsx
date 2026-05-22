import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const franklinGothic = localFont({
  src: [
    {
      path: "../../public/fonts/franklin-gothic/Franklin Gothic Condensed.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/franklin-gothic/FranklinGothic.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/franklin-gothic/FranklinGothicITALIC.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-franklin",
  display: "swap",
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
    <html lang="en" className={`${jakarta.variable} ${franklinGothic.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-[#F7F8F4] text-[#111111] antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

