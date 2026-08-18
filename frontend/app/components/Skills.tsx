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
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector(".skills-label");

      const characters =
        title.querySelectorAll(".skills-character");

      const cards =
        gsap.utils.toArray<HTMLElement>(".skill-deck-card");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // ==========================================
      // REDUCED MOTION
      // ==========================================

      if (prefersReducedMotion) {
        gsap.set(label, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });

        gsap.set(characters, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });

        gsap.set(cards, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
        });

        return;
      }

      // ==========================================
      // INITIAL HEADER STATE
      // ==========================================

      gsap.set(label, {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      });

      // ==========================================
      // TITLE INITIAL STATE
      // SAME AS ABOUT PAGE
      // ==========================================

      gsap.set(characters, {
        opacity: 0,
        y: 35,
        filter: "blur(8px)",
      });

      // ==========================================
      // CARD ENTER DIRECTIONS
      //
      // 01 → Bottom
      // 02 → Right
      // 03 → Top
      // 04 → Left
      // ==========================================

      const enterDirections = [
        {
          x: 0,
          y: "120%",
          rotate: 8,
        },
        {
          x: "120%",
          y: 0,
          rotate: 10,
        },
        {
          x: 0,
          y: "-120%",
          rotate: -8,
        },
        {
          x: "-120%",
          y: 0,
          rotate: -10,
        },
      ];

      // ==========================================
      // INITIAL CARD STATES
      // ==========================================

      cards.forEach((card, index) => {
        const direction = enterDirections[index];

        gsap.set(card, {
          x: direction.x,
          y: direction.y,
          scale: 0.85,
          rotate: direction.rotate,
          opacity: 0,
          zIndex: 10 + index,
          filter: "blur(10px)",
        });
      });

      // ==========================================
      // MAIN SCROLL TIMELINE
      // ==========================================

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: `+=${cards.length * 50}%`,

          scrub: 1,

          pin: true,

          pinSpacing: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      // ==========================================
      // 1. SKILLS LABEL
      // ==========================================

      timeline.to(label, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.12,
        ease: "power3.out",
      });

      // ==========================================
      // 2. WRITE
      // "TOOLS I USE TO BUILD."
      //
      // EXACT SAME STYLE AS ABOUT
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
      // 3. SMALL HOLD
      // ==========================================

      timeline.to(
        {},
        {
          duration: 0.2,
        }
      );

      // ==========================================
      // 4. FIRST CARD
      //
      // Comes from bottom
      // ==========================================

      timeline.to(cards[0], {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      });

      // ==========================================
      // 5. CARD TRANSITIONS
      // ==========================================

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];

        if (!nextCard) return;

        const nextDirection = enterDirections[index + 1];

        // ========================================
        // CURRENT CARD EXIT
        // ========================================

        timeline.to(card, {
          x: 0,
          y: index % 2 === 0 ? "-120%" : "120%",
          rotate: index % 2 === 0 ? -8 : 8,
          scale: 0.85,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power2.inOut",
        });

        // ========================================
        // NEXT CARD ENTER
        // ========================================

        timeline.fromTo(
          nextCard,
          {
            x: nextDirection.x,
            y: nextDirection.y,
            rotate: nextDirection.rotate,
            scale: 0.85,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          "<"
        );
      });

      // ==========================================
      // 6. FINAL HOLD
      // ==========================================

      timeline.to(
        {},
        {
          duration: 0.25,
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const statement = "Tools I use to build.";

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden"
    >
      <div className="flex min-h-screen items-center px-6 py-24 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="mb-16 max-w-6xl">

            {/* LABEL */}

            <div className="skills-label mb-8 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-indigo-400">
                Skills
              </p>
            </div>

            {/* TITLE */}

            <div className="flex justify-center">
              <h2
                ref={titleRef}
                className="
                  mx-auto
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
                {statement.split("").map((character, index) => {
                  const isBuild =
                    index >= "Tools I use to ".length;

                  return (
                    <span
                      key={`${character}-${index}`}
                      className={`
                        skills-character
                        inline-block
                        ${
                          isBuild
                            ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                            : ""
                        }
                      `}
                      style={{
                        whiteSpace:
                          character === " "
                            ? "pre"
                            : "normal",
                      }}
                    >
                      {character}
                    </span>
                  );
                })}
              </h2>
            </div>
          </div>

          {/* ==========================================
              CARD DECK
          ========================================== */}

          <div
            className="
              relative
              mx-auto
              h-[480px]
              w-full
              max-w-5xl
            "
            style={{
              perspective: "1400px",
            }}
          >
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="
                  skill-deck-card
                  absolute
                  inset-0
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-7
                  shadow-2xl
                  backdrop-blur-xl
                  will-change-transform
                  sm:p-10
                "
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* ======================================
                    CARD HEADER
                ====================================== */}

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

                {/* ======================================
                    SKILLS GRID
                ====================================== */}

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {group.skills.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <div
                        key={skill.name}
                        className="
                          group
                          flex
                          items-center
                          gap-4
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/[0.03]
                          p-4
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-indigo-400/30
                          hover:bg-indigo-500/[0.05]
                        "
                      >
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/10
                            bg-white/[0.05]
                            transition-all
                            duration-300
                            group-hover:border-indigo-400/30
                            group-hover:bg-indigo-500/10
                          "
                        >
                          <Icon
                            className="
                              text-2xl
                              text-zinc-300
                              transition-all
                              duration-300
                              group-hover:scale-110
                              group-hover:text-white
                            "
                          />
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

                {/* ======================================
                    FOOTER
                ====================================== */}

                <div
                  className="
                    absolute
                    bottom-7
                    left-7
                    right-7
                    flex
                    items-center
                    justify-between
                    sm:bottom-10
                    sm:left-10
                    sm:right-10
                  "
                >
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