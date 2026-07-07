import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GalaxyConfig } from "./GalaxyConfig";
import GalaxyCore from "./GalaxyCore";
import GalaxyArms from "./GalaxyArms";
import useUniverse from "../hooks/useUniverse";

export default function GalaxyGenerator() {
  const groupRef = useRef();
  const { quality, mouseRef } = useUniverse();

  const settings = useMemo(() => {
    if (quality === "low") return GalaxyConfig.mobile;
    if (quality === "medium") return GalaxyConfig.tablet;
    return GalaxyConfig.desktop;
  }, [quality]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Rotate the entire galaxy extremely slowly over time
      groupRef.current.rotation.y = time * GalaxyConfig.rotationSpeed;

      // Map dynamic mouse coordinate parallax offsets
      const mouse = mouseRef.current;
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        GalaxyConfig.position[0] + mouse.x * GalaxyConfig.parallaxFactor * 10,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        GalaxyConfig.position[1] + mouse.y * GalaxyConfig.parallaxFactor * 10,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={GalaxyConfig.position} rotation={[0.45, 0, 0.15]}>
      {/* Central bulge core: dense yellow-white stars blending to purple */}
      <GalaxyCore
        count={settings.coreParticles}
        radius={settings.radius * 0.18}
        coreColor="#FFF8E7"
        haloColor="#7C3AED"
      />

      {/* Spiral arms: cyan and blue stars extending to a purple halo */}
      <GalaxyArms
        count={settings.armParticles}
        radius={settings.radius}
        branches={settings.branches}
        spin={settings.spin}
        randomness={settings.randomness}
        power={settings.power}
        armColor="#22D3EE"
        haloColor="#6D28D9"
      />
    </group>
  );
}
