// 🌟 Star Coordinate & Attribute Generator for BufferGeometry

export function generateStars(count, xRange, yRange, zRange, sizeMin, sizeMax) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count); // Random phase offset for twinkling frequency

  for (let i = 0; i < count; i++) {
    // 3D Volume Distribution
    const x = (Math.random() - 0.5) * xRange;
    const y = (Math.random() - 0.5) * yRange;
    const z = Math.random() * (zRange[1] - zRange[0]) + zRange[0];

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Color distribution: most white (75%), some soft blue (20%), very few warm yellow (5%)
    const colorSeed = Math.random();
    let r = 1.0, g = 1.0, b = 1.0; // White default
    
    if (colorSeed > 0.95) {
      // Warm Yellow
      r = 1.0;
      g = 0.88;
      b = 0.55;
    } else if (colorSeed > 0.75) {
      // Soft Blue
      r = 0.68;
      g = 0.85;
      b = 1.0;
    }

    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;

    // Size & Twinkle phase initialization
    sizes[i] = Math.random() * (sizeMax - sizeMin) + sizeMin;
    phases[i] = Math.random() * Math.PI * 2;
  }

  return { positions, colors, sizes, phases };
}
