import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { DustMaterial } from "./DustMaterial";
import useUniverse from "../hooks/useUniverse";

// Register custom shader material
extend({ DustMaterial });

export default function DustLayer({ config, count }) {
  const pointsRef = useRef();
  const { mouseRef } = useUniverse();

  const c = useMemo(() => new THREE.Color(config.color), [config.color]);

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const driftDirs = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Coordinate bounding boxes
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = Math.random() * (config.zRange[1] - config.zRange[0]) + config.zRange[0];

      // Random drift angle and velocity scale
      const angle = Math.random() * Math.PI * 2;
      const speed = config.driftSpeed;
      driftDirs[i * 3] = Math.cos(angle) * speed;
      driftDirs[i * 3 + 1] = Math.sin(angle) * speed;
      driftDirs[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.4;

      sizes[i] = Math.random() * config.size + config.size * 0.5;
    }

    return { positions, driftDirs, sizes };
  }, [count, config]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("driftDir", new THREE.BufferAttribute(data.driftDirs, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(data.sizes, 1));
    return geo;
  }, [data]);

  const material = useMemo(() => {
    const mat = new DustMaterial();
    mat.uniforms.uColor.value = c;
    mat.uniforms.uOpacity.value = config.opacity;
    return mat;
  }, [c, config.opacity]);

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
    material.uniforms.uTime.value = time;

    // Apply mouse parallax to points
    if (pointsRef.current) {
      const mouse = mouseRef.current;
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        mouse.x * 0.6,
        0.05
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        mouse.y * 0.6,
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
