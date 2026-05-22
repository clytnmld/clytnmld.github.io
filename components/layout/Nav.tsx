"use client";

import { useState } from "react";
import styles from "./Nav.module.css";
import { NAV_LINKS, SITE } from "@/data/meta";

/**
 * Sticky top nav with a pulsing "I'm available" status dot and an inline
 * hamburger that swaps in below 640px.
 *
 * Renders client-side because we toggle the mobile menu's open state and
 * close it when a link is tapped.
 */
export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <a className={styles.brand} href="#top">
          <span className={styles.brandDot} aria-hidden="true" />
          <b>{SITE.name}</b>
          <span>{SITE.brandTagline}</span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className={styles.menuBtn}
          type="button"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span aria-hidden="true" />
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
