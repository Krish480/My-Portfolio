import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { GalaxyMaterial } from "./GalaxyMaterial";
import { useSectionTracker } from "../camera/SectionTracker";
import { JourneyConfig } from "../camera/JourneyConfig";

extend({ GalaxyMaterial });

export default function GalaxyArms({
  count,
  radius,
  branches,
  spin,
  randomness,
  power,
  armColor,
  haloColor,
}) {
  const pointsRef = useRef();
  const sectionData = useSectionTracker();
  const currentOpacity = useRef(1.0);

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorArm = new THREE.Color(armColor);
    const colorHalo = new THREE.Color(haloColor);

    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX = Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.3;
      const randomZ = Math.pow(Math.random(), power) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      const x = Math.cos(branchAngle + spinAngle) * r + randomX;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * r + randomZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixRatio = r / radius;
      // Direct numeric color interpolation without creating Color instances per star
      let rVal = colorArm.r + (colorHalo.r - colorArm.r) * mixRatio;
      let gVal = colorArm.g + (colorHalo.g - colorArm.g) * mixRatio;
      let bVal = colorArm.b + (colorHalo.b - colorArm.b) * mixRatio;

      if (Math.random() > 0.88) {
        rVal += 0.18;
        gVal += 0.18;
        bVal += 0.18;
      }

      colors[i * 3] = rVal;
      colors[i * 3 + 1] = gVal;
      colors[i * 3 + 2] = bVal;

      sizes[i] = Math.random() * 0.8 + 0.15;
    }

    return { positions, colors, sizes };
  }, [count, radius, branches, spin, randomness, power, armColor, haloColor]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("customColor", new THREE.BufferAttribute(data.colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(data.sizes, 1));
    return geo;
  }, [data]);

  const cCore = useMemo(() => new THREE.Color(armColor), [armColor]);
  const cArm = useMemo(() => new THREE.Color(armColor), [armColor]);
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

    // Section Awareness: Fade spiral arms in/out depending on active section target
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
