// 🌠 Shooting Star Trajectory and Pooling Helper

export function getRandomTrajectory() {
  // Start location in screen-space coordinate limits (upper hemisphere)
  const startX = (Math.random() - 0.5) * 50;
  const startY = Math.random() * 25 + 15;
  const startZ = Math.random() * -25 - 15; // Placed at mid-depth

  // Diagonally downward trajectory angle with random variations
  const angle = Math.PI * 1.25 + (Math.random() - 0.5) * 0.45;
  const velocity = Math.random() * 32 + 20; // High speed

  const dirX = Math.cos(angle) * velocity;
  const dirY = Math.sin(angle) * velocity;
  const dirZ = (Math.random() - 0.5) * 4;

  return {
    startX,
    startY,
    startZ,
    dirX,
    dirY,
    dirZ,
    duration: Math.random() * 0.7 + 0.5, // Total flight time in seconds
  };
}
