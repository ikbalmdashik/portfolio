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
        color: "#F7DF1E",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178C6",
      },
      {
        name: "React",
        icon: SiReact,
        color: "#61DAFB",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#FFFFFF",
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
        color: "#5FA04E",
      },
      {
        name: "NestJS",
        icon: SiNestjs,
        color: "#E0234E",
      },
      {
        name: "Django",
        icon: SiDjango,
        color: "#44B78B",
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
        color: "#4169E1",
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
        color: "#2496ED",
      },
      {
        name: "Git",
        icon: SiGit,
        color: "#F05032",
      },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cardsContainer = cardsRef.current;

    if (!section || !title || !cardsContainer) return;

    const ctx = gsap.context(() => {
      const characters =
        title.querySelectorAll(".skills-character");

      const cards =
        gsap.utils.toArray<HTMLElement>(".skill-card");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /*
       * ==========================================
       * REDUCED MOTION
       * ==========================================
       */

      if (prefersReducedMotion) {
        gsap.set(characters, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });

        gsap.set(cards, {
          opacity: 1,
          scale: 1,
          y: 0,
        });

        return;
      }

      /*
       * ==========================================
       * INITIAL TITLE STATE
       * ==========================================
       */

      gsap.set(characters, {
        opacity: 0,
        y: 35,
        filter: "blur(8px)",
      });

      /*
       * ==========================================
       * INITIAL CARD STATE
       * ==========================================
       *
       * Frontend is visible first.
       * Everything else starts hidden.
       */

      gsap.set(cards, {
        opacity: 0,
        scale: 0.96,
        y: 20,
        pointerEvents: "none",
      });

      gsap.set(cards[0], {
        opacity: 1,
        scale: 1,
        y: 0,
        pointerEvents: "auto",
      });

      /*
       * ==========================================
       * SCROLL TIMELINE
       * ==========================================
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * ==========================================
       * TITLE ANIMATION
       * ==========================================
       */

      timeline.to(characters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.045,
        ease: "power2.out",
      });

      /*
       * ==========================================
       * FRONTEND
       * ==========================================
       *
       * Frontend is shown first.
       */

      timeline.to(
        cards[0],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      );

      /*
       * Hold Frontend
       */

      timeline.to({}, { duration: 0.8 });

      /*
       * ==========================================
       * FRONTEND → BACKEND
       * ==========================================
       *
       * Frontend fades out.
       * Backend fades in at the same time.
       */

      timeline.to(
        cards[0],
        {
          opacity: 0,
          scale: 0.96,
          y: -20,
          pointerEvents: "none",
          duration: 0.8,
          ease: "power2.inOut",
        }
      );

      timeline.fromTo(
        cards[1],
        {
          opacity: 0,
          scale: 0.96,
          y: 20,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<"
      );

      /*
       * Hold Backend
       */

      timeline.to({}, { duration: 0.8 });

      /*
       * ==========================================
       * BACKEND → DATABASE
       * ==========================================
       */

      timeline.to(
        cards[1],
        {
          opacity: 0,
          scale: 0.96,
          y: -20,
          pointerEvents: "none",
          duration: 0.8,
          ease: "power2.inOut",
        }
      );

      timeline.fromTo(
        cards[2],
        {
          opacity: 0,
          scale: 0.96,
          y: 20,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<"
      );

      /*
       * Hold Database
       */

      timeline.to({}, { duration: 0.8 });

      /*
       * ==========================================
       * DATABASE → TOOLS
       * ==========================================
       */

      timeline.to(
        cards[2],
        {
          opacity: 0,
          scale: 0.96,
          y: -20,
          pointerEvents: "none",
          duration: 0.8,
          ease: "power2.inOut",
        }
      );

      timeline.fromTo(
        cards[3],
        {
          opacity: 0,
          scale: 0.96,
          y: 20,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<"
      );

      /*
       * Final hold
       */

      timeline.to({}, { duration: 1 });
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

          {/* HEADER */}

          <div className="mb-16 max-w-6xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-indigo-400">
                Skills
              </p>
            </div>

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

          {/* SKILLS */}

          <div
            ref={cardsRef}
            className="relative mx-auto h-[420px] w-full max-w-5xl"
          >
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="
                  skill-card
                  absolute
                  inset-0
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-7
                  shadow-2xl
                  backdrop-blur-xl
                  sm:p-10
                "
              >
                {/* CARD HEADER */}

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

                {/* SKILLS GRID */}

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
                          hover:border-white/20
                          hover:bg-white/[0.06]
                        "
                      >
                        {/* ICON */}

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
                            bg-black/20
                          "
                        >
                          <Icon
                            className="
                              text-2xl
                              text-zinc-400
                              grayscale
                              transition-all
                              duration-300
                              group-hover:scale-110
                              group-hover:grayscale-0
                            "
                            style={{
                              color: skill.color,
                            }}
                          />
                        </div>

                        {/* TOOL NAME */}

                        <p className="font-medium text-white">
                          {skill.name}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* FOOTER */}

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