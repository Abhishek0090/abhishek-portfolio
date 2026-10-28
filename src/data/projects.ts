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
    tagline: "Train booking where two people can't get the same seat",
    category: "Full-stack platform",
    year: "2026",
    accent: "#8b7bff",
    summary:
      "An IRCTC-style train ticket app: search trains, compare classes and dates, add passengers, pay and get a ticket with a PNR. Built on Next.js with a PostgreSQL schema in Drizzle ORM and a seat lock that stops two buyers from taking the same berth.",
    stack: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Drizzle ORM", "Redis", "Redlock", "Tailwind CSS"],
    highlights: [
      {
        title: "Seats that can't double-book",
        body: "Every booking locks train, date, class and seat first. Redis Redlock in production, an in-memory lock in development, both behind one interface. A test fires two requests at once and checks that only one gets the seat.",
      },
      {
        title: "Safe to retry",
        body: "The payment transaction ID is unique, so a retried request returns the existing booking instead of booking twice. The booking and its transaction row are written in one database transaction.",
      },
      {
        title: "The whole passenger journey",
        body: "Train search, seat availability by class and date, passenger details, booking summary, e-ticket, my trips, PNR status, live running status and the train schedule with a station timeline.",
      },
    ],
    details: [
      "PostgreSQL schema in Drizzle ORM: users, stations, trains, routes, coaches, seats, bookings and transactions, with foreign keys and unique indexes on PNR and payment ID.",
      "When a seat is already held, the API answers 409 and offers RAC or waitlist instead of failing.",
      "Locks expire after 10 minutes, so a crashed process can't hold a seat forever.",
      "10-digit PNRs generated with Node's crypto randomInt.",
      "Redis is optional: without REDIS_URL the app falls back to the in-process lock.",
      "Station search with a searchable dropdown, a calendar date picker, toasts and a top loading bar.",
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
    stack: ["Next.js", "Supabase", "PostgreSQL", "Realtime", "WebRTC", "Web Push", "PWA", "Tailwind CSS"],
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
    name: "Barricade Arcade",
    tagline: "Three browser games, zero assets",
    category: "Browser games",
    year: "2026",
    accent: "#ff6a3d",
    summary:
      "A game hub with three games set in a street protest: Barricade Run, an endless runner through the march at dusk; Barricade Drive, a night highway drive through a traffic jam with nitro; and Rail Roko, a daytime trolley ride on a curving railway line. Live previews on the hub, plays on desktop and mobile, works offline.",
    stack: ["Next.js", "Canvas 2D", "Web Audio", "TypeScript", "PWA", "Service Worker"],
    highlights: [
      {
        title: "Three games, one engine",
        body: "All three share one pseudo-3D canvas renderer, crowd, props, audio and game shell. Each game only adds its own rules, scenery and obstacles.",
      },
      {
        title: "No engine, no images, no audio files",
        body: "Every scene is drawn with canvas shapes and every sound, from the siren to the train horn, is synthesised with the Web Audio API.",
      },
      {
        title: "Swipe or keys",
        body: "Arrow keys or WASD on a laptop, swipes anywhere on a phone with no on-screen buttons in the way. Installs as a PWA and runs offline.",
      },
    ],
    details: [
      "Barricade Run: 3 lanes, jump barricades, slide under the police line, dodge riot police and the detention bus.",
      "Barricade Drive: a kaali-peeli taxi on a 4-lane highway; nitro smashes barricades, brake buys time.",
      "Rail Roko: the trolley never leaves the rails. Switch tracks around coaches, oncoming locos and tracks that end; ring the bell to clear police.",
      "The hub shows a live autopilot preview of each game, drawn only while the card is on screen.",
      "Clip an obstacle and the police chase you; stumble again within 6 seconds and you're caught. Lifelines give a second chance.",
      "Placards and banners in English, Hinglish and Hindi. Even the app icons are drawn by a script.",
    ],
  },
];

export const allSkills = Array.from(new Set(projects.flatMap((p) => p.stack))).sort((a, b) => {
  const count = (s: string) => projects.filter((p) => p.stack.includes(s)).length;
  return count(b) - count(a) || a.localeCompare(b);
});
