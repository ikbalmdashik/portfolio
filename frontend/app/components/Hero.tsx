"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const words = [
  "Modern",
  "Fast",
  "Scalable",
  "Reliable",
  "Thoughtful",
];

export default function Hero() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = wordRef.current;

    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      element.textContent = words[0];
      return;
    }

    let currentIndex = 0;
    let animation: gsap.core.Timeline | null = null;

    const animateWord = () => {
      if (!element) return;

      const word = words[currentIndex];

      animation?.kill();

      animation = gsap.timeline({
        onComplete: () => {
          currentIndex = (currentIndex + 1) % words.length;
          animateWord();
        },
      });

      element.textContent = "";

      const typingObject = { length: 0 };

      // Typing
      animation.to(typingObject, {
        length: word.length,
        duration: 0.7,
        ease: "none",
        onUpdate: () => {
          element.textContent = word.slice(
            0,
            Math.floor(typingObject.length)
          );
        },
      });

      // Pause
      animation.to({}, {
        duration: 1.3,
      });

      // Clear
      animation.to(typingObject, {
        length: 0,
        duration: 0.45,
        ease: "none",
        onUpdate: () => {
          element.textContent = word.slice(
            0,
            Math.floor(typingObject.length)
          );
        },
      });

      // Small pause
      animation.to({}, {
        duration: 0.2,
      });
    };

    animateWord();

    return () => {
      animation?.kill();
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

          {/* ==========================================
              LEFT
          ========================================== */}

          <div className="max-w-3xl">

            {/* Availability */}
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-sm text-zinc-400">
                Available for opportunities
              </span>
            </div>

            {/* Role */}
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-indigo-400">
              Full-Stack Developer
            </p>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">

              <span className="block">
                Building
              </span>

              <span className="block min-h-[1.05em] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                <span ref={wordRef} />
              </span>

              <span className="block">
                web applications.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
              I build performant full-stack applications with
              modern frontend technologies, robust backend systems,
              and reliable databases.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap gap-4">

              {/* <a
                href="#projects"
                className="group rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition duration-300 hover:scale-105 hover:bg-zinc-100"
              >
                View Projects
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a> */}

              <a
                href="#contact"
                className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-indigo-400 hover:bg-indigo-500/10"
              >
                Contact Me
              </a>

            </div>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-5 text-sm text-zinc-500">

              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
              >
                GitHub
              </a>

              <span className="text-zinc-700">/</span>

              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
              >
                LinkedIn
              </a>

              <span className="text-zinc-700">/</span>

              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
              >
                Resume
              </a>

            </div>

          </div>

          {/* ==========================================
              RIGHT — DEVELOPER CARD
          ========================================== */}

          <div
            ref={cardRef}
            className="relative mx-auto w-full max-w-md"
          >

            {/* Glow */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-indigo-500/10 blur-3xl" />

            {/* Card */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 shadow-2xl shadow-black/20 backdrop-blur-3xl">

              {/* Window header */}
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">

                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />

                <span className="ml-auto text-xs text-zinc-600">
                  developer.ts
                </span>

              </div>

              {/* Code */}
              <div className="p-6 font-mono text-sm leading-7">

                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-300">
                    developer
                  </span>{" "}
                  = {"{"}
                </div>

                <div className="pl-5">
                  <span className="text-zinc-500">
                    name:
                  </span>{" "}
                  <span className="text-emerald-300">
                    "MD Ashik Ikbal"
                  </span>,
                </div>

                <div className="pl-5">
                  <span className="text-zinc-500">
                    role:
                  </span>{" "}
                  <span className="text-emerald-300">
                    "Full-Stack Developer"
                  </span>,
                </div>

                <div className="pl-5">
                  <span className="text-zinc-500">
                    frontend:
                  </span>{" "}
                  <span className="text-amber-300">
                    ["Next.js", "React"]
                  </span>,
                </div>

                <div className="pl-5">
                  <span className="text-zinc-500">
                    backend:
                  </span>{" "}
                  <span className="text-amber-300">
                    ["NestJS", "Node.Js"]
                  </span>,
                </div>

                <div className="pl-5">
                  <span className="text-zinc-500">
                    database:
                  </span>{" "}
                  <span className="text-amber-300">
                    ["PostgreSQL"]
                  </span>,
                </div>

                <div className="pl-5">
                  <span className="text-zinc-500">
                    tools:
                  </span>{" "}
                  <span className="text-amber-300">
                    ["Docker", "Git"]
                  </span>,
                </div>

                <div className="pl-5">
                  <span className="text-zinc-500">
                    mindset:
                  </span>{" "}
                  <span className="text-emerald-300">
                    "Build. Learn. Improve."
                  </span>
                </div>

                <div>
                  {"}"};
                </div>

                {/* Cursor */}
                <div className="mt-5 flex items-center gap-2 text-zinc-500">
                  <span>▸</span>
                  <span className="h-4 w-2 animate-pulse bg-indigo-400" />
                </div>

              </div>

              {/* Bottom status */}
              <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-zinc-500">

                <span>
                  ~/portfolio
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online
                </span>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}