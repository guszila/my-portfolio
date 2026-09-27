"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={true}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
