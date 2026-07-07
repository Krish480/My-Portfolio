import React from "react";

// 🌌 Volumetric Nebula Shader Background
const NebulaShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;
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

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(0.87758, 0.47942, -0.47942, 0.87758);
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = rot * p * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv - 0.5;
      uv.y += uScroll * 0.12;
      uv += uMouse * 0.03;

      float d = fbm(uv * 1.5 + vec2(uTime * 0.02, uTime * 0.01));
      d += fbm(uv * 3.0 - vec2(uTime * 0.015, -uTime * 0.01)) * 0.4;

      vec3 purple = vec3(0.42, 0.15, 0.92); // #6D28D9
      vec3 cyan = vec3(0.13, 0.82, 0.93);   // #22D3EE
      vec3 spaceBlack = vec3(0.01, 0.01, 0.04);

      float wave = 0.5 + 0.5 * sin(uv.y * 3.5 + d * 2.2);
      vec3 nebula = mix(purple, cyan, wave);
      vec3 finalColor = mix(spaceBlack, nebula * 0.22, d);

      // 🌟 Soft Vignette effect (darkens the corners to guide focus)
      float vignette = smoothstep(0.85, 0.35, length(vUv - 0.5));
      finalColor *= (0.4 + 0.6 * vignette);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

export default React.forwardRef(function NebulaClouds({ uniforms }, ref) {
  return (
    <mesh ref={ref} position={[0, 0, -30]}>
      <planeGeometry args={[140, 140]} />
      <shaderMaterial
        attach="material"
        vertexShader={NebulaShader.vertexShader}
        fragmentShader={NebulaShader.fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
});
