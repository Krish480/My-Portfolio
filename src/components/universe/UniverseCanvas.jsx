import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import useUniverse from "./hooks/useUniverse";
import { universeConfig } from "./config/universeConfig";

// WebGL availability checker
function checkWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

export default function UniverseCanvas() {
  const { quality } = useUniverse();
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const currentQualitySettings = universeConfig.quality[quality] || universeConfig.quality.high;

  useEffect(() => {
    setWebGLAvailable(checkWebGLSupport());
  }, []);

  if (!webGLAvailable) {
    // 🌌 Graceful CSS Fallback when WebGL/WebGL2 is not supported or disabled
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -100,
          backgroundColor: "#010104",
          backgroundImage: "radial-gradient(circle at 75% 25%, #05081c 0%, #010104 70%)",
          overflow: "hidden",
        }}
      >
        {/* Soft static nebula glow overlay */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "10%",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "15%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 75%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* Ambient fallback stars */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, #ffffff, transparent),
              radial-gradient(1.5px 1.5px at 150px 70px, rgba(34,211,238,0.8), transparent),
              radial-gradient(1px 1px at 80px 240px, #ffffff, transparent),
              radial-gradient(2px 2px at 320px 120px, rgba(124,58,237,0.6), transparent),
              radial-gradient(1px 1px at 450px 350px, #ffffff, transparent),
              radial-gradient(1px 1px at 600px 80px, #ffffff, transparent),
              radial-gradient(1.5px 1.5px at 780px 220px, #ffffff, transparent),
              radial-gradient(2px 2px at 950px 410px, rgba(34,211,238,0.7), transparent),
              radial-gradient(1px 1px at 1100px 150px, #ffffff, transparent)
            `,
            backgroundSize: "400px 400px",
            opacity: 0.65,
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -100,
        pointerEvents: "none",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, universeConfig.camera.defaultZ],
          fov: universeConfig.camera.fov,
          near: universeConfig.camera.near,
          far: universeConfig.camera.far,
        }}
        gl={{
          antialias: currentQualitySettings.antialias,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={currentQualitySettings.dpr}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
