import styles from "./About.module.css";
import { Reveal } from "../effects/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { ABOUT_META, PRINCIPLES, EDU_RECEIPT } from "@/data/meta";

/**
 * About section.
 *
 * Layout: left meta column ("Role / Company / ...") + right bio body
 * containing three paragraphs, the three principle cards, and the
 * thermal-receipt-styled education card.
 */
export function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionHead
          watermark="01"
          tag="01 · About"
          title={
            <>
              no cs degree. just receipts
              <br />
              and a lot of test cases.
            </>
          }
        />

        <div className={styles.grid}>
          <Reveal as="aside" className={styles.meta}>
            {ABOUT_META.map((m) => (
              <div key={m.k}>
                <b>{m.k}</b>
                {m.v}
              </div>
            ))}
          </Reveal>

          <Reveal delay={1} className={styles.body}>
            <p>
              I&apos;m Clayton — a QA engineer who skipped college and learned
              the craft the long way: online courses, docs, late-night labs,
              and shipping real software in the company, where I&apos;ve been
              the sole QA engineer for most of my career.
            </p>
            <p>
              Being a one-person QA team meant I had to figure out everything —
              test strategy, manual coverage, automation, bug culture — without
              anyone to copy from. I wrote the standards. I picked the tools. I
              was also the{" "}
              <em>first person in the company to implement automated testing</em>
              , and the one who wired those tests into GitHub Actions so
              nothing ships without them.
            </p>
            <p>
              The thing I actually care about isn&apos;t passing tests, it&apos;s
              the gap between &ldquo;the test passed&rdquo; and &ldquo;the user
              is happy.&rdquo; Coverage numbers are easy. Catching the bug
              nobody thought to write a ticket for, at 2am on a slow Android
              device — that&apos;s the part I&apos;m here for.
            </p>

            <div className={styles.principles}>
              {PRINCIPLES.map((p) => (
                <article key={p.num} className={`${styles.principle} principle`}>
                  <div className={styles.num}>{p.num}</div>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>

            <div className={styles.receipt} aria-label="Education receipt">
              <div className={styles.receiptHead}>
                <span>EDU_RECEIPT.txt</span>
                <span>self-taught · 100% online</span>
              </div>
              {EDU_RECEIPT.rows.map((r) => (
                <div key={r.k} className={styles.receiptRow}>
                  <span>{r.k}</span>
                  <b>{r.v}</b>
                </div>
              ))}
              <div className={`${styles.receiptRow} ${styles.total}`}>
                <span>{EDU_RECEIPT.total.k}</span>
                <b>{EDU_RECEIPT.total.v}</b>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
