// 🪐 Cinematic Camera Journey Configs

export const JourneyConfig = {
  sections: {
    hero: {
      position: [0, 0, 9.0],
      lookAt: [0, 0, 0],
      fov: 60,
      nebulaBrightness: 0.9,
      galaxyVisibility: 0.35,
      starDensity: 1.0,
      atmosphereColor: "#010104",
      rotation: [0, 0, 0],
    },
    about: {
      position: [0, -6.0, 14.0],
      lookAt: [0, -6.0, 0],
      fov: 58,
      nebulaBrightness: 1.45, // Brighter nebula clouds
      galaxyVisibility: 0.5,
      starDensity: 1.0,
      atmosphereColor: "#040212",
      rotation: [0, 0.05, 0.02],
    },
    projects: {
      position: [0, -12.0, 22.0], // Zoom out to reveal spiral arms
      lookAt: [0, -12.0, 0],
      fov: 55,
      nebulaBrightness: 0.8,
      galaxyVisibility: 1.0, // Fully visible galaxy
      starDensity: 1.25,
      atmosphereColor: "#020817",
      rotation: [0, -0.05, -0.02],
    },
    experience: {
      position: [0, -18.0, 32.0], // Deep volumetric z-depth
      lookAt: [0, -18.0, 0],
      fov: 52,
      nebulaBrightness: 0.6,
      galaxyVisibility: 0.45,
      starDensity: 1.8, // Dense stars cluster
      atmosphereColor: "#010612",
      rotation: [0, 0.08, 0.04],
    },
    contact: {
      position: [0, -24.0, 38.0], // Distant horizon zoom
      lookAt: [0, -24.0, 0],
      fov: 50,
      nebulaBrightness: 0.45,
      galaxyVisibility: 0.28,
      starDensity: 1.1,
      atmosphereColor: "#020c24", // Deep blue atmosphere
      rotation: [0, 0, 0],
    },
  },
  // Animation smoothing settings
  lerpFactor: 0.04,
  reducedMotionLerp: 0.2, // Faster snap to target if reduced motion is enabled
};
