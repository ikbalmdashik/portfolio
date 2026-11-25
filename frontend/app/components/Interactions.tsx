"use client";

import { useEffect } from "react";

/**
 * Delegated pointer effects (a single listener for the whole page):
 * - `.panel`       → cursor-tracking border/glow via --px / --py
 * - `[data-tilt]`  → 3D tilt with a moving glare via --rx / --ry / --gx / --gy
 */
export default function Interactions() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const resetTilt = (el: HTMLElement) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--glare", "0");
    };

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const panel = target?.closest?.<HTMLElement>(".panel");
      if (panel) {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty("--px", `${e.clientX - r.left}px`);
        panel.style.setProperty("--py", `${e.clientY - r.top}px`);
      }

      if (reduced) return;
      const tilt = target?.closest?.<HTMLElement>("[data-tilt]") ?? null;
      if (tilted && tilted !== tilt) resetTilt(tilted);
      tilted = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width; // 0..1
        const y = (e.clientY - r.top) / r.height;
        tilt.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
        tilt.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
        tilt.style.setProperty("--gx", `${x * 100}%`);
        tilt.style.setProperty("--gy", `${y * 100}%`);
        tilt.style.setProperty("--glare", "1");
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => tilted && resetTilt(tilted);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
