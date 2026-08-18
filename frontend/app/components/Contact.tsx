export default function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-screen items-center justify-center px-6"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">
          Contact Me
        </h2>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          Have a project in mind? Let's build something together.
        </p>

        <button className="mt-8 rounded-lg bg-black px-6 py-3 text-white dark:bg-white dark:text-black">
          Get In Touch
        </button>
      </div>
    </section>
  );
}