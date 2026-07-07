import mealMatrixImg from "../../../images/MealMatrix.jpg";
import mindArenaImg from "../../../images/MindArena.jpg";
import rudraImg from "../../../images/Rudra.jpg";
import portfolioImg from "../../../images/My_portfolio.jpg";
import shopMatrixImg from "../../../images/sh.jpg";
import eietImg from "../../../images/eiet.jpg";

export const projectsData = [
  {
    id: "rudra-ai",
    title: "Rudra Virtual AI Assistant",
    subtitle: "High-performance AI voice companion with real-time feedback.",
    description: "An advanced voice-activated assistant combining low-latency speech recognition, persistent SQL memories, and real-time speech synthesis. Built as a stateful conversational companion.",
    image: rudraImg,
    techStack: ["Next.js", "React", "Node.js", "MySQL", "ElevenLabs"],
    features: [
      "Voice-driven UI with real-time Web Speech recognition",
      "Persistent memory extraction background worker",
      "Dynamic speech synthesis using ElevenLabs API",
    ],
    github: "https://github.com/Krish480/Rudra-Virtual-AI-Assistant",
    liveDemo: "#",
    status: "In Progress",
    themeColor: "#22d3ee",
    accentColor: "#67e8f9",
    category: "AI & Voice",
    year: "2024",
    // Premium Case Study Fields
    problem: "Traditional conversational agents suffer from session amnesia, requiring manual context re-injection or computationally expensive vector databases (RAG).",
    solution: "Developed a Next.js App Router framework with an asynchronous background worker that extracts user preferences to a relational MySQL DB, injecting them as context into the system prompt.",
    architecture: ["Next.js Client", "App API Routes", "MySQL Database", "OpenRouter LLM", "ElevenLabs API"],
    challenges: "Eliminating Vite hydration errors with localStorage tokens, and handling concurrent SQL updates in the async memory parser without thread-locking.",
    results: "Reduced chat-response latency to under 700ms while maintaining 100% memory accuracy across user sessions.",
    futureImprovements: ["Local LLM hosting with llama.cpp", "Multi-modal vision analysis", "Websocket voice streaming"],
    timeline: [
      { phase: "Architecture", detail: "Database Schema Design & Next.js Setup" },
      { phase: "API Orchestration", detail: "Auth, Chat, and ElevenLabs API integration" },
      { phase: "Memory Engine", detail: "Background worker & UPSERT logic design" },
      { phase: "UI Polish", detail: "Glassmorphism layouts & CSS transitions" }
    ],
    metrics: {
      performance: 98,
      accessibility: 96,
      responsive: "100%",
      loadingSpeed: "0.5s",
      codeQuality: "A"
    },
    videoWalkthrough: "#",
    caseStudyLink: "#"
  },
  {
    id: "meal-matrix",
    title: "MealMatrix",
    subtitle: "Catering reservation and analytics dashboard portal.",
    description: "A production-grade, hybrid cloud catering reservation and online ordering system. Enables clients to customize event menus, manage persistent carts, and lets administrators track bookings in real-time.",
    image: mealMatrixImg,
    techStack: ["Node.js", "Express", "EJS", "Firebase Auth", "Tailwind"],
    features: [
      "Dynamic menu customization and order receipt compilation",
      "Persistent cart synchronization across devices",
      "Operations Dashboard managing product catalogs and order states",
    ],
    github: "https://github.com/Krish480/catering-reservation-system",
    liveDemo: "https://mealmatrix-e5ut.onrender.com",
    status: "Completed",
    themeColor: "#f97316",
    accentColor: "#fdba74",
    category: "Full-Stack Web",
    year: "2023",
    // Premium Case Study Fields
    problem: "Event caterers lose client trust and operations efficiency due to paper-based bookings, static PDF menus, and lack of secure order tracking systems.",
    solution: "Designed a hybrid system combining Firebase client authentication with an Express server, running Multer file uploads and saving persistent cart items to secure session stores.",
    architecture: ["EJS Templates", "Express Backend", "Firebase Auth", "Relational JSON", "Multer Disk Engine"],
    challenges: "Maintaining cart synchronization across servers and securing admin dashboard routes against unauthorized session spoofing.",
    results: "Delivered a zero-maintenance booking engine supporting real-time catalog changes and unified order status pipelines.",
    futureImprovements: ["Stripe gateway integration", "Live SMS notifications via Twilio", "Loyalty program tracking"],
    timeline: [
      { phase: "Architecture", detail: "Server setup & Express routes definition" },
      { phase: "Database & Auth", detail: "Firebase config & User cart storage schema" },
      { phase: "Admin Console", detail: "Multer image uploads & product CRUD design" },
      { phase: "Deployment", detail: "Render hosting & session persistence validation" }
    ],
    metrics: {
      performance: 94,
      accessibility: 95,
      responsive: "100%",
      loadingSpeed: "0.8s",
      codeQuality: "A"
    },
    videoWalkthrough: "#",
    caseStudyLink: "#"
  },
  {
    id: "mind-arena",
    title: "MindArena",
    subtitle: "Gamified Quiz & Learning Platform.",
    description: "A serverless, high-performance gamified quiz platform. Combines assessment with progressive level unlocks, persistent XP level tracking, soundboard cues, and dynamic achievement engines.",
    image: mindArenaImg,
    techStack: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    features: [
      "Interactive answer validation with audio soundboard feedback",
      "Persistent category level unlocks (stages 1 to 10)",
      "Real-time achievement progress and weekly consistency charts",
    ],
    github: "https://github.com/Krish480/MindArena-Quiz-App",
    liveDemo: "https://mindarena.netlify.app",
    status: "Completed",
    themeColor: "#a855f7",
    accentColor: "#c084fc",
    category: "Game Dev",
    year: "2023",
    // Premium Case Study Fields
    problem: "Online quiz apps feel punitive, lack progressive leveling, and do not track student consistency over time, resulting in high bounce rates and low learning retention.",
    solution: "Built a serverless gamified EdTech platform implementing category level progression (1-10), experience points (XP) rewards, and dynamic badge achievement unlocks.",
    architecture: ["Vanilla JS Engine", "Tailwind CSS Layout", "Localized JSON Datastore", "Confetti Particle System", "HTML5 LocalStorage"],
    challenges: "Eliminating thread drift desync on client-side timers, and isolating level unlock states dynamically across multiple subjects.",
    results: "Delivered a lightweight, zero-maintenance EdTech portal supporting dynamic localizations and progress persistence.",
    futureImprovements: ["Cloud database synchronization via Firebase", "Real-time 1v1 multiplayer WebSocket lobbies", "AI-generated questions based on weak spots"],
    timeline: [
      { phase: "Architecture", detail: "HTML skeleton maps & Tailwind theme definitions" },
      { phase: "Quiz Engine", detail: "Core setInterval timers & audio soundboard hooks" },
      { phase: "Gamification", detail: "XP progressions, weekly charts, and achievements" },
      { phase: "Localization", detail: "Dual language JSON directories & dynamic loaders" }
    ],
    metrics: {
      performance: 99,
      accessibility: 98,
      responsive: "100%",
      loadingSpeed: "0.3s",
      codeQuality: "A+"
    },
    videoWalkthrough: "#",
    caseStudyLink: "#"
  },
  {
    id: "shop-matrix",
    title: "ShopMatrix",
    subtitle: "Modern E-Commerce Platform.",
    description: "A production-grade, multi-role e-commerce platform and merchant dashboard. Orchestrates localized shop directories, global promotions, and secure cloud sync using Firebase.",
    image: shopMatrixImg,
    techStack: ["HTML5", "CSS3", "JavaScript", "Firebase", "Tailwind CSS"],
    features: [
      "Interactive physical mall floor guide and directory map",
      "Real-time inventory sync and promotional deals catalog",
      "Analytical merchant panel featuring sales charts via Chart.js",
    ],
    github: "https://github.com/Krish480/ShopMatrix",
    liveDemo: "https://shopmatrix-23995.firebaseapp.com",
    status: "Completed",
    themeColor: "#3b82f6",
    accentColor: "#93c5fd",
    category: "E-Commerce",
    year: "2024",
    // Premium Case Study Fields
    problem: "Physical retail vendors lack easy-to-use directory listing tools to digitize store categories and floor layouts, resulting in low localized user traffic.",
    solution: "Designed a multi-role e-commerce site utilizing Firebase Authentication and Cloud Firestore, providing custom user directories and protected merchant panels.",
    architecture: ["Tailwind Storefront", "Firebase Auth Engine", "Cloud Firestore DB", "Chart.js Analytics", "Firebase Static Hosting"],
    challenges: "Synchronizing live inventory counts concurrently without page refreshes, and managing dynamic HTML imports across multi-page views.",
    results: "Achieved instant real-time listings updating in under 100ms via onSnapshot collections, running on zero server maintenance overhead.",
    futureImprovements: ["Stripe payment gateway checkout", "Vector SVG interactive mall maps", "Automated stock deficit alerts"],
    timeline: [
      { phase: "Architecture", detail: "Mall directory wireframes & layout schemes design" },
      { phase: "Database Setup", detail: "Firestore document collections & security rules setup" },
      { phase: "Dashboard Build", detail: "Chart.js graphs & product manager CRUD development" },
      { phase: "Deployment", detail: "Firebase Hosting configuration & DNS linking" }
    ],
    metrics: {
      performance: 96,
      accessibility: 97,
      responsive: "100%",
      loadingSpeed: "0.5s",
      codeQuality: "A"
    },
    videoWalkthrough: "#",
    caseStudyLink: "#"
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    subtitle: "Immersive 3D WebGL-powered portfolio experience.",
    description: "A premium personal portfolio leveraging React Three Fiber to render a custom 3D cosmic background. Seamless page routing, custom smooth-scroll engines, and layout triggers provide a cinematic user journey.",
    image: portfolioImg,
    techStack: ["React", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS"],
    features: [
      "Immersive Gargantua black hole custom shader and gravity dust simulation",
      "Smooth camera navigation and scroll synchronizations powered by GSAP & Lenis",
      "Tactile glassmorphic console overlays displaying product metrics and diagrams",
    ],
    github: "https://github.com/Krish480/My-Portfolio",
    liveDemo: "https://krishpandeyportfolio.netlify.app",
    status: "Completed",
    themeColor: "#eab308",
    accentColor: "#facc15",
    category: "3D Web",
    year: "2024",
    // Premium Case Study Fields
    problem: "Traditional portfolios present text in static grids, failing to capture visual engagement, demonstrate senior UI/UX engineering, or tell a memorable story.",
    solution: "Engineered a single-page interactive 3D WebGL space universe using React Three Fiber, rigging scroll offsets to coordinate camera paths and render responsive console panels.",
    architecture: ["Vite React Core", "React Three Fiber", "GSAP ScrollTrigger", "GLSL Custom Shaders", "Tailwind CSS v4 Engine", "Vercel Edge Platform"],
    challenges: "Optimizing GPU draw calls for high-density particle clouds while preventing WebGL program crashes across legacy systems.",
    results: "Delivered an Awwwards-grade 60 FPS developer universe with fully optimized assets, high accessibility, and modular case study widgets.",
    futureImprovements: ["Conversational AI assistant console", "Dynamic blog layout integration", "Custom audio synth environments"],
    timeline: [
      { phase: "Prototyping", detail: "Three.js rendering canvases & particle geometries setup" },
      { phase: "Animation System", detail: "GSAP ScrollTrigger bindings & camera tracks configuration" },
      { phase: "UI Layers", detail: "Glassmorphic overlay controllers & case study menus integration" },
      { phase: "Optimizations", detail: "Shader compilation checks & frame loop budgets testing" }
    ],
    metrics: {
      performance: 97,
      accessibility: 100,
      responsive: "100%",
      loadingSpeed: "0.6s",
      codeQuality: "A+"
    },
    videoWalkthrough: "#",
    caseStudyLink: "#"
  },
  {
    id: "eiet-college",
    title: "EIET College Website",
    subtitle: "Responsive educational institution directory and admissions portal.",
    description: "A fast, accessible college portal designed with HTML5, CSS3, and Vanilla JavaScript. Features organized department guides, responsive grids for timetables, and an admissions form with custom validation.",
    image: eietImg,
    techStack: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Digital student admissions form with client validation checks",
      "Dynamic infinite sliding carousels for faculties and recruiters",
      "Mobile-friendly class grids and academic schedule tables",
    ],
    github: "https://github.com/Krish480/College-website",
    liveDemo: "#",
    status: "Completed",
    themeColor: "#22c55e",
    accentColor: "#4ade80",
    category: "EdTech Web",
    year: "2024",
    // Premium Case Study Fields
    problem: "Traditional institutional websites suffer from confusing navigation layouts, slow loading speeds, and tables that are unreadable on mobile screens.",
    solution: "Developed a clean, static, zero-framework website with custom CSS queries, mobile timetable grids, and JavaScript-based validation.",
    architecture: ["HTML5 Templates", "Custom CSS Stylesheets", "Vanilla JS Controllers", "Static Media Directories", "Vercel CDN Node"],
    challenges: "Creating smooth, infinite loops for profile carousels and adjusting wide timetable grids to fit small mobile viewports.",
    results: "Delivered a lightweight, highly readable college portal running completely in the browser on zero maintenance costs.",
    futureImprovements: ["Cloud student portal database integration", "Staff Headless CMS content manager", "Online tuition fee billing gateway"],
    timeline: [
      { phase: "Structure", detail: "HTML page routing maps & content outline design" },
      { phase: "Styling", detail: "Responsive stylesheet layouts & table matrices build" },
      { phase: "Scripts", detail: "Form validations & requestAnimationFrame carousels setup" },
      { phase: "Deployment", detail: "Performance optimizations & Vercel hosting setup" }
    ],
    metrics: {
      performance: 98,
      accessibility: 96,
      responsive: "100%",
      loadingSpeed: "0.4s",
      codeQuality: "A"
    },
    videoWalkthrough: "#",
    caseStudyLink: "#"
  }
];
