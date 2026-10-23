"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

type Cmd = { id: string; label: string; hint: string; group: string; run: () => void };

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const go = (hash: string) => () => router.push(`/${hash}`);
    const list: Cmd[] = [
      { id: "work", label: "Selected work", hint: "Section", group: "Navigate", run: go("#work") },
      { id: "about", label: "About me", hint: "Section", group: "Navigate", run: go("#about") },
      { id: "stack", label: "Stack explorer", hint: "Section", group: "Navigate", run: go("#stack") },
      { id: "terminal", label: "Open the terminal", hint: "Section", group: "Navigate", run: go("#terminal") },
      { id: "contact", label: "Get in touch", hint: "Section", group: "Navigate", run: go("#contact") },
      ...projects.map((p) => ({
        id: p.slug,
        label: p.name,
        hint: p.category,
        group: "Projects",
        run: () => router.push(`/work/${p.slug}`),
      })),
      {
        id: "top",
        label: "Back to top",
        hint: "Action",
        group: "Actions",
        run: () => scrollTo({ top: 0, behavior: "smooth" }),
      },
    ];
    if (profile.links.email)
      list.push({
        id: "copy",
        label: "Copy email address",
        hint: profile.links.email,
        group: "Actions",
        run: () => navigator.clipboard?.writeText(profile.links.email),
      });
    if (profile.links.github)
      list.push({ id: "gh", label: "GitHub", hint: "Link", group: "Actions", run: () => open_(profile.links.github) });
    if (profile.links.linkedin)
      list.push({ id: "li", label: "LinkedIn", hint: "Link", group: "Actions", run: () => open_(profile.links.linkedin) });
    return list;
  }, [router]);

  const filtered = commands.filter((c) => (c.label + " " + c.hint).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const openEvt = () => setOpen(true);
    addEventListener("keydown", key);
    addEventListener("palette:open", openEvt);
    return () => {
      removeEventListener("keydown", key);
      removeEventListener("palette:open", openEvt);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => input.current?.focus(), 20);
    }
  }, [open]);

  const choose = (c?: Cmd) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") choose(filtered[active]);
  };

  if (!open) return null;

  let lastGroup = "";
  return (
    <div className="palette-backdrop" onClick={() => setOpen(false)}>
      <div className="palette" role="dialog" aria-modal aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <div className="palette-input">
          <span className="mono accent">&gt;</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKey}
            placeholder="Jump to a project, section or action..."
            aria-label="Search commands"
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette-list">
          {filtered.length === 0 && <li className="palette-empty">No matches. Try "work" or "railbook".</li>}
          {filtered.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id}>
                {header && <div className="palette-group mono">{header}</div>}
                <button
                  className={i === active ? "is-active" : ""}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(c)}
                >
                  <span>{c.label}</span>
                  <small className="mono">{c.hint}</small>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot mono">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>Enter</kbd> open
          </span>
        </div>
      </div>
    </div>
  );
}

function open_(url: string) {
  window.open(url, "_blank", "noopener");
}
