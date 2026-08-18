const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "Django",
  "PostgreSQL",
  "Docker",
  "Git",
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex min-h-screen items-center justify-center px-6"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">
          Skills
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-zinc-300 px-5 py-2 text-sm dark:border-zinc-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}