"use client";

import { ReducedMotionProvider } from "@/lib/motion";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { SmoothScroll } from "./smooth-scroll";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReducedMotionProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}
