import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Exhibit } from "@/components/sections/Exhibit";
import { Work } from "@/components/sections/Work";
import { AI } from "@/components/sections/AI";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Marquee";
import { SepStrip } from "@/components/ui/SepStrip";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { LiveFeed } from "@/components/widgets/LiveFeed";
import { RevealRoot } from "@/components/effects/RevealRoot";
import { MARQUEE_WORDS } from "@/data/meta";

/**
 * Home page composition. Sections + the small inter-section divider strips
 * are arranged here, in reading order. Keep this file flat and declarative
 * — the markup for each section lives in its own component.
 */
export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <RevealRoot />

      <Nav />

      <main id="top">
        <Hero />

        <Marquee words={MARQUEE_WORDS} />

        <SepStrip
          items={[
            { kind: "text", node: <><b>// 01</b> · about.module</> },
            { kind: "mid" },
            { kind: "text", node: <>uptime: <span className="ok">99.97%</span></> },
            { kind: "mid" },
            { kind: "text", node: <>last commit <span className="accent">2d ago</span></> },
          ]}
        />

        <About />
        <Skills />
        <Exhibit />

        <SepStrip
          items={[
            { kind: "text", node: <><b>// 03</b> · selected_work.module</> },
            { kind: "mid" },
            { kind: "text", node: <>4 cases · <span className="ok">all passing</span></> },
            { kind: "mid" },
            { kind: "text", node: <span className="accent">receipts attached</span> },
          ]}
        />

        <Work />
        <AI />
        <Contact />
      </main>

      <LiveFeed />
      <Footer />
    </>
  );
}
