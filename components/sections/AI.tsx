import styles from "./AI.module.css";
import { Reveal } from "../effects/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { AI_WORKFLOWS, type AiWorkflow, type PipelineStep } from "@/data/aiWorkflows";

/**
 * "with AI" section — POV on how AI shifts (not replaces) QA work.
 *
 * Renders a stance block (strikethrough headline + lede), two workflow cards
 * with 4-step pipeline visualizations, and a closing one-liner card.
 *
 * The two workflow bodies have inline `<strong>`/`<code>` highlights, so we
 * render the prose inline here rather than smuggling JSX through the data file.
 */
export function AI() {
  return (
    <section className={styles.section} id="ai" aria-label="How I work with AI">
      <div className="wrap">
        <SectionHead watermark="04" tag="04 · with AI" />

        <div className={styles.stance}>
          <Reveal as="h2" className={styles.headline}>
            <span className={styles.strike}>AI replaced QA.</span>
            <br />
            experience just got{" "}
            <span className={styles.accent}>a louder amplifier.</span>
          </Reveal>
          <Reveal as="p" delay={1} className={styles.lede}>
            AI didn&apos;t make QA optional — it made the floor higher and the
            gap between fast and thorough wider. The person prompting it still
            has to know what good tests look like, what the model is quietly
            missing, and where the user actually lives. That part is still me.
            Also, ask yourself, do you completely trust your app and money to
            a machine 100% :D
          </Reveal>
        </div>

        <div className={styles.flows}>
          <WorkflowCard workflow={AI_WORKFLOWS[0]} delay={0}>
            <p>
              I drop the PRD, the user flows, and the contracts into a model
              and let it propose a first cut of test cases. But the real work
              is the second pass:{" "}
              <strong>asking what it didn&apos;t think of.</strong> Empty
              states, off-network behavior, stale tokens, accessibility paths,
              payment rollback. Those are the bugs that hurt — and the ones AI
              misses unless you know to ask.
            </p>
          </WorkflowCard>

          <WorkflowCard workflow={AI_WORKFLOWS[1]} delay={1}>
            <p>
              I hand the model a documented user flow plus our{" "}
              <strong>test-id contract</strong> — the agreed{" "}
              <code>data-test-id</code> hooks devs ship into the UI — and it
              scaffolds a Cypress spec in seconds. Then I tighten assertions,
              replace fragile waits with real conditions, plug it into GitHub
              Actions, and own the suite from there.
            </p>
          </WorkflowCard>
        </div>

        <Reveal delay={2} className={styles.closing}>
          AI gives a junior tester a faster start. It gives{" "}
          <span className={styles.accent}>
            someone with four years of pattern-matching
          </span>{" "}
          a much higher ceiling. Both are real — but the gap doesn&apos;t
          close, it just moves.
          <span className={styles.quiet}>
            // my honest take, written without one.
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A single workflow card: eyebrow + title + pipeline + prose + bullets.
 * Body prose is passed as children so callers can keep inline emphasis
 * markup near the words it applies to.
 */
function WorkflowCard({
  workflow,
  delay,
  children,
}: {
  workflow: AiWorkflow;
  delay: 0 | 1;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="article" delay={delay} className={styles.flow}>
      <header className={styles.flowHead}>
        <span>
          <b>{workflow.eyebrow.strong}</b> {workflow.eyebrow.rest}
        </span>
        <span>{workflow.subEyebrow}</span>
      </header>

      <h3>{workflow.title}</h3>

      <div className={styles.pipe} aria-label={workflow.pipelineLabel}>
        {workflow.pipeline.map((s, i) => (
          <PipelineStepCell key={i} step={s} />
        ))}
      </div>

      {children}

      <ul className={styles.bullets}>
        {workflow.bullets.map((b) => (
          <li key={b.strong}>
            <b>{b.strong}</b> {b.rest}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function PipelineStepCell({ step }: { step: PipelineStep }) {
  const variant =
    step.role === "me" ? styles.mine : step.role === "AI" ? styles.ai : "";
  return (
    <div className={`${styles.step} ${variant}`.trim()}>
      <span className={styles.role}>{step.role}</span>
      <span className={styles.label}>{step.label}</span>
    </div>
  );
}
