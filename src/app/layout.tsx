import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";

const fontFranklinCond = localFont({
  src: "../../public/fonts/franklin-gothic/Franklin Gothic Condensed.ttf",
  variable: "--font-franklin-cond",
  display: "swap",
});

const fontFranklinReg = localFont({
  src: "../../public/fonts/franklin-gothic/FranklinGothic.ttf",
  variable: "--font-franklin-reg",
  display: "swap",
});

const fontFranklinItal = localFont({
  src: "../../public/fonts/franklin-gothic/FranklinGothicITALIC.ttf",
  variable: "--font-franklin-ital",
  display: "swap",
});

const fontFranklinOutline = localFont({
  src: "../../public/fonts/franklin-gothic/fgwo____.ttf",
  variable: "--font-franklin-outline",
  display: "swap",
});

const fontFranklinGo = localFont({
  src: "../../public/fonts/franklin-gothic/FRANKGO.ttf",
  variable: "--font-franklin-go",
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
    <html
      lang="en"
      className={`${fontFranklinCond.variable} ${fontFranklinReg.variable} ${fontFranklinItal.variable} ${fontFranklinOutline.variable} ${fontFranklinGo.variable}`}
    >
      <body className="relative min-h-screen overflow-x-hidden bg-[#F7F8F4] text-[#111111] antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

