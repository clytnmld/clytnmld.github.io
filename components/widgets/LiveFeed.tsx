"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LiveFeed.module.css";

/** Mock test-run entries that get rotated into the feed. */
const ENTRIES: Array<{ ok: boolean; name: string; info: string }> = [
  { ok: true,  name: "auth.login.spec",        info: "4 assertions" },
  { ok: true,  name: "dashboard.render",       info: "1.2s" },
  { ok: false, name: "payment.rollback",       info: "FAIL → BUG-0042" },
  { ok: true,  name: "cart.empty_state",       info: "edge case" },
  { ok: true,  name: "api/users.contract",     info: "200 ok" },
  { ok: true,  name: "mobile.android.slow_3g", info: "4.8s" },
  { ok: true,  name: "a11y.tab_order",         info: "wcag 2.1 AA" },
  { ok: false, name: "checkout.expired_token", info: "flake? rerun" },
  { ok: true,  name: "checkout.expired_token", info: "rerun pass" },
  { ok: true,  name: "regression.full",        info: "96% pass" },
  { ok: true,  name: "i18n.id_locale",         info: "ok" },
  { ok: true,  name: "github.actions.ci",      info: "green" },
];

/** Max number of lines visible at once. Older lines slide out. */
const MAX_LINES = 5;
/** Interval between new feed pushes after the initial burst. */
const PUSH_INTERVAL_MS = 2600;

type FeedLine = {
  /** Unique key for React reconciliation. */
  id: number;
  ok: boolean;
  name: string;
  timestamp: string;
};

/**
 * Floating bottom-right "tail -f tests.log" widget. Rotates through mock
 * test entries to give the page a sense of being live.
 *
 * Hidden on touch / reduced-motion. Minimizable via the "–" / "+" button.
 */
export function LiveFeed() {
  const [lines, setLines] = useState<FeedLine[]>([]);
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const counter = useRef(0);
  const cursor = useRef(0);

  useEffect(() => {
    // Same opt-outs as the design source: skip on touch + reduced-motion.
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = matchMedia("(max-width: 640px)").matches;
    if (reduced || narrow) return;

    function pushLine() {
      const e = ENTRIES[cursor.current % ENTRIES.length];
      cursor.current += 1;
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const ts = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      setLines((prev) => {
        const next = [
          ...prev,
          { id: counter.current++, ok: e.ok, name: e.name, timestamp: ts },
        ];
        // Trim from the front so we never exceed MAX_LINES.
        return next.length > MAX_LINES
          ? next.slice(next.length - MAX_LINES)
          : next;
      });
    }

    // Reveal after a short delay so the widget doesn't compete with the hero.
    const showTimer = setTimeout(() => {
      setVisible(true);
      pushLine();
      pushLine();
      pushLine();
    }, 1400);
    const tick = setInterval(pushLine, PUSH_INTERVAL_MS);

    return () => {
      clearTimeout(showTimer);
      clearInterval(tick);
    };
  }, []);

  return (
    <aside
      className={[
        styles.feed,
        visible ? styles.in : "",
        minimized ? styles.min : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Live test feed"
    >
      <div className={styles.head}>
        <span className={styles.title}>
          <span className={styles.pulse} aria-hidden="true" />
          <span>tail ‑f tests.log</span>
        </span>
        <button
          type="button"
          className={styles.minBtn}
          onClick={() => setMinimized((m) => !m)}
          aria-label={minimized ? "Expand" : "Minimize"}
        >
          {minimized ? "+" : "–"}
        </button>
      </div>
      <div className={styles.body}>
        {lines.map((l) => (
          <div key={l.id} className={`${styles.line} ${styles.in}`}>
            <span className={styles.ts}>[{l.timestamp}]</span>
            <span className={l.ok ? styles.ok : styles.ng}>
              {l.ok ? "✓" : "✗"}
            </span>
            <span className={styles.nm}>{l.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
