import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TerminalProvider } from "@/components/terminal/TerminalContext";
import { TerminalDrawer } from "@/components/terminal/TerminalDrawer";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import { Header } from "@/components/layout/Header";
import { NavDock } from "@/components/layout/NavDock";
import { Footer } from "@/components/layout/Footer";
import { developerData } from "@/data/developer";

// Suppress React 19 false-positive development warning caused by next-themes injecting inline FOUC script
if (process.env.NODE_ENV === "development") {
  const currentConsoleError = console.error as unknown as {
    (...args: unknown[]): void;
    __nextThemesPatched?: boolean;
  };

  if (!currentConsoleError.__nextThemesPatched) {
    const originalError = console.error;
    const patchedError = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Encountered a script tag while rendering React component")
      ) {
        return;
      }
      originalError(...args);
    };
    (patchedError as unknown as { __nextThemesPatched?: boolean }).__nextThemesPatched = true;
    console.error = patchedError;
  }
}

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
    developerData.name,
    developerData.nickname,
    developerData.role,
    developerData.education,
    developerData.university,
    developerData.interest,
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="bg-transparent text-foreground antialiased font-sans min-h-screen flex flex-col relative selection:bg-accent/20 selection:text-accent">
        <ThemeProvider>
          <TerminalProvider>
            <InteractiveBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <div className="flex-1 flex flex-col">{children}</div>
              <Footer />
              <NavDock />
            </div>
            <TerminalDrawer />
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
