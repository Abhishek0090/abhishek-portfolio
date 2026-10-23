"use client";

import { useEffect, useState } from "react";

// Types each role, holds it, deletes it, moves on.
export default function RoleCycler({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[i % roles.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === full) t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
    } else
      t = setTimeout(
        () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        deleting ? 28 : 55,
      );
    return () => clearTimeout(t);
  }, [text, deleting, i, roles]);

  return (
    <span className="role-cycler" aria-live="polite">
      {text}
      <span className="caret" aria-hidden />
    </span>
  );
}
