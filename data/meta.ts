/**
 * Site-wide constants. Updating these values updates the whole site.
 */
export const SITE = {
  name: "Clayton Mildy",
  role: "QA Engineer",
  brandTagline: "// qa engineer",
  email: "claytonmildy@gmail.com",
  github: {
    url: "https://github.com/clytnmld",
    handle: "@clytnmld",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/clayton-mildy-638005259/",
    handle: "/in/clayton-mildy",
  },
  resumeUrl: "#",
  resumeFileName: "clayton-mildy-qa.pdf",
  version: "v2.4.1",
  copyrightYear: 2026,
} as const;

export const NAV_LINKS = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#work", label: "work" },
  { href: "#ai", label: "ai" },
  { href: "#contact", label: "contact" },
] as const;

export const HERO_PILLS = [
  { label: "currently @ WidaTech", ok: true },
  { label: "~4 yrs in qa" },
  { label: "istqb ctfl certified" },
] as const;

export const HERO_STATUS = {
  file: "~ /career/clayton.cy.ts",
  rows: [
    { k: "status", v: "✓ currently occupied", tone: "pass" as const },
    { k: "bugs caught", v: "1,200+" },
    { k: "qa team size", v: "1 (just me)" },
  ],
  bar: { k: "trust level", v: "96%", tone: "warn" as const },
};

export const ABOUT_META = [
  { k: "Role", v: "QA Engineer" },
  { k: "Company", v: "WidaTech (current)" },
  { k: "Experience", v: "~4 years" },
  { k: "Education", v: "Self-taught · online courses" },
  { k: "Cert", v: "ISTQB CTFL" },
  { k: "Languages", v: "EN · ID" },
] as const;

export const PRINCIPLES = [
  {
    num: "P.01",
    title: "Precision",
    body: "If a bug can't be reproduced clearly, it doesn't really exist yet. Specificity is kindness.",
  },
  {
    num: "P.02",
    title: "Clarity",
    body: "Every test case should read like an instruction, not a riddle. Future-me is the audience.",
  },
  {
    num: "P.03",
    title: "Iteration",
    body: "No suite stays good forever. I treat tests as living artifacts — pruned, refactored, owned.",
  },
] as const;

export const EDU_RECEIPT = {
  rows: [
    { k: "SMA (high school)", v: "complete" },
    { k: "college", v: "skipped, on purpose" },
    { k: "online courses · docs · labs", v: "~4 yrs & counting" },
    { k: "ISTQB CTFL", v: "certified" },
  ],
  total: { k: "career bug count", v: "1,200+" },
};

export const MARQUEE_WORDS = [
  "Cypress",
  "Selenium",
  "Appium",
  "API Testing",
  "Postman",
  "Manual Testing",
  "Test Strategy",
  "Bug Reporting",
  "GitHub Actions",
  "ISTQB CTFL",
  "Regression Suites",
];
