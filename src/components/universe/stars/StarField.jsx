import React from "react";
import useUniverse from "../hooks/useUniverse";
import { universeConfig } from "../config/universeConfig";
import FarStars from "./FarStars";
import MidStars from "./MidStars";
import NearStars from "./NearStars";

export default function StarField() {
  const { quality } = useUniverse();

  // Get total count from configuration based on device quality tier
  let totalCount = universeConfig.particleCount.stars.desktop;
  if (quality === "low") {
    totalCount = universeConfig.particleCount.stars.mobile;
  } else if (quality === "medium") {
    totalCount = 8000; // Tablet specific configuration
  }

  // Distribute star budget: 50% Far, 35% Mid, 15% Near
  const farCount = Math.floor(totalCount * 0.50);
  const midCount = Math.floor(totalCount * 0.35);
  const nearCount = Math.floor(totalCount * 0.15);

  return (
    <>
      {/* Layer 1: Far Stars (Tiny, slow, dense) */}
      <FarStars count={farCount} />

      {/* Layer 2: Mid Stars (Medium size, medium speed) */}
      <MidStars count={midCount} />

      {/* Layer 3: Near Stars (Larger, slow movement, low density) */}
      <NearStars count={nearCount} />
    </>
  );
}
