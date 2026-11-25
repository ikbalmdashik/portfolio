"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive constellation: drifting nodes linked by distance-faded lines,
 * gently pulled toward the cursor. Tuned for performance:
 * - node count scales with screen area (capped), DPR capped at 1.5
 * - spatial grid for neighbour lookup (no O(n²) over all nodes)
 * - pauses when the tab is hidden; disabled for reduced motion
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const LINK = 130; // max link distance in CSS px
    const MOUSE_R = 180;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let frame = 0;
    let running = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(110, Math.round((w * h) / 14000));
      while (nodes.length < target) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.2 + 0.6,
        });
      }
      nodes.length = target;
    };

    const step = () => {
      frame = 0;
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      // Move nodes
      for (const n of nodes) {
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_R * MOUSE_R && d2 > 1) {
            const f = (1 - Math.sqrt(d2) / MOUSE_R) * 0.012;
            n.vx += dx * f * 0.05;
            n.vy += dy * f * 0.05;
          }
        }
        n.vx *= 0.985;
        n.vy *= 0.985;
        // keep a minimum drift so the field never freezes
        if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.02;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }

      // Spatial grid
      const cols = Math.ceil(w / LINK) + 1;
      const grid = new Map<number, number[]>();
      nodes.forEach((n, i) => {
        const key = Math.floor(n.y / LINK) * cols + Math.floor(n.x / LINK);
        const cell = grid.get(key);
        if (cell) cell.push(i);
        else grid.set(key, [i]);
      });

      // Links
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const cx = Math.floor(a.x / LINK);
        const cy = Math.floor(a.y / LINK);
        for (let oy = 0; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            if (oy === 0 && ox < 0) continue;
            const cell = grid.get((cy + oy) * cols + (cx + ox));
            if (!cell) continue;
            for (const j of cell) {
              if (j <= i && oy === 0 && ox === 0) continue;
              const b = nodes[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const d2 = dx * dx + dy * dy;
              if (d2 > LINK * LINK) continue;
              const alpha = (1 - Math.sqrt(d2) / LINK) * 0.22;
              ctx.strokeStyle = `rgba(139,156,255,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Cursor links (brighter, sky tint)
      if (mouse.active) {
        for (const n of nodes) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_R * MOUSE_R) {
            ctx.strokeStyle = `rgba(92,200,255,${(1 - Math.sqrt(d2) / MOUSE_R) * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      ctx.fillStyle = "rgba(199,207,255,0.75)";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = e.pointerType === "mouse";
    };
    const onLeave = () => (mouse.active = false);
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !frame) frame = requestAnimationFrame(step);
    };

    resize();
    frame = requestAnimationFrame(step);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-particles" />;
}
