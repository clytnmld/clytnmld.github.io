import styles from "./Exhibit.module.css";
import { Reveal } from "../effects/Reveal";
import { SectionHead } from "../ui/SectionHead";

/**
 * "Exhibit A — caught in the wild": a deliberately-broken mock dashboard
 * (with an un-rendered `${user.name}` template literal) paired with a
 * QA-style bug report. The whole section is a single visual gag with a
 * punchline ("Yeah — I catch things like this before the user does.").
 *
 * The section head uses the `fail` variant of SectionHead so the eyebrow
 * is red instead of accent — signals "this is the broken one."
 */
export function Exhibit() {
  return (
    <section
      className={styles.section}
      id="exhibit"
      aria-label="Exhibit A — intentional bug"
    >
      <div className="wrap">
        <SectionHead
          fail
          watermark="A"
          tag="Exhibit A · caught in the wild"
          title={
            <>
              a bug, on purpose.
              <br />
              so you can see what i actually do.
            </>
          }
          lede={
            <>
              There&apos;s a real, working bug in the mock below — the kind I
              catch most weeks. Look at the greeting before you read the
              report on the right.
            </>
          }
        />

        <div className={styles.grid}>
          <BugSpecimen />
          <BugReport />
        </div>
      </div>
    </section>
  );
}

/** The fake "broken" dashboard chrome on the left. */
function BugSpecimen() {
  return (
    <Reveal className={styles.specimen}>
      <div className={styles.specHead}>
        <div className={styles.dots} aria-hidden="true">
          <i /><i /><i />
        </div>
        <span>app · /dashboard</span>
        <span>v2.4.1-rc.3</span>
      </div>
      <div className={styles.specBody}>
        <div className={styles.annot} aria-hidden="true">
          live · unfixed
        </div>
        <div
          className={styles.app}
          role="img"
          aria-label="A mock dashboard greeting where the template literal user.name was not interpolated, showing the literal text dollar-sign brace user dot name brace instead of the user's name."
        >
          <div className={styles.eyebrow}>DASHBOARD</div>
          <h3 className={styles.greeting}>
            Welcome back, <span className={styles.target}>{"${user.name}"}</span>{" "}
            👋
          </h3>
          <p className={styles.sub}>
            Here&apos;s what shipped while you were away.
          </p>
          <button className={styles.button} type="button" tabIndex={-1}>
            View activity →
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/** The QA-style bug report card on the right. */
function BugReport() {
  return (
    <Reveal as="article" delay={1} className={styles.report}>
      <header className={styles.reportHead}>
        <span className={styles.id}>BUG-0042</span>
        <span className={styles.sep}>·</span>
        <span>Greeting</span>
        <span className={styles.sep}>·</span>
        <span className={styles.sev}>SEV: P1</span>
      </header>

      <h3>Unrendered template literal in user-facing greeting</h3>

      <ul className={styles.steps}>
        <li>
          <b>Found</b>
          <span>visual scan, pre-deploy review</span>
        </li>
        <li>
          <b>Where</b>
          <span>Dashboard.tsx · L24 · greeting binding</span>
        </li>
        <li>
          <b>Expected</b>
          <span className={styles.green}>
            &ldquo;Welcome back, Clayton 👋&rdquo;
          </span>
        </li>
        <li>
          <b>Actual</b>
          <span className={styles.red}>
            &ldquo;Welcome back, {"${user.name}"} 👋&rdquo;
          </span>
        </li>
      </ul>

      <div className={styles.verdict}>
        Yeah — <em>I catch things like this</em> before the user does.
      </div>

      <div className={styles.stamps}>
        <span>✓ filed</span>
        <span>✓ reproduced</span>
        <span>✓ test written</span>
      </div>
    </Reveal>
  );
}
