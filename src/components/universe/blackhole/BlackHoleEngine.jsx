import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BlackHoleConfig } from "./BlackHoleConfig";
import EventHorizon from "./EventHorizon";
import AccretionDisk from "./AccretionDisk";
import PhotonRing from "./PhotonRing";
import GravitationalLens from "./GravitationalLens";
import useUniverse from "../hooks/useUniverse";

export default function BlackHoleEngine() {
  const groupRef = useRef();
  const { mouseRef } = useUniverse();

  useFrame((state) => {
    if (groupRef.current) {
      // Map dynamic mouse coordinate parallax offsets
      const mouse = mouseRef.current;
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        BlackHoleConfig.position[0] + mouse.x * BlackHoleConfig.parallaxFactor * 10,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        BlackHoleConfig.position[1] + mouse.y * BlackHoleConfig.parallaxFactor * 10,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={BlackHoleConfig.position} rotation={[0.45, 0.35, 0.12]}>
      {/* 1. Gravitational lensing back shadow */}
      <GravitationalLens />

      {/* 2. Superheated rotating accretion disk */}
      <AccretionDisk />

      {/* 3. High intensity photon ring */}
      <PhotonRing />

      {/* 4. Non-reflective Event Horizon center */}
      <EventHorizon />
    </group>
  );
}
