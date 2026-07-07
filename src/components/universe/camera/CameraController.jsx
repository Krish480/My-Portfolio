import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollState } from "./ScrollStateManager";
import { useSectionTracker } from "./SectionTracker";
import { JourneyConfig } from "./JourneyConfig";
import useUniverse from "../hooks/useUniverse";

export default function CameraController() {
  const scrollData = useScrollState();
  const sectionData = useSectionTracker();
  const { mouseRef } = useUniverse();
  const [reducedMotion, setReducedMotion] = useState(false);

  // Pre-instantiated Vector3 references to avoid garbage collection overhead in useFrame
  const v1 = useRef(new THREE.Vector3());
  const v2 = useRef(new THREE.Vector3());
  const v3 = useRef(new THREE.Vector3());
  const v4 = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());
  const targetDir = useRef(new THREE.Vector3());
  const finalLookPoint = useRef(new THREE.Vector3());

  useEffect(() => {
    // Accessibility: check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useFrame((state) => {
    const { camera } = state;

    if (reducedMotion) {
      // Locked default position if reduced motion is requested
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);
      camera.fov = 60;
      camera.updateProjectionMatrix();
      return;
    }

    const keys = ["hero", "about", "projects", "experience", "contact"];
    const currentKey = sectionData.current.activeKey;
    const progress = sectionData.current.sectionProgress;
    const idx = sectionData.current.activeIdx;

    const currentConfig = JourneyConfig.sections[currentKey] || JourneyConfig.sections.hero;
    const nextKey = idx < keys.length - 1 ? keys[idx + 1] : currentKey;
    const nextConfig = JourneyConfig.sections[nextKey] || JourneyConfig.sections.hero;

    // 1. Calculate Target Position & FOV via linear interpolation without allocating new vectors
    v1.current.fromArray(currentConfig.position);
    v2.current.fromArray(nextConfig.position);
    const targetPos = v1.current.lerp(v2.current, progress);

    v3.current.fromArray(currentConfig.lookAt);
    v4.current.fromArray(nextConfig.lookAt);
    const targetLookAt = v3.current.lerp(v4.current, progress);

    const targetFov = THREE.MathUtils.lerp(currentConfig.fov, nextConfig.fov, progress);

    // 2. Interpolate Camera position & FOV smoothly
    const lerpVal = JourneyConfig.lerpFactor;
    camera.position.lerp(targetPos, lerpVal);
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, lerpVal);
    camera.updateProjectionMatrix();

    // 3. Smooth Look-At transitions to prevent camera snap shaking (zero-allocation)
    camera.getWorldDirection(lookTarget.current);
    
    targetDir.current.copy(targetLookAt).sub(camera.position).normalize();
    lookTarget.current.lerp(targetDir.current, lerpVal);
    
    finalLookPoint.current.copy(camera.position).add(lookTarget.current);
    camera.lookAt(finalLookPoint.current);

    // 4. Subtle mouse parallax displacement
    const mouse = mouseRef.current;
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    camera.position.x += mouse.x * 0.015;
    camera.position.y += mouse.y * 0.015;
  });

  return null;
}
