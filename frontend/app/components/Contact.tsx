"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector(".contact-label");
      const characters = title.querySelectorAll(
        ".contact-character"
      );
      const content = section.querySelector(".contact-content");

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

        gsap.set(content, {
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

      gsap.set(content, {
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

          end: "+=2000",

          scrub: 1,

          pin: ".contact-stage",

          pinSpacing: true,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      // ==========================================
      // 1. CONTACT LABEL
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
      // "LET'S BUILD SOMETHING TOGETHER."
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
      // 4. REVEAL CONTENT
      // ==========================================

      timeline.to(content, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.16,
        ease: "power3.out",
      });

      // ==========================================
      // 5. HOLD
      // ==========================================

      timeline.to(
        {},
        {
          duration: 0.3,
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const statement = "Let's build together.";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[2000px]"
    >
      {/* ==========================================
          CONTACT STAGE
      ========================================== */}

      <div
        className="
          contact-stage
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
            bg-indigo-500/[0.06]
            blur-[150px]
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">

          {/* ========================================
              LABEL
          ======================================== */}

          <div className="contact-label mb-8 text-center">
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.4em]
                text-indigo-400
              "
            >
              Contact
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
                const gradientStart = "Let's build ".length;

                const isGradient =
                  index >= gradientStart;

                return (
                  <span
                    key={`${character}-${index}`}
                    className={`
                      contact-character
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
              CONTACT CONTENT
          ======================================== */}

          <div className="mx-auto mt-16 max-w-2xl">
            <div
              className="
                contact-content
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.03]
                p-8
                text-center
                shadow-2xl
                backdrop-blur-xl
                sm:p-12
              "
            >
              {/* ==================================
                  CONTENT
              ================================== */}

              <p
                className="
                  mx-auto
                  max-w-xl
                  text-lg
                  leading-8
                  text-zinc-400
                "
              >
                Have a project in mind? Let&apos;s build
                something useful, thoughtful, and
                well-crafted together.
              </p>

              {/* ==================================
                  BUTTON
              ================================== */}

              <button
                type="button"
                className="
                  group
                  relative
                  mt-8
                  overflow-hidden
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-7
                  py-3.5
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-indigo-400/30
                  hover:bg-indigo-500/10
                  hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]
                "
              >
                <span className="relative z-10">
                  Get In Touch
                </span>

                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-indigo-500/0
                    via-indigo-500/10
                    to-purple-500/0
                    transition-transform
                    duration-500
                    group-hover:translate-x-full
                  "
                />
              </button>

              {/* ==================================
                  BOTTOM GRADIENT LINE
              ================================== */}

              <div
                className="
                  absolute
                  bottom-0
                  left-10
                  right-10
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-indigo-400/40
                  to-transparent
                "
              />
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
              Let&apos;s create something meaningful
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}