"use client";

import Link from "next/link";
import { useState } from "react";
import { allSkills, projects } from "@/data/projects";

// Pick a technology to see which projects use it.
export default function StackExplorer() {
  const [skill, setSkill] = useState<string | null>(null);
  const matches = skill ? projects.filter((p) => p.stack.includes(skill)) : projects;

  return (
    <div className="stack-explorer">
      <div className="stack-chips" role="group" aria-label="Filter projects by technology">
        {allSkills.map((s) => {
          const count = projects.filter((p) => p.stack.includes(s)).length;
          return (
            <button
              key={s}
              className={`stack-chip ${skill === s ? "is-on" : ""}`}
              aria-pressed={skill === s}
              onClick={() => setSkill((cur) => (cur === s ? null : s))}
              onMouseEnter={() => setSkill(s)}
            >
              {s}
              <sup className="mono">{count}</sup>
            </button>
          );
        })}
      </div>

      <div className="stack-panel">
        <div className="stack-panel-head mono">
          <span>{skill ? `> grep "${skill}"` : "> ls projects"}</span>
          <span className="accent">
            {matches.length}/{projects.length}
          </span>
        </div>
        <ul className="stack-results">
          {projects.map((p) => {
            const on = matches.includes(p);
            return (
              <li key={p.slug} className={on ? "is-on" : ""} style={{ "--accent": p.accent } as React.CSSProperties}>
                <Link href={`/work/${p.slug}`} tabIndex={on ? 0 : -1}>
                  <span className="mono">{p.index}</span>
                  <b>{p.name}</b>
                  <small>{p.category}</small>
                </Link>
              </li>
            );
          })}
        </ul>
        {skill && (
          <button className="stack-reset mono" onClick={() => setSkill(null)}>
            clear filter ×
          </button>
        )}
      </div>
    </div>
  );
}
