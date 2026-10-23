import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import Tilt from "./Tilt";
import Reveal from "./Reveal";

export default function ProjectCard({ project, dim }: { project: Project; dim?: boolean }) {
  return (
    <Reveal as="li" className={`work-item ${dim ? "is-dim" : ""}`} style={{ "--accent": project.accent } as React.CSSProperties}>
      <Link href={`/work/${project.slug}`} data-cursor="Open" className="work-link">
        <Tilt className="work-card">
          <div className="work-visual">
            <ProjectVisual slug={project.slug} />
          </div>
          <div className="work-glare" aria-hidden />
        </Tilt>
        <div className="work-info">
          <div className="work-head">
            <span className="work-index mono">{project.index}</span>
            <h3 className="work-name">{project.name}</h3>
            <span className="work-arrow" aria-hidden>
              ↗
            </span>
          </div>
          <p className="work-tagline">{project.tagline}</p>
          <div className="work-meta mono">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <ul className="chips">
            {project.stack.slice(0, 5).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </Link>
    </Reveal>
  );
}
