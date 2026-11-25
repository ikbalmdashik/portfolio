"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Download, FileText, X } from "lucide-react";

import { profile } from "../data/portfolio";

const ResumeContext = createContext<() => void>(() => {});

const previewUrl = `https://drive.google.com/file/d/${profile.resumeId}/preview`;
const downloadUrl = `https://drive.google.com/uc?export=download&id=${profile.resumeId}`;

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openResume = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <ResumeContext.Provider value={openResume}>
      {children}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-0 backdrop-blur-sm sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden border border-line bg-[#0a0d16] shadow-2xl sm:h-[90vh] sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4 sm:px-5">
              <div className="flex items-center gap-2 text-sm font-medium text-ink">
                <FileText size={16} className="text-accent" />
                Resume — {profile.name}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  <Download size={15} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close resume"
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  <X size={18} />
                </button>
              </div>
            </header>
            <iframe
              src={previewUrl}
              title={`${profile.name} resume`}
              className="block min-h-0 w-full flex-1 border-0 bg-[#0f1320]"
            />
          </div>
        </div>
      )}
    </ResumeContext.Provider>
  );
}

export function ResumeButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const openResume = useContext(ResumeContext);
  return (
    <button type="button" onClick={openResume} className={`cursor-pointer ${className ?? ""}`}>
      {children}
    </button>
  );
}
