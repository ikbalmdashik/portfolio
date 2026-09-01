"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGnubash,
  SiNodedotjs,
  SiNestjs,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiTypeorm,
  SiKotlin,
  SiAndroidstudio,
  SiOpenjdk,
  SiFirebase,
  SiGithub,
  SiDocker,
  SiFedora,
  SiPostman,
} from "react-icons/si";
import { GrOracle } from "react-icons/gr";
import { Code2, Server, Smartphone, Wrench, Database, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  level: number;
  icon: React.ElementType;
  iconColor: string;
  barColor: string;
  description: string;
}

interface SkillCategory {
  id: string;
  category: string;
  accent: string;
  activeBtnBg: string;
  icon: React.ElementType;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend",
    accent: "text-cyan-400",
    activeBtnBg: "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25",
    icon: Code2,
    skills: [
      { name: "React / Next.js", level: 90, icon: SiReact, iconColor: "text-[#61DAFB]", barColor: "bg-[#61DAFB]", description: "Component architecture, SSR, & state management" },
      { name: "TypeScript", level: 85, icon: SiTypescript, iconColor: "text-[#3178C6]", barColor: "bg-[#3178C6]", description: "Strict type safety & maintainable codebases" },
      { name: "Tailwind CSS", level: 95, icon: SiTailwindcss, iconColor: "text-[#06B6D4]", barColor: "bg-[#06B6D4]", description: "Responsive layouts & custom design systems" },
      { name: "Next.js Framework", level: 85, icon: SiNextdotjs, iconColor: "text-white", barColor: "bg-white", description: "App router, server actions, & optimization" },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    accent: "text-purple-400",
    activeBtnBg: "bg-purple-500 text-white shadow-lg shadow-purple-500/25",
    icon: Server,
    skills: [
      { name: "Node.js", level: 85, icon: SiNodedotjs, iconColor: "text-[#5FA04E]", barColor: "bg-[#5FA04E]", description: "Scalable asynchronous backend services" },
      { name: "NestJS", level: 75, icon: SiNestjs, iconColor: "text-[#E0234E]", barColor: "bg-[#E0234E]", description: "Modular Enterprise Node.js architecture" },
      { name: "Django REST", level: 75, icon: SiDjango, iconColor: "text-[#092E20]", barColor: "bg-[#092E20]", description: "Python Web APIs & rapid backend development" },
      { name: "Bash Scripting", level: 70, icon: SiGnubash, iconColor: "text-[#4EAA25]", barColor: "bg-[#4EAA25]", description: "CLI automation & server administration" },
    ],
  },
  {
    id: "database",
    category: "Databases & ORMs",
    accent: "text-amber-400",
    activeBtnBg: "bg-amber-500 text-white shadow-lg shadow-amber-500/25",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85, icon: SiPostgresql, iconColor: "text-[#4169E1]", barColor: "bg-[#4169E1]", description: "Relational modeling & query optimization" },
      { name: "MySQL", level: 80, icon: SiMysql, iconColor: "text-[#4479A1]", barColor: "bg-[#4479A1]", description: "Database schema design & query optimization" },
      { name: "Oracle DB", level: 70, icon: GrOracle, iconColor: "text-[#F80000]", barColor: "bg-[#F80000]", description: "Enterprise SQL & relational database management" },
      { name: "Prisma ORM", level: 85, icon: SiPrisma, iconColor: "text-[#2D3748]", barColor: "bg-[#2D3748]", description: "Type-safe database client & schema migrations" },
      { name: "TypeORM", level: 75, icon: SiTypeorm, iconColor: "text-[#FE0803]", barColor: "bg-[#FE0803]", description: "ActiveRecord and Data Mapper ORM patterns" },
    ],
  },
  {
    id: "mobile",
    category: "Mobile",
    accent: "text-blue-400",
    activeBtnBg: "bg-blue-500 text-white shadow-lg shadow-blue-500/25",
    icon: Smartphone,
    skills: [
      { name: "Kotlin", level: 85, icon: SiKotlin, iconColor: "text-[#7F52FF]", barColor: "bg-[#7F52FF]", description: "Native Android development with clean architecture" },
      { name: "Android Studio", level: 85, icon: SiAndroidstudio, iconColor: "text-[#3DDC84]", barColor: "bg-[#3DDC84]", description: "UI layout development & app deployment" },
      { name: "Java", level: 75, icon: SiOpenjdk, iconColor: "text-[#ED8B00]", barColor: "bg-[#ED8B00]", description: "Object-oriented programming & legacy support" },
      { name: "Firebase", level: 80, icon: SiFirebase, iconColor: "text-[#FFCA28]", barColor: "bg-[#FFCA28]", description: "Auth, Firestore, & real-time DB integrations" },
    ],
  },
  {
    id: "tools",
    category: "Tools & DevOps",
    accent: "text-emerald-400",
    activeBtnBg: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25",
    icon: Wrench,
    skills: [
      { name: "Git / GitHub", level: 90, icon: SiGithub, iconColor: "text-white", barColor: "bg-white", description: "Version control, branching strategies, & collaboration" },
      { name: "Docker", level: 70, icon: SiDocker, iconColor: "text-[#2496ED]", barColor: "bg-[#2496ED]", description: "Containerization & consistent environment setup" },
      { name: "Fedora Linux", level: 80, icon: SiFedora, iconColor: "text-[#51A2DA]", barColor: "bg-[#51A2DA]", description: "Linux OS environment & shell workflow" },
      { name: "Postman API", level: 85, icon: SiPostman, iconColor: "text-[#FF6C37]", barColor: "bg-[#FF6C37]", description: "API testing, documentation, & collection workflow" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bigLabelRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let timeoutId: NodeJS.Timeout;

    const animateContent = () => {
      const cards = grid.querySelectorAll(".skill-card");
      const skillRows = grid.querySelectorAll(".skill-row");

      // Reset GSAP Tweens on re-triggering
      gsap.killTweensOf(cards);
      skillRows.forEach((row) => {
        const bar = row.querySelector(".skill-progress-bar");
        const text = row.querySelector(".skill-level-text");
        if (bar) gsap.killTweensOf(bar);
        if (text) gsap.killTweensOf(text);
      });

      // Initial card placement for snappy spring slide
      gsap.set(cards, { opacity: 0, y: 45, scale: 0.96 });

      // 1. Snappy & Smooth Card Entry (0.45s)
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        delay: 0.05,
        stagger: 0.08,
        ease: "back.out(1.2)", // Subtle smooth spring stop
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      // 2. Perfectly Synchronized Progress Fill + Counter
      skillRows.forEach((row, idx) => {
        const bar = row.querySelector<HTMLElement>(".skill-progress-bar");
        const text = row.querySelector<HTMLElement>(".skill-level-text");
        if (!bar || !text) return;

        const targetVal = parseInt(text.getAttribute("data-target") || "0", 10);

        // Reset state
        gsap.set(bar, { scaleX: 0 });
        text.innerText = "0%";

        const tracker = { progress: 0 };

        // Animating bar fill & text in lockstep over 2.5 seconds
        gsap.to(bar, {
          scaleX: 1,
          duration: 2.5,
          delay: 0.25 + idx * 0.04,
          ease: "power1.out",
        });

        gsap.to(tracker, {
          progress: 1,
          duration: 2.5,
          delay: 0.25 + idx * 0.04,
          ease: "power1.out",
          onUpdate: () => {
            // Numbers directly match current bar percentage scale
            const currentPercentage = Math.round(tracker.progress * targetVal);
            text.innerText = `${currentPercentage}%`;
          },
        });
      });
    };

    timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        animateContent();
      });
    }, 60);

    const trigger = ScrollTrigger.create({
      trigger: grid,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: () => animateContent(),
      onEnterBack: () => animateContent(),
    });

    return () => {
      clearTimeout(timeoutId);
      trigger.kill();
    };
  }, [activeFilter]);

  // Main Pinning Animation timeline
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const label = labelRef.current;
    const bigLabel = bigLabelRef.current;
    const filter = filterRef.current;

    if (!section || !text || !label || !bigLabel || !filter) return;

    const ctx = gsap.context(() => {
      const characters = text.querySelectorAll(".skills-character");

      gsap.set(bigLabel, { opacity: 1, y: 0, scale: 1 });
      gsap.set(label, { opacity: 0, scale: 0.4, y: -20 });
      gsap.set(characters, { opacity: 0, y: 35, filter: "blur(8px)" });
      gsap.set(filter, { opacity: 0, y: 20 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: ".skills-stage",
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      timeline.to(characters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.08,
        stagger: 0.045,
        ease: "power2.out",
      });

      timeline.to(filter, {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: "power2.out",
      });

      timeline.to({}, { duration: 0.5 });

      timeline.to(
        bigLabel,
        { opacity: 0, scale: 0.6, y: -50, duration: 0.3, ease: "power2.in" },
        "+=0.1"
      );

      timeline.to(
        label,
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.15"
      );

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

  const statement = "Tools & Technologies.";

  const filteredCategories =
    activeFilter === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeFilter);

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-[1800px]">
      <div
        ref={labelRef}
        className="fixed left-0 right-0 z-50 pointer-events-none hidden md:block"
        style={{
          top: "clamp(70px, 80px, 90px)",
          transformOrigin: "center center",
        }}
      >
      </div>

      <div className="skills-stage relative flex min-h-screen items-start justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] sm:h-[450px] w-[350px] sm:w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center justify-start text-center">
          <div ref={bigLabelRef} className="mb-3 sm:mb-6 text-center w-full">
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-indigo-400 tracking-tight text-center">
              My Skills
            </p>
            <div className="mt-2 sm:mt-3 h-1 w-16 sm:w-24 mx-auto bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
          </div>

          <div className="flex justify-center items-center text-center w-full">
            <h2
              ref={textRef}
              className="max-w-6xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white px-2"
            >
              {statement.split("").map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  className="skills-character inline-block"
                  style={{
                    whiteSpace: character === " " ? "pre" : "normal",
                  }}
                >
                  {character}
                </span>
              ))}
            </h2>
          </div>

          <div
            ref={filterRef}
            className="mt-4 sm:mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-2 text-center w-full"
          >
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${activeFilter === "all"
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white"
                }`}
            >
              <Layers className="h-4 w-4" />
              All
            </button>
            {skillCategories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${activeFilter === cat.id
                      ? cat.activeBtnBg
                      : "bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white"
                    }`}
                >
                  <IconComp className="h-4 w-4" />
                  {cat.category}
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-6 sm:mt-8 w-full max-w-5xl px-2 sm:px-0 flex justify-center items-center">
            <div
              ref={gridRef}
              className={`w-full grid gap-5 sm:gap-6 grid-cols-1 transition-all duration-300 ${activeFilter === "all" ? "md:grid-cols-2" : "max-w-lg mx-auto"
                }`}
            >
              {filteredCategories.map((cat) => {
                const CategoryIcon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="skill-card w-full text-left rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-2.5">
                      <CategoryIcon className={`h-5 w-5 ${cat.accent}`} />
                      <p className={`text-xs sm:text-sm font-bold uppercase tracking-[0.2em] ${cat.accent}`}>
                        {cat.category}
                      </p>
                    </div>

                    <div className="mt-5 sm:mt-6 space-y-4">
                      {cat.skills.map((skill, sIdx) => {
                        const SkillIcon = skill.icon;
                        return (
                          <div key={sIdx} className="skill-row group relative space-y-2 cursor-pointer">
                            <div className="flex justify-between items-center text-sm sm:text-base">
                              <div className="flex items-center gap-2.5">
                                <SkillIcon className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${skill.iconColor}`} />
                                <span className="font-semibold text-zinc-100 group-hover:text-white transition-colors">
                                  {skill.name}
                                </span>
                              </div>
                              <span
                                className={`skill-level-text text-xs sm:text-sm font-mono font-bold ${skill.iconColor}`}
                                data-target={skill.level}
                              >
                                0%
                              </span>
                            </div>

                            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className={`skill-progress-bar h-full rounded-full origin-left ${skill.barColor}`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>

                            <div className="pointer-events-none absolute bottom-full left-0 mb-2 hidden w-max max-w-[320px] rounded-xl border border-white/15 bg-zinc-900/95 px-3.5 py-2.5 text-xs sm:text-sm leading-snug text-zinc-200 shadow-2xl backdrop-blur-md transition-all duration-200 group-hover:block z-30">
                              {skill.description}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}