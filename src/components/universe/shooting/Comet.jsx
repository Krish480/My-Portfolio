import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Comet({ trajectory, onComplete }) {
  const lineRef = useRef();
  const progressRef = useRef(0);

  const data = useMemo(() => {
    // 2 points: [head_x, head_y, head_z, tail_x, tail_y, tail_z]
    const positions = new Float32Array([
      trajectory.startX, trajectory.startY, trajectory.startZ,
      trajectory.startX, trajectory.startY, trajectory.startZ
    ]);

    // Head is bright white, tail is deep celestial blue/indigo
    const colors = new Float32Array([
      1.0, 1.0, 1.0,  // Head
      0.22, 0.55, 1.0 // Tail
    ]);

    return { positions, colors };
  }, [trajectory]);

  useFrame((state, delta) => {
    // Disable in low-performance mobile devices (avoid updates)
    progressRef.current += delta / trajectory.duration;
    
    if (progressRef.current >= 1.0) {
      onComplete();
      return;
    }

    const t = progressRef.current;
    
    // Trajectory interpolation
    const headX = trajectory.startX + trajectory.dirX * t;
    const headY = trajectory.startY + trajectory.dirY * t;
    const headZ = trajectory.startZ + trajectory.dirZ * t;

    // Tail follows trailing coordinate offset
    const tailScale = 0.08; // Length factor of the tail
    const tailX = headX - trajectory.dirX * tailScale;
    const tailY = headY - trajectory.dirY * tailScale;
    const tailZ = headZ - trajectory.dirZ * tailScale;

    if (lineRef.current) {
      const positionsAttr = lineRef.current.geometry.attributes.position;
      positionsAttr.array[0] = headX;
      positionsAttr.array[1] = headY;
      positionsAttr.array[2] = headZ;
      positionsAttr.array[3] = tailX;
      positionsAttr.array[4] = tailY;
      positionsAttr.array[5] = tailZ;
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={0.8}
      />
    </line>
  );
}
