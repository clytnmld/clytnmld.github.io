"use client";

import { useEffect } from "react";

/**
 * Walks the DOM once on mount and attaches an IntersectionObserver to every
 * element marked `[data-reveal]`. When an element enters the viewport it gets
 * an `.in` class — the styles for the entrance animation live in globals.css.
 *
 * One global observer is cheaper than one-observer-per-component and keeps the
 * <Reveal/> component a thin presentational wrapper.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
