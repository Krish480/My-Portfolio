// 🪐 Galaxy Generator Configurations

export const GalaxyConfig = {
  desktop: {
    armParticles: 14000,
    coreParticles: 6000,
    radius: 13,
    branches: 3,
    spin: 1.6,
    randomness: 0.45,
    power: 4.0,
  },
  tablet: {
    armParticles: 8000,
    coreParticles: 3500,
    radius: 11,
    branches: 3,
    spin: 1.6,
    randomness: 0.5,
    power: 4.0,
  },
  mobile: {
    armParticles: 3500,
    coreParticles: 1500,
    radius: 9,
    branches: 2,
    spin: 1.4,
    randomness: 0.55,
    power: 4.0,
  },
  // Position it in deep space offset to the right, to reveal it slowly when scrolling
  position: [4.8, -13.5, -32], 
  rotationSpeed: 0.0004,
  parallaxFactor: 0.04,
};
