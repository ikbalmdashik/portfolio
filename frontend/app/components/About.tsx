"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bigLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const label = labelRef.current;
    const bigLabel = bigLabelRef.current;

    if (!section || !text || !label || !bigLabel) return;

    const ctx = gsap.context(() => {
      const characters = text.querySelectorAll(".about-character");
      const cards = section.querySelectorAll(".about-card");

      // Set initial states (identical to Skills component)
      gsap.set(bigLabel, { opacity: 1, y: 0, scale: 1 });
      gsap.set(label, { opacity: 0, scale: 0.4, y: -20 });
      gsap.set(characters, { opacity: 0, y: 35, filter: "blur(8px)" });
      gsap.set(cards, { opacity: 0, y: 50, filter: "blur(10px)" });

      // Main Pin Timeline
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: ".about-stage",
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // 1. Reveal Title Characters (Matches Skills timeline)
      timeline.to(characters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.08,
        stagger: 0.045,
        ease: "power2.out",
      });

      // 2. Reveal Cards (Matches Skills timeline timing)
      timeline.to(cards, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.16,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 3. Hold
      timeline.to({}, { duration: 0.25 });

      // 4. Shrink Big Label & Show Sticky Label
      timeline.to(
        bigLabel,
        {
          opacity: 0,
          scale: 0.6,
          y: -50,
          duration: 0.3,
          ease: "power2.in",
        },
        "+=0.1"
      );

      timeline.to(
        label,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.15"
      );

      // Sticky Label Scroll Sync (Matches Skills logic)
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          const isMobile = window.innerWidth < 768;

          if (isMobile) {
            gsap.to(label, { opacity: 0, duration: 0.1, overwrite: "auto" });
            return;
          }

          if (progress > 0.3 && progress < 1) {
            const shrinkProgress = (progress - 0.3) / 0.7;
            const scale = 1 - shrinkProgress * 0.6;
            const opacity = 1 - shrinkProgress * 0.3;
            const yOffset = shrinkProgress * 20;

            gsap.to(label, {
              scale: Math.max(scale, 0.4),
              opacity: Math.max(opacity, 0.7),
              y: -yOffset,
              duration: 0.1,
              overwrite: "auto",
            });
          } else {
            gsap.to(label, { opacity: 0, duration: 0.1, overwrite: "auto" });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const statement = "More Than Just Code.";

  return (
    <section ref={sectionRef} id="about" className="relative min-h-[1800px]">
      {/* Sticky Top Label (Desktop only) */}
      <div
        ref={labelRef}
        className="fixed left-0 right-0 z-50 pointer-events-none hidden md:block"
        style={{
          top: "clamp(70px, 80px, 90px)",
          transformOrigin: "center center",
        }}
      >
      </div>

      {/* Main Stage Container */}
      <div className="about-stage relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 sm:pt-0 py-12">
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] sm:h-[450px] w-[350px] sm:w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center justify-center text-center my-auto">
          {/* Big Header Label (Sizing synced with Skills component) */}
          <div ref={bigLabelRef} className="mb-3 sm:mb-6 text-center w-full">
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-indigo-400 tracking-tight text-center">
              About Me
            </p>
            <div className="mt-2 sm:mt-3 h-1 w-16 sm:w-24 mx-auto bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
          </div>

          {/* Animated Headline Statement (Sizing & typography synced with Skills) */}
          <div className="flex justify-center items-center text-center w-full">
            <h2
              ref={textRef}
              className="max-w-6xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white px-2"
            >
              {statement.split("").map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  className="about-character inline-block"
                  style={{
                    whiteSpace: character === " " ? "pre" : "normal",
                  }}
                >
                  {character}
                </span>
              ))}
            </h2>
          </div>

          {/* About Cards Section */}
          <div className="mx-auto mt-6 sm:mt-8 max-w-5xl px-2 sm:px-0 text-left w-full">
            {/* Top Cards Grid */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.2fr_0.8fr]">
              {/* WHO I AM */}
              <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  Who I Am
                </p>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                  I&apos;m a Computer Science graduate and full-stack developer
                  who enjoys turning ideas into useful, well-crafted digital
                  products.
                </p>
                <p className="mt-2 sm:mt-3 leading-relaxed text-zinc-400 text-xs sm:text-sm">
                  I enjoy working across the entire development process — from
                  understanding a problem and designing a solution to building,
                  testing, and refining the final product.
                </p>
              </div>

              {/* EDUCATION */}
              <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Education
                </p>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-white">
                  Computer Science & Engineering
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Bachelor&apos;s Degree
                </p>
                <p className="mt-3 text-[10px] sm:text-xs leading-4 tracking-wide text-zinc-500">
                  AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH (AIUB)
                </p>
              </div>
            </div>

            {/* Bottom Cards Grid */}
            <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
              {/* WHAT I ENJOY */}
              <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  What I Enjoy
                </p>
                <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold text-white">
                  Solving problems.
                  <br />
                  Building solutions.
                </h3>
                <p className="mt-2 sm:mt-3 leading-relaxed text-zinc-400 text-xs sm:text-sm">
                  I enjoy taking complex problems, breaking them down into
                  smaller pieces, and turning them into practical software that
                  people can actually use.
                </p>
              </div>

              {/* PHILOSOPHY */}
              <div className="about-card rounded-2xl sm:rounded-3xl border border-indigo-400/10 bg-indigo-500/[0.04] p-5 sm:p-8 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  Philosophy
                </p>
                <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold text-white">
                  Learn. Build. Improve.
                </h3>
                <p className="mt-2 sm:mt-3 leading-relaxed text-zinc-400 text-xs sm:text-sm">
                  I believe the best way to grow is to keep learning, build
                  real things, understand mistakes, and continuously improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}