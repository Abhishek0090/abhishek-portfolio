import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.headline}`,
  description: profile.intro,
  openGraph: { title: profile.name, description: profile.intro, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#08070d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <div className="grain" aria-hidden />
        <div className="gridlines" aria-hidden />
        <ScrollProgress />
        <Cursor />
        <Nav />
        <CommandPalette />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
