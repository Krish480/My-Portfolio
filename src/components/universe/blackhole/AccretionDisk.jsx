import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BlackHoleConfig } from "./BlackHoleConfig";
import useUniverse from "../hooks/useUniverse";

export default function AccretionDisk() {
  const pointsRef = useRef();
  const { quality } = useUniverse();

  const settings = useMemo(() => {
    if (quality === "low") return BlackHoleConfig.mobile;
    if (quality === "medium") return BlackHoleConfig.tablet;
    return BlackHoleConfig.desktop;
  }, [quality]);

  const data = useMemo(() => {
    const count = settings.diskParticles;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    const inner = BlackHoleConfig.diskInnerRadius;
    const outer = BlackHoleConfig.diskOuterRadius;

    // Color gradient mapping: white-hot orange to deep celestial indigo
    const colorInner = new THREE.Color("#FFA62F"); 
    const colorOuter = new THREE.Color("#3E065F");

    for (let i = 0; i < count; i++) {
      // Density concentrates near the event horizon inner boundary
      const u = Math.random();
      const dist = inner + Math.pow(u, 2.2) * (outer - inner);
      
      const angle = Math.random() * Math.PI * 2;
      
      // Flattened accretion geometry (Y coordinate squashed)
      const x = Math.cos(angle) * dist;
      const y = (Math.random() - 0.5) * 0.12 * (dist - inner);
      const z = Math.sin(angle) * dist;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixRatio = (dist - inner) / (outer - inner);
      // Fast numeric color interpolation to eliminate object allocations
      let rVal = colorInner.r + (colorOuter.r - colorInner.r) * mixRatio;
      let gVal = colorInner.g + (colorOuter.g - colorInner.g) * mixRatio;
      let bVal = colorInner.b + (colorOuter.b - colorInner.b) * mixRatio;
      
      // Inject extra intensity near inner radius
      if (mixRatio < 0.25) {
        const factor = (0.25 - mixRatio) * 0.75;
        rVal += factor;
        gVal += factor;
        bVal += factor;
      }

      colors[i * 3] = rVal;
      colors[i * 3 + 1] = gVal;
      colors[i * 3 + 2] = bVal;

      sizes[i] = Math.random() * 0.9 + 0.25;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, phases };
  }, [settings]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(data.sizes, 1));
    geo.setAttribute("phase", new THREE.BufferAttribute(data.phases, 1));
    return geo;
  }, [data]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: uniforms,
      vertexShader: `
        uniform float uTime;
        attribute float size;
        attribute float phase;
        varying vec3 vColor;
        varying float vShimmer;

        void main() {
          vColor = color;
          // Plasma thermal shimmer frequency
          float shimmer = 0.55 + 0.45 * sin(uTime * 3.5 + phase);
          vShimmer = shimmer;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * shimmer * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vShimmer;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, dist);
          gl_FragColor = vec4(vColor, alpha * vShimmer * 0.9);
        }
      `
    });
  }, [uniforms]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    uniforms.uTime.value = time;
    if (pointsRef.current) {
      // Accretion disk rotates slowly
      pointsRef.current.rotation.y = time * BlackHoleConfig.rotationSpeed;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
