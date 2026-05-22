import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

type CommonProps = {
  variant?: Variant;
  /** Trailing glyph rendered in a `.arrow` span (animates on hover). */
  arrow?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & { href: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
>;
type ButtonProps = CommonProps & { href?: undefined } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

type Props = AnchorProps | ButtonProps;

/**
 * Polymorphic button: renders an <a> when `href` is provided, otherwise <button>.
 * Two variants — solid `primary` (accent fill) and bordered `ghost`.
 *
 * Pass `arrow` (e.g. "→", "↗", "↓") to get the animated trailing glyph used
 * across hero CTAs and contact rows.
 */
export function Button(props: Props) {
  const { variant = "ghost", arrow, children, className, ...rest } = props as CommonProps & {
    className?: string;
    [k: string]: unknown;
  };

  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(" ");

  const content = (
    <>
      {children}
      {arrow && <span className={`${styles.arrow} arrow`}>{arrow}</span>}
    </>
  );

  if ("href" in props && props.href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} href={props.href} className={cls}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} className={cls}>
      {content}
    </button>
  );
}
