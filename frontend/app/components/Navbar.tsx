"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const activeRef = useRef("Home");
  const isHovering = useRef(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [active, setActive] = useState("Home");

  // ==========================================
  // UPDATE ACTIVE ITEM
  // ==========================================

  const setActiveItem = (name: string) => {
    activeRef.current = name;
    setActive(name);
  };

  // ==========================================
  // MOVE PILL
  // ==========================================

  const movePill = (element: HTMLElement, instant = false) => {
    const nav = navRef.current;
    const pill = pillRef.current;

    if (!nav || !pill) return;

    const navRect = nav.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    gsap.to(pill, {
      x: elementRect.left - navRect.left,
      y: elementRect.top - navRect.top,
      width: elementRect.width,
      height: elementRect.height,
      opacity: 1,
      scale: 1,
      duration: instant ? 0 : 0.4,
      ease: "power3.out",
      overwrite: true,
    });
  };

  // ==========================================
  // MOVE PILL TO ACTIVE
  // ==========================================

  const moveToActive = (instant = false) => {
    const nav = navRef.current;
    if (!nav) return;

    const activeName = activeRef.current;
    const activeLink = Array.from(
      nav.querySelectorAll<HTMLAnchorElement>("a")
    ).find((link) => link.dataset.name === activeName);

    if (activeLink) {
      movePill(activeLink, instant);
    }
  };

  // ==========================================
  // TOGGLE MOBILE MENU
  // ==========================================

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // ==========================================
  // MAIN GSAP SETUP
  // ==========================================

  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;

    if (!nav || !pill) return;

    // Initial pill
    gsap.set(pill, {
      opacity: 0,
      scale: 0.9,
    });

    const links = nav.querySelectorAll<HTMLAnchorElement>("a");

    // ------------------------------------------
    // HOVER
    // ------------------------------------------

    const handleMouseEnter = (event: Event) => {
      isHovering.current = true;
      movePill(event.currentTarget as HTMLElement);
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      moveToActive();
    };

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
    });

    nav.addEventListener("mouseleave", handleMouseLeave);

    // ------------------------------------------
    // ACTIVE SECTION
    // ------------------------------------------

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length === 0) return;

        const section = visibleSections[0].target;
        const item = navItems.find((item) => item.href === `#${section.id}`);

        if (!item) return;

        if (activeRef.current !== item.name) {
          setActiveItem(item.name);
        }

        if (!isHovering.current) {
          requestAnimationFrame(() => {
            moveToActive();
          });
        }
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // ------------------------------------------
    // SCROLL BLUR
    // ------------------------------------------

    const handleScroll = () => {
      const header = nav.parentElement?.parentElement;
      if (!header) return;

      if (window.scrollY > 20) {
        gsap.to(header, {
          backdropFilter: "blur(14px)",
          backgroundColor: "rgba(255,255,255,0.7)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        gsap.to(header, {
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(255,255,255,0)",
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // ------------------------------------------
    // RESIZE
    // ------------------------------------------

    const handleResize = () => {
      moveToActive(true);
    };

    window.addEventListener("resize", handleResize);

    // ------------------------------------------
    // INITIAL POSITION
    // ------------------------------------------

    requestAnimationFrame(() => {
      moveToActive(true);
    });

    // ------------------------------------------
    // CLEANUP
    // ------------------------------------------

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
      });

      nav.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ==========================================
  // ACTIVE STATE CHANGED
  // ==========================================

  useEffect(() => {
    if (!isHovering.current) {
      requestAnimationFrame(() => {
        moveToActive();
      });
    }
  }, [active]);

  // ==========================================
  // NAVIGATION
  // ==========================================

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    // Immediately update active item
    setActiveItem(name);

    // Move pill immediately to clicked item
    const link = e.currentTarget;
    movePill(link);

    // Update URL
    window.history.pushState(null, "", href);

    // Smooth GSAP scrolling
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: target,
        offsetY: 80,
      },
      ease: "power3.inOut",
    });

    // Close mobile menu if open
    closeMobileMenu();
  };

  // ==========================================
  // MOBILE MENU ANIMATION
  // ==========================================

  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenu, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        display: "flex",
      });
    } else {
      gsap.to(mobileMenu, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(mobileMenu, { display: "none" });
        },
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed left-0 top-2 z-50 w-full">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-4xl px-4 py-3 md:px-6 md:py-5">
        {/* Logo */}
        <Link
          href="#home"
          className="relative z-50 text-xl font-semibold text-black dark:text-white"
        >
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div
          ref={navRef}
          className="relative hidden items-center gap-1 rounded-full p-1 md:flex"
        >
          {/* Moving Active / Hover Pill */}
          <div
            ref={pillRef}
            className="pointer-events-none absolute left-0 top-0 z-0 rounded-full bg-black/5 dark:bg-white/10"
          />

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              data-name={item.name}
              onClick={(e) => handleNavigation(e, item.href, item.name)}
              className={`
                relative
                z-10
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                transition-colors
                ${
                  active === item.name
                    ? "text-black dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400"
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="relative z-50 rounded-full p-2 text-black transition-colors hover:bg-black/5 dark:text-white dark:hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className="fixed left-0 right-0 top-0 z-40 hidden min-h-screen flex-col items-center justify-center bg-white/95 backdrop-blur-md dark:bg-black/95 md:hidden"
          style={{ display: "none", opacity: 0, transform: "translateY(-10px)" }}
        >
          <div className="flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href, item.name)}
                className={`
                  text-2xl
                  font-medium
                  transition-colors
                  ${
                    active === item.name
                      ? "text-black dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400"
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}