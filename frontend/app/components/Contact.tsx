import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { profile } from "../data/portfolio";

const details = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: profile.phoneHref, icon: Phone },
  { label: "Location", value: profile.location, href: undefined, icon: MapPin },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 lg:py-32">
      <div data-reveal className="conic-border mx-auto max-w-6xl">
      <div className="panel relative overflow-hidden px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgb(111 125 255 / 0.25), transparent)" }}
        />

        <div className="relative grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
              <span className="text-accent">05</span>
              <span className="h-px w-10 bg-gradient-to-r from-accent to-line-strong" />
              <span>Contact</span>
            </div>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Let&apos;s build something{" "}
              <span className="font-serif font-normal italic text-gradient">great together.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
              I&apos;m open to full-time roles, freelance projects and collaborations. My inbox is
              always open — I&apos;ll get back to you as soon as I can.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-[#05070c] transition-transform hover:-translate-y-0.5"
              >
                <Mail size={16} /> Send an email
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:bg-accent/[0.07]"
              >
                <FaLinkedin size={15} /> Connect on LinkedIn
              </a>
            </div>
          </div>

          <ul className="divide-y divide-line rounded-2xl border border-line bg-black/20">
            {details.map(({ label, value, href, icon: Icon }) => {
              const inner = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-accent">
                    <Icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-subtle">{label}</span>
                    <span className="block truncate text-sm text-ink">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 px-5 py-4">{inner}</div>
                  )}
                </li>
              );
            })}
            <li className="flex items-center gap-3 px-5 py-4">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink">
                <FaGithub size={16} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink">
                <FaLinkedin size={16} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}
