export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  accent: string;
  summary: string;
  stack: string[];
  highlights: { title: string; body: string }[];
  details: string[];
  // Set these to real URLs to show the buttons.
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "railbook",
    index: "01",
    name: "RailBook",
    tagline: "Train booking built for the Tatkal rush",
    category: "Full-stack platform",
    year: "2026",
    accent: "#8b7bff",
    summary:
      "A train ticket booking platform with a concurrency-safe seat reservation flow, a virtual waiting room for Tatkal windows, Razorpay payments and a voice or chat booking assistant.",
    stack: ["Next.js", "NestJS", "Postgres", "Redis", "Prisma", "Docker", "Kafka", "Elasticsearch", "Kubernetes", "Claude API"],
    highlights: [
      {
        title: "Seats that can't double-book",
        body: "Seat pools, timed holds and Redlock keep two buyers from getting the same berth when thousands hit the same train at 10:00.",
      },
      {
        title: "Virtual waiting room",
        body: "Tatkal traffic queues and is admitted in batches, with rate limiting, so the booking service stays up during the spike.",
      },
      {
        title: "An assistant that can't book",
        body: "The Claude assistant reads anything but changes nothing. Bookings and cancellations come back as drafts the user confirms through the normal guarded flow.",
      },
    ],
    details: [
      "NestJS modular monolith: booking, locking, payment, search, notification, queue, tatkal and auth modules.",
      "Search on Postgres trigram indexes, or Elasticsearch when it is configured.",
      "Notifications through Redis Streams or Kafka, fed by an outbox relay.",
      "JWT with refresh rotation and mobile OTP login.",
      "Kubernetes manifests with an autoscaler scoped to the booking deployment.",
      "A full mock mode so the six frontend views run with no infrastructure at all.",
    ],
  },
  {
    slug: "twogether",
    index: "02",
    name: "Twogether",
    tagline: "A private chat app for two",
    category: "Realtime PWA",
    year: "2026",
    accent: "#ff7ab6",
    summary:
      "WhatsApp-style messaging plus couple features: voice notes, view-once media, WebRTC calls, nudges, a question of the day and a shared bucket list. Installable, with push notifications.",
    stack: ["Next.js", "Supabase", "Postgres", "Realtime", "WebRTC", "Web Push", "PWA", "Tailwind CSS"],
    highlights: [
      {
        title: "Realtime with a safety net",
        body: "Messages arrive over Supabase Realtime, with a polling fallback when the live connection drops. Sent, delivered and read ticks, typing and recording indicators.",
      },
      {
        title: "Calls, peer to peer",
        body: "Voice and video calls over WebRTC with mute, camera off and camera flip, signalled through Realtime.",
      },
      {
        title: "Built for two",
        body: "Pair with a 6-character code. Days-together counter, anniversary countdown, moods, nudges with a full-screen hearts animation.",
      },
    ],
    details: [
      "Photos, videos and documents upload direct to storage, up to 50 MB, with paste and drag-and-drop.",
      "Voice notes with waveform, seeking and 1x, 1.5x, 2x playback.",
      "Reply by swiping, react by double-tapping, edit for 15 minutes, delete for everyone for 48 hours.",
      "Offline page, cached app shell and an unread badge on the app icon.",
      "Runs on the free tiers of Vercel and Supabase.",
    ],
  },
  {
    slug: "code-hub",
    index: "03",
    name: "Code Hub",
    tagline: "Six developer tools, nothing stored",
    category: "Developer tools",
    year: "2026",
    accent: "#b56bff",
    summary:
      "A dashboard of developer tools: pack a project into one script, live codeshare rooms, run code in the browser, AI code conversion, format and image converters. Files stay in your browser.",
    stack: ["Next.js", "WebSocket", "Yjs", "CodeMirror", "Pyodide", "Web Workers", "Claude API", "Tailwind CSS"],
    highlights: [
      {
        title: "Project to Script",
        body: "Turns a folder or .zip into one script that recreates it byte for byte, in Node, Bash or PowerShell. A self-test checks every format.",
      },
      {
        title: "Live codeshare",
        body: "Shared editor rooms with live cursors over WebSocket, synced with Yjs. Rooms live in server memory until everyone leaves.",
      },
      {
        title: "Run anything",
        body: "JavaScript and TypeScript in a sandboxed worker, Python through Pyodide, and other languages through a Piston server.",
      },
    ],
    details: [
      "One Node process serves Next.js and the WebSocket endpoint on a single port.",
      "AI Code Convert translates between languages with Claude.",
      "Format converters: JSON, YAML, CSV, TypeScript types, Base64 and URL encoding.",
      "PNG to SVG tracing and SVG to PNG export at any scale, all client side.",
    ],
  },
  {
    slug: "sevyn-perfumes",
    index: "04",
    name: "SEVYN Perfumes",
    tagline: "A storefront that checks out on WhatsApp",
    category: "E-commerce",
    year: "2026",
    accent: "#ffc56b",
    summary:
      "A static Next.js storefront for a perfume collection. Customers fill a cart and check out on WhatsApp with the order pre-filled to that perfume's dealer.",
    stack: ["Next.js", "React 19", "Tailwind CSS", "shadcn/ui", "Radix", "Embla", "JSON-LD", "Static export"],
    highlights: [
      {
        title: "WhatsApp checkout",
        body: "Each perfume has its own dealer. The cart builds a pre-filled order message and opens a chat with the right one.",
      },
      {
        title: "SEO built in",
        body: "Canonical links, Open Graph and X tags, JSON-LD for products, reviews and breadcrumbs, a sitemap and generated share images per perfume.",
      },
      {
        title: "Ready for a database",
        body: "Pages call async service functions, never mock data, so swapping in Prisma or Supabase means changing function bodies only.",
      },
    ],
    details: [
      "Feature-based structure: each feature owns its components, data, services and types.",
      "Parallax hero, featured carousel and a perfume grid with fragrance notes.",
      "Cart persisted to localStorage with an add-to-cart stepper and a cart sheet.",
      "Deploys as a static out/ folder to any host.",
    ],
  },
  {
    slug: "barricade-run",
    index: "05",
    name: "Barricade Run",
    tagline: "An endless runner with zero assets",
    category: "Browser game",
    year: "2026",
    accent: "#ff6a3d",
    summary:
      "A 3-lane endless runner set in a street protest. Dodge barricades, police lines and detention buses while leaked exam papers blow across the road. Plays on desktop and mobile, offline.",
    stack: ["Next.js", "Canvas 2D", "Web Audio", "TypeScript", "PWA", "Service Worker"],
    highlights: [
      {
        title: "No engine, no images",
        body: "The whole scene is drawn with canvas shapes in a pseudo-3D renderer. No game engine and no image files.",
      },
      {
        title: "Synthesised sound",
        body: "Every sound effect and the siren are generated live with the Web Audio API. No audio files either.",
      },
      {
        title: "Touch and keyboard",
        body: "Arrow keys or WASD on a laptop, buttons or swipes on a phone. Installs as a PWA and runs offline.",
      },
    ],
    details: [
      "Engine handles movement, spawning, collisions, the police chase and lifelines.",
      "Clip an obstacle and you stumble; stumble twice in 6 seconds and you're caught.",
      "Lifelines clear the road ahead and give 2.5 seconds of protection.",
      "Placards and banners in English, Hinglish and Hindi.",
      "App icons are drawn by a script, too.",
    ],
  },
];

export const allSkills = Array.from(new Set(projects.flatMap((p) => p.stack))).sort((a, b) => {
  const count = (s: string) => projects.filter((p) => p.stack.includes(s)).length;
  return count(b) - count(a) || a.localeCompare(b);
});
