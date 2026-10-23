"use client";

export default function BackToTop() {
  return (
    <button className="to-top" onClick={() => scrollTo({ top: 0, behavior: "smooth" })} data-cursor="Up">
      Back to top ↑
    </button>
  );
}
