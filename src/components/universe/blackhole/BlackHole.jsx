import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { universeConfig } from "../config/universeConfig";

// 🪐 Accretion Disk Shader Material
const AccretionDiskShader = {
  vertexShader: `
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vPosition = position;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uCoreColor;
    uniform vec3 uEdgeColor;
    varying vec3 vPosition;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                 mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
    }

    void main() {
      float r = length(vPosition.xy);
      float phi = atan(vPosition.y, vPosition.x);

      float speed = uTime * (3.0 / (r + 0.2));
      float angle = phi - speed;

      float lanes = noise(vec2(r * 5.0 - uTime * 0.8, angle * 3.0));
      lanes += noise(vec2(r * 12.0 + uTime * 1.5, angle * 7.0)) * 0.4;

      float innerR = 1.3;
      float outerR = 5.0;
      float diskMask = smoothstep(outerR, innerR * 1.5, r) * smoothstep(innerR * 0.9, innerR * 1.2, r);
      vec3 gasColor = mix(uEdgeColor, uCoreColor, smoothstep(outerR, innerR * 1.8, r));
      vec3 finalColor = gasColor * (0.3 + lanes * 0.7);

      float alpha = diskMask * (0.12 + lanes * 0.45) * 0.45;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

export default function BlackHole({ timeUniform }) {
  const diskRef = useRef();

  const diskUniforms = useMemo(() => ({
    uTime: timeUniform,
    uCoreColor: { value: new THREE.Color(universeConfig.blackHole.coreColor) },
    uEdgeColor: { value: new THREE.Color(universeConfig.blackHole.edgeColor) },
  }), [timeUniform]);

  return (
    <group position={[0, 0, 0]} rotation={[0.4, 0, 0.15]}>
      {/* 1. Accretion Disk Ring Mesh */}
      <mesh ref={diskRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry
          args={[
            universeConfig.blackHole.accretionDiskRadiusMin,
            universeConfig.blackHole.accretionDiskRadiusMax,
            64,
          ]}
        />
        <shaderMaterial
          attach="material"
          vertexShader={AccretionDiskShader.vertexShader}
          fragmentShader={AccretionDiskShader.fragmentShader}
          uniforms={diskUniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Secondary Einstein Glow Halo */}
      <mesh rotation={[Math.PI / 2.15, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry
          args={[
            universeConfig.blackHole.einsteinRingRadiusMin,
            universeConfig.blackHole.einsteinRingRadiusMax,
            64,
          ]}
        />
        <meshBasicMaterial
          color={universeConfig.blackHole.coreColor}
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Event Horizon Sphere Core */}
      <mesh>
        <sphereGeometry args={[universeConfig.blackHole.eventHorizonRadius, 32, 32]} />
        <meshBasicMaterial color="#000000" depthWrite={true} />
      </mesh>
    </group>
  );
}
