"use client";

import { useEffect, useRef } from "react";

import ParticleField from "./ParticleField";

/**
 * Fixed, GPU-friendly page background:
 * gradient base + architectural grid + drifting aurora orbs + film grain
 * + a cursor spotlight (pointer devices only, rAF-throttled).
 */
export default function Background() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      spot.style.setProperty("--mx", `${x}px`);
      spot.style.setProperty("--my", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
      spot.classList.add("is-active");
    };
    const onLeave = () => spot.classList.remove("is-active");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-orb bg-orb--a" />
      <div className="bg-orb bg-orb--b" />
      <div className="bg-orb bg-orb--c" />
      <div className="bg-grid" />
      <ParticleField />
      <div className="bg-beam" />
      <div ref={spotRef} className="bg-spotlight" />
      <div className="bg-noise" />
    </div>
  );
}
