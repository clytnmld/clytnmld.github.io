import styles from "./Hero.module.css";
import { Reveal } from "../effects/Reveal";
import { Button } from "../ui/Button";
import { HERO_PILLS, HERO_STATUS } from "@/data/meta";

/**
 * Top-of-page hero.
 *
 * Layout:
 *   ┌───────────────────────────┬─────────────────────┐
 *   │ pills · name · tagline    │  status card        │
 *   │ CTAs                      │  (test result UI)   │
 *   └───────────────────────────┴─────────────────────┘
 *
 * Four corner crosshairs sit absolutely inside the section for a
 * "technical drawing" feel.
 */
export function Hero() {
  return (
    <section className={styles.hero}>
      <span className={`${styles.crosshair} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.crosshair} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.crosshair} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.crosshair} ${styles.br}`} aria-hidden="true" />

      <div className="wrap">
        <div className={styles.grid}>
          {/* Left column — pills, name, tagline, CTAs */}
          <div>
            <Reveal className={styles.meta}>
              {HERO_PILLS.map((p) => (
                <span
                  key={p.label}
                  className={`pill${"ok" in p && p.ok ? " ok" : ""}`}
                >
                  {p.label}
                </span>
              ))}
            </Reveal>

            <Reveal as="h1" delay={1} className={styles.name}>
              Clayton
              <br />
              Mildy
              <span className={styles.amp}>.qa</span>
            </Reveal>

            <Reveal as="p" delay={2} className={styles.tagline}>
              I break things on purpose so your users{" "}
              <em>don&apos;t have to</em> by accident. self-taught, deeply nosy.
            </Reveal>

            <Reveal delay={3} className={styles.ctaRow}>
              <Button href="#work" variant="primary" arrow="→">
                View My Work
              </Button>
              <Button href="#contact" variant="ghost" arrow="↗">
                Contact Me
              </Button>
            </Reveal>
          </div>

          {/* Right column — test summary card */}
          <Reveal as="aside" delay={4} className={styles.card}>
            <div className={styles.head}>
              <div className={styles.dots} aria-hidden="true">
                <i /><i /><i />
              </div>
              <div className={styles.file}>{HERO_STATUS.file}</div>
            </div>

            {HERO_STATUS.rows.map((r) => (
              <div className={styles.row} key={r.k}>
                <span className="k">{r.k}</span>
                <span className={`v ${r.tone ?? ""}`}>{r.v}</span>
              </div>
            ))}

            <div className={styles.barRow}>
              <div className={styles.row}>
                <span className="k">{HERO_STATUS.bar.k}</span>
                <span className={`v ${HERO_STATUS.bar.tone}`}>
                  {HERO_STATUS.bar.v}
                </span>
              </div>
              <div className={styles.bar} aria-hidden="true"><i /></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
