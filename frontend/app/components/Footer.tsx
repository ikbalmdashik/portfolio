import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { navItems, profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-subtle">
            © {new Date().getFullYear()} · {profile.role} · {profile.location}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink">
            <FaGithub size={15} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink">
            <FaLinkedin size={15} />
          </a>
          <a href="#home" aria-label="Back to top" className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-accent/50">
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
