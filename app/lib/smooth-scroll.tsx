"use client";

import { features } from "@/lib/config";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

const LENIS_OPTIONS = {
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);

    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    function isElement(target: EventTarget | null): target is Element {
      return target !== null && typeof target === "object" && "closest" in target;
    }

    function isHTMLAnchorElement(element: Element): element is HTMLAnchorElement {
      return element.tagName === "A";
    }

    function handleAnchorClick(e: MouseEvent): void {
      if (!isElement(e.target)) return;

      const anchor = e.target.closest('a[href^="#"]');
      if (anchor === null || !isHTMLAnchorElement(anchor)) return;

      const href = anchor.getAttribute("href");
      if (href === null || href === "#") return;

      const element = document.getElementById(href.slice(1));
      if (element === null) return;

      e.preventDefault();
      lenis.scrollTo(element, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
