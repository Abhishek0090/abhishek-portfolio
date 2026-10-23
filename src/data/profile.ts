import { allSkills } from "./projects";

// Edit this file to change your name, intro and links.
export const profile = {
  name: "Abhishek Pal",
  headline: "Front-end Next.js & Full-stack Developer",
  roles: ["Front-end Next.js developer", "Full-stack developer"],
  // Cycled in the hero code card: builds="___"
  builds: ["realtime web apps", "e-commerce storefronts", "booking systems", "developer tools", "browser games"],
  location: "India",
  timezone: "Asia/Kolkata",
  intro:
    "From realtime chat to booking flows that survive a rush, I take products from first commit to deploy, with React, Next.js and TypeScript on the front and Node.js, MongoDB and PostgreSQL behind them.",
  about:
    "I work across the stack with React, Next.js and TypeScript on the front, and Node.js, MongoDB and PostgreSQL behind it, shipped in Docker. I care about the parts users never see: seat locks that can't double-book, apps that keep working offline, and pages that load fast and rank well.",
  // Your core stack: shown in the marquee and the terminal's "skills" command.
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "NestJS",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Prisma",
    "Docker",
    "Tailwind CSS",
    "Supabase",
    "WebSockets",
    "Git",
  ],
  // Replace with your real links. Empty values are hidden on the site.
  links: {
    email: "",
    github: "",
    linkedin: "",
    resume: "",
  },
};

export const stats = [
  { value: 5, suffix: "", label: "Products built end to end" },
  { value: allSkills.length, suffix: "", label: "Technologies across my projects" },
  { value: 2, suffix: "", label: "Installable PWAs with offline support" },
  { value: 100, suffix: "%", label: "Written in TypeScript" },
];

export const capabilities = [
  {
    title: "Interfaces",
    body: "React and Next.js App Router, server components, animation and canvas, accessible UI kits with shadcn/ui and Radix.",
  },
  {
    title: "Realtime",
    body: "WebSockets, Yjs CRDTs, Supabase Realtime, WebRTC calls, presence and typing indicators.",
  },
  {
    title: "Backends",
    body: "Node.js and NestJS APIs on MongoDB or PostgreSQL, Prisma, Redis and Redlock, queues with the outbox pattern, payment webhooks.",
  },
  {
    title: "PWA and performance",
    body: "Service workers, offline shells, web push, static export, SEO with structured data and share images.",
  },
  {
    title: "AI features",
    body: "Claude with tool use, streamed responses, and assistants that propose changes instead of making them.",
  },
  {
    title: "Docker and delivery",
    body: "Docker and docker-compose for local stacks, Kubernetes manifests, deploys to Vercel and Render.",
  },
];
