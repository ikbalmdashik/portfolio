"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "WalletHub",
    description:
      "A mobile wallet application with features such as sending money, payments, cashout and adding money.",
    number: "01",
    technologies: ["Kotlin", "Firebase"],
  },
  {
    title: "Portfolio",
    description:
      "A modern developer portfolio built with Next.js, Tailwind CSS, GSAP and smooth scrolling.",
    number: "02",
    technologies: ["Next.js", "Tailwind CSS", "GSAP"],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector(".projects-label");
      const characters =
        title.querySelectorAll(".projects-character");

      const cards =
        gsap.utils.toArray<HTMLElement>(".project-card");

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
          y: 0,
          filter: "blur(0px)",
        });

        return;
      }

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

          start: "top top",

          end: "+=2200",

          scrub: 1,

          pin: ".projects-stage",

          pinSpacing: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      // ==========================================
      // 1. PROJECTS LABEL
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
      // "PROJECTS I'VE BUILT."
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

      timeline.to(
        {},
        {
          duration: 0.25,
        }
      );

      // ==========================================
      // 4. REVEAL PROJECT CARDS
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
      // 5. HOLD
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

  const statement = "Projects I've built.";

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-[2200px]"
    >
      {/* ==========================================
          PROJECTS STAGE
      ========================================== */}

      <div
        className="
          projects-stage
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          px-6
          lg:px-8
        "
      >
        {/* ==========================================
            BACKGROUND GLOW
        ========================================== */}

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

          <div className="projects-label mb-8 text-center">
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.4em]
                text-indigo-400
              "
            >
              Projects
            </p>
          </div>

          {/* ========================================
              MAIN STATEMENT
          ======================================== */}

          <div className="flex justify-center">
            <h2
              ref={titleRef}
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
              {statement.split("").map((character, index) => {
                const gradientStart =
                  "Projects I've ".length;

                const isGradient =
                  index >= gradientStart;

                return (
                  <span
                    key={`${character}-${index}`}
                    className={`
                      projects-character
                      inline-block
                      ${
                        isGradient
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

          {/* ========================================
              PROJECT CARDS
          ======================================== */}

          <div className="mx-auto mt-16 max-w-5xl">

            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="
                    project-card
                    group
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-8
                    shadow-2xl
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-indigo-400/30
                    hover:bg-indigo-500/[0.04]
                    sm:p-10
                  "
                >
                  {/* ==================================
                      CARD NUMBER
                  ================================== */}

                  <span
                    className="
                      absolute
                      right-8
                      top-6
                      select-none
                      text-8xl
                      font-bold
                      leading-none
                      text-white/[0.03]
                      transition-all
                      duration-500
                      group-hover:text-indigo-400/[0.08]
                    "
                  >
                    {project.number}
                  </span>

                  {/* ==================================
                      CARD CONTENT
                  ================================== */}

                  <div className="relative z-10">

                    <p
                      className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.25em]
                        text-indigo-400
                      "
                    >
                      Project {project.number}
                    </p>

                    <h3
                      className="
                        mt-5
                        text-3xl
                        font-bold
                        tracking-tight
                        text-white
                        transition-transform
                        duration-500
                        group-hover:translate-x-1
                        sm:text-4xl
                      "
                    >
                      {project.title}
                    </h3>

                    <p
                      className="
                        mt-5
                        max-w-xl
                        leading-7
                        text-zinc-400
                      "
                    >
                      {project.description}
                    </p>

                    {/* ==============================
                        TECHNOLOGIES
                    ============================== */}

                    <div className="mt-8 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.04]
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-zinc-400
                            transition-all
                            duration-300
                            group-hover:border-indigo-400/20
                            group-hover:text-zinc-300
                          "
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ==================================
                      BOTTOM LINE
                  ================================== */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-8
                      right-8
                      h-px
                      origin-left
                      scale-x-0
                      bg-gradient-to-r
                      from-indigo-400
                      via-purple-400
                      to-pink-400
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                      sm:left-10
                      sm:right-10
                    "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ========================================
              FOOTER
          ======================================== */}

          <div className="mt-10 flex justify-center">
            <span
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-zinc-600
              "
            >
              Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}