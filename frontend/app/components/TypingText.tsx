"use client";

import { useEffect, useState } from "react";

const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "Coder",
];

export default function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1500);

      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        const newText = currentRole.substring(0, text.length - 1);
        setText(newText);

        if (newText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        const newText = currentRole.substring(0, text.length + 1);
        setText(newText);

        if (newText === currentRole) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [text, isDeleting, isPaused, roleIndex]);

  return (
    <p className="mt-4 text-2xl font-medium text-zinc-600 dark:text-zinc-400">
      {text}
      <span className="ml-1 animate-pulse">|</span>
    </p>
  );
}