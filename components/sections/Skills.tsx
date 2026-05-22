import styles from "./Skills.module.css";
import { Reveal } from "../effects/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { SKILL_GROUPS, type SkillGroup } from "@/data/skills";

/**
 * Skills section. Three grouped cards rendered side-by-side on desktop,
 * stacked on mobile. Each card is styled like a passing test suite — green
 * checkmarks down the left, level chips on the right.
 */
export function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <SectionHead
          watermark="02"
          tag="02 · Skills"
          title={
            <>
              the toolbox, the methods,
              <br />
              and the human bits.
            </>
          }
          lede={
            <>
              Three buckets I keep sharpened. Tools come and go — methodologies
              and instincts are what travel with me between teams (well, when
              there <em>are</em> other teammates).
            </>
          }
        />

        <div className={styles.groups}>
          {SKILL_GROUPS.map((g, i) => (
            <SkillGroupCard key={g.fileName} group={g} delay={i as 0 | 1 | 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * A single skill bucket card. Extracted so the loop above stays declarative
 * and the markup for one card stays in one place.
 */
function SkillGroupCard({
  group,
  delay,
}: {
  group: SkillGroup;
  delay: 0 | 1 | 2;
}) {
  const total = group.items.length;
  return (
    <Reveal
      as="article"
      delay={delay}
      className={`${styles.group} skill-group`}
    >
      <header className={styles.head}>
        <span className={styles.name}>{group.fileName}</span>
        <span className={styles.count}>{`${total} / ${total} ok`}</span>
      </header>
      <ul className={`${styles.list} skill-list`}>
        {group.items.map((s) => (
          <li key={s.name}>
            <span className={styles.row}>
              <span className={styles.check}>✓</span>
              {s.name}
            </span>
            <span className={styles.lvl}>{s.level}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
