"use client";

import { useRevealOnScroll } from "@/lib/useReveal";

/**
 * Renders nothing. Exists only to invoke `useRevealOnScroll` once on mount
 * so the global IntersectionObserver is wired up.
 *
 * Kept separate from <CustomCursor /> so the two responsibilities are easy
 * to reason about independently.
 */
export function RevealRoot() {
  useRevealOnScroll();
  return null;
}
