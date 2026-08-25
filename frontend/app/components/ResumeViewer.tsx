"use client";

import { useEffect } from "react";
import {
  Download,
  FileText,
  X,
} from "lucide-react";

interface ResumeViewerProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeViewer({
  open,
  onClose,
}: ResumeViewerProps) {
  const resumeFileId =
    "1m0LuBfrsh2yM3kL5HWYc92LtC8Gd2uiE";

  const previewUrl =
    `https://drive.google.com/file/d/${resumeFileId}/preview`;

  const downloadUrl =
    `https://drive.google.com/uc?export=download&id=${resumeFileId}`;

  // ==========================================
  // ESCAPE KEY
  // ==========================================

  useEffect(() => {
    if (!open) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  // ==========================================
  // LOCK BODY SCROLL
  // ==========================================

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-zinc-950">

      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-zinc-950 px-4 sm:px-6">

        {/* Title */}

        <div className="flex items-center gap-2 text-sm font-medium text-white">

          <FileText
            size={18}
            className="text-indigo-400"
          />

          <span>
            My Resume
          </span>

        </div>

        {/* Actions */}

        <div className="flex items-center gap-2">

          {/* Download */}

          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white"
          >
            <Download size={16} />

            <span className="hidden sm:inline">
              Download
            </span>
          </a>

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume"
            className="rounded-lg p-2 text-zinc-400 transition-all duration-300 hover:bg-zinc-800 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

      </header>

      {/* ==========================================
          PDF
      ========================================== */}

      <main className="min-h-0 flex-1 bg-zinc-900">

        <iframe
          src={previewUrl}
          title="MD Ashik Ikbal Resume"
          className="block h-full w-full border-0"
          allow="autoplay"
        />

      </main>

    </div>
  );
}