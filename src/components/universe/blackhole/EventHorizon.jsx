import React from "react";
import * as THREE from "three";
import { BlackHoleConfig } from "./BlackHoleConfig";

// Pre-instantiated geometry and material to prevent garbage collection and GPU recalculations
const sphereGeometry = new THREE.SphereGeometry(BlackHoleConfig.radius, 32, 32);
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, depthWrite: true });

export default function EventHorizon() {
  return (
    <mesh geometry={sphereGeometry} material={blackMaterial} />
  );
}
