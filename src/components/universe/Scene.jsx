import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CameraController from "./camera/CameraController";
import StarField from "./stars/StarField";
import NebulaEngine from "./nebula/NebulaEngine";
import GalaxyGenerator from "./galaxy/GalaxyGenerator";
import CosmicDust from "./dust/CosmicDust";
import ShootingStars from "./shooting/ShootingStars";
import BlackHoleEngine from "./blackhole/BlackHoleEngine";
import { useSectionTracker } from "./camera/SectionTracker";
import { JourneyConfig } from "./camera/JourneyConfig";

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </>
  );
}

export default function Scene() {
  const sectionData = useSectionTracker();
  const bgColor = useRef(new THREE.Color("#010104"));
  const c1 = useRef(new THREE.Color());
  const c2 = useRef(new THREE.Color());

  useFrame((state) => {
    const { scene } = state;
    
    // Universe Awareness: Interpolate global atmosphere color
    const currentKey = sectionData.current.activeKey;
    const progress = sectionData.current.sectionProgress;
    const idx = sectionData.current.activeIdx;

    const keys = ["hero", "about", "projects", "experience", "contact"];
    const currentConfig = JourneyConfig.sections[currentKey] || JourneyConfig.sections.hero;
    const nextKey = idx < keys.length - 1 ? keys[idx + 1] : currentKey;
    const nextConfig = JourneyConfig.sections[nextKey] || JourneyConfig.sections.hero;

    c1.current.set(currentConfig.atmosphereColor);
    c2.current.set(nextConfig.atmosphereColor);
    const targetBg = c1.current.lerp(c2.current, progress);

    bgColor.current.lerp(targetBg, JourneyConfig.lerpFactor);
    scene.background = bgColor.current;
  });

  return (
    <>
      {/* 📹 Cinematic Camera Journey Controller */}
      <CameraController />

      {/* 💡 Lighting Layer */}
      <Lighting />

      {/* 🌟 Star System (Far, Mid, Near layers) */}
      <StarField />

      {/* 🌌 Volumetric Nebula Engine */}
      <NebulaEngine />

      {/* 🌀 Spiral Galaxy Generator */}
      <GalaxyGenerator />

      {/* ☄️ Cosmic Dust Layer with gravitational curvature */}
      <CosmicDust />

      {/* 🌠 Shooting Stars Spawner */}
      <ShootingStars />

      {/* 🕳️ Black Hole Engine (Event Horizon + Accretion Disk + Lensing) */}
      <BlackHoleEngine />
    </>
  );
}
