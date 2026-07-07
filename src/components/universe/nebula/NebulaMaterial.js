import * as THREE from "three";
import { noiseGLSL } from "./NebulaNoise";

export class NebulaMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#050816") },
        uColor2: { value: new THREE.Color("#6D28D9") },
        uScale: { value: 2.0 },
        uSpeed: { value: 0.1 },
        uOpacity: { value: 0.1 },
        uScroll: { value: 0 },
        uOctaves: { value: 4 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uScale;
        uniform float uSpeed;
        uniform float uOpacity;
        uniform float uScroll;
        uniform int uOctaves;
        uniform vec2 uMouse;
        varying vec2 vUv;

        ${noiseGLSL}

        void main() {
          // Coordinate system includes scale factor + scrolling + mouse drift offset
          vec3 coord = vec3(
            vUv.x * uScale + uMouse.x * 0.08,
            vUv.y * uScale + uScroll * 0.08 + uMouse.y * 0.08,
            uTime * uSpeed
          );

          // Sample FBM noise
          float n = fbm(coord, uOctaves);
          float intensity = clamp(n * 0.5 + 0.5, 0.0, 1.0);

          // Mix colors based on noise density
          vec3 finalColor = mix(uColor1, uColor2, intensity);

          // Soft edge blending vignette to avoid mesh borders showing
          float blend = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x) *
                        smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);

          gl_FragColor = vec4(finalColor, uOpacity * intensity * blend);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }
}
