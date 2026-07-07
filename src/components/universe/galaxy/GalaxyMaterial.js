import * as THREE from "three";
import { galaxyNoiseGLSL } from "./GalaxyNoise";

export class GalaxyMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 }, // Added for Section Tracker fade transitions
        uCoreColor: { value: new THREE.Color("#FACC15") },
        uArmColor: { value: new THREE.Color("#38BDF8") },
        uHaloColor: { value: new THREE.Color("#6D28D9") },
      },
      vertexShader: `
        uniform float uTime;
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;
        varying float vDistance;

        void main() {
          vColor = customColor;
          
          float dist = length(position);
          vDistance = dist;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec3 vColor;
        varying float vDistance;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = smoothstep(0.5, 0.05, dist);
          float fade = smoothstep(20.0, 5.0, vDistance);

          gl_FragColor = vec4(vColor, alpha * fade * 0.85 * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }
}
