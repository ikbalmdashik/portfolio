export default function Hero() {
  return (
    <section className="relative min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-8">
        <div className="max-w-3xl">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-indigo-400">
            Backend Developer
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Building

            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              scalable systems.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            I build modern web applications,
            scalable backend systems, and
            intuitive digital experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-105"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-indigo-400 hover:bg-indigo-500/10"
            >
              Contact Me
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}