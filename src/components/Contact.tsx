"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import Magnetic from "./Magnetic";

// No backend: the form opens the visitor's mail app with the message filled in.
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const email = profile.links.email;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent(`Hello from ${form.name || "your portfolio"}`);
    const bodyText = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${bodyText}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const field = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value })),
  });

  return (
    <div className="contact-grid">
      <form className="contact-form" onSubmit={submit}>
        <label className="field">
          <input required placeholder=" " {...field("name")} />
          <span>Your name</span>
        </label>
        <label className="field">
          <input required type="email" placeholder=" " {...field("email")} />
          <span>Your email</span>
        </label>
        <label className="field">
          <textarea required rows={4} placeholder=" " {...field("message")} />
          <span>Tell me about your project</span>
        </label>
        <Magnetic>
          <button className="btn btn-primary" type="submit" disabled={!email} data-cursor="Send">
            <span>{email ? "Send message" : "Email coming soon"}</span>
            <span aria-hidden>→</span>
          </button>
        </Magnetic>
      </form>

      <div className="contact-side">
        {email && (
          <button className="contact-email" onClick={copy} data-cursor={copied ? "Copied" : "Copy"}>
            <small className="mono">{copied ? "copied to clipboard" : "click to copy"}</small>
            {email}
          </button>
        )}
        <ul className="contact-links">
          {(
            [
              ["GitHub", profile.links.github],
              ["LinkedIn", profile.links.linkedin],
              ["Resume", profile.links.resume],
            ] as const
          )
            .filter(([, url]) => url)
            .map(([label, url]) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <span className="roll" data-text={label}>
                    <span>{label}</span>
                  </span>
                  <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
        </ul>
        <p className="contact-note mono">
          <span className="status-dot" /> Open to full-time roles and freelance work. Based in {profile.location}.
        </p>
      </div>
    </div>
  );
}
