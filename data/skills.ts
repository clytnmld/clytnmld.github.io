/**
 * Skills grouped into three "buckets": tools, methods, human bits.
 * Each group renders as a test-result-styled card with checkmarks + level chips.
 */
export type SkillGroup = {
  /** Filename-style label shown in the card header (e.g. "tools.ts"). */
  fileName: string;
  /** Plain-English label spoken in the chat ("Tools", "Methods", "Human"). */
  bucket: string;
  items: Array<{ name: string; level: string }>;
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    fileName: "tools.ts",
    bucket: "Tools",
    items: [
      { name: "Cypress", level: "daily" },
      { name: "Selenium", level: "ok" },
      { name: "Appium", level: "ok" },
      { name: "Postman", level: "advanced" },
      { name: "GitHub Actions", level: "CI for tests" },
      { name: "ClickUp", level: "daily" },
      { name: "Git", level: "fluent" },
    ],
  },
  {
    fileName: "methods.md",
    bucket: "Methods",
    items: [
      { name: "Manual & exploratory testing", level: "core" },
      { name: "Test strategy & planning", level: "core" },
      { name: "Test case design", level: "core" },
      { name: "API testing", level: "strong" },
      { name: "Regression automation", level: "strong" },
      { name: "Bug triage & reporting", level: "strong" },
    ],
  },
  {
    fileName: "human.md",
    bucket: "Human",
    items: [
      { name: "Detail-obsessed", level: "politely" },
      { name: "Methodical thinking", level: "steady" },
      { name: "Curious by default", level: "always" },
      { name: "Self-directed learning", level: "non-stop" },
      { name: "Clear written comms", level: "strong" },
    ],
  },
];
