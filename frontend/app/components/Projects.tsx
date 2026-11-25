import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { projects } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Selected Work"
          title="Projects I'm"
          accent="proud of."
          description="A selection of web and mobile products — from real-time messaging to fintech."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => {
            const primary = p.liveUrl ?? p.githubUrl;
            return (
              <article
                key={p.title}
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 100}ms` } as React.CSSProperties}
                className="panel panel-hover group flex flex-col p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                    {String(i + 1).padStart(2, "0")} — {p.category}
                  </span>
                  <a
                    href={primary}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all group-hover:border-accent/50 group-hover:text-ink"
                  >
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                <h3 className="mt-10 font-serif text-4xl leading-tight text-ink">{p.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-muted">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-5 border-t border-line pt-5 text-sm">
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted transition-colors hover:text-ink">
                    <FaGithub size={15} /> Source
                  </a>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent transition-colors hover:text-ink">
                      Live site <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
