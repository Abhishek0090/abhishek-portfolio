"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projects, allSkills } from "@/data/projects";
import { profile } from "@/data/profile";
import MatrixRain from "./MatrixRain";

type Line = { kind: "in" | "out" | "err" | "accent"; text: string };

const HELP = [
  "help              list commands",
  "whoami            who built this",
  "projects          list projects",
  "open <name>       open a project page",
  "skills            what I work with",
  "contact           how to reach me",
  "date              current time here",
  "matrix            you know what this does",
  "clear             clear the screen",
];

export default function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([
    { kind: "accent", text: `ap-os 26.0 - ${profile.name.toLowerCase()}@portfolio` },
    { kind: "out", text: 'Type "help" to see what you can do. Tab completes, arrows recall history.' },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [matrix, setMatrix] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const print = (...l: Line[]) => setLines((cur) => [...cur, ...l]);
  const out = (text: string) => ({ kind: "out" as const, text });

  const run = (raw: string) => {
    const cmd = raw.trim();
    print({ kind: "in", text: cmd });
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHIdx(-1);
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
        return print(...HELP.map(out));
      case "whoami":
        return print(out(`${profile.name}, ${profile.roles[0]} / ${profile.roles[1]}.`), out(profile.intro));
      case "ls":
      case "projects":
        return print(...projects.map((p) => out(`${p.index}  ${p.name.padEnd(16)} ${p.category}`)));
      case "open":
      case "cd": {
        const p = projects.find((x) => x.slug.includes(arg.replace(/\s+/g, "-")) || x.name.toLowerCase().includes(arg));
        if (!arg || !p) return print({ kind: "err", text: `no project matches "${arg}". try "projects".` });
        print({ kind: "accent", text: `opening ${p.name}...` });
        setTimeout(() => router.push(`/work/${p.slug}`), 500);
        return;
      }
      case "skills":
      case "stack":
        return print(out(profile.skills.join(" · ")), out("Used in my projects: " + allSkills.join(", ")));
      case "contact": {
        const l = profile.links;
        const rows = [
          l.email && `email     ${l.email}`,
          l.github && `github    ${l.github}`,
          l.linkedin && `linkedin  ${l.linkedin}`,
        ].filter(Boolean) as string[];
        return print(...(rows.length ? rows.map(out) : [out("Scroll down to the contact section.")]));
      }
      case "date":
        return print(out(new Date().toLocaleString("en-IN", { timeZone: profile.timezone }) + " IST"));
      case "matrix":
        setMatrix(true);
        print({ kind: "accent", text: "wake up..." });
        setTimeout(() => setMatrix(false), 5000);
        return;
      case "sudo":
        return print({ kind: "err", text: "nice try. this incident will be reported." });
      case "echo":
        return print(out(args.join(" ")));
      case "clear":
        return setLines([]);
      default:
        return print({ kind: "err", text: `command not found: ${name}. type "help".` });
    }
  };

  const complete = () => {
    const words = ["help", "whoami", "projects", "open ", "skills", "contact", "date", "matrix", "clear"];
    if (value.startsWith("open ")) {
      const part = value.slice(5).toLowerCase();
      const p = projects.find((x) => x.slug.startsWith(part));
      if (p) setValue(`open ${p.slug}`);
      return;
    }
    const m = words.find((w) => w.startsWith(value.toLowerCase()));
    if (m) setValue(m);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHIdx(i);
        setValue(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : "");
    }
  };

  return (
    <div className="terminal" onClick={() => input.current?.focus()}>
      <div className="terminal-bar">
        <i />
        <i />
        <i />
        <span className="mono">guest@abhishek-pal: ~</span>
      </div>
      <div className="terminal-body mono" ref={body}>
        {lines.map((l, i) => (
          <div key={i} className={`t-${l.kind}`}>
            {l.kind === "in" && <span className="t-prompt">❯ </span>}
            {l.text}
          </div>
        ))}
        <div className="t-row">
          <span className="t-prompt">❯</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
      <div className="terminal-quick">
        {["help", "whoami", "projects", "open railbook", "matrix"].map((c) => (
          <button key={c} className="mono" onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
      {matrix && <MatrixRain />}
    </div>
  );
}
