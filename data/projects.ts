/**
 * Selected work. Each metric value may contain an "accent" segment that is
 * highlighted in the brand color — we keep that as a separate `accent` string
 * and stitch it back together in the component so the data stays markup-free.
 */
export type Metric = {
  /** Plain (non-accented) leading text, e.g. "2h → ". May be empty. */
  prefix?: string;
  /** Text rendered in the accent color. */
  accent: string;
  /** Optional plain trailing text. May be empty. */
  suffix?: string;
  /** Short caption under the big number. */
  label: string;
};

export type Project = {
  /** Display order index, e.g. "01". */
  index: string;
  /** Case-id label rendered under the index, e.g. "CASE-001". */
  caseId: string;
  title: string;
  /** Role · Company · Tooling — the small monospace line under the title. */
  role: string;
  /** Body paragraph. May include lightweight inline HTML (<em>, <strong>). */
  description: React.ReactNode;
  stack: string[];
  metrics: Metric[];
};

import type React from "react";

export const PROJECTS: Project[] = [
  {
    index: "01",
    caseId: "CASE-001",
    title: "API regression automation: 2 hours → 3 minutes",
    role: "Lead QA · WidaTech · Postman + Newman",
    description:
      "Every release used to start with ~2 hours of me clicking through Postman collections by hand. Built out a full API automation layer that we run on every pre-deploy — a manual ritual turned into a 3-minute green check. Devs can also run it themselves to verify before pushing (less ping-pong, safer deployment).",
    stack: ["Postman", "Newman", "API Testing", "Node"],
    metrics: [
      { prefix: "2h → ", accent: "3 min", label: "api regression time" },
      { accent: "~40x", label: "faster feedback loop" },
      { accent: "every pre-deploy", label: "+confidence in deploying" },
    ],
  },
  {
    index: "02",
    caseId: "CASE-002",
    title: "First-ever automation suite + CI/CD test gating",
    role: "Sole QA Engineer · WidaTech · Cypress + Playwright",
    description:
      'Walked into a codebase with zero automated tests. Picked the framework, set the conventions, wrote the first suite, and connected it to GitHub Actions so failing tests block merges. The bar moved from "hopefully QA caught it" to "the pipeline says no." It\'s still the foundation everything else is built on.',
    stack: ["Cypress", "Selenium", "TypeScript", "GitHub Actions"],
    metrics: [
      { accent: "0 → 1", label: "automation suite (built from scratch)" },
      { accent: "PR-gated", label: "tests block bad merges" },
      { accent: "1st", label: "automation impl in company history" },
      { accent: "~85%", label: "critical-path coverage" },
    ],
  },
  {
    index: "03",
    caseId: "CASE-003",
    title: "Writing the QA playbook from scratch",
    role: "Sole QA Engineer · WidaTech · Notion + Confluence + receipts",
    description:
      "No prior QA function meant no test strategy, no severity rubric, no bug template, no definition of done. Built all of it: a documented QA standard the whole team uses, a bug-report template devs actually read, severity tiers tied to release decisions, and a definition-of-done checklist that's now part of every ticket. A QA culture, written down so it survives me.",
    stack: ["Test strategy", "Bug template", "Severity rubric", "DoD checklist"],
    metrics: [
      { accent: "1,200+", label: "bugs caught pre-prod" },
      { accent: "1", label: "company-wide QA standard, written" },
      { accent: "4", label: "severity tiers tied to release" },
      { accent: "100%", label: "tickets now use the DoD checklist" },
    ],
  },
  {
    index: "04",
    caseId: "CASE-004",
    title: "FIFO recalculation: 1,231s on empty DB → 20s on 2M rows",
    role: "QA · partnered with backend · profiling + step-by-step traces",
    description:
      "Our FIFO inventory recalculation was painful — 1,231 seconds on an essentially empty database. I didn't write the fix; I worked closely with the dev: profiled the flow, broke the recalculation into discrete steps, and showed exactly which step was burning the time so they knew where to look. After a few rounds of measure → isolate → verify, we landed at ~20 seconds on a real 2,000,000-row dataset.",
    stack: ["Performance QA", "Profiling", "FIFO", "Dev partnership"],
    metrics: [
      { prefix: "1,231s → ", accent: "20s", label: "FIFO recalc time" },
      { accent: "~60x", label: "faster, on far more data" },
      { accent: "2M rows", label: "production-scale dataset" },
      { accent: "step-by-step", label: "traces given to dev for the fix" },
    ],
  },
];
