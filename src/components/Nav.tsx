"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import LocalTime from "./LocalTime";

const items = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
  { href: "/#terminal", label: "Terminal" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <Link href="/" className="nav-logo" onClick={() => setOpen(false)} aria-label={`${profile.name}, home`}>
        <span className="nav-logo-mark">AP</span>
        <span className="nav-logo-text">
          {profile.name}
          <small>
            <span className="status-dot" /> Available for work
          </small>
        </span>
      </Link>

      <nav className="nav-links" aria-label="Main">
        {items.map((it, i) => (
          <a key={it.href} href={it.href} onClick={() => setOpen(false)} style={{ "--i": i } as React.CSSProperties}>
            <span className="nav-num">0{i + 1}</span>
            <span className="roll" data-text={it.label}>
              <span>{it.label}</span>
            </span>
          </a>
        ))}
      </nav>

      <div className="nav-right">
        <span className="nav-time mono">
          <LocalTime />
        </span>
        <button
          className="kbd-btn"
          onClick={() => window.dispatchEvent(new Event("palette:open"))}
          aria-label="Open command palette"
        >
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </button>
        <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
