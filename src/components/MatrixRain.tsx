"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    c.width = innerWidth;
    c.height = innerHeight;
    const size = 16;
    const cols = Math.ceil(c.width / size);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = "アカサタナハマヤラワ0123456789ABCDEFNEXTJSREACT";
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(8,7,13,0.12)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${size}px monospace`;
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() > 0.95 ? "#ffd1e3" : i % 3 ? "#ff4d8d" : "#a66bff";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size);
        drops[i] = y * size > c.height && Math.random() > 0.975 ? 0 : y + 1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="matrix-rain" aria-hidden />;
}
