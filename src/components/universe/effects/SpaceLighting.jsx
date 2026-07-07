import React from "react";

export default function SpaceLighting() {
  // 🌟 Ambient and directional lighting settings for the space components
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </>
  );
}
