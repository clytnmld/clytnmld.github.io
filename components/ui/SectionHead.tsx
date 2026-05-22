import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";
import { Reveal } from "../effects/Reveal";

type Props = {
  /** Big outlined glyph rendered behind the heading (e.g. "01", "A"). */
  watermark: string;
  /** Small monospace eyebrow (e.g. "01 · About"). */
  tag: string;
  /**
   * Section heading. We accept ReactNode so callers can drop in <br/> or
   * accent spans without us prescribing markup.
   */
  title?: ReactNode;
  /** Optional supporting paragraph below the title. */
  lede?: ReactNode;
  /** When true, the eyebrow uses the fail-red tone (Exhibit A section). */
  fail?: boolean;
};

/**
 * The repeating "watermark + eyebrow + title + lede" block that opens every
 * major section. Keeps spacing, watermark positioning and reveal staggering
 * consistent across the site.
 */
export function SectionHead({ watermark, tag, title, lede, fail }: Props) {
  return (
    <Reveal className={`${styles.head} ${fail ? styles.failTag : ""}`.trim()}>
      <span className={styles.watermark} aria-hidden="true">
        {watermark}
      </span>
      <div className={`${styles.tag} sectionTag`}>{tag}</div>
      {title && <h2 className="sectionTitle">{title}</h2>}
      {lede && <p className="sectionLede">{lede}</p>}
    </Reveal>
  );
}
