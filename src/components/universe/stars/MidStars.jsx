import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateStars } from "./StarGenerator";

const MidStarShader = {
  vertexShader: `
    uniform float uTime;
    attribute float size;
    attribute float phase;
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      vColor = color;
      // Slightly faster twinkling for mid stars
      float twinkle = 0.4 + 0.6 * sin(uTime * 1.8 + phase);
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
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      float alpha = smoothstep(0.5, 0.15, dist);
      gl_FragColor = vec4(vColor, alpha * vTwinkle * 0.9);
    }
  `
};

export default function MidStars({ count }) {
  const pointsRef = useRef();

  const data = useMemo(() => {
    // Bounds for Mid stars: mid depth (z from -30 to -15)
    return generateStars(count, 110, 230, [-30, -15], 0.75, 1.35);
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
      vertexShader: MidStarShader.vertexShader,
      fragmentShader: MidStarShader.fragmentShader,
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
      pointsRef.current.rotation.y = time * -0.0012; // Rotate in opposite direction
      pointsRef.current.rotation.x = time * 0.0006;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
