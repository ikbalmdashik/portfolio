"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Smartphone, Globe, MessageSquare, ShieldCheck } from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { LuFolderCode } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  number: string;
  technologies: string[];
  icon: React.ElementType;
  accent: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Messenger",
    category: "Academic Project",
    description:
      "A real-time messaging application supporting instant text messages via Socket.io, profile management, email verification, and password recovery flow.",
    number: "01",
    technologies: [
      "Next.js",
      "Node.js",
      "Socket.io",
      "PostgreSQL",
      "TypeORM",
      "Nodemailer",
    ],
    icon: MessageSquare,
    accent: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    githubUrl: "https://github.com/ikbalmdashik/Messenger.git",
  },
  {
    title: "Purabi General Insurance",
    category: "Web Application",
    description:
      "A professional interface showcasing insurance products, services, claims, and company details built with reusable component architecture.",
    number: "02",
    technologies: ["React.js", "React Router", "Vite", "Tailwind CSS"],
    icon: ShieldCheck,
    accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    githubUrl: "https://github.com/ikbalmdashik/Purabi-General-Insurance.git",
    liveUrl: "https://purabi-general-insurance-seven.vercel.app",
  },
  {
    title: "WalletHub",
    category: "Mobile Application",
    description:
      "A mobile wallet application featuring instant fund transfers, cash-outs, live transaction tracking, and Firebase authentication.",
    number: "03",
    technologies: ["Kotlin", "Android Studio", "Firebase", "Material UI"],
    icon: Smartphone,
    accent: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    githubUrl: "https://github.com/ikbalmdashik/WalletHub",
  },
  {
    title: "Developer Portfolio",
    category: "Web Engineering",
    description:
      "An interactive developer portfolio featuring pinned timeline scroll triggers, GSAP motion paths, modular filter stages, and Tailwind design tokens.",
    number: "04",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    icon: Globe,
    accent: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
    githubUrl: "https://github.com/ikbalmdashik",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bigLabelRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger Pinned Timeline & Header Logic
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const label = labelRef.current;
    const bigLabel = bigLabelRef.current;

    if (!section || !text || !label || !bigLabel) return;

    const ctx = gsap.context(() => {
      const characters = text.querySelectorAll(".projects-character");
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

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
          end: "+=2600",
          scrub: 1,
          pin: ".projects-stage",
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

      // 3. Transition Main Title to Floating Sticky Label
      timeline.to(bigLabel, { opacity: 0, scale: 0.6, y: -50, duration: 0.3, ease: "power2.in" }, "+=0.1");
      timeline.to(label, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.15");

      // 4. Reveal Cards with Smooth Spring-Back Easing
      timeline.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.12,
        ease: "back.out(1.2)",
      });

      // 5. Final Hold
      timeline.to({}, { duration: 0.3 });

      // Dynamic header shrink on window scroll
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

  const statement = "Projects I've built.";

  return (
    <section ref={sectionRef} id="projects" className="relative min-h-[2600px]">
      {/* Sticky Floating Top Label */}
      <div
        ref={labelRef}
        className="fixed left-0 right-0 z-50 pointer-events-none hidden md:block"
        style={{
          top: "clamp(70px, 80px, 90px)",
          transformOrigin: "center center",
        }}
      >
      </div>

      {/* Projects Main Stage */}
      <div className="projects-stage relative flex min-h-screen items-start justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] sm:h-[450px] w-[350px] sm:w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center justify-start text-center">
          
          {/* Main Stage Heading */}
          <div ref={bigLabelRef} className="mb-3 sm:mb-6 text-center w-full">
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-indigo-400 tracking-tight text-center">
              My Projects
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
                  className="projects-character inline-block"
                  style={{
                    whiteSpace: character === " " ? "pre" : "normal",
                  }}
                >
                  {character}
                </span>
              ))}
            </h2>
          </div>

          {/* Projects Card Grid */}
          <div className="mx-auto mt-8 sm:mt-12 w-full max-w-5xl px-2 sm:px-0 flex justify-center items-center">
            <div
              ref={cardsGridRef}
              className="w-full grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2"
            >
              {projects.map((project) => {
                const ProjectIcon = project.icon;
                return (
                  <div
                    key={project.title}
                    className="project-card group relative flex flex-col justify-between w-full text-left rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.05]"
                  >
                    {/* Background Graphic Number */}
                    <span className="absolute right-6 top-4 select-none text-7xl sm:text-8xl font-bold leading-none text-white/[0.03] transition-all duration-500 group-hover:text-indigo-400/[0.08]">
                      {project.number}
                    </span>

                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${project.accent}`}>
                            <ProjectIcon className="h-3.5 w-3.5" />
                            {project.category}
                          </span>
                        </div>
                        
                        {/* Action Links */}
                        <div className="relative z-20 flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                              aria-label="View source code"
                            >
                              <FaGithub className="h-4 w-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                              aria-label="View live project"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-400">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer Tech Stack */}
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors group-hover:border-indigo-400/20 group-hover:text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Gradient Bottom Border Indicator */}
                    <div className="absolute bottom-0 left-8 right-8 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-transform duration-500 group-hover:scale-x-100 sm:left-10 sm:right-10" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subtitle Footer */}
          <div className="mt-8 flex justify-center">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <LuFolderCode className="h-3.5 w-3.5 text-indigo-400" />
              Scroll to explore work
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}