import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateStars } from "./StarGenerator";

// Custom GPU Shaders for Soft Circular Twinkling Stars
const StarShader = {
  vertexShader: `
    uniform float uTime;
    attribute float size;
    attribute float phase;
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      vColor = color;
      // Twinkle: slow independent sine wave
      float twinkle = 0.35 + 0.65 * sin(uTime * 1.2 + phase);
      vTwinkle = twinkle;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      // Create a smooth round circle instead of square pixel blocks
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      float alpha = smoothstep(0.5, 0.15, dist);
      gl_FragColor = vec4(vColor, alpha * vTwinkle * 0.85);
    }
  `
};

export default function FarStars({ count }) {
  const pointsRef = useRef();

  const data = useMemo(() => {
    // Bounds for Far stars: deep background (z from -45 to -30)
    return generateStars(count, 120, 240, [-45, -30], 0.4, 0.95);
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(data.sizes, 1));
    geo.setAttribute("phase", new THREE.BufferAttribute(data.phases, 1));
    return geo;
  }, [data]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: StarShader.vertexShader,
      fragmentShader: StarShader.fragmentShader,
      uniforms: uniforms,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
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
      pointsRef.current.rotation.y = time * 0.0006;
      pointsRef.current.rotation.x = time * 0.0003;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
