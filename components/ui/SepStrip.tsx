import type { ReactNode } from "react";
import styles from "./SepStrip.module.css";

type Item =
  /** Plain text node. */
  | { kind: "text"; node: ReactNode }
  /** Dashed-line connector that flex-grows to fill space. */
  | { kind: "mid" };

type Props = {
  /** Ordered items rendered left-to-right inside the strip. */
  items: Item[];
};

/**
 * Thin monospace strip used to separate major sections — gives the page
 * a visual rhythm and hides a few bits of "test report" metadata between
 * blocks.
 *
 * Items are flexible: text fragments are interleaved with `mid` connectors
 * that fill the space between them.
 *
 *   <SepStrip items={[
 *     { kind: "text", node: <><b>// 01</b> · about.module</> },
 *     { kind: "mid" },
 *     { kind: "text", node: <>uptime: <span className="ok">99.97%</span></> },
 *   ]} />
 */
export function SepStrip({ items }: Props) {
  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={styles.inner}>
        {items.map((it, i) =>
          it.kind === "mid" ? (
            <span key={i} className={styles.mid} />
          ) : (
            <span key={i}>{it.node}</span>
          ),
        )}
      </div>
    </div>
  );
}

/** Re-export styled span helpers so callers can keep markup colocated. */
export const sepClass = {
  ok: "ok",
  accent: "accent",
} as const;
