import * as THREE from "three";

export class DustMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#FFFFFF") },
        uOpacity: { value: 1.0 },
      },
      vertexShader: `
        uniform float uTime;
        attribute float size;
        attribute vec3 driftDir;

        void main() {
          // Drifting offset calculation based on speed vector and elapsed time
          vec3 offset = driftDir * uTime * 0.25;
          
          // Create slow organic wave oscillation so the drift is never linear or repetitive
          offset.x += sin(uTime * 0.15 + driftDir.y * 50.0) * 0.25;
          offset.y += cos(uTime * 0.12 + driftDir.z * 50.0) * 0.25;

          // Black Hole coordinates: [-3.6, 2.8, -22]
          vec3 blackHolePos = vec3(-3.6, 2.8, -22.0);
          vec3 finalPos = position + offset;

          // Gravitational pull calculation toward the black hole center
          vec3 pullDir = blackHolePos - finalPos;
          float dist = length(pullDir);

          // Subtle pull: increases closer to event horizon, decays with distance squared
          if (dist > 2.2 && dist < 30.0) {
            float force = (1.5 / (dist * dist)) * 6.5; 
            finalPos += normalize(pullDir) * force;
          }

          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          
          // Scale size relative to camera depth
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;

        void main() {
          // Soft circular shape filter
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.15, dist);
          gl_FragColor = vec4(uColor, alpha * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }
}
