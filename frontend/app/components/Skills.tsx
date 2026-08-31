"use client";

import { useEffect, useRef, useState } from "react";
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
  SiTailwindcss,
  SiSass,
  SiMongodb,
  SiRedis,
  SiNginx,
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
        info: "ES6+, Async/Await, DOM Manipulation",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178C6",
        info: "Type Safety, Interfaces, Generics",
      },
      {
        name: "React",
        icon: SiReact,
        color: "#61DAFB",
        info: "Hooks, Context API, Component Architecture",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "#FFFFFF",
        info: "SSR, SSG, API Routes, App Router",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "#06B6D4",
        info: "Utility-First CSS, Responsive Design",
      },
      {
        name: "Sass",
        icon: SiSass,
        color: "#CC6699",
        info: "Variables, Mixins, Nested Styles",
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
        info: "Express, REST APIs, Microservices",
      },
      {
        name: "NestJS",
        icon: SiNestjs,
        color: "#E0234E",
        info: "Modular Architecture, TypeScript, GraphQL",
      },
      {
        name: "Django",
        icon: SiDjango,
        color: "#44B78B",
        info: "ORM, Admin Panel, REST Framework",
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
        info: "Complex Queries, Indexing, ACID Compliance",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
        info: "NoSQL, Document Database, Aggregation",
      },
      {
        name: "Redis",
        icon: SiRedis,
        color: "#DC382D",
        info: "Caching, Session Management, Pub/Sub",
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
        info: "Containerization, Docker Compose, CI/CD",
      },
      {
        name: "Git",
        icon: SiGit,
        color: "#F05032",
        info: "Version Control, Branching, Collaboration",
      },
      {
        name: "Nginx",
        icon: SiNginx,
        color: "#009639",
        info: "Reverse Proxy, Load Balancing, Web Server",
      },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bigLabelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const frontendCardRef = useRef<HTMLDivElement>(null);

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const label = labelRef.current;
    const bigLabel = bigLabelRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;
    const frontendCard = frontendCardRef.current;

    if (
      !section ||
      !title ||
      !label ||
      !bigLabel ||
      !header ||
      !cardsContainer ||
      !frontendCard
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const characters = title.querySelectorAll(".skills-character");
      const cards = cardsContainer.querySelectorAll(".skill-card");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /*
       * Initial states
       */

      gsap.set(bigLabel, {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      gsap.set(label, {
        opacity: 0,
        scale: 0.4,
        y: -20,
      });

      gsap.set(characters, {
        opacity: 0,
        y: 30,
        filter: "blur(4px)",
      });

      gsap.set(cards, {
        opacity: 0,
        y: 30,
        scale: 0.98,
      });

      // Set initial position for title
      gsap.set(title, {
        y: 0,
        opacity: 1,
      });

      /*
       * Reduced motion
       */

      if (prefersReducedMotion) {
        gsap.set(characters, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });

        gsap.set(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
        });

        return;
      }

      /*
       * Pin the Skills header.
       */

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
        anticipatePin: 1,
      });

      /*
       * Subtitle character animation.
       */

      gsap.to(characters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=8%",
          scrub: 1,
          toggleActions: "play none none none",
        },
      });

      /*
       * Cards animation.
       */

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",

        scrollTrigger: {
          trigger: section,
          start: "top+=5% top",
          end: "top+=20% top",
          scrub: 1,
          toggleActions: "play none none none",
        },
      });

      /*
       * Large Skills -> Small Skills transition.
       */

      const transitionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top+=15% top",
          end: "top+=30% top",
          scrub: 1,
          toggleActions: "play none none none",
        },
      });

      transitionTimeline.to(bigLabel, {
        opacity: 0,
        scale: 0.5,
        y: -30,
        duration: 0.3,
        ease: "power2.in",
      });

      transitionTimeline.to(
        label,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );

      /*
       * ---------------------------------------------------------
       * FRONTEND CARD -> SUBTITLE COLLISION
       * ---------------------------------------------------------
       *
       * The subtitle moves up when the Frontend card approaches it
       * and continues scrolling up with the card.
       */

      // Ensure the title has will-change for better performance
      gsap.set(title, {
        willChange: "transform, opacity",
      });

      // Create scroll trigger for title animation
      ScrollTrigger.create({
        trigger: frontendCard,
        start: "top 40%",
        end: "top -20%",
        scrub: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = Math.min(self.progress, 1);
          const moveDistance = 300;

          // Move the title up with the card
          gsap.to(title, {
            y: -moveDistance * progress,
            opacity: 1 - progress * 0.2,
            duration: 0.15,
            overwrite: "auto",
            ease: "power1.out",
          });
        },
      });

      /*
       * Sticky label shrink on scroll.
       */

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",

        onUpdate: (self) => {
          const progress = self.progress;
          const mobile = window.innerWidth < 768;

          if (mobile) {
            gsap.to(label, {
              opacity: 0,
              duration: 0.1,
              overwrite: "auto",
            });

            return;
          }

          if (progress > 0.2 && progress < 0.8) {
            const shrinkProgress = (progress - 0.2) / 0.6;

            const scale = 1 - shrinkProgress * 0.6;
            const labelOpacity = 1 - shrinkProgress * 0.3;
            const yOffset = shrinkProgress * 15;

            gsap.to(label, {
              scale: Math.max(scale, 0.4),
              opacity: Math.max(labelOpacity, 0.7),
              y: -yOffset,
              duration: 0.1,
              overwrite: "auto",
            });
          } else if (progress >= 0.8 || progress <= 0.2) {
            gsap.to(label, {
              opacity: 0,
              duration: 0.1,
              overwrite: "auto",
            });
          }
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const statement = "Tools I use to build.";

  const handleSkillClick = (skillName: string) => {
    if (isMobile) {
      setHoveredSkill(
        hoveredSkill === skillName ? null : skillName
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-[280vh]"
    >
      {/* Sticky Label - Below Navbar */}
      <div
        ref={labelRef}
        className="fixed left-0 right-0 z-50 pointer-events-none hidden md:block"
        style={{
          top: "clamp(70px, 80px, 90px)",
          transformOrigin: "center center",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-indigo-400 whitespace-nowrap">
              Skills
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <div
        ref={headerRef}
        className="sticky top-0 z-40 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 bg-transparent"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Large Skills Label */}
            <div className="mb-2 sm:mb-4 text-center">
              <div
                ref={bigLabelRef}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-indigo-400 tracking-tight">
                  Skills
                </p>

                <div className="mt-1.5 h-1 w-12 sm:w-20 mx-auto bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">

          {/* =================================================
              TOOLS I USE TO BUILD
              ================================================= */}

          <div className="flex justify-center mb-16 sm:mb-20 md:mb-24">
            <h2
              ref={titleRef}
              className="max-w-6xl text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-white px-2"
            >
              {statement.split("").map((character, index) => {
                const isBuild =
                  index >= "Tools I use to ".length;

                return (
                  <span
                    key={`${character}-${index}`}
                    className={`skills-character inline-block ${
                      isBuild
                        ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                        : ""
                    }`}
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

          {/* =================================================
              SKILLS CARDS
              ================================================= */}

          <div
            ref={cardsContainerRef}
            className="max-w-6xl mx-auto pt-40 sm:pt-52 md:pt-64 lg:pt-80"
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6">

              {skillGroups.map((group, groupIndex) => (
                <div
                  key={group.title}
                  ref={
                    groupIndex === 0
                      ? frontendCardRef
                      : undefined
                  }
                  className="skill-card rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex-1">

                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm font-medium text-indigo-400">
                          {group.number}
                        </span>

                        <span className="h-px flex-1 bg-gradient-to-r from-indigo-400/20 to-transparent" />
                      </div>

                      <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-white">
                        {group.title}
                      </h3>

                      <p className="mt-1 text-zinc-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        {group.description}
                      </p>
                    </div>

                    <span className="hidden lg:block select-none text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-white/[0.03] ml-3">
                      {group.number}
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {group.skills.map((skill) => {
                      const Icon = skill.icon;

                      const isHovered =
                        hoveredSkill === skill.name;

                      return (
                        <div
                          key={skill.name}
                          className={`group relative flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 cursor-pointer ${
                            isHovered || isMobile
                              ? "border-indigo-400/30 bg-indigo-500/10 -translate-y-0.5 shadow-lg shadow-indigo-500/10"
                              : "border-white/10 bg-white/[0.03] hover:border-indigo-400/20 hover:bg-white/[0.06] hover:-translate-y-0.5"
                          }`}
                          onMouseEnter={() =>
                            !isMobile &&
                            setHoveredSkill(skill.name)
                          }
                          onMouseLeave={() =>
                            !isMobile &&
                            setHoveredSkill(null)
                          }
                          onClick={() =>
                            handleSkillClick(skill.name)
                          }
                        >
                          {/* Icon */}
                          <div
                            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg transition-all duration-300 ${
                              isHovered || isMobile
                                ? "bg-indigo-500/20 scale-105"
                                : "bg-black/20 group-hover:bg-indigo-500/10 group-hover:scale-105"
                            }`}
                          >
                            <Icon
                              className={`text-xl sm:text-2xl transition-all duration-300 ${
                                isHovered || isMobile
                                  ? "grayscale-0"
                                  : "text-zinc-400 grayscale group-hover:grayscale-0"
                              }`}
                              style={{
                                color:
                                  isHovered || isMobile
                                    ? skill.color
                                    : undefined,
                              }}
                            />
                          </div>

                          {/* Skill Name */}
                          <p className="font-medium text-white text-[10px] sm:text-xs text-center">
                            {skill.name}
                          </p>

                          {/* Skill Info Tooltip */}
                          <div
                            className={`absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full bg-indigo-950/90 backdrop-blur-xl text-indigo-200 text-[10px] sm:text-xs px-2.5 py-1 rounded-lg border border-indigo-400/20 whitespace-nowrap transition-all duration-300 pointer-events-none z-20 ${
                              isHovered ||
                              (isMobile &&
                                hoveredSkill === skill.name)
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95"
                            }`}
                          >
                            {skill.info}

                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-950/90 border-r border-b border-indigo-400/20 rotate-45" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}