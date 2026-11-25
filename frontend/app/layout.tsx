import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MD Ashik Ikbal — Full-Stack Developer",
  description:
    "Portfolio of MD Ashik Ikbal, a full-stack developer building fast, scalable web and mobile applications with Next.js, NestJS, Node.js and PostgreSQL.",
  openGraph: {
    title: "MD Ashik Ikbal — Full-Stack Developer",
    description:
      "Full-stack developer building fast, scalable web and mobile applications.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
