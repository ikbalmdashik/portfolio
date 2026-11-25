"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";

import Icon from "../icon.png";
import { navItems, profile } from "../data/portfolio";
import { ResumeButton } from "./Resume";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-[#05070c]/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-line-strong">
            <Image src={Icon} alt="" fill sizes="32px" className="object-cover" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                active === item.href ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.name}
              <span
                className={`absolute inset-x-3.5 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-300 ${
                  active === item.href ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
          <ResumeButton className="ml-3 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:bg-accent/10">
            <FileText size={15} />
            Resume
          </ResumeButton>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="rounded-full p-2 text-ink transition-colors hover:bg-white/5 md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="h-[calc(100dvh-4rem)] border-t border-line bg-[#05070c] px-6 py-10 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-line py-4 font-serif text-3xl ${
                  active === item.href ? "text-ink" : "text-muted"
                }`}
              >
                {item.name}
              </a>
            ))}
            <ResumeButton className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink">
              <FileText size={15} />
              View Resume
            </ResumeButton>
          </div>
        </div>
      )}
    </header>
  );
}
