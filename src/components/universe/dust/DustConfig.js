// 🪐 Cosmic Dust Configurations

export const DustConfig = {
  layers: [
    {
      id: "dust-tiny",
      count: { desktop: 800, tablet: 400, mobile: 200 },
      size: 0.14,
      opacity: 0.3,
      color: "#FFFFFF",
      zRange: [-30, -10],
      driftSpeed: 0.04,
    },
    {
      id: "dust-blue",
      count: { desktop: 500, tablet: 250, mobile: 100 },
      size: 0.28,
      opacity: 0.22,
      color: "#38BDF8", // Soft Blue
      zRange: [-15, -2],
      driftSpeed: 0.07,
    },
    {
      id: "dust-near",
      count: { desktop: 70, tablet: 25, mobile: 8 },
      size: 0.48,
      opacity: 0.38,
      color: "#22D3EE", // Cyan Glow
      zRange: [-5, 5], // Floating very close to screen
      driftSpeed: 0.12,
    }
  ],
  parallaxFactor: 0.06,
};
