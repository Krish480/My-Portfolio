# 🌌 Krishna Pandey Portfolio — Immersive 3D Space Universe

An interactive 3D WebGL developer experience built with **React**, **Three.js (React Three Fiber)**, **GSAP**, and **Tailwind CSS**, designed to showcase full-stack projects through immersive visual storytelling.

---

## 🚀 Live System Core
👉 **[Launch Interactive Portfolio](https://krishpandeyportfolio.netlify.app)**

---

## 🎨 Design Philosophy
* **Continuous Universe**: The entire portfolio exists within a single persistent space galaxy. Scrolling does not trigger page loads; instead, it coordinates a 3D camera journey through cosmic checkpoints.
* **Futuristic Glassmorphism**: Translucent floating consoles, glowing neon active indicators, and sleek data grids create a sci-fi cockpit aesthetic.
* **Tactile Interactions**: Dynamic mouse parallax, magnetic attraction states on interactive nodes, and elastic scroll physics make the environment feel responsive.

---

## ⚙️ Core Technical Subsystems

### 1. 🌀 Persistent WebGL Scene (Universe Engine)
* **Gargantua Black Hole**: Custom math-based fragment shaders rendering a rotating accretion disk and gravitational lensing photon ring.
* **Nebula & Dust Clouds**: Math-based noise algorithms that paint multi-layered cosmic dust configurations across space coordinate fields.
* **Interactive Starfield**: Renders 5,000+ individual star coordinates in GPU buffers via custom `BufferGeometry` to ensure steady 60 FPS performance.

### 2. 📹 Scroll-Linked Camera Rigging
* Integrated with **Lenis Scroll** and **GSAP ScrollTrigger** to map browser viewport scroll percentages directly to 3D vector coordinates (`X, Y, Z`) and camera rotation offsets.
* Adapts dynamically to viewport widths, shifting coordinate targets for mobile to keep text legible and visual components centered.

### 3. 🎛️ Command Center 3D (Interactive Projects)
* Projects are distributed dynamically in a circular 3D orbital array around a central energy core.
* Toggling a project initiates a GSAP timeline that focuses the camera on the target node, powering up the holographic console to show detailed case studies.

---

## 🛠️ Stack Configuration

| Layer | Technologies |
|---|---|
| **Core Client** | React 18, Vite 5, ES6 JavaScript |
| **3D Graphics** | Three.js, React Three Fiber (R3F), React Drei |
| **Motion & Scroll** | GSAP 3, Framer Motion 12, Lenis Scroll |
| **Styling** | Tailwind CSS v4 Engine, Custom CSS Variables |
| **Performance** | WebGL shader pre-warming, Material Disposal hooks |

---

## 📂 Architecture Layout

```yaml
My Portfolio/
│
├── public/                # Static assets, web manifests, and crawler configurations
├── src/
│   ├── components/
│   │   ├── Projects/      # Case Study JSON databases & 3D CommandCenter grids
│   │   ├── universe/      # Galaxies, Starfields, Nebulas, and Accretion Disk meshes
│   │   └── ui/            # GlassPanel wrappers, Loaders, and customized buttons
│   ├── sections/          # Page sections (Hero, About, Experience, Contact)
│   ├── styles/            # Design tokens and tailwind variable utilities
│   ├── App.jsx            # Main app assembly and universe canvas context
│   └── main.jsx           # App mounting point
```

---

## 💎 Project Case Studies Catalog
Each project in the Command Center is backed by a structured JSON dataset describing its challenges and metrics:
* **Rudra AI Virtual Assistant**: Low-latency voice companion featuring persistent SQL databases and ElevenLabs speech synthesis.
* **MealMatrix**: SaaS-style catering reservation dashboard with Firebase Authentication and Express backend.
* **MindArena**: Gamified EdTech platform running local-storage achievement checking scripts.
* **ShopMatrix**: Multi-role mall directory and merchant panel displaying sales analytics using Chart.js.
* **EIET College Website**: Responsive educational portal utilizing custom requestAnimationFrame slider loops.

---

## ⚡ Performance Optimizations
* **GPU Calculation Delegation**: Particle movement animations are handled directly on the GPU using vertex shaders to avoid CPU bottlenecks.
* **Resolution Adaptation**: Adjusts canvas device pixel ratios on high-density displays (such as Retina displays) to maintain stable frame rates.
* **Garbage Collection Hooks**: Automatically disposes of unused WebGL geometries and shader materials when components unmount to prevent memory leaks.

---

## 👨‍💻 Local Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Krish480/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build production bundle**:
   ```bash
   npm run build
   ```
