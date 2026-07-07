import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { universeConfig } from "../config/universeConfig";

function DistantGalaxy({ position, color, size = 1.0, speed = 0.002 }) {
  const pointsRef = useRef();
  const count = 400;

  const [positions, colors] = useMemo(() => {
    const tempPositions = [];
    const tempColors = [];
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const arm = i % 2 === 0 ? 0 : Math.PI;
      const r = Math.random() * 3.5 * size + 0.15;
      const theta = r * 2.2 + arm + (Math.random() - 0.5) * 0.45;
      
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r * 0.5;
      const z = (Math.random() - 0.5) * 0.2;

      tempPositions.push(x, y, z);

      const mixRatio = r / (3.5 * size);
      const starColor = baseColor.clone().lerp(new THREE.Color("#ffffff"), Math.pow(1.0 - mixRatio, 1.5));
      tempColors.push(starColor.r, starColor.g, starColor.b);
    }

    return [new Float32Array(tempPositions), new Float32Array(tempColors)];
  }, [color, size]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += speed;
    }
  });

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function SpiralGalaxy() {
  return (
    <>
      {universeConfig.galaxies.map((galaxy) => (
        <DistantGalaxy
          key={galaxy.id}
          position={galaxy.position}
          color={galaxy.color}
          size={galaxy.size}
          speed={galaxy.speed}
        />
      ))}
    </>
  );
}
