"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface UseActiveSectionOptions {
  sectionIds: string[];
  defaultSection?: string;
  rootMargin?: string;
}

export function useActiveSection({
  sectionIds,
  defaultSection = "home",
  rootMargin = "-20% 0px -55% 0px",
}: UseActiveSectionOptions) {
  // The server and the client's first render must use the same section.
  // URL hash and scroll position are synchronized after hydration below.
  const [activeSection, setActiveSectionState] = useState(defaultSection);

  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setActiveSection = useCallback((id: string) => {
    setActiveSectionState(id);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    // Lock observer updates temporarily so fast smooth scrolling doesn't strobe intermediate sections
    isProgrammaticScroll.current = true;
    setActiveSectionState(id);

    // Update URL hash smoothly without jump
    if (window.history.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Release lock after smooth scroll settles (~700ms)
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    // Track active ratios and positions for each section
    const visibleEntries = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleEntries.set(entry.target.id, entry);
          } else {
            visibleEntries.delete(entry.target.id);
          }
        });

        if (visibleEntries.size === 0) {
          // If scrolled all the way to the top
          if (window.scrollY < 120) {
            setActiveSectionState(sectionIds[0] || "home");
          }
          return;
        }

        // When multiple sections intersect the zone, select the one closest to the active zone top
        let bestCandidate: string | null = null;
        let minDistanceToTop = Infinity;

        visibleEntries.forEach((entry, id) => {
          const top = entry.boundingClientRect.top;
          const absTop = Math.abs(top);
          if (absTop < minDistanceToTop) {
            minDistanceToTop = absTop;
            bestCandidate = id;
          }
        });

        if (bestCandidate) {
          const nextSection = bestCandidate;
          setActiveSectionState((current) =>
            current === nextSection ? current : nextSection
          );
        }
      },
      {
        rootMargin,
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    // Observe all valid section DOM nodes
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionIds.includes(hash)) {
        setActiveSectionState(hash);
      }
    };

    const initialHashFrame = window.requestAnimationFrame(handleHashChange);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.cancelAnimationFrame(initialHashFrame);
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sectionIds, rootMargin]);

  return {
    activeSection,
    setActiveSection,
    scrollToSection,
  };
}
