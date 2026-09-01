"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  accent: string;
  activeBtnBg: string;
  responsibilities: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "goinnovior",
    role: "Full Stack Developer Intern",
    company: "Goinnovior",
    location: "Mirpur DOHS, Dhaka",
    period: "July 2025 – Present",
    type: "Internship",
    accent: "text-indigo-400",
    activeBtnBg: "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25",
    responsibilities: [
      "Developed responsive web application features and UI components using Next.js & React.js.",
      "Built and integrated RESTful APIs using Express.js for seamless frontend-backend communication.",
      "Implemented server-side business logic, API endpoints, and efficient data handling routines.",
      "Debugged application issues to optimize end-to-end functionality and overall user experience.",
      "Managed version control workflows and feature branches using Git & GitHub.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "Express.js",
      "Node.js",
      "REST API",
      "JavaScript",
      "TypeScript",
      "Git",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bigLabelRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Main GSAP ScrollTrigger timeline matching Skills/Projects dynamics
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const label = labelRef.current;
    const bigLabel = bigLabelRef.current;

    if (!section || !text || !label || !bigLabel) return;

    const ctx = gsap.context(() => {
      const characters = text.querySelectorAll(".experience-character");
      const cards = gsap.utils.toArray<HTMLElement>(".experience-card");

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([bigLabel, characters, cards], { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      // Initial States
      gsap.set(bigLabel, { opacity: 1, y: 0, scale: 1 });
      gsap.set(label, { opacity: 0, scale: 0.4, y: -20 });
      gsap.set(characters, { opacity: 0, y: 35, filter: "blur(8px)" });
      gsap.set(cards, { opacity: 0, y: 45, scale: 0.96 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: ".experience-stage",
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // 1. Reveal Title Characters
      timeline.to(characters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.08,
        stagger: 0.045,
        ease: "power2.out",
      });

      // 2. Pause Stage
      timeline.to({}, { duration: 0.25 });

      // 3. Transition Main Heading to Floating Top Label
      timeline.to(bigLabel, { opacity: 0, scale: 0.6, y: -50, duration: 0.3, ease: "power2.in" }, "+=0.1");
      timeline.to(label, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.15");

      // 4. Reveal Experience Cards with Spring Ease
      timeline.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.12,
        ease: "back.out(1.2)",
      });

      // 5. Final Hold Stage
      timeline.to({}, { duration: 0.3 });

      // Dynamic Sticky Floating Label Shrink Handler
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

  const statement = "Where I've worked.";

  return (
    <section ref={sectionRef} id="experience" className="relative min-h-[2000px]">
      {/* Fixed Header Label during Pinned Scrolling */}
      <div
        ref={labelRef}
        className="fixed left-0 right-0 z-50 pointer-events-none hidden md:block"
        style={{
          top: "clamp(70px, 80px, 90px)",
          transformOrigin: "center center",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </div>

      {/* Main Experience Pinned Stage */}
      <div className="experience-stage relative flex min-h-screen items-start justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] sm:h-[450px] w-[350px] sm:w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center justify-start text-center">
          
          {/* Main Stage Heading */}
          <div ref={bigLabelRef} className="mb-3 sm:mb-6 text-center w-full">
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-indigo-400 tracking-tight text-center">
              My Experience
            </p>
            <div className="mt-2 sm:mt-3 h-1 w-16 sm:w-24 mx-auto bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full" />
          </div>

          <div className="flex justify-center items-center text-center w-full">
            <h2
              ref={textRef}
              className="max-w-6xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white px-2"
            >
              {statement.split("").map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  className="experience-character inline-block"
                  style={{
                    whiteSpace: character === " " ? "pre" : "normal",
                  }}
                >
                  {character}
                </span>
              ))}
            </h2>
          </div>

          {/* Experience Cards Grid */}
          <div className="mx-auto mt-8 sm:mt-12 w-full max-w-4xl px-2 sm:px-0 flex justify-center items-center">
            <div
              ref={cardsGridRef}
              className="w-full flex flex-col gap-6"
            >
              {experiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="experience-card group relative w-full text-left rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.05]"
                >
                  {/* Background Number Index */}
                  <span className="absolute right-6 top-4 select-none text-7xl sm:text-8xl font-bold leading-none text-white/[0.03] transition-all duration-500 group-hover:text-indigo-400/[0.08]">
                    0{idx + 1}
                  </span>

                  <div className="relative z-10">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                          <Briefcase className="h-3.5 w-3.5" />
                          {exp.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-purple-400" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Role & Company Title */}
                    <div className="mt-5">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-indigo-400">
                        {exp.company}
                      </p>
                    </div>

                    {/* Key Contributions */}
                    <div className="mt-6 space-y-2.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Key Responsibilities & Achievements:
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                        Technologies & Tools:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300 transition-colors group-hover:border-indigo-400/20 group-hover:text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gradient Indicator Line */}
                  <div className="absolute bottom-0 left-8 right-8 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-transform duration-500 group-hover:scale-x-100 sm:left-10 sm:right-10" />
                </div>
              ))}
            </div>
          </div>

          {/* Subtitle Footer */}
          <div className="mt-8 flex justify-center">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <Terminal className="h-3.5 w-3.5 text-indigo-400" />
              Professional Career Journey
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}