"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="about-reveal mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-indigo-400">
            About Me
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            More than just{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              code.
            </span>
          </h2>
        </div>

        {/* ==========================================
            MAIN CONTENT
        ========================================== */}

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          {/* ==========================================
              INTRODUCTION
          ========================================== */}

          <div className="about-reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">

            <div className="mb-8 flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10">
                <span className="text-lg text-indigo-400">
                  {"</>"}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Full-Stack Developer
                </h3>

                <p className="text-sm text-zinc-500">
                  Building things for the web
                </p>
              </div>

            </div>

            <div className="space-y-5 text-base leading-8 text-zinc-400">

              <p>
                I'm a Computer Science graduate and full-stack developer
                who enjoys turning ideas into useful, well-crafted
                digital products.
              </p>

              <p>
                I enjoy working across the entire development process —
                from understanding a problem and designing a solution
                to building, testing, and refining the final product.
              </p>

              <p>
                While I enjoy full-stack development, I'm particularly
                interested in backend engineering, system architecture,
                and building applications that are reliable and
                maintainable.
              </p>

            </div>

          </div>

          {/* ==========================================
              QUICK FACTS
          ========================================== */}

          <div className="grid gap-8">

            {/* Education */}

            <div className="about-reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">

              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Education
              </p>

              <h3 className="mt-4 text-xl font-semibold text-white">
                Computer Science & Engineering
              </h3>

              <p className="mt-2 text-zinc-400">
                Bachelor's Degree
              </p>

              <p className="mt-2 text-sm text-zinc-600">
                AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH (AIUB)
              </p>

            </div>

            {/* Development Focus */}

            <div className="about-reveal rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">

              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Development Focus
              </p>

              <div className="mt-5 space-y-3">

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span className="text-zinc-300">
                    Full-Stack Web Development
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <span className="text-zinc-300">
                    Backend Engineering
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                  <span className="text-zinc-300">
                    System Architecture
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span className="text-zinc-300">
                    Problem Solving
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ==========================================
            JOURNEY
        ========================================== */}

        <div className="about-reveal mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">

          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                My Journey
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                Always learning.
                <br />
                Always building.
              </h3>
            </div>

            <div className="space-y-6">

              {/* Education */}

              <div className="relative border-l border-zinc-800 pl-6">

                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-indigo-400" />

                <p className="text-sm text-indigo-400">
                  Education
                </p>

                <h4 className="mt-1 font-medium text-white">
                  Computer Science & Engineering
                </h4>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Built a strong foundation in programming, software
                  development, databases, algorithms, and computer
                  science fundamentals.
                </p>

              </div>

              {/* Development */}

              <div className="relative border-l border-zinc-800 pl-6">

                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-purple-400" />

                <p className="text-sm text-purple-400">
                  Development
                </p>

                <h4 className="mt-1 font-medium text-white">
                  From learning to building
                </h4>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Started building real-world applications and
                  exploring both frontend and backend development
                  through hands-on projects.
                </p>

              </div>

              {/* Current */}

              <div className="relative border-l border-zinc-800 pl-6">

                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-pink-400" />

                <p className="text-sm text-pink-400">
                  Today
                </p>

                <h4 className="mt-1 font-medium text-white">
                  Growing as a full-stack developer
                </h4>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Continuing to deepen my knowledge of backend
                  engineering, system design, application architecture,
                  and production-ready development.
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* ==========================================
            PHILOSOPHY
        ========================================== */}

        <div className="about-reveal mt-8 grid gap-8 md:grid-cols-2">

          <div className="rounded-3xl border border-indigo-400/10 bg-indigo-500/[0.04] p-8 backdrop-blur-sm">

            <p className="text-sm uppercase tracking-[0.2em] text-indigo-400">
              What Drives Me
            </p>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              Building things that matter.
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              I enjoy taking a problem, breaking it down, and turning
              it into a practical solution. For me, development is
              about more than writing code — it's about understanding
              why something should exist and making it work well.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">

            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              My Philosophy
            </p>

            <h3 className="mt-4 text-2xl font-semibold text-white">
              Learn. Build. Improve.
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              I believe the best way to grow as a developer is to
              continuously learn, build real projects, make mistakes,
              understand them, and keep improving.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}