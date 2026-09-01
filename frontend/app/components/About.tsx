// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function About() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const textRef = useRef<HTMLHeadingElement>(null);
//   const labelRef = useRef<HTMLDivElement>(null);
//   const bigLabelRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const text = textRef.current;
//     const label = labelRef.current;
//     const bigLabel = bigLabelRef.current;

//     if (!section || !text || !label || !bigLabel) return;

//     const ctx = gsap.context(() => {
//       const characters = text.querySelectorAll(".about-character");
//       const cards = section.querySelectorAll(".about-card");

//       // Set initial states (identical to Skills component)
//       gsap.set(bigLabel, { opacity: 1, y: 0, scale: 1 });
//       gsap.set(label, { opacity: 0, scale: 0.4, y: -20 });
//       gsap.set(characters, { opacity: 0, y: 35, filter: "blur(8px)" });
//       gsap.set(cards, { opacity: 0, y: 50, filter: "blur(10px)" });

//       // Main Pin Timeline
//       const timeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: "+=1800",
//           scrub: 1,
//           pin: ".about-stage",
//           pinSpacing: true,
//           anticipatePin: 1,
//         },
//       });

//       // 1. Reveal Title Characters (Matches Skills timeline)
//       timeline.to(characters, {
//         opacity: 1,
//         y: 0,
//         filter: "blur(0px)",
//         duration: 0.08,
//         stagger: 0.045,
//         ease: "power2.out",
//       });

//       // 2. Reveal Cards (Matches Skills timeline timing)
//       timeline.to(cards, {
//         opacity: 1,
//         y: 0,
//         filter: "blur(0px)",
//         duration: 0.16,
//         stagger: 0.1,
//         ease: "power3.out",
//       });

//       // 3. Hold
//       timeline.to({}, { duration: 0.25 });

//       // 4. Shrink Big Label & Show Sticky Label
//       timeline.to(
//         bigLabel,
//         {
//           opacity: 0,
//           scale: 0.6,
//           y: -50,
//           duration: 0.3,
//           ease: "power2.in",
//         },
//         "+=0.1"
//       );

//       timeline.to(
//         label,
//         {
//           opacity: 1,
//           scale: 1,
//           y: 0,
//           duration: 0.3,
//           ease: "power2.out",
//         },
//         "-=0.15"
//       );

//       // Sticky Label Scroll Sync (Matches Skills logic)
//       ScrollTrigger.create({
//         trigger: section,
//         start: "top top",
//         end: "bottom top",
//         onUpdate: (self) => {
//           const progress = self.progress;
//           const isMobile = window.innerWidth < 768;

//           if (isMobile) {
//             gsap.to(label, { opacity: 0, duration: 0.1, overwrite: "auto" });
//             return;
//           }

//           if (progress > 0.3 && progress < 1) {
//             const shrinkProgress = (progress - 0.3) / 0.7;
//             const scale = 1 - shrinkProgress * 0.6;
//             const opacity = 1 - shrinkProgress * 0.3;
//             const yOffset = shrinkProgress * 20;

//             gsap.to(label, {
//               scale: Math.max(scale, 0.4),
//               opacity: Math.max(opacity, 0.7),
//               y: -yOffset,
//               duration: 0.1,
//               overwrite: "auto",
//             });
//           } else {
//             gsap.to(label, { opacity: 0, duration: 0.1, overwrite: "auto" });
//           }
//         },
//       });
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   const statement = "More Than Just Code.";

//   return (
//     <section ref={sectionRef} id="about" className="relative min-h-[1800px]">
//       {/* Sticky Top Label (Desktop only) */}
//       <div
//         ref={labelRef}
//         className="fixed left-0 right-0 z-50 pointer-events-none hidden md:block"
//         style={{
//           top: "clamp(70px, 80px, 90px)",
//           transformOrigin: "center center",
//         }}
//       >
//       </div>

//       {/* Main Stage Container */}
//       <div className="about-stage relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 sm:pt-0 py-12">
//         {/* Background Glow */}
//         <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] sm:h-[450px] w-[350px] sm:w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[120px]" />

//         <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center justify-center text-center my-auto">
//           {/* Big Header Label (Sizing synced with Skills component) */}
//           <div ref={bigLabelRef} className="mb-3 sm:mb-6 text-center w-full">
//             <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-indigo-400 tracking-tight text-center">
//               About Me
//             </p>
//             <div className="mt-2 sm:mt-3 h-1 w-16 sm:w-24 mx-auto bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
//           </div>

//           {/* Animated Headline Statement (Sizing & typography synced with Skills) */}
//           <div className="flex justify-center items-center text-center w-full">
//             <h2
//               ref={textRef}
//               className="max-w-6xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white px-2"
//             >
//               {statement.split("").map((character, index) => (
//                 <span
//                   key={`${character}-${index}`}
//                   className="about-character inline-block"
//                   style={{
//                     whiteSpace: character === " " ? "pre" : "normal",
//                   }}
//                 >
//                   {character}
//                 </span>
//               ))}
//             </h2>
//           </div>

//           {/* About Cards Section */}
//           <div className="mx-auto mt-6 sm:mt-8 max-w-5xl px-2 sm:px-0 text-left w-full">
//             {/* Top Cards Grid */}
//             <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.2fr_0.8fr]">
//               {/* WHO I AM */}
//               <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 backdrop-blur-xl">
//                 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
//                   Who I Am
//                 </p>
//                 <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
//                   I&apos;m a Computer Science graduate and full-stack developer
//                   who enjoys turning ideas into useful, well-crafted digital
//                   products.
//                 </p>
//                 <p className="mt-2 sm:mt-3 leading-relaxed text-zinc-400 text-xs sm:text-sm">
//                   I enjoy working across the entire development process — from
//                   understanding a problem and designing a solution to building,
//                   testing, and refining the final product.
//                 </p>
//               </div>

//               {/* EDUCATION */}
//               <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 backdrop-blur-xl">
//                 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
//                   Education
//                 </p>
//                 <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-white">
//                   Computer Science & Engineering
//                 </h3>
//                 <p className="mt-1 text-xs sm:text-sm text-zinc-400">
//                   Bachelor&apos;s Degree
//                 </p>
//                 <p className="mt-3 text-[10px] sm:text-xs leading-4 tracking-wide text-zinc-500">
//                   AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH (AIUB)
//                 </p>
//               </div>
//             </div>

//             {/* Bottom Cards Grid */}
//             <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
//               {/* WHAT I ENJOY */}
//               <div className="about-card rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 backdrop-blur-xl">
//                 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
//                   What I Enjoy
//                 </p>
//                 <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold text-white">
//                   Solving problems.
//                   <br />
//                   Building solutions.
//                 </h3>
//                 <p className="mt-2 sm:mt-3 leading-relaxed text-zinc-400 text-xs sm:text-sm">
//                   I enjoy taking complex problems, breaking them down into
//                   smaller pieces, and turning them into practical software that
//                   people can actually use.
//                 </p>
//               </div>

//               {/* PHILOSOPHY */}
//               <div className="about-card rounded-2xl sm:rounded-3xl border border-indigo-400/10 bg-indigo-500/[0.04] p-5 sm:p-8 backdrop-blur-xl">
//                 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
//                   Philosophy
//                 </p>
//                 <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold text-white">
//                   Learn. Build. Improve.
//                 </h3>
//                 <p className="mt-2 sm:mt-3 leading-relaxed text-zinc-400 text-xs sm:text-sm">
//                   I believe the best way to grow is to keep learning, build
//                   real things, understand mistakes, and continuously improve.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }







"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ThesisPoster from "../assets/images/ThesisPoster.png";
import AIUBLogo from "../assets/icons/AIUBLogo.svg";
import WLFSCLogo from "../assets/icons/WLFSCLogo.jpeg";

gsap.registerPlugin(ScrollTrigger);

const whoIAmSection = {
  tag: "Who I Am",
  description:
    "I'm a Computer Science graduate and full-stack developer who enjoys turning complex problems into useful, well-crafted digital products across web and mobile platforms. I focus on end-to-end development, clean architecture, and building performant solutions.",
};

const educationList = [
  {
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "American International University - Bangladesh (AIUB)",
    timeline: "2020 – 2025",
    link: "https://www.aiub.edu/",
    logo: AIUBLogo,
    hasWhiteBg: true,
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Willes Little Flower School & College",
    timeline: "2017 – 2019",
    link: "https://wlfsc.edu.bd/",
    logo: WLFSCLogo,
    hasWhiteBg: false,
  },
];

const thesisSection = {
  tag: "Academic Research & Thesis",
  title: "Financial Market Volatility Prediction with Alternative Data",
  description:
    "Analyzed market volatility by integrating non-traditional financial data sources. Developed and evaluated predictive machine learning models using deep learning frameworks to capture complex market patterns and non-linear dependencies.",
  technologies: [
    "TensorFlow",
    "Keras",
    "Python",
    "Data Analysis",
    "Predictive Modeling",
  ],
  image: ThesisPoster,
  pdfUrl: "/thesis-paper.pdf",
};

const coursesList = [
  {
    title: "Machine Learning",
    description:
      "Built predictive machine learning models and deep learning pipelines.",
    technologies: ["TensorFlow", "Keras", "Python"],
  },
  {
    title: "Advanced Web Technology",
    description:
      "Modern full-stack architecture, dynamic rendering, and relational database integrations.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
  },
  {
    title: "Mobile App Development",
    description:
      "Native mobile app engineering with real-time database synchronization and backend integration.",
    technologies: ["Kotlin", "Android Studio", "Firebase"],
  },
  {
    title: "Advanced .NET",
    description:
      "Enterprise backend systems and RESTful Web APIs with relational database backends.",
    technologies: [".NET Core 8", "MySQL", "MSSQL Server"],
  },
  {
    title: "Advanced Database Management",
    description:
      "Database administration, complex query optimizations, dynamic procedures, and control execution.",
    technologies: ["PL/SQL", "Oracle Database"],
  },
  {
    title: "Artificial Intelligence & Expert Systems",
    description:
      "State-space search strategies, knowledge representation, and reasoning models.",
    technologies: ["Python", "Expert Systems", "Search Algorithms"],
  },
];

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
      const presentationPages = section.querySelectorAll(".about-page");

      gsap.set(bigLabel, { opacity: 1, y: 0, scale: 1 });
      gsap.set(label, { opacity: 0, scale: 0.4, y: -20 });
      gsap.set(characters, { opacity: 0, y: 35, filter: "blur(8px)" });
      gsap.set(presentationPages, {
        opacity: 0,
        y: 50,
        filter: "blur(10px)",
        display: "none",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3200",
          scrub: 1,
          pin: ".about-stage",
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

      timeline.to(
        bigLabel,
        {
          opacity: 0,
          scale: 0.6,
          y: -50,
          duration: 0.2,
          ease: "power2.in",
        },
        "+=0.1"
      );

      timeline.to(
        label,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        "-=0.1"
      );

      // --- SLIDE 1 ---
      timeline.set(presentationPages[0], { display: "block" });
      timeline.to(presentationPages[0], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power3.out",
      });
      timeline.to({}, { duration: 0.4 });
      timeline.to(presentationPages[0], {
        opacity: 0,
        y: -30,
        filter: "blur(8px)",
        duration: 0.25,
        ease: "power2.in",
      });
      timeline.set(presentationPages[0], { display: "none" });

      // --- SLIDE 2 ---
      timeline.set(presentationPages[1], { display: "block" });
      timeline.to(presentationPages[1], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power3.out",
      });
      timeline.to({}, { duration: 0.4 });
      timeline.to(presentationPages[1], {
        opacity: 0,
        y: -30,
        filter: "blur(8px)",
        duration: 0.25,
        ease: "power2.in",
      });
      timeline.set(presentationPages[1], { display: "none" });

      // --- SLIDE 3 ---
      timeline.set(presentationPages[2], { display: "block" });
      timeline.to(presentationPages[2], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power3.out",
      });
      timeline.to({}, { duration: 0.4 });

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

          if (progress > 0.15 && progress < 1) {
            const shrinkProgress = (progress - 0.15) / 0.85;
            const scale = 1 - shrinkProgress * 0.4;
            const opacity = 1 - shrinkProgress * 0.2;
            const yOffset = shrinkProgress * 15;

            gsap.to(label, {
              scale: Math.max(scale, 0.6),
              opacity: Math.max(opacity, 0.8),
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

  const statement = "More Than Just Code.";

  return (
    <section ref={sectionRef} id="about" className="relative min-h-[3200px]">
      <style jsx global>{`
        @keyframes glowMoveHorizontal {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes glowMoveVertical {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
        .animate-glow-h {
          animation: glowMoveHorizontal 3.5s infinite linear;
        }
        .animate-glow-v {
          animation: glowMoveVertical 4s infinite linear;
        }
      `}</style>

      <div
        ref={labelRef}
        className="fixed left-0 right-0 z-50 pointer-events-none hidden md:block text-center"
        style={{
          top: "clamp(60px, 75px, 90px)",
          transformOrigin: "center center",
        }}
      />

      <div className="about-stage relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[140px]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col items-center justify-center text-center my-auto">
          {/* Header */}
          <div ref={bigLabelRef} className="mb-2 text-center w-full">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-indigo-400 tracking-tight text-center">
              About Me
            </h1>
            <div className="mt-2 h-1 w-20 sm:w-28 mx-auto bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
          </div>

          {/* Subtitle Statement */}
          <div className="flex justify-center items-center text-center w-full mb-6">
            <h2
              ref={textRef}
              className="max-w-3xl text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white px-2"
            >
              {statement.split("").map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  className="about-character inline-block"
                  style={{
                    whiteSpace: character === " " ? "pre" : "normal",
                  }}
                >
                  {character}
                </span>
              ))}
            </h2>
          </div>

          {/* PRESENTATION CONTAINER */}
          <div className="w-full max-w-5xl mx-auto min-h-[480px] flex items-center justify-center">

            {/* SLIDE 1: WHO I AM & EDUCATION */}
            <div className="about-page w-full text-left max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                    {whoIAmSection.tag}
                  </p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                    {whoIAmSection.description}
                  </p>
                </div>

                {/* Animated Horizontal Divider */}
                <div className="relative h-[1px] w-full bg-white/10 overflow-hidden">
                  <div className="animate-glow-h w-1/2 h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-75 shadow-[0_0_8px_#818cf8]" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-6 text-center md:text-left">
                    Education
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative items-center">
                    {/* University (AIUB) */}
                    <a
                      href={educationList[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="w-full h-44 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
                        <Image
                          src={educationList[0].logo}
                          alt={educationList[0].institution}
                          width={120}
                          height={120}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors text-center">
                          {educationList[0].degree}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 text-center">
                          {educationList[0].institution}
                        </p>
                        <span className="inline-block mt-2 text-[10px] font-medium text-indigo-400 text-center">
                          {educationList[0].timeline}
                        </span>
                      </div>
                    </a>

                    {/* Animated Vertical Divider */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/10 overflow-hidden pointer-events-none">
                      <div className="animate-glow-v h-1/2 w-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-75 shadow-[0_0_8px_#c084fc]" />
                    </div>

                    {/* College (WLFSC) */}
                    <a
                      href={educationList[1].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="w-full h-44 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
                        <Image
                          src={educationList[1].logo}
                          alt={educationList[1].institution}
                          width={120}
                          height={120}
                          className="object-contain rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors text-center">
                          {educationList[1].degree}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 text-center">
                          {educationList[1].institution}
                        </p>
                        <span className="inline-block mt-2 text-[10px] font-medium text-indigo-400 text-center">
                          {educationList[1].timeline}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 2: THESIS */}
            <div className="about-page w-full text-left max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-4">
                {thesisSection.tag}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
                <div className="md:col-span-6 space-y-4 pr-0 md:pr-6">
                  <h3 className="text-xl sm:text-3xl font-bold text-white leading-tight">
                    {thesisSection.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                    {thesisSection.description}
                  </p>

                  <div>
                    <a
                      href={thesisSection.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/40 px-4 py-2 text-xs font-semibold text-indigo-300 transition-colors hover:border-indigo-300 hover:text-white"
                    >
                      <svg
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 18h12v-2H4v2zM4 5v8h12V5H4zm6 6L6 7h3V2h2v5h3l-4 4z" />
                      </svg>
                      View Paper (PDF)
                    </a>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2">
                    {thesisSection.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Vertical Divider */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-white/10 overflow-hidden pointer-events-none">
                  <div className="animate-glow-v h-1/2 w-full bg-gradient-to-b from-transparent via-indigo-400 to-transparent opacity-75 shadow-[0_0_8px_#818cf8]" />
                </div>

                <div className="md:col-span-6 pl-0 md:pl-6 flex justify-center">
                  <div className="w-full overflow-hidden rounded-xl">
                    <Image
                      src={thesisSection.image}
                      alt={thesisSection.title}
                      width={800}
                      height={480}
                      // quality={100}
                      unoptimized
                      className="object-cover w-full h-auto rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 3: COURSES (RESPONSIVE GLOW DIVIDERS FOR MOBILE & DESKTOP) */}
            <div className="about-page w-full text-left max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-6">
                Courses & Specialized Study
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {coursesList.map((course, cIdx) => {
                  const total = coursesList.length;
                  const isLastMobile = cIdx === total - 1;
                  const isLastTablet = cIdx >= total - (total % 2 === 0 ? 2 : 1);
                  const isLastDesktop = cIdx >= total - 3;
                  const isRightColTablet = (cIdx + 1) % 2 === 0;
                  const isRightColDesktop = (cIdx + 1) % 3 === 0;

                  return (
                    <div
                      key={cIdx}
                      className="relative p-6 flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {course.title}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {course.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-medium text-indigo-300 bg-white/5 px-2.5 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Horizontal Animated Divider */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 overflow-hidden pointer-events-none ${
                          isLastMobile ? "block sm:hidden flex-none opacity-0" : ""
                        } ${
                          isLastTablet ? "sm:hidden lg:block" : ""
                        } ${isLastDesktop ? "lg:hidden" : ""}`}
                      >
                        <div className="animate-glow-h w-1/2 h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-75 shadow-[0_0_8px_#818cf8]" />
                      </div>

                      {/* Vertical Animated Divider (Tablet / 2-Column) */}
                      {!isRightColTablet && (
                        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/10 overflow-hidden pointer-events-none hidden sm:block lg:hidden">
                          <div className="animate-glow-v h-1/2 w-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-75 shadow-[0_0_8px_#c084fc]" />
                        </div>
                      )}

                      {/* Vertical Animated Divider (Desktop / 3-Column) */}
                      {!isRightColDesktop && (
                        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/10 overflow-hidden pointer-events-none hidden lg:block">
                          <div className="animate-glow-v h-1/2 w-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-75 shadow-[0_0_8px_#c084fc]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}