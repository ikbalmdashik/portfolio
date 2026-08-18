"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiDjango,
  SiPostgresql,
  SiDocker,
  SiGit,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Frontend",
    number: "01",
    description: "Building modern and responsive interfaces.",
    skills: [
      {
        name: "JavaScript",
        icon: SiJavascript,
        keyword: "Dynamic",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        keyword: "Typed",
      },
      {
        name: "React",
        icon: SiReact,
        keyword: "Components",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        keyword: "Full-Stack",
      },
    ],
  },

  {
    title: "Backend",
    number: "02",
    description: "Building APIs and server-side applications.",
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        keyword: "Runtime",
      },
      {
        name: "NestJS",
        icon: SiNestjs,
        keyword: "APIs",
      },
      {
        name: "Django",
        icon: SiDjango,
        keyword: "Backend",
      },
    ],
  },

  {
    title: "Database",
    number: "03",
    description: "Working with reliable and structured data.",
    skills: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        keyword: "Relational",
      },
    ],
  },

  {
    title: "Tools & Workflow",
    number: "04",
    description: "Tools I use to build and manage projects.",
    skills: [
      {
        name: "Docker",
        icon: SiDocker,
        keyword: "Containers",
      },
      {
        name: "Git",
        icon: SiGit,
        keyword: "Version Control",
      },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      ".skill-deck-card"
    );

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // ==========================================
      // REDUCED MOTION
      // ==========================================

      if (prefersReducedMotion) {
        gsap.set(cards, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
        });

        return;
      }

      // ==========================================
      // INITIAL CARD DECK
      // ==========================================

      cards.forEach((card, index) => {
        if (index === 0) {
          // Front card
          gsap.set(card, {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            opacity: 1,
            zIndex: 10,
          });
        } else {
          // Cards behind frontend
          gsap.set(card, {
            x: index * 6,
            y: index * 14,
            scale: 1 - index * 0.025,
            rotate: index % 2 === 0 ? 1 : -1,
            opacity: 1,
            zIndex: 10 - index,
          });
        }
      });

      // ==========================================
      // EXIT DIRECTIONS
      // ==========================================

      const exitDirections = [
        {
          x: 0,
          y: "-120%",
          rotate: -8,
        },

        {
          x: "120%",
          y: 0,
          rotate: 10,
        },

        {
          x: 0,
          y: "120%",
          rotate: 8,
        },

        {
          x: "-120%",
          y: 0,
          rotate: -10,
        },
      ];

      // ==========================================
      // SCROLL TIMELINE
      // ==========================================

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          /*
            4 transitions:

            1 → Frontend
            2 → Backend
            3 → Database
            4 → Tools exits

            After that the section unpins.
          */

          end: `+=${cards.length * 100}%`,

          scrub: 1,

          pin: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      // ==========================================
      // CARD TRANSITIONS
      // ==========================================

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];

        const exit = exitDirections[index];

        const label = `card-${index}`;

        // ------------------------------------------
        // Current card exits
        // ------------------------------------------

        timeline.to(
          card,
          {
            x: exit.x,
            y: exit.y,
            rotate: exit.rotate,
            scale: 0.85,
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          label
        );

        // ------------------------------------------
        // Bring next card to center
        // ------------------------------------------

        if (nextCard) {
          timeline.to(
            nextCard,
            {
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            label
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative"
    >
      <div className="flex min-h-screen items-center px-6 py-24 lg:px-8">

        <div className="mx-auto w-full max-w-7xl">

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="mb-12 max-w-3xl">

            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-indigo-400">
              Skills
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Tools I use to{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                build.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
              Technologies and tools I use to build modern,
              reliable, and scalable web applications.
            </p>

          </div>

          {/* ==========================================
              CARD DECK
          ========================================== */}

          <div
            className="relative mx-auto h-[480px] w-full max-w-5xl"
            style={{
              perspective: "1400px",
            }}
          >
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="skill-deck-card absolute inset-0 rounded-[2rem] border border-white/10 bg-zinc-950/90 p-7 shadow-2xl backdrop-blur-xl will-change-transform sm:p-10"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >

                {/* ==================================
                    HEADER
                ================================== */}

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-400">
                      {group.number}
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                      {group.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-zinc-500">
                      {group.description}
                    </p>

                  </div>

                  <span className="hidden select-none text-8xl font-bold leading-none text-white/[0.03] sm:block">
                    {group.number}
                  </span>

                </div>

                {/* ==================================
                    SKILLS
                ================================== */}

                <div className="mt-10 grid gap-4 sm:grid-cols-2">

                  {group.skills.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-indigo-500/[0.05]"
                      >

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-all duration-300 group-hover:border-indigo-400/30 group-hover:bg-indigo-500/10">

                          <Icon className="text-2xl text-zinc-300 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />

                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {skill.name}
                          </p>

                          <p className="mt-0.5 text-xs text-zinc-500">
                            {skill.keyword}
                          </p>
                        </div>

                      </div>
                    );
                  })}

                </div>

                {/* ==================================
                    FOOTER
                ================================== */}

                <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between sm:bottom-10 sm:left-10 sm:right-10">

                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                    Scroll to explore
                  </span>

                  <span className="text-sm text-zinc-600">
                    {group.number} / 04
                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}