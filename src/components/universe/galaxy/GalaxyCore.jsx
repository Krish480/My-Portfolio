import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { GalaxyMaterial } from "./GalaxyMaterial";
import { useSectionTracker } from "../camera/SectionTracker";
import { JourneyConfig } from "../camera/JourneyConfig";

extend({ GalaxyMaterial });

export default function GalaxyCore({ count, radius, coreColor, haloColor }) {
  const pointsRef = useRef();
  const sectionData = useSectionTracker();
  const currentOpacity = useRef(1.0);

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorCore = new THREE.Color(coreColor);
    const colorHalo = new THREE.Color(haloColor);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const dist = Math.pow(u, 2.5) * radius;
      
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = dist * Math.sin(phi) * Math.cos(theta);
      const y = dist * Math.sin(phi) * Math.sin(theta) * 0.45;
      const z = dist * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixRatio = dist / radius;
      // Direct numeric interpolation to prevent creating thousands of Color clones
      colors[i * 3] = colorCore.r + (colorHalo.r - colorCore.r) * mixRatio;
      colors[i * 3 + 1] = colorCore.g + (colorHalo.g - colorCore.g) * mixRatio;
      colors[i * 3 + 2] = colorCore.b + (colorHalo.b - colorCore.b) * mixRatio;

      sizes[i] = (1.0 - mixRatio) * 1.5 + 0.35;
    }

    return { positions, colors, sizes };
  }, [count, radius, coreColor, haloColor]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("customColor", new THREE.BufferAttribute(data.colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(data.sizes, 1));
    return geo;
  }, [data]);

  const cCore = useMemo(() => new THREE.Color(coreColor), [coreColor]);
  const cArm = useMemo(() => new THREE.Color("#38BDF8"), []);
  const cHalo = useMemo(() => new THREE.Color(haloColor), [haloColor]);

  const material = useMemo(() => {
    const mat = new GalaxyMaterial();
    mat.uniforms.uCoreColor.value = cCore;
    mat.uniforms.uArmColor.value = cArm;
    mat.uniforms.uHaloColor.value = cHalo;
    return mat;
  }, [cCore, cArm, cHalo]);

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

    // Section Awareness: Fade core in/out depending on active section target
    const currentKey = sectionData.current.activeKey;
    const progress = sectionData.current.sectionProgress;
    const idx = sectionData.current.activeIdx;

    const keys = ["hero", "about", "projects", "experience", "contact"];
    const currentConfig = JourneyConfig.sections[currentKey] || JourneyConfig.sections.hero;
    const nextKey = idx < keys.length - 1 ? keys[idx + 1] : currentKey;
    const nextConfig = JourneyConfig.sections[nextKey] || JourneyConfig.sections.hero;

    const targetVisibility = THREE.MathUtils.lerp(
      currentConfig.galaxyVisibility,
      nextConfig.galaxyVisibility,
      progress
    );

    currentOpacity.current = THREE.MathUtils.lerp(
      currentOpacity.current,
      targetVisibility,
      JourneyConfig.lerpFactor
    );

    material.uniforms.uTime.value = time;
    material.uniforms.uOpacity.value = currentOpacity.current;
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
