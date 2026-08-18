import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ThreeBackground from "./components/ThreeBackground";

export default function Home() {
  return (
    <>
      <ThreeBackground />

      <Navbar />

      <main className="relative z-10">

        <section
          id="home"
          className="min-h-screen"
        >
          {/* Hero */}
          <Hero />
        </section>

        <section
          id="about"
          className="min-h-screen"
        >
          {/* About */}
          <About />
        </section>

        <section
          id="skills"
          className="min-h-screen"
        >
          {/* Skills */}
          <Skills />
        </section>

        <section
          id="projects"
          className="min-h-screen"
        >
          {/* Projects */}
          <Projects />
        </section>

        <section
          id="experience"
          className="min-h-screen"
        >
          {/* Experience */}
          <Experience />
        </section>

        <section
          id="contact"
          className="min-h-screen"
        >
          {/* Contact */}
          <Contact />
        </section>

      </main>
    </>
  );
}