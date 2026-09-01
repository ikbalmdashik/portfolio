"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, ArrowUpRight, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bigLabelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const label = labelRef.current;
    const bigLabel = bigLabelRef.current;
    const content = contentRef.current;

    if (!section || !text || !label || !bigLabel || !content) return;

    const ctx = gsap.context(() => {
      const characters = text.querySelectorAll(".contact-character");

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set([bigLabel, characters, content], { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      // Initial States
      gsap.set(bigLabel, { opacity: 1, y: 0, scale: 1 });
      gsap.set(label, { opacity: 0, scale: 0.4, y: -20 });
      gsap.set(characters, { opacity: 0, y: 35, filter: "blur(8px)" });
      gsap.set(content, { opacity: 0, y: 45, scale: 0.96 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: ".contact-stage",
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

      // 4. Reveal Contact Content Card with Spring Easing
      timeline.to(content, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "back.out(1.2)",
      });

      // 5. Final Hold Stage
      timeline.to({}, { duration: 0.3 });

      // Dynamic Sticky Header Shrink
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

  const statement = "Let's build together.";

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-[2000px]">
      {/* Fixed Sticky Header Label */}
      <div
        ref={labelRef}
        className="fixed left-0 right-0 z-50 pointer-events-none hidden md:block"
        style={{
          top: "clamp(70px, 80px, 90px)",
          transformOrigin: "center center",
        }}
      >
      </div>

      {/* Main Contact Stage */}
      <div className="contact-stage relative flex min-h-screen items-start justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] sm:h-[450px] w-[350px] sm:w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.05] blur-[140px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center justify-start text-center">
          
          {/* Main Stage Heading */}
          <div ref={bigLabelRef} className="mb-3 sm:mb-6 text-center w-full">
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-indigo-400 tracking-tight text-center">
              Get In Touch
            </p>
            <div className="mt-2 sm:mt-3 h-1 w-16 sm:w-24 mx-auto bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full" />
          </div>

          <div className="flex justify-center items-center text-center w-full">
            <h2
              ref={textRef}
              className="max-w-6xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white px-2"
            >
              {statement.split("").map((character, index) => {
                const gradientStart = "Let's build ".length;
                const isGradient = index >= gradientStart;

                return (
                  <span
                    key={`${character}-${index}`}
                    className={`contact-character inline-block ${
                      isGradient
                        ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                        : ""
                    }`}
                    style={{
                      whiteSpace: character === " " ? "pre" : "normal",
                    }}
                  >
                    {character}
                  </span>
                );
              })}
            </h2>
          </div>

          {/* Main Contact Content Card */}
          <div className="mx-auto mt-8 sm:mt-12 w-full max-w-4xl px-2 sm:px-0">
            <div
              ref={contentRef}
              className="contact-content group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 text-center backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.05]"
            >
              <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-zinc-300">
                Have a project in mind or looking for a software engineer to join your team? Let&apos;s build something thoughtful, robust, and impactful together.
              </p>

              {/* Quick Contact Badges Grid */}
              <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-3 text-left">
                {/* Email Card */}
                <a
                  href="mailto:ikbalmdashikk@gmail.com"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-zinc-300 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-white"
                >
                  <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 p-2 text-indigo-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Email</p>
                    <p className="text-xs font-medium truncate text-zinc-200">ikbalmdashikk@gmail.com</p>
                  </div>
                </a>

                {/* Phone Card */}
                <a
                  href="tel:+8801780380353"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-zinc-300 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-white"
                >
                  <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-2 text-purple-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Phone</p>
                    <p className="text-xs font-medium truncate text-zinc-200">+880 17 8038 0353</p>
                  </div>
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-zinc-300">
                  <div className="rounded-lg border border-pink-500/20 bg-pink-500/10 p-2 text-pink-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Location</p>
                    <p className="text-xs font-medium truncate text-zinc-200">Uttara, Dhaka, BD</p>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action & Social Links */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:ikbalmdashikk@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/20 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]"
                >
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  Send Direct Email
                </a>

                <a
                  href="https://linkedin.com/in/ikbalmdashik"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-xs sm:text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <FaLinkedin className="h-4 w-4 text-blue-400" />
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>

                <a
                  href="https://github.com/ikbalmdashik"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-xs sm:text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <FaGithub className="h-4 w-4 text-purple-400" />
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>

              {/* Bottom Gradient Line */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-transform duration-500 group-hover:scale-x-100 sm:left-10 sm:right-10" />
            </div>
          </div>

          {/* Subtitle Footer */}
          <div className="mt-8 flex justify-center">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Let&apos;s create something meaningful
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}