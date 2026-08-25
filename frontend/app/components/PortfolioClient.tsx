"use client";

import { useState } from "react";

import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Projects from "./Projects";
import Skills from "./Skills";
import ThreeBackground from "./ThreeBackground";
import ResumeViewer from "./ResumeViewer";

export default function PortfolioClient() {
  const [showResume, setShowResume] = useState(false);

  if (showResume) {
    return (
      <ResumeViewer
        open={true}
        onClose={() => setShowResume(false)}
      />
    );
  }

  return (
    <>
      <ThreeBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero
          onResumeClick={() => setShowResume(true)}
        />

        <About />

        <Skills />

        <Projects />

        <Experience />

        <Contact />
      </main>
    </>
  );
}
