import type { Metadata } from "next";
import { IBM_Plex_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";

// Technical engineering font for body text (matches technical drawing aesthetic)
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-technical",
  display: "swap",
});

// Alternative technical font for headings
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-technical-alt",
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
    <html lang="en">
      <body
        className={`${ibmPlexMono.variable} ${courierPrime.variable} relative min-h-screen overflow-x-hidden bg-[#060608] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
