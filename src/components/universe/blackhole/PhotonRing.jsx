import React, { useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BlackHoleConfig } from "./BlackHoleConfig";

// Pre-instantiated geometry to prevent recreate overhead
const ringGeometry = new THREE.RingGeometry(BlackHoleConfig.radius * 1.01, BlackHoleConfig.radius * 1.15, 64);

export default function PhotonRing() {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          // Gradient mapping across the ring width
          float gradient = sin(vUv.y * 3.14159);
          float intensity = pow(gradient, 4.0); // Sharpen the photon ring flare

          // Colors: hot white center fading to gold-orange edges
          vec3 coreColor = vec3(1.0, 0.96, 0.88);
          vec3 boundaryColor = vec3(1.0, 0.45, 0.08);

          vec3 finalColor = mix(boundaryColor, coreColor, intensity);

          // Subtle high-frequency hot spot shimmering
          float shimm = 0.88 + 0.12 * sin(uTime * 8.0);

          gl_FragColor = vec4(finalColor, intensity * shimm * 0.95);
        }
      `
    });
  }, [uniforms]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh rotation={[0, 0.25, 0.05]} geometry={ringGeometry} material={material} />
  );
}
