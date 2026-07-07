import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { projectsData } from "./projectsData";
import { Cpu, Eye, Sparkles } from "lucide-react";

function EnergyCore({ hoveredColor }) {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Core pulsing scale
    const pulse = 1.0 + Math.sin(time * 2.5) * 0.06;
    if (coreRef.current) {
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y = time * 0.3;
    }

    // Energy rings rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.2;
      ring1Ref.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.3;
      ring2Ref.current.rotation.y = Math.cos(time * 0.5) * 0.2;
    }
  });

  const activeColor = hoveredColor || "#22d3ee";

  return (
    <group position={[0, 0, 0]}>
      {/* Central Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial 
          color={activeColor} 
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshBasicMaterial color={activeColor} side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[1.6, 1.63, 64]} />
        <meshBasicMaterial color={activeColor} side={THREE.DoubleSide} transparent opacity={0.25} />
      </mesh>

      {/* Ambient point light */}
      <pointLight distance={10} intensity={1.5} color={activeColor} />
    </group>
  );
}

function MissionNode({ project, idx, total, onSelect, hoveredIndex, setHoveredIndex }) {
  const nodeRef = useRef();
  const angleRef = useRef((idx / total) * Math.PI * 2);
  const [isSelfHovered, setIsSelfHovered] = useState(false);

  const isAnyHovered = hoveredIndex !== null;
  const isHovered = hoveredIndex === idx;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Orbit speed: slows down to a drift if hovered
    const speedMultiplier = isAnyHovered ? 0.05 : 0.15;
    angleRef.current = ((idx / total) * Math.PI * 2) + time * speedMultiplier;

    const radius = 4.2;
    const x = Math.cos(angleRef.current) * radius;
    const z = Math.sin(angleRef.current) * radius;
    const y = Math.sin(time * 1.5 + idx) * 0.15; // subtle float offset

    if (nodeRef.current) {
      nodeRef.current.position.set(x, y, z);
    }
  });

  const handleMouseEnter = () => {
    setIsSelfHovered(true);
    setHoveredIndex(idx);
  };

  const handleMouseLeave = () => {
    setIsSelfHovered(false);
    if (hoveredIndex === idx) {
      setHoveredIndex(null);
    }
  };

  return (
    <mesh ref={nodeRef}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshBasicMaterial 
        color={project.themeColor} 
        transparent 
        opacity={isHovered ? 1.0 : 0.6} 
      />

      {/* Glow aura */}
      {isHovered && (
        <mesh scale={[1.8, 1.8, 1.8]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshBasicMaterial color={project.themeColor} transparent opacity={0.3} />
        </mesh>
      )}

      {/* Drei HTML Overlay for futuristic bubble */}
      <Html distanceFactor={8} zIndexRange={[10, 50]} center>
        <button
          onClick={() => onSelect(idx)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`group flex flex-col items-center focus:outline-none p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 select-none ${
            isHovered 
              ? "bg-[#030712]/90 -translate-y-2 scale-110" 
              : "bg-[#030712]/60 hover:bg-[#030712]/80 hover:-translate-y-1 scale-100"
          }`}
          style={{
            borderColor: isHovered ? project.themeColor : "rgba(255,255,255,0.06)",
            boxShadow: isHovered 
              ? `0 10px 30px rgba(0,0,0,0.8), 0 0 15px ${project.themeColor}33`
              : "0 4px 20px rgba(0,0,0,0.5)",
          }}
          aria-label={`Open Mission ${project.title}`}
        >
          {/* Diagnostic code & Status */}
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[7px] text-gray-500 tracking-widest">
            <span>M-0{idx + 1}</span>
            <span className={`w-1 h-1 rounded-full ${
              project.status === "In Progress" || project.isWip ? "bg-purple-400" : "bg-emerald-400"
            }`} />
          </div>

          {/* Title */}
          <span className="text-[10px] font-mono font-bold tracking-wider text-white uppercase group-hover:text-cyan-400 transition-colors duration-200">
            {project.title.split(" ")[0]}
          </span>

          {/* Expanded Tooltip details on hover */}
          <div 
            className={`absolute top-full mt-2 w-40 p-2.5 rounded-xl border border-white/5 bg-[#010103]/95 backdrop-blur-lg font-mono text-[8px] leading-tight text-slate-400 shadow-2xl transition-all duration-200 pointer-events-none ${
              isHovered ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-1 invisible"
            }`}
          >
            <div className="text-[7px] text-gray-500 uppercase tracking-widest mb-1">TELEMETRY</div>
            <div className="text-white font-bold uppercase truncate mb-1">{project.title}</div>
            <div className="flex justify-between text-[7px] mb-1">
              <span>STATUS:</span>
              <span style={{ color: project.themeColor }}>
                {project.status === "In Progress" || project.isWip ? "ACTIVE BETA" : "PROD READY"}
              </span>
            </div>
            <div className="text-[7px] text-cyan-400 flex items-center gap-1 mt-1.5 border-t border-white/5 pt-1">
              <Eye className="w-2.5 h-2.5" />
              <span>CLICK TO LOAD CORE</span>
            </div>
          </div>
        </button>
      </Html>
    </mesh>
  );
}

function CameraRig({ hoveredIndex }) {
  useFrame((state) => {
    const { camera } = state;
    
    // Default camera angle looking slightly down
    let targetPos = new THREE.Vector3(0, 3.5, 7.8);
    let targetLook = new THREE.Vector3(0, -0.4, 0);

    if (hoveredIndex !== null) {
      const activeProj = projectsData[hoveredIndex];
      // Subtle camera tilt toward active hover node
      targetPos.x += (Math.cos((hoveredIndex / projectsData.length) * Math.PI * 2) * 0.4);
      targetPos.z += (Math.sin((hoveredIndex / projectsData.length) * Math.PI * 2) * 0.4);
    }

    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(targetLook);
  });
  return null;
}

export default function CommandCenter3D({ onSelectProject }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const hoveredColor = hoveredIndex !== null ? projectsData[hoveredIndex].themeColor : null;

  return (
    <div className="w-full aspect-[21/9] min-h-[360px] md:min-h-[460px] relative rounded-[32px] border border-white/5 bg-black/20 overflow-hidden select-none">
      
      {/* Top HUD system indicators */}
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center z-10 font-mono text-[8px] text-gray-500 tracking-widest pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
          <span>GALAXY COMMAND: SCANNING SECTOR SE-04</span>
        </div>
        <div className="hidden sm:flex gap-4">
          <span>COGNITIVE LINK: ACTIVE</span>
          <span>DOCK GRID: 5/5 ONLINE</span>
        </div>
      </div>

      {/* R3F Sub-Canvas */}
      <Canvas
        camera={{ position: [0, 3.5, 7.8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.0} />

        {/* Pulsing Energy Core */}
        <EnergyCore hoveredColor={hoveredColor} />

        {/* Orbit Path Guide Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.18, 4.22, 64]} />
          <meshBasicMaterial color={hoveredColor || "#ffffff"} transparent opacity={0.06} side={THREE.DoubleSide} />
        </mesh>

        {/* Orbiting nodes representing each project */}
        {projectsData.map((project, idx) => (
          <MissionNode
            key={project.id}
            project={project}
            idx={idx}
            total={projectsData.length}
            onSelect={onSelectProject}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}

        {/* Smooth Camera Rig controller */}
        <CameraRig hoveredIndex={hoveredIndex} />
      </Canvas>

      {/* Bottom HUD guidance */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 font-mono text-[8px] text-gray-400 tracking-widest pointer-events-none bg-[#030712]/80 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
        TAB TO BROWSE • ENTER TO VIEW • ESC TO EXIT
      </div>
    </div>
  );
}
