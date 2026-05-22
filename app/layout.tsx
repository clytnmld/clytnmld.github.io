import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clayton Mildy — QA Engineer",
  description:
    "QA Engineer with ~4 years of experience. Self-taught, ISTQB CTFL certified. " +
    "I break things on purpose so your users don't have to by accident.",
};

/**
 * Root layout.
 *
 * Loads the two display fonts (Space Grotesk + JetBrains Mono) via Google
 * Fonts. We use a stylesheet <link> (rather than `next/font`) to mirror the
 * source design exactly and keep the font-loading strategy auditable.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
