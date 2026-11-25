import { Briefcase, Calendar, Check, MapPin } from "lucide-react";

import { experiences } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" eyebrow="Experience" title="Where I've" accent="contributed." />

        <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-10">
          {experiences.map((exp) => (
            <li key={exp.company} data-reveal className="relative">
              <span className="absolute top-8 -left-[29px] flex h-3 w-3 items-center justify-center sm:-left-[45px]">
                <span className="absolute h-3 w-3 rounded-full bg-accent/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <article className="panel p-6 sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-ink">{exp.role}</h3>
                    <p className="mt-1 font-serif text-xl italic text-accent">{exp.company}</p>
                  </div>
                  <span className="chip">{exp.type}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {exp.period}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {exp.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase size={14} /> {exp.type}</span>
                </div>

                <ul className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-10">
                  {exp.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-sm leading-6 text-muted">
                      <Check size={16} className="mt-1 shrink-0 text-accent" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                  {exp.technologies.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
