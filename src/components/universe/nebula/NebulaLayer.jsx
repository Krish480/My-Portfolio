import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { NebulaMaterial } from "./NebulaMaterial";
import useUniverse from "../hooks/useUniverse";
import { useSectionTracker } from "../camera/SectionTracker";
import { JourneyConfig } from "../camera/JourneyConfig";

// Register custom material with React Three Fiber
extend({ NebulaMaterial });

// Reuse single static plane geometry across all nebula layers to save memory
const planeGeometry = new THREE.PlaneGeometry(120, 120);

export default function NebulaLayer({ config }) {
  const meshRef = useRef();
  const { mouseRef, scrollRef, quality } = useUniverse();
  const sectionData = useSectionTracker();
  const currentOpacity = useRef(config.opacity);

  const c1 = useMemo(() => new THREE.Color(config.color1), [config.color1]);
  const c2 = useMemo(() => new THREE.Color(config.color2), [config.color2]);

  const octaves = useMemo(() => {
    if (quality === "low") return 2;
    if (quality === "medium") return 3;
    return 5;
  }, [quality]);

  const material = useMemo(() => {
    const mat = new NebulaMaterial();
    mat.uniforms.uColor1.value = c1;
    mat.uniforms.uColor2.value = c2;
    mat.uniforms.uScale.value = config.scale;
    mat.uniforms.uSpeed.value = config.speed;
    mat.uniforms.uOpacity.value = config.opacity;
    mat.uniforms.uOctaves.value = octaves;
    return mat;
  }, [c1, c2, config.scale, config.speed, config.opacity, octaves]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Section Awareness: Fade nebula in/out depending on active section target
    const currentKey = sectionData.current.activeKey;
    const progress = sectionData.current.sectionProgress;
    const idx = sectionData.current.activeIdx;

    const keys = ["hero", "about", "projects", "experience", "contact"];
    const currentConfig = JourneyConfig.sections[currentKey] || JourneyConfig.sections.hero;
    const nextKey = idx < keys.length - 1 ? keys[idx + 1] : currentKey;
    const nextConfig = JourneyConfig.sections[nextKey] || JourneyConfig.sections.hero;

    const targetBrightness = THREE.MathUtils.lerp(
      currentConfig.nebulaBrightness,
      nextConfig.nebulaBrightness,
      progress
    );

    currentOpacity.current = THREE.MathUtils.lerp(
      currentOpacity.current,
      config.opacity * targetBrightness,
      JourneyConfig.lerpFactor
    );
    
    material.uniforms.uTime.value = time;
    material.uniforms.uOpacity.value = currentOpacity.current;
    
    const mouse = mouseRef.current;
    material.uniforms.uMouse.value.x = mouse.x * config.parallaxFactor;
    material.uniforms.uMouse.value.y = mouse.y * config.parallaxFactor;

    material.uniforms.uScroll.value = 
      (scrollRef.current / window.innerHeight) * config.parallaxFactor;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, config.depth]} geometry={planeGeometry} material={material} />
  );
}
