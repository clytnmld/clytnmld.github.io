"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

/**
 * Selectors whose hover state should grow the ring + shrink the dot.
 * Add new interactive selectors here rather than mutating the cursor
 * component itself.
 */
const HOVER_SELECTORS = [
  "a",
  "button",
  "input",
  "textarea",
  "label",
  ".principle",
  ".skill-group",
  ".skill-list li",
  ".project",
  ".contact-list li",
  ".stack span",
  ".pill",
].join(", ");

/**
 * Two-element custom cursor (amber dot + lagging ring with mix-blend-difference).
 * Disables itself on coarse pointers and for users who prefer reduced motion,
 * letting the native cursor take over.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Bail out on touch devices / reduced motion — restore the OS cursor.
    const coarse = matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) {
      dot.style.display = "none";
      ring.style.display = "none";
      document.body.style.cursor = "auto";
      return;
    }

    // Track the mouse target (mx, my) and the lagging ring position (rx, ry).
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };
    const onDown = () => ring.classList.add(styles.click);
    const onUp = () => ring.classList.remove(styles.click);
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "0.55";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    // Ring easing — 14% catch-up per frame feels natural without being floaty.
    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Wire hover-grow to every interactive element on the page.
    const hoverEls = Array.from(document.querySelectorAll<HTMLElement>(HOVER_SELECTORS));
    const handleEnter = () => {
      dot.classList.add(styles.hover);
      ring.classList.add(styles.hover);
    };
    const handleLeave = () => {
      dot.classList.remove(styles.hover);
      ring.classList.remove(styles.hover);
    };
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div className={styles.dot} ref={dotRef} aria-hidden="true" />
      <div className={styles.ring} ref={ringRef} aria-hidden="true" />
    </>
  );
}
