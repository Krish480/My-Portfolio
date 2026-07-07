import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateStars } from "./StarGenerator";

const NearStarShader = {
  vertexShader: `
    uniform float uTime;
    attribute float size;
    attribute float phase;
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      vColor = color;
      // Soft, very slow natural twinkling for foreground stars
      float twinkle = 0.5 + 0.5 * sin(uTime * 0.9 + phase);
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
      
      // Make foreground stars appear extra soft and glowy
      float alpha = smoothstep(0.5, 0.05, dist);
      gl_FragColor = vec4(vColor, alpha * vTwinkle * 0.95);
    }
  `
};

export default function NearStars({ count }) {
  const pointsRef = useRef();

  const data = useMemo(() => {
    // Bounds for Near stars: foreground depth (z from -15 to 5)
    return generateStars(count, 90, 210, [-15, 5], 1.25, 2.15);
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
      vertexShader: NearStarShader.vertexShader,
      fragmentShader: NearStarShader.fragmentShader,
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
      pointsRef.current.rotation.y = time * 0.0015;
      pointsRef.current.rotation.x = time * 0.0008;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
