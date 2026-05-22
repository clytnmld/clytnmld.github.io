/**
 * Two AI-assisted workflows shown side-by-side in the "with AI" section.
 * Each is visualized as a 4-step pipeline (input → AI → me → ship).
 */
export type PipelineStep = {
  role: "input" | "AI" | "me" | "ship";
  label: string;
};

export type AiBullet = { strong: string; rest: string };

export type AiWorkflow = {
  /** Header eyebrow, e.g. "workflow.01 · test cases". */
  eyebrow: { strong: string; rest: string };
  /** Right-aligned eyebrow caption, e.g. "from PRD → coverage". */
  subEyebrow: string;
  title: string;
  /** A11y label for the pipeline visualization. */
  pipelineLabel: string;
  pipeline: PipelineStep[];
  body: React.ReactNode;
  bullets: AiBullet[];
};

import type React from "react";

export const AI_WORKFLOWS: AiWorkflow[] = [
  {
    eyebrow: { strong: "workflow.01", rest: "· test cases" },
    subEyebrow: "from PRD → coverage",
    title: "Generating test cases from a PRD and any other existing document that can help.",
    pipelineLabel:
      "Pipeline: PRD and user flows go into AI which proposes test cases; I review for gaps; the final suite ships.",
    pipeline: [
      { role: "input", label: "PRD.md + flows" },
      { role: "AI", label: "draft cases" },
      { role: "me", label: "prune & hunt gaps" },
      { role: "ship", label: "test_plan.md" },
    ],
    body: null, // rendered inline in AISection for the inline <strong> highlight
    bullets: [
      { strong: "Faster:", rest: "happy-path coverage in minutes instead of an afternoon." },
      { strong: "Sharper:", rest: "I spend the saved time on edge cases, not boilerplate." },
      { strong: "Documented:", rest: "every case gets a why, not just a what." },
    ],
  },
  {
    eyebrow: { strong: "workflow.02", rest: "· automation" },
    subEyebrow: "from flow → spec",
    title: "Scaffolding automation from a flow and a test-id contract.",
    pipelineLabel:
      "Pipeline: user flow and test-id contract go into AI which scaffolds a Cypress spec; I tighten the assertions; the suite runs in CI.",
    pipeline: [
      { role: "input", label: "flow + data-test-id" },
      { role: "AI", label: "scaffold spec" },
      { role: "me", label: "harden & wire CI" },
      { role: "ship", label: "*.cy.ts" },
    ],
    body: null, // rendered inline in AISection
    bullets: [
      { strong: "Velocity:", rest: "new flows wired into CI the same day they ship." },
      { strong: "Resilience:", rest: "contract-based selectors, no class-name guessing." },
      { strong: "Owned:", rest: "AI scaffolds, I review every line that goes near main." },
    ],
  },
];
