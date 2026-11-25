import About from "./components/About";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Interactions from "./components/Interactions";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import { ResumeProvider } from "./components/Resume";
import RevealObserver from "./components/RevealObserver";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <ResumeProvider>
      <div className="scroll-progress" aria-hidden />
      <Background />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
      <Interactions />
    </ResumeProvider>
  );
}
