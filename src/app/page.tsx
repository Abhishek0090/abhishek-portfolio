import { profile, stats, capabilities } from "@/data/profile";
import { projects } from "@/data/projects";
import HeroCanvas from "@/components/HeroCanvas";
import HeroEditor from "@/components/HeroEditor";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import WordReveal from "@/components/WordReveal";
import Counter from "@/components/Counter";
import ProjectCard from "@/components/ProjectCard";
import Tilt from "@/components/Tilt";
import StackExplorer from "@/components/StackExplorer";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <Reveal className="section-label mono" variant="left">
      <span className="accent">{n}</span>
      <span className="section-label-line" />
      {children}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" id="top">
        <HeroCanvas />

        <div className="hero-inner">
          <div className="hero-copy">
          <p className="hero-kicker hero-in" style={{ "--d": "0.05s" } as React.CSSProperties}>
            <span className="status-dot" /> Available for work · Based in {profile.location}
          </p>
          <p className="hero-hello hero-in" style={{ "--d": "0.12s" } as React.CSSProperties}>
            Hi, I&apos;m <strong>{profile.name}</strong>
          </p>
          <h1 className="hero-title hero-in" style={{ "--d": "0.2s" } as React.CSSProperties}>
            I build fast, <span className="grad-text">realtime</span> web products.
          </h1>
          <p className="hero-role hero-in" style={{ "--d": "0.3s" } as React.CSSProperties}>
            {profile.headline}
          </p>
          <p className="hero-intro hero-in" style={{ "--d": "0.38s" } as React.CSSProperties}>
            {profile.intro}
          </p>
          <div className="hero-ctas hero-in" style={{ "--d": "0.45s" } as React.CSSProperties}>
            <Magnetic>
              <a className="btn btn-primary" href="#work" data-cursor="Go">
                <span>View my work</span>
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="#contact">
                <span>Get in touch</span>
              </a>
            </Magnetic>
          </div>
          <dl className="hero-facts hero-in" style={{ "--d": "0.55s" } as React.CSSProperties}>
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <dt>
                  {s.value}
                  {s.suffix}
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
          </div>
          <div className="hero-in" style={{ "--d": "0.35s" } as React.CSSProperties}>
            <HeroEditor />
          </div>
        </div>

        <a href="#about" className="scroll-cue mono" aria-label="Scroll down">
          <span className="scroll-cue-line" />
          scroll
        </a>
      </section>

      {/* Marquee */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...profile.skills, ...profile.skills].map((s, i) => (
            <span key={i}>
              {s}
              <i />
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="section" id="about">
        <SectionLabel n="01">About</SectionLabel>
        <WordReveal text={profile.about} className="about-text" />
        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 90}>
              <div className="stat-num">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="stat-label mono">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="section" id="work">
        <SectionLabel n="02">Selected work</SectionLabel>
        <div className="section-head">
          <Reveal as="h2" variant="clip" className="section-title">
            Things I&apos;ve <em>built</em>
          </Reveal>
          <Reveal as="p" className="section-sub" delay={120}>
            Five products, each built end to end. Hover to tilt, click for the full story.
          </Reveal>
        </div>
        <ul className="work-list">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </ul>
      </section>

      {/* Capabilities */}
      <section className="section">
        <SectionLabel n="03">Capabilities</SectionLabel>
        <Reveal as="h2" variant="clip" className="section-title">
          What I <em>bring</em>
        </Reveal>
        <div className="caps">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} variant="scale">
              <Tilt className="cap" max={6}>
                <span className="cap-n mono">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="section" id="stack">
        <SectionLabel n="04">Stack explorer</SectionLabel>
        <div className="section-head">
          <Reveal as="h2" variant="clip" className="section-title">
            Pick a <em>tool</em>
          </Reveal>
          <Reveal as="p" className="section-sub" delay={120}>
            Hover or tap a technology to see where I used it.
          </Reveal>
        </div>
        <Reveal>
          <StackExplorer />
        </Reveal>
      </section>

      {/* Terminal */}
      <section className="section" id="terminal">
        <SectionLabel n="05">Terminal</SectionLabel>
        <div className="section-head">
          <Reveal as="h2" variant="clip" className="section-title">
            Prefer the <em>command line?</em>
          </Reveal>
          <Reveal as="p" className="section-sub" delay={120}>
            A working shell. Try <code>help</code>, <code>open twogether</code> or <code>matrix</code>.
          </Reveal>
        </div>
        <Reveal variant="scale">
          <Terminal />
        </Reveal>
      </section>

      {/* Contact */}
      <section className="section contact" id="contact">
        <SectionLabel n="06">Contact</SectionLabel>
        <Reveal as="h2" variant="clip" className="contact-title">
          Let&apos;s build
          <br />
          <em>something</em> next.
        </Reveal>
        <Reveal delay={150}>
          <Contact />
        </Reveal>
      </section>
    </>
  );
}
