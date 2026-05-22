import styles from "./Work.module.css";
import { Reveal } from "../effects/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { PROJECTS, type Project, type Metric } from "@/data/projects";

/**
 * Selected work / case studies. Each project is rendered as a horizontal
 * three-column row:
 *
 *   [index] | [title + role + body + stack] | [metrics grid]
 *
 * The accent-colored hover line on the left edge is purely decorative.
 */
export function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <SectionHead
          watermark="03"
          tag="03 · Selected Work"
          title={<>a few things i&apos;m quietly proud of.</>}
          lede={
            <>
              All shipped while wearing the only QA hat in the room. Names
              anonymized where needed — but the numbers are real.
            </>
          }
        />

        <div className={styles.list}>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.caseId} project={p} delay={(i % 3) as 0 | 1 | 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  delay,
}: {
  project: Project;
  delay: 0 | 1 | 2;
}) {
  return (
    <Reveal as="article" delay={delay} className={`${styles.project} project`}>
      <div className={styles.idx}>
        {project.index}
        <span className={styles.id}>{project.caseId}</span>
      </div>

      <div>
        <h3>{project.title}</h3>
        <div className={styles.role}>{project.role}</div>
        <p>{project.description}</p>
        <div className={`${styles.stack} stack`}>
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>

      <div className={styles.metrics}>
        {project.metrics.map((m, i) => (
          <MetricCell key={i} metric={m} />
        ))}
      </div>
    </Reveal>
  );
}

/** Single metric tile: big number on top, monospace caption underneath. */
function MetricCell({ metric }: { metric: Metric }) {
  return (
    <div className={styles.metric}>
      <div className="v">
        {metric.prefix && <span>{metric.prefix}</span>}
        <span className="accent">{metric.accent}</span>
        {metric.suffix && <span>{metric.suffix}</span>}
      </div>
      <div className="k">{metric.label}</div>
    </div>
  );
}
