"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bigLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const label = labelRef.current;
    const bigLabel = bigLabelRef.current;

    if (!section || !text || !label || !bigLabel) return;

    const ctx = gsap.context(() => {
      const characters = text.querySelectorAll(".about-character");
      const cards = section.querySelectorAll(".about-card");

      // ==========================================
      // INITIAL STATES
      // ==========================================

      // Big label is visible from the start (no animation)
      gsap.set(bigLabel, {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      // Set initial state for sticky label (hidden)
      gsap.set(label, {
        opacity: 0,
        scale: 0.4,
        y: -20,
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
          end: "+=1800",
          scrub: 1,
          pin: ".about-stage",
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // ==========================================
      // 1. WRITE "MORE THAN JUST CODE."
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
      // 2. HOLD
      // ==========================================

      timeline.to({}, {
        duration: 0.25,
      });

      // ==========================================
      // 3. REVEAL CARDS
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
      // 4. HOLD
      // ==========================================

      timeline.to({}, {
        duration: 0.25,
      });

      // ==========================================
      // 5. SHRINK BIG LABEL AND SHOW STICKY LABEL
      // ==========================================

      // Fade out big label and shrink it
      timeline.to(bigLabel, {
        opacity: 0,
        scale: 0.6,
        y: -50,
        duration: 0.3,
        ease: "power2.in",
      }, "+=0.1");

      // Show sticky label
      timeline.to(label, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.15");

      // ==========================================
      // STICKY LABEL CONTINUOUS SHRINK
      // ==========================================

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          const isMobile = window.innerWidth < 768;
          
          // On mobile, don't show the sticky label at all
          if (isMobile) {
            gsap.to(label, {
              opacity: 0,
              duration: 0.1,
              overwrite: "auto",
            });
            return;
          }
          
          // Only show sticky label when scrolling forward (progress > 0.3)
          if (progress > 0.3 && progress < 1) {
            const shrinkProgress = (progress - 0.3) / 0.7;
            
            const scale = 1 - (shrinkProgress * 0.6);
            const opacity = 1 - (shrinkProgress * 0.3);
            const yOffset = shrinkProgress * 20;
            
            gsap.to(label, {
              scale: Math.max(scale, 0.4),
              opacity: Math.max(opacity, 0.7),
              y: -yOffset,
              duration: 0.1,
              overwrite: "auto",
            });
          } else if (progress >= 1) {
            // Hide label when at the bottom
            gsap.to(label, {
              opacity: 0,
              duration: 0.1,
              overwrite: "auto",
            });
          } else if (progress <= 0.3) {
            // Hide label when at the top
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

  const statement = "More Than Just Code.";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-[1800px]"
    >
      {/* ==========================================
          STICKY LABEL (below navbar) - Hidden on mobile
      ========================================== */}

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
              About Me
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
          ABOUT STAGE
      ========================================== */}

      <div className="about-stage relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">

        {/* ========================================
            SUBTLE BACKGROUND GLOW
        ======================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[300px]
            sm:h-[400px]
            md:h-[500px]
            w-[300px]
            sm:w-[400px]
            md:w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-indigo-500/[0.05]
            blur-[100px]
            sm:blur-[150px]
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl pt-16 sm:pt-20 md:pt-0">
          {/* Added pt-16 sm:pt-20 for mobile to push content below navbar */}

          {/* ========================================
              BIG "ABOUT ME" LABEL (Plain Text - No Animation)
          ======================================== */}

          <div
            ref={bigLabelRef}
            className="mb-6 sm:mb-8 text-center"
          >
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-indigo-400 tracking-tight">
              About Me
            </p>
            <div className="mt-2 sm:mt-3 h-1 w-16 sm:w-24 mx-auto bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
          </div>

          {/* ========================================
              MAIN STATEMENT
          ======================================== */}

          <div className="flex justify-center">
            <h2
              ref={textRef}
              className="
                max-w-6xl
                text-center
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
                2xl:text-8xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-white
                px-2
              "
            >
              {statement.split("").map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  className="about-character inline-block"
                  style={{
                    whiteSpace:
                      character === " " ? "pre" : "normal",
                  }}
                >
                  {character}
                </span>
              ))}
            </h2>
          </div>

          {/* ========================================
              CARDS
          ======================================== */}

          <div className="mx-auto mt-12 sm:mt-16 max-w-5xl px-2 sm:px-0">

            {/* ======================================
                TOP CARDS
            ====================================== */}

            <div className="grid gap-6 sm:gap-8 md:grid-cols-[1.2fr_0.8fr]">

              {/* WHO I AM */}

              <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:p-10 backdrop-blur-xl">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-400">
                  Who I Am
                </p>

                <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-zinc-300">
                  I&apos;m a Computer Science graduate and full-stack
                  developer who enjoys turning ideas into useful,
                  well-crafted digital products.
                </p>

                <p className="mt-4 sm:mt-5 leading-6 sm:leading-7 text-zinc-500 text-sm sm:text-base">
                  I enjoy working across the entire development
                  process — from understanding a problem and
                  designing a solution to building, testing, and
                  refining the final product.
                </p>

              </div>

              {/* EDUCATION */}

              <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
                  Education
                </p>

                <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-semibold text-white">
                  Computer Science & Engineering
                </h3>

                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-zinc-400">
                  Bachelor&apos;s Degree
                </p>

                <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs leading-4 sm:leading-5 tracking-wide text-zinc-600">
                  AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH
                  <br />
                  (AIUB)
                </p>

              </div>
            </div>

            {/* ======================================
                SECONDARY CARDS
            ====================================== */}

            <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 md:grid-cols-2">

              {/* WHAT I ENJOY */}

              <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
                  What I Enjoy
                </p>

                <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-semibold text-white">
                  Solving problems.
                  <br />
                  Building solutions.
                </h3>

                <p className="mt-3 sm:mt-4 leading-6 sm:leading-7 text-zinc-500 text-sm sm:text-base">
                  I enjoy taking complex problems, breaking them
                  down into smaller pieces, and turning them into
                  practical software that people can actually use.
                </p>

              </div>

              {/* PHILOSOPHY */}

              <div className="about-card rounded-2xl sm:rounded-3xl border border-indigo-400/10 bg-indigo-500/[0.04] p-6 sm:p-8 backdrop-blur-xl">

                <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-400">
                  Philosophy
                </p>

                <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-semibold text-white">
                  Learn. Build. Improve.
                </h3>

                <p className="mt-3 sm:mt-4 leading-6 sm:leading-7 text-zinc-400 text-sm sm:text-base">
                  I believe the best way to grow is to keep learning,
                  build real things, understand mistakes, and
                  continuously improve.
                </p>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}