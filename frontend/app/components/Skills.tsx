import { skillCategories } from "../data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Expertise"
          title="Tools I use to"
          accent="ship."
          description="A pragmatic stack spanning the full product lifecycle — from interface to infrastructure."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
              className={`panel panel-hover p-6 ${i === 0 ? "lg:row-span-1" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-ink">{cat.title}</h3>
                <span className="font-mono text-xs text-subtle">{String(cat.skills.length).padStart(2, "0")}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{cat.summary}</p>

              <ul className="mt-6 space-y-1">
                {cat.skills.map(({ name, icon: Icon, color, description }) => (
                  <li key={name} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03]">
                      <Icon size={17} style={{ color }} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-ink">{name}</span>
                      <span className="block truncate text-xs text-subtle">{description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div
            data-reveal
            className="panel flex flex-col justify-between p-6 md:col-span-2 lg:col-span-1"
            style={{ background: "linear-gradient(140deg, rgb(111 125 255 / 0.14), rgb(92 200 255 / 0.04))" }}
          >
            <p className="font-serif text-2xl leading-snug text-ink">
              “Clean architecture, type safety and performance are defaults — not afterthoughts.”
            </p>
            <a href="#projects" className="mt-6 text-sm font-medium text-accent hover:text-ink">
              See it in practice →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
