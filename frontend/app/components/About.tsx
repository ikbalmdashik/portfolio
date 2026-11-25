import Image from "next/image";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import { courses, education, profile, thesis } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow="About" title="More than just" accent="code." />

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <p data-reveal className="text-xl leading-9 text-ink/90 sm:text-2xl sm:leading-10">
            {profile.about}
          </p>

          {/* Education */}
          <div data-reveal className="space-y-4">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
              <GraduationCap size={14} className="text-accent" /> Education
            </h3>
            {education.map((e) => (
              <a
                key={e.institution}
                href={e.link}
                target="_blank"
                rel="noopener noreferrer"
                className="panel panel-hover group flex items-center gap-5 p-5"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
                  <Image src={e.logo} alt="" width={48} height={48} className="h-full w-full object-contain" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-ink">{e.degree}</span>
                  <span className="mt-0.5 block text-sm text-muted">{e.institution}</span>
                  <span className="mt-1.5 block font-mono text-xs text-accent">{e.timeline}</span>
                </span>
                <ArrowUpRight size={18} className="shrink-0 text-subtle transition-colors group-hover:text-ink" />
              </a>
            ))}
          </div>
        </div>

        {/* Thesis */}
        <article data-reveal className="panel mt-16 grid overflow-hidden lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{thesis.tag}</p>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">{thesis.title}</h3>
            <p className="mt-5 leading-7 text-muted">{thesis.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {thesis.technologies.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
          <a
            href={thesis.image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open thesis poster in full size"
            className="group relative block border-t border-line bg-white/[0.02] lg:border-t-0 lg:border-l"
          >
            <Image
              src={thesis.image}
              alt={`Research poster: ${thesis.title}`}
              placeholder="blur"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span className="absolute right-4 bottom-4 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-xs text-ink backdrop-blur">
              View poster <ArrowUpRight size={13} />
            </span>
          </a>
        </article>

        {/* Courses */}
        <div className="mt-16">
          <h3 data-reveal className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
            Courses & Specialized Study
          </h3>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <div
                key={c.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
                className="flex flex-col bg-[#070910] p-6 transition-colors hover:bg-[#0b0e18]"
              >
                <h4 className="font-medium text-ink">{c.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{c.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.technologies.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
