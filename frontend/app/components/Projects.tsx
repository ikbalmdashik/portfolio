const projects = [
  {
    title: "WalletHub",
    description:
      "A mobile wallet application with features such as sending money, payments, cashout and adding money.",
  },
  {
    title: "Portfolio",
    description:
      "A modern developer portfolio built with Next.js, Tailwind CSS, GSAP and smooth scrolling.",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex min-h-screen items-center justify-center px-6"
    >
      <div className="w-full max-w-5xl">
        <h2 className="text-center text-4xl font-bold sm:text-5xl">
          Projects
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h3 className="text-2xl font-semibold">
                {project.title}
              </h3>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}