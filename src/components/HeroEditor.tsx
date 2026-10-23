"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import RoleCycler from "./RoleCycler";
import Tilt from "./Tilt";

type Tok = [cls: string, text: string];

// The code the card types out. "BUILDS" is swapped for the live cycling value once typing finishes.
const LINES: Tok[][] = [
  [["kw", "export default function "], ["fn", "Developer"], ["p", "() {"]],
  [["p", "  "], ["kw", "return"], ["p", " ("]],
  [["p", "    <"], ["tag", "Profile"]],
  [["p", "      "], ["attr", "name"], ["p", "="], ["str", `"${profile.name}"`]],
  [["p", "      "], ["attr", "role"], ["p", "="], ["str", `"Next.js · Full-stack"`]],
  [["p", "      "], ["attr", "stack"], ["p", "={["]],
  [["p", "        "], ["str", `"React"`], ["p", ", "], ["str", `"Next.js"`], ["p", ", "], ["str", `"TypeScript"`], ["p", ","]],
  [["p", "        "], ["str", `"Node.js"`], ["p", ", "], ["str", `"MongoDB"`], ["p", ", "], ["str", `"PostgreSQL"`], ["p", ","]],
  [["p", "        "], ["str", `"Docker"`]],
  [["p", "      ]}"]],
  [["p", "      "], ["attr", "builds"], ["p", "="], ["str", "BUILDS"]],
  [["p", "      "], ["attr", "available"]],
  [["p", "    />"]],
  [["p", "  );"]],
  [["p", "}"]],
];
const TOTAL = LINES.flat().reduce((n, [, t]) => n + (t === "BUILDS" ? 2 : t.length), 0);

export default function HeroEditor() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(TOTAL);
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      setShown(Math.min(n, TOTAL));
      if (n >= TOTAL) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, []);

  const done = shown >= TOTAL;
  let budget = shown;

  return (
    <div className="hero-visual">
      <span className="float-badge b1">Next.js</span>
      <span className="float-badge b2">React</span>
      <span className="float-badge b5">Node.js</span>
      <span className="float-badge b3">MongoDB</span>
      <span className="float-badge b4">Docker</span>

      <Tilt className="editor" max={7}>
        <div className="editor-bar">
          <i />
          <i />
          <i />
          <span className="editor-tab mono">page.tsx</span>
        </div>
        <pre className="editor-code mono" aria-label="Code describing Abhishek Pal">
          {LINES.map((line, i) => {
            const out: React.ReactNode[] = [];
            line.forEach(([cls, text], j) => {
              if (budget <= 0) return;
              if (text === "BUILDS") {
                budget -= 2;
                out.push(
                  <span key={j} className="str">
                    &quot;{done && <RoleCycler roles={profile.builds} />}&quot;
                  </span>,
                );
                return;
              }
              out.push(
                <span key={j} className={cls}>
                  {text.slice(0, budget)}
                </span>,
              );
              budget -= text.length;
              if (budget <= 0 && !done) out.push(<span key="caret" className="caret" />);
            });
            return (
              <div key={i}>
                <span className="ln">{i + 1}</span>
                {out}
              </div>
            );
          })}
        </pre>
        <div className="editor-status mono">
          <span>
            <span className="status-dot" /> {done ? "Compiled in 312 ms" : "Compiling..."}
          </span>
          <span>TSX · UTF-8</span>
        </div>
        <div className="editor-glare" aria-hidden />
      </Tilt>
    </div>
  );
}
