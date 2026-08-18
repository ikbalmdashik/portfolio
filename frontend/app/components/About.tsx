"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const ctx = gsap.context(() => {
      const characters = text.querySelectorAll(".about-character");
      const label = section.querySelector(".about-label");
      const cards = section.querySelectorAll(".about-card");

      // ==========================================
      // INITIAL STATES
      // ==========================================

      gsap.set(label, {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      });

      gsap.set(characters, {
        opacity: 0,
        y: 35,
        filter: "blur(8px)",
      });

      gsap.set(cards, {
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
      });

      // ==========================================
      // MAIN SCROLL TIMELINE
      // ==========================================

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          // About starts as soon as it enters
          start: "top top",

          // Length of the animation
          end: "+=2200",

          scrub: 1,

          // Keep the About content fixed
          // while the user scrolls through animation
          pin: ".about-stage",

          pinSpacing: true,

          anticipatePin: 1,
        },
      });

      // ==========================================
      // 1. ABOUT LABEL
      // ==========================================

      timeline.to(label, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.12,
        ease: "power3.out",
      });

      // ==========================================
      // 2. WRITE "MORE THAN JUST CODE."
      // ==========================================

      timeline.to(characters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.08,
        stagger: 0.045,
        ease: "power2.out",
      });

      // ==========================================
      // 3. HOLD
      // ==========================================

      timeline.to({}, {
        duration: 0.25,
      });

      // ==========================================
      // 5. REVEAL CARDS
      // ==========================================

      timeline.to(cards, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.16,
        stagger: 0.12,
        ease: "power3.out",
      });

      // ==========================================
      // 6. HOLD
      // ==========================================

      timeline.to({}, {
        duration: 0.25,
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const statement = "More Than Just Code.";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[2200px]"
    >
      {/* ==========================================
          ABOUT STAGE
      ========================================== */}

      <div className="about-stage relative flex min-h-screen items-center justify-center overflow-hidden px-6 lg:px-8">

        {/* ========================================
            SUBTLE BACKGROUND GLOW
        ======================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-indigo-500/[0.05]
            blur-[150px]
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">

          {/* ========================================
              LABEL
          ======================================== */}

          <div className="about-label mb-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-indigo-400">
              About Me
            </p>
          </div>

          {/* ========================================
              MAIN STATEMENT
          ======================================== */}

          <div className="flex justify-center">
            <h2
              ref={textRef}
              className="
                max-w-6xl
                text-center
                text-5xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              {statement.split("").map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  className="about-character inline-block"
                  style={{
                    whiteSpace:
                      character === " " ? "pre" : "normal",
                  }}
                >
                  {character}
                </span>
              ))}
            </h2>
          </div>

          {/* ========================================
              CARDS
          ======================================== */}

          <div className="mx-auto mt-16 max-w-5xl">

            {/* ======================================
                TOP CARDS
            ====================================== */}

            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">

              {/* WHO I AM */}

              <div className="about-card rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl sm:p-10">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-400">
                  Who I Am
                </p>

                <p className="mt-6 text-lg leading-8 text-zinc-300">
                  I&apos;m a Computer Science graduate and full-stack
                  developer who enjoys turning ideas into useful,
                  well-crafted digital products.
                </p>

                <p className="mt-5 leading-7 text-zinc-500">
                  I enjoy working across the entire development
                  process — from understanding a problem and
                  designing a solution to building, testing, and
                  refining the final product.
                </p>

              </div>

              {/* EDUCATION */}

              <div className="about-card rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
                  Education
                </p>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  Computer Science & Engineering
                </h3>

                <p className="mt-2 text-zinc-400">
                  Bachelor&apos;s Degree
                </p>

                <p className="mt-4 text-xs leading-5 tracking-wide text-zinc-600">
                  AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH
                  <br />
                  (AIUB)
                </p>

              </div>
            </div>

            {/* ======================================
                SECONDARY CARDS
            ====================================== */}

            <div className="mt-8 grid gap-8 md:grid-cols-2">

              {/* WHAT I ENJOY */}

              <div className="about-card rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
                  What I Enjoy
                </p>

                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Solving problems.
                  <br />
                  Building solutions.
                </h3>

                <p className="mt-4 leading-7 text-zinc-500">
                  I enjoy taking complex problems, breaking them
                  down into smaller pieces, and turning them into
                  practical software that people can actually use.
                </p>

              </div>

              {/* PHILOSOPHY */}

              <div className="about-card rounded-3xl border border-indigo-400/10 bg-indigo-500/[0.04] p-8 backdrop-blur-xl">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-400">
                  Philosophy
                </p>

                <h3 className="mt-4 text-2xl font-semibold text-white">
                  Learn. Build. Improve.
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  I believe the best way to grow is to keep learning,
                  build real things, understand mistakes, and
                  continuously improve.
                </p>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}