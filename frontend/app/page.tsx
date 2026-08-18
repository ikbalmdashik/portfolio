import Hero from "./components/Hero";
import ThreeBackground from "./components/ThreeBackground";

export default function Home() {
  return (
    <>
      <ThreeBackground />

      <main className="relative z-10">

        <Hero />

        <section
          id="about"
          className="min-h-screen"
        >
          {/* About */}
        </section>

        <section
          id="skills"
          className="min-h-screen"
        >
          {/* Skills */}
        </section>

        <section
          id="projects"
          className="min-h-screen"
        >
          {/* Projects */}
        </section>

        <section
          id="experience"
          className="min-h-screen"
        >
          {/* Experience */}
        </section>

        <section
          id="contact"
          className="min-h-screen"
        >
          {/* Contact */}
        </section>

      </main>
    </>
  );
}