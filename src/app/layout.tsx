import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SystemHud } from "@/components/layout/SystemHud";
import { Header } from "@/components/layout/Header";
import { NavDock } from "@/components/layout/NavDock";
import { Footer } from "@/components/layout/Footer";
import { developerData } from "@/data/developer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${developerData.name} | ${developerData.role}`,
  description: `${developerData.statement} ${developerData.substatement}`,
  keywords: [
    "Full Stack Developer",
    "Web Applications",
    "Data Systems",
    "Next.js",
    "React",
    "TypeScript",
    "Planning System",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-[#090d16] text-slate-200 antialiased font-sans min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
        <SystemHud />
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <NavDock />
      </body>
    </html>
  );
}
