import type { ElementType, ReactNode } from "react";

type RevealProps = {
  /** Stagger order. Higher = later (matches CSS `[data-delay="N"]` selectors). */
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  /** Render the wrapper as another tag. Defaults to <div>. */
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

/**
 * Adds the `data-reveal` attribute (and optional stagger delay) so the
 * `useRevealOnScroll` hook can swap the element into view on first scroll.
 *
 * Keep it presentational — animation logic lives in CSS, observer logic
 * lives in the hook.
 */
export function Reveal({
  delay = 0,
  as: Tag = "div",
  className,
  children,
}: RevealProps) {
  return (
    <Tag
      data-reveal
      data-delay={delay || undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
