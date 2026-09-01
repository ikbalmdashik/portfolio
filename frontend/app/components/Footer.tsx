"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ikbalmdashik",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ikbalmdashik",
    icon: FaLinkedin,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-black/40 backdrop-blur-xl text-zinc-400">
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          
          {/* Brand & Summary Column */}
          <div className="md:col-span-5 flex flex-col items-start justify-between">
            <div>
              <Link href="/" className="inline-block">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Md. Ashik <span className="text-indigo-400">Ikbal</span>
                </span>
              </Link>
              <p className="mt-3 max-w-sm text-xs sm:text-sm leading-relaxed text-zinc-400">
                Software Engineer specializing in full-stack web and mobile application development. Focused on building thoughtful, performance-driven digital experiences.
              </p>
            </div>

            {/* Status Badge */}
            <div className="mt-5 flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              Navigation
            </p>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-indigo-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact & Socials Column */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              Direct Contact
            </p>
            <ul className="mt-3 space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-indigo-400" />
                <a
                  href="mailto:ikbalmdashikk@gmail.com"
                  className="transition-colors hover:text-white truncate"
                >
                  ikbalmdashikk@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-purple-400" />
                <a
                  href="tel:+8801780380353"
                  className="transition-colors hover:text-white"
                >
                  +880 17 8038 0353
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-pink-400" />
                <span>Uttara, Dhaka, Bangladesh</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="rounded-full border border-white/10 bg-white/[0.04] p-2.5 text-zinc-400 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Responsive Sub-Footer Section */}
        <div className="mt-10 border-t border-white/5 pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] sm:text-xs text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} Md. Ashik Ikbal. Built with Next.js & Tailwind CSS.
          </p>

          {/* Corrected Mobile-Safe Back to Top Button */}
          <button
            onClick={scrollToTop}
            type="button"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white shrink-0"
          >
            Back to Top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}