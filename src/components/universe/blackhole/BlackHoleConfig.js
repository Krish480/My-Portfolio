// 🪐 Black Hole Engine Configurations

export const BlackHoleConfig = {
  desktop: {
    diskParticles: 7500,
    diskSegments: 96,
  },
  tablet: {
    diskParticles: 3500,
    diskSegments: 64,
  },
  mobile: {
    diskParticles: 1200,
    diskSegments: 32,
  },
  // Positioned top-left behind the Hero content to serve as the beginning focal point
  position: [-3.6, 2.8, -22],
  radius: 2.4, // Event Horizon Schwarzschild radius
  diskInnerRadius: 3.2,
  diskOuterRadius: 7.5,
  rotationSpeed: 0.08, // Slow orbital rotation
  parallaxFactor: 0.03,
};
