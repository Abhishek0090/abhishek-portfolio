"use client";

import { useEffect, useRef } from "react";

// A rotating sphere of points plus drifting stars. The pointer tilts the sphere and lights up nearby points.
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    let mx = -9999, my = -9999, tiltX = 0, tiltY = 0, targetX = 0, targetY = 0;
    let rot = 0, pulse = 0;

    const N = 900;
    const sphere: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      sphere.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.y -= 0.00012 * s.z;
        if (s.y < 0) s.y = 1;
        s.tw += 0.03;
        const a = (0.25 + Math.sin(s.tw) * 0.2) * s.z;
        ctx.fillStyle = `rgba(225,210,255,${a})`;
        const px = s.x * w + tiltY * 30 * s.z;
        const py = s.y * h + tiltX * 30 * s.z;
        ctx.fillRect(px, py, s.z * 1.6, s.z * 1.6);
      }

      tiltX += (targetX - tiltX) * 0.05;
      tiltY += (targetY - tiltY) * 0.05;
      rot += 0.0018;
      pulse += 0.02;

      const cx = w > 900 ? w * 0.68 : w * 0.5;
      const cy = h * 0.5;
      const R = Math.min(w, h) * (w > 900 ? 0.36 : 0.42);
      const ay = rot + tiltY * 0.8;
      const ax = 0.35 + tiltX * 0.6;
      const cosY = Math.cos(ay), sinY = Math.sin(ay), cosX = Math.cos(ax), sinX = Math.sin(ax);

      // equator ring
      ctx.strokeStyle = "rgba(255,77,141,0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.25, R * 0.28, -0.25 + tiltY * 0.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(138,63,252,0.14)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.45, R * 0.4, 0.4 + tiltX * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < N; i++) {
        const [x0, y0, z0] = sphere[i];
        const wave = 1 + Math.sin(pulse + y0 * 6) * 0.02;
        let x = x0 * cosY - z0 * sinY;
        let z = x0 * sinY + z0 * cosY;
        const y = y0 * cosX - z * sinX;
        z = y0 * sinX + z * cosX;
        x *= wave;
        const persp = 1.8 / (2.6 - z);
        const px = cx + x * R * persp;
        const py = cy + y * R * persp;
        const depth = (z + 1) / 2;
        const d = Math.hypot(px - mx, py - my);
        const glow = d < 140 ? 1 - d / 140 : 0;
        const size = (0.6 + depth * 1.6) * (1 + glow * 1.8);
        if (glow > 0) {
          ctx.fillStyle = `rgba(255,${77 + glow * 60},${141 + glow * 60},${0.4 + glow * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(${170 + depth * 70},${120 + depth * 60},255,${0.08 + depth * 0.55})`;
        }
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }

      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      targetY = (mx / w - 0.5) * 1.2;
      targetX = (my / h - 0.5) * 0.8;
    };
    const onLeave = () => {
      mx = my = -9999;
      targetX = targetY = 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    resize();
    draw();
    io.observe(canvas);
    addEventListener("resize", resize);
    addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden />;
}
