import React, { useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BlackHoleConfig } from "./BlackHoleConfig";

// Pre-instantiated geometry to prevent rebuild overhead
const planeSize = BlackHoleConfig.diskOuterRadius * 2.1;
const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);

export default function GravitationalLens() {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
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
          vec2 center = vUv - vec2(0.5);
          float dist = length(center);

          // Radius mapping to actual Event Horizon boundary
          float horizon = 0.16;

          if (dist < horizon) {
            discard; // Handled by 3D EventHorizon sphere
          }

          // Einstein ring refraction lens distortion curve
          float warp = 1.0 / (dist * 6.5);
          warp = pow(warp, 2.5) * 0.08;

          // Gravitational shadow: light absorption void
          float shadow = smoothstep(horizon, horizon + 0.16, dist);

          // Dark cosmic gravity void tint
          vec3 shadowColor = vec3(0.02, 0.01, 0.05);

          gl_FragColor = vec4(shadowColor, (1.0 - shadow) * 0.45);
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
    <mesh geometry={planeGeometry} material={material} />
  );
}
