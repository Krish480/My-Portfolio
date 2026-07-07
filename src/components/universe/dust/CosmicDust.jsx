import React from "react";
import useUniverse from "../hooks/useUniverse";
import { DustConfig } from "./DustConfig";
import DustLayer from "./DustLayer";

export default function CosmicDust() {
  const { quality } = useUniverse();

  return (
    <>
      {DustConfig.layers.map((layer) => {
        // Resolve particle count based on device capability
        let count = layer.count.desktop;
        if (quality === "low") {
          count = layer.count.mobile; // 70% reduction already pre-calculated in config
        } else if (quality === "medium") {
          count = layer.count.tablet;
        }

        return <DustLayer key={layer.id} config={layer} count={count} />;
      })}
    </>
  );
}
