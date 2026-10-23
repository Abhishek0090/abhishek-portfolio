import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import ProjectVisual from "@/components/ProjectVisual";
import Tilt from "@/components/Tilt";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name} | ${profile.name}`, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="case" style={{ "--accent": p.accent } as React.CSSProperties}>
      <header className="case-hero">
        <Link href="/#work" className="back mono">
          ← All work
        </Link>
        <p className="case-kicker mono hero-in" style={{ "--d": "0.05s" } as React.CSSProperties}>
          <span className="accent">{p.index}</span> / {p.category} / {p.year}
        </p>
        <h1 className="case-title hero-in" style={{ "--d": "0.15s" } as React.CSSProperties}>
          {p.name}
        </h1>
        <p className="case-tagline hero-in" style={{ "--d": "0.25s" } as React.CSSProperties}>
          {p.tagline}
        </p>
        {(p.liveUrl || p.repoUrl) && (
          <div className="hero-ctas hero-in" style={{ "--d": "0.35s" } as React.CSSProperties}>
            {p.liveUrl && (
              <Magnetic>
                <a className="btn btn-primary" href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span>Visit live</span>
                  <span aria-hidden>↗</span>
                </a>
              </Magnetic>
            )}
            {p.repoUrl && (
              <Magnetic>
                <a className="btn btn-ghost" href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                  <span>Source</span>
                </a>
              </Magnetic>
            )}
          </div>
        )}
      </header>

      <Reveal variant="scale" className="case-visual-wrap">
        <Tilt className="work-card case-visual" max={5}>
          <div className="work-visual">
            <ProjectVisual slug={p.slug} />
          </div>
          <div className="work-glare" aria-hidden />
        </Tilt>
      </Reveal>

      <section className="case-grid">
        <Reveal className="case-summary">
          <h2 className="mono case-h">Overview</h2>
          <p>{p.summary}</p>
        </Reveal>
        <Reveal className="case-stack" delay={120}>
          <h2 className="mono case-h">Stack</h2>
          <ul className="chips">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="case-highlights">
        {p.highlights.map((h, k) => (
          <Reveal key={h.title} delay={k * 100} variant="up">
            <Tilt className="cap" max={5}>
              <span className="cap-n mono">0{k + 1}</span>
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </Tilt>
          </Reveal>
        ))}
      </section>

      <section className="case-details">
        <Reveal as="h2" className="mono case-h">
          Under the hood
        </Reveal>
        <ul>
          {p.details.map((d, k) => (
            <Reveal as="li" key={d} delay={k * 60} variant="left">
              <span className="mono accent">{String(k + 1).padStart(2, "0")}</span>
              {d}
            </Reveal>
          ))}
        </ul>
      </section>

      <Link href={`/work/${next.slug}`} className="next-project" data-cursor="Next" style={{ "--accent": next.accent } as React.CSSProperties}>
        <span className="mono">Next project</span>
        <span className="next-name">
          {next.name} <span aria-hidden>→</span>
        </span>
      </Link>
    </article>
  );
}
