import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGnubash,
  SiNodedotjs,
  SiNestjs,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiTypeorm,
  SiKotlin,
  SiAndroidstudio,
  SiOpenjdk,
  SiFirebase,
  SiGithub,
  SiDocker,
  SiFedora,
  SiPostman,
} from "react-icons/si";
import { GrOracle } from "react-icons/gr";

import ThesisPoster from "../assets/images/ThesisPoster.png";
import AIUBLogo from "../assets/icons/AIUBLogo.svg";
import WLFSCLogo from "../assets/icons/WLFSCLogo.jpeg";

export const profile = {
  name: "MD Ashik Ikbal",
  role: "Full-Stack Developer",
  location: "Uttara, Dhaka, Bangladesh",
  email: "ikbalmdashikk@gmail.com",
  phone: "+880 17 8038 0353",
  phoneHref: "tel:+8801780380353",
  github: "https://github.com/ikbalmdashik",
  linkedin: "https://www.linkedin.com/in/ikbalmdashik",
  resumeId: "1GCpQEZvWmzbm0qyIOSgY6ZofG09ggbYd",
  summary:
    "I build performant full-stack applications with modern frontend technologies, robust backend systems, and reliable databases — focused on scalable, maintainable, and user-friendly solutions that turn ideas into practical digital products.",
  about:
    "I'm a Computer Science graduate and full-stack developer who enjoys turning complex problems into useful, well-crafted digital products across web and mobile platforms. I focus on end-to-end development, clean architecture, and building performant solutions.",
};

export const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "American International University - Bangladesh (AIUB)",
    timeline: "2020 – 2025",
    link: "https://www.aiub.edu/",
    logo: AIUBLogo,
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Willes Little Flower School & College",
    timeline: "2017 – 2019",
    link: "https://wlfsc.edu.bd/",
    logo: WLFSCLogo,
  },
];

export const thesis = {
  tag: "Academic Research & Thesis",
  title: "Financial Market Volatility Prediction with Alternative Data",
  description:
    "Analyzed market volatility by integrating non-traditional financial data sources. Developed and evaluated predictive machine learning models using deep learning frameworks to capture complex market patterns and non-linear dependencies.",
  technologies: ["TensorFlow", "Keras", "Python", "Data Analysis", "Predictive Modeling"],
  image: ThesisPoster,
};

export const courses = [
  {
    title: "Machine Learning",
    description: "Built predictive machine learning models and deep learning pipelines.",
    technologies: ["TensorFlow", "Keras", "Python"],
  },
  {
    title: "Advanced Web Technology",
    description:
      "Modern full-stack architecture, dynamic rendering, and relational database integrations.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
  },
  {
    title: "Mobile App Development",
    description:
      "Native mobile app engineering with real-time database synchronization and backend integration.",
    technologies: ["Kotlin", "Android Studio", "Firebase"],
  },
  {
    title: "Advanced .NET",
    description: "Enterprise backend systems and RESTful Web APIs with relational database backends.",
    technologies: [".NET Core 8", "MySQL", "MSSQL Server"],
  },
  {
    title: "Advanced Database Management",
    description:
      "Database administration, complex query optimizations, dynamic procedures, and control execution.",
    technologies: ["PL/SQL", "Oracle Database"],
  },
  {
    title: "AI & Expert Systems",
    description: "State-space search strategies, knowledge representation, and reasoning models.",
    technologies: ["Python", "Expert Systems", "Search Algorithms"],
  },
];

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
  description: string;
}

export const skillCategories: { title: string; summary: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    summary: "Interfaces that are fast, accessible and maintainable.",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB", description: "Component architecture & state management" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", description: "App Router, SSR & optimization" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", description: "Strict type safety at scale" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", description: "Responsive design systems" },
    ],
  },
  {
    title: "Backend",
    summary: "Reliable services and clean, modular APIs.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", description: "Asynchronous backend services" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E", description: "Modular enterprise architecture" },
      { name: "Django REST", icon: SiDjango, color: "#44B78B", description: "Python Web APIs" },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25", description: "CLI automation & administration" },
    ],
  },
  {
    title: "Databases & ORMs",
    summary: "Relational modeling with type-safe data access.",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#5B8DEF", description: "Modeling & query optimization" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", description: "Schema design & tuning" },
      { name: "Oracle DB", icon: GrOracle, color: "#F80000", description: "Enterprise SQL & PL/SQL" },
      { name: "Prisma", icon: SiPrisma, color: "#E7E9EF", description: "Type-safe client & migrations" },
      { name: "TypeORM", icon: SiTypeorm, color: "#FE0803", description: "Active Record & Data Mapper" },
    ],
  },
  {
    title: "Mobile",
    summary: "Native Android apps backed by real-time data.",
    skills: [
      { name: "Kotlin", icon: SiKotlin, color: "#7F52FF", description: "Native Android, clean architecture" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84", description: "UI layouts & deployment" },
      { name: "Java", icon: SiOpenjdk, color: "#ED8B00", description: "Object-oriented programming" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28", description: "Auth, Firestore & real-time DB" },
    ],
  },
  {
    title: "Tools & DevOps",
    summary: "A dependable, reproducible workflow.",
    skills: [
      { name: "Git & GitHub", icon: SiGithub, color: "#FFFFFF", description: "Branching & collaboration" },
      { name: "Docker", icon: SiDocker, color: "#2496ED", description: "Containerized environments" },
      { name: "Fedora Linux", icon: SiFedora, color: "#51A2DA", description: "Linux & shell workflow" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37", description: "API testing & documentation" },
    ],
  },
];

export const experiences = [
  {
    role: "Full Stack Developer Intern",
    company: "Goinnovior",
    location: "Mirpur DOHS, Dhaka",
    period: "July 2025 – Present",
    type: "Internship",
    responsibilities: [
      "Developed responsive web application features and UI components using Next.js & React.js.",
      "Built and integrated RESTful APIs using Express.js for seamless frontend-backend communication.",
      "Implemented server-side business logic, API endpoints, and efficient data handling routines.",
      "Debugged application issues to optimize end-to-end functionality and overall user experience.",
      "Managed version control workflows and feature branches using Git & GitHub.",
    ],
    technologies: ["Next.js", "React.js", "Express.js", "Node.js", "REST API", "JavaScript", "TypeScript", "Git"],
  },
];

export const projects = [
  {
    title: "Messenger",
    category: "Academic Project",
    description:
      "A real-time messaging application supporting instant text messages via Socket.io, profile management, email verification, and password recovery flow.",
    technologies: ["Next.js", "Node.js", "Socket.io", "PostgreSQL", "TypeORM", "Nodemailer"],
    githubUrl: "https://github.com/ikbalmdashik/Messenger",
    liveUrl: undefined as string | undefined,
  },
  {
    title: "Purabi General Insurance",
    category: "Web Application",
    description:
      "A professional interface showcasing insurance products, services, claims, and company details built with a reusable component architecture.",
    technologies: ["React.js", "React Router", "Vite", "Tailwind CSS"],
    githubUrl: "https://github.com/ikbalmdashik/Purabi-General-Insurance",
    liveUrl: "https://purabi-general-insurance-seven.vercel.app",
  },
  {
    title: "WalletHub",
    category: "Mobile Application",
    description:
      "A mobile wallet application featuring instant fund transfers, cash-outs, live transaction tracking, and Firebase authentication.",
    technologies: ["Kotlin", "Android Studio", "Firebase", "Material UI"],
    githubUrl: "https://github.com/ikbalmdashik/WalletHub",
    liveUrl: undefined,
  },
  {
    title: "Developer Portfolio",
    category: "Web Engineering",
    description:
      "This site — a fast, accessible portfolio built with server components, a GPU-friendly animated background, and a token-based design system.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React Server Components"],
    githubUrl: "https://github.com/ikbalmdashik",
    liveUrl: undefined,
  },
];

export const stats = [
  { value: "B.Sc.", label: "Computer Science & Engineering" },
  { value: "20+", label: "Technologies in daily use" },
  { value: "4", label: "Featured projects" },
  { value: "2025", label: "Industry experience since" },
];
