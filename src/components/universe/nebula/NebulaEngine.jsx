import React from "react";
import NebulaLayer from "./NebulaLayer";
import { NebulaConfig } from "./NebulaConfig";

export default function NebulaEngine() {
  return (
    <>
      {NebulaConfig.layers.map((layer) => (
        <NebulaLayer key={layer.id} config={layer} />
      ))}
    </>
  );
}
