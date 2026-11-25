import { ArrowRight, FileText, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { profile, stats } from "../data/portfolio";
import RotatingWord from "./RotatingWord";
import { ResumeButton } from "./Resume";
import TechMarquee from "./TechMarquee";

const words = ["scalable", "performant", "reliable", "thoughtful"];

const code: [string, string, "str" | "arr"][] = [
  ["name", `"${profile.name}"`, "str"],
  ["role", `"${profile.role}"`, "str"],
  ["frontend", `["Next.js", "React"]`, "arr"],
  ["backend", `["NestJS", "Node.js"]`, "arr"],
  ["database", `["PostgreSQL"]`, "arr"],
  ["tools", `["Docker", "Git"]`, "arr"],
  ["mindset", `"Build. Learn. Improve."`, "str"],
];

export default function Hero() {
  return (
    <>
    {/* Hero fills the first screen; the marquee sits on its bottom edge */}
    <section id="home" className="relative flex min-h-[100svh] flex-col pt-20 sm:pt-24">
      <div className="flex flex-1 items-center px-4 py-4 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <div className="fade-up mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
              <MapPin size={13} /> Dhaka, Bangladesh
            </span>
          </div>

          <p style={{ "--d": "60ms" } as React.CSSProperties} className="fade-up mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {profile.role}
          </p>

          {/* Font size is fitted to the column so "Engineering <word>" always stays on one line */}
          <h1 className="text-[clamp(1.75rem,calc((100vw-3rem)/10.2),4.5rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ink lg:text-[clamp(2.5rem,calc((min(100vw,1200px)-7rem)*0.6/10.2),4.25rem)]">
            <span className="whitespace-nowrap">
              <span className="rise"><span style={{ "--d": "100ms" } as React.CSSProperties}>Engineering</span></span>{" "}
              <span className="rise">
                <span style={{ "--d": "220ms" } as React.CSSProperties} className="font-serif font-normal italic tracking-[-0.01em]">
                  <RotatingWord words={words} />
                </span>
              </span>
            </span>
            <br />
            <span className="rise"><span style={{ "--d": "340ms" } as React.CSSProperties}>software</span></span>{" "}
            <span className="rise"><span style={{ "--d": "420ms" } as React.CSSProperties}>for</span></span>{" "}
            <span className="rise"><span style={{ "--d": "500ms" } as React.CSSProperties}>the</span></span>{" "}
            <span className="rise"><span style={{ "--d": "580ms" } as React.CSSProperties}>web.</span></span>
          </h1>

          <p style={{ "--d": "700ms" } as React.CSSProperties} className="fade-up mt-5 max-w-xl text-[15px] leading-6 text-muted sm:text-lg sm:leading-8 lg:mt-6">
            {profile.summary}
          </p>

          <div style={{ "--d": "820ms" } as React.CSSProperties} className="fade-up mt-6 flex flex-wrap items-center gap-3 lg:mt-8">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm sm:px-6 font-semibold text-[#05070c] transition-transform hover:-translate-y-0.5"
            >
              View selected work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm sm:px-6 font-semibold text-ink transition-colors hover:border-accent/50 hover:bg-accent/[0.07]"
            >
              Get in touch
            </a>
          </div>

          <div style={{ "--d": "920ms" } as React.CSSProperties} className="fade-up mt-5 flex items-center gap-6 lg:mt-6 text-sm text-subtle">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-ink">
              <FaGithub size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-ink">
              <FaLinkedin size={16} /> LinkedIn
            </a>
            <ResumeButton className="flex items-center gap-2 transition-colors hover:text-ink">
              <FileText size={16} /> Resume
            </ResumeButton>
          </div>
        </div>

        {/* Code card */}
        <div style={{ "--d": "500ms" } as React.CSSProperties} className="fade-up tilt-scene relative mx-auto hidden w-full max-w-md lg:block">
          <div className="orbit hidden sm:block" aria-hidden />
          <div className="orbit orbit--slow hidden sm:block" aria-hidden />
          <div data-tilt className="relative rounded-[21px]">
          <div className="absolute -inset-px rounded-[21px] bg-gradient-to-b from-accent/40 via-white/5 to-transparent" />
          <div className="relative overflow-hidden rounded-[20px] bg-[#0a0d16]/90 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
            <div className="tilt-glare" aria-hidden />
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-auto font-mono text-[11px] text-subtle">developer.ts</span>
            </div>
            <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7">
              <code>
                <span className="text-[#c4a7ff]">const</span> <span className="text-sky">developer</span>{" "}
                <span className="text-subtle">=</span> {"{"}
                {"\n"}
                {code.map(([key, value, kind]) => (
                  <span key={key}>
                    {"  "}
                    <span className="text-muted">{key}</span>
                    <span className="text-subtle">: </span>
                    <span className={kind === "str" ? "text-[#9fe0b4]" : "text-[#f3cf8a]"}>{value}</span>
                    <span className="text-subtle">,</span>
                    {"\n"}
                  </span>
                ))}
                {"};"}
                {"\n"}
                <span className="text-subtle">{"> "}</span>
                <span className="caret" aria-hidden />
              </code>
            </pre>
            <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[11px] text-subtle">
              <span>~/portfolio</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> online
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>

      </div>

      {/* Stats — on the first screen, just above the marquee */}
      <div className="px-4 pb-4 sm:px-6">
        <dl
          style={{ "--d": "1000ms" } as React.CSSProperties}
          className="fade-up mx-auto grid max-w-6xl grid-cols-2 overflow-hidden rounded-2xl border border-line bg-panel sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-3 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}
            >
              <dt className="text-[11px] leading-4 text-subtle sm:text-xs">{s.label}</dt>
              <dd className="mt-1 font-serif text-2xl text-ink sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <TechMarquee />
    </section>
    </>
  );
}
