import styles from "./Footer.module.css";
import { SITE } from "@/data/meta";

/**
 * Site footer. Monospace metadata strip with a green "all systems passing"
 * status indicator on the right.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          © {SITE.copyrightYear} {SITE.name} · built &amp; tested by hand
          (I&apos;ll just be honest, yes I create this using AI :D)
        </div>
        <div className={styles.right}>
          <span>{SITE.version}</span>
          <span>self-taught, certified, caffeinated</span>
          <span className={styles.ok}>● all systems passing</span>
        </div>
      </div>
    </footer>
  );
}
