import { skillCategories } from "../data/portfolio";

const skills = skillCategories.flatMap((c) => c.skills);

export default function TechMarquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {skills.map(({ name, icon: Icon, color }) => (
        <li key={name} className="flex items-center gap-2.5 text-sm whitespace-nowrap text-muted">
          <Icon size={18} style={{ color }} aria-hidden />
          {name}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee border-y border-line py-4" aria-label="Technologies">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
