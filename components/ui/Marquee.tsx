import styles from "./Marquee.module.css";

type Props = {
  /** The list of words/phrases scrolling across the bar. */
  words: readonly string[];
};

/**
 * Horizontal scrolling marquee. We render the word list twice in a row so the
 * CSS keyframes can `translateX(-50%)` for a seamless loop — translating 100%
 * would briefly show empty space at the seam.
 */
export function Marquee({ words }: Props) {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {[...words, ...words].map((w, i) => (
          <span key={`${w}-${i}`}>{w}</span>
        ))}
      </div>
    </div>
  );
}
