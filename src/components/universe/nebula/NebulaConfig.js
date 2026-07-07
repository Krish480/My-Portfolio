// 🪐 Nebula Configuration Settings

export const NebulaConfig = {
  layers: [
    {
      id: "deep-fog",
      scale: 1.2,
      speed: 0.04,
      opacity: 0.12,
      color1: "#050816", // Deep Space Base
      color2: "#6D28D9", // Purple Nebula
      depth: -38,
      parallaxFactor: 0.08,
    },
    {
      id: "medium-clouds",
      scale: 2.2,
      speed: 0.07,
      opacity: 0.07,
      color1: "#7C3AED", // Vivid Purple
      color2: "#2563EB", // Blue Nebula
      depth: -26,
      parallaxFactor: 0.22,
    },
    {
      id: "foreground-glow",
      scale: 3.5,
      speed: 0.12,
      opacity: 0.03, // Very low opacity to keep text perfectly legible
      color1: "#38BDF8", // Blue Accent
      color2: "#22D3EE", // Cyan Glow
      depth: -14,
      parallaxFactor: 0.42,
    }
  ]
};
