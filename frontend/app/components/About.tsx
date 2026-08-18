export default function About() {
  return (
    <section
      id="about"
      className="flex min-h-screen items-center justify-center px-6"
    >
      <div className="max-w-3xl text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">
          About Me
        </h2>

        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          I'm a Computer Science graduate and software developer interested
          in building modern web applications. I enjoy working with
          JavaScript, TypeScript, React, Next.js and backend technologies.
        </p>
      </div>
    </section>
  );
}