"use client";

import type { ReactNode } from "react";
import { ReducedMotionProvider } from "@/lib/motion";
import { SmoothScroll } from "./smooth-scroll";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReducedMotionProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}
