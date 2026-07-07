import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setupCanvas2DFallback(canvas);
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates and scroll depth tracking with LERP inertia
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    let scroll = { y: 0, targetY: 0 };
    
    // Position of the black hole center (defaults to center of hero)
    let bhCenter = { x: width / 2, y: height * 0.38 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
      updateBhPosition();
    };

    // Calculate HTML profile image position to center WebGL black hole behind it
    const updateBhPosition = () => {
      const profileImg = document.querySelector(".planet-core");
      if (profileImg) {
        const rect = profileImg.getBoundingClientRect();
        bhCenter.x = rect.left + rect.width / 2;
        bhCenter.y = rect.top + rect.height / 2 + window.scrollY; // Absolute document position
      } else {
        bhCenter.x = window.innerWidth / 2;
        bhCenter.y = window.innerHeight * 0.38 + window.scrollY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Observe DOM changes to align WebGL center to the planet core profile
    const observer = new MutationObserver(updateBhPosition);
    observer.observe(document.body, { childList: true, subtree: true });
    // Run initial alignment delay to ensure images loaded
    setTimeout(updateBhPosition, 200);

    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 v_uv;
      void main() {
        v_uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Raymarching Gravitational deflection + Volumetric Nebulae + Multi-layer parallax
    // Uses 100% branchless mathematical formulations for cross-platform compatibility
    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec2 u_bh_center; // Absolute scroll position of black hole center
      uniform float u_time;
      uniform float u_scroll;
      uniform float u_is_mobile;

      // Pseudo-random hashing
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // 2D Value Noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      // Fractional Brownian Motion (for volumetric nebulae clouds)
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Pre-computed rotation matrix for cos(0.5), sin(0.5) to avoid compilation issues
        mat2 rot = mat2(0.87758, 0.47942, -0.47942, 0.87758);
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Screen coordinates normalized
        vec2 screen_coord = gl_FragCoord.xy;
        
        // Scale coordinate system on mobile to maintain 60 FPS
        float isMobileMask = step(0.5, u_is_mobile);
        screen_coord = mix(screen_coord, screen_coord / 0.6, isMobileMask);
        
        vec2 uv = (screen_coord - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Mouse coordinate normalized
        vec2 m = (u_mouse.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        m.y = -m.y; // Correct Y inversion

        // Convert absolute black hole center coordinates relative to viewport
        vec2 bh_viewport_pos = u_bh_center;
        bh_viewport_pos.y = u_resolution.y - (bh_viewport_pos.y - u_scroll); // Y correction for WebGL vs screen scroll
        vec2 bh_pos = (bh_viewport_pos - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Parallax offset: shift space view layers subtly based on mouse and scroll
        vec2 parallax_m = m * 0.04;
        float scroll_val = u_scroll / min(u_resolution.x, u_resolution.y);

        // Vector to black hole
        vec2 to_bh = uv - bh_pos;
        float r = length(to_bh);
        float eventHorizon = 0.09;

        // 🌟 Layer 1 & 2: Distant Multi-Layer Parallax Stars (Branchless masking)
        float star_field = 0.0;
        float inside_horizon_mask = step(eventHorizon, r);
        
        // Layer 1: Tiny background stars (Slowest movement)
        vec2 star_uv1 = (uv + parallax_m * 0.2 + vec2(0.0, scroll_val * 0.08)) * 18.0;
        float n1 = hash(floor(star_uv1));
        float star1_mask = step(0.993, n1);
        star_field += star1_mask * smoothstep(0.4, 0.0, length(fract(star_uv1) - 0.5)) * fract(n1 * 100.0) * 0.4;

        // Layer 2: Medium middle stars (Slightly faster movement)
        vec2 star_uv2 = (uv + parallax_m * 0.5 + vec2(0.0, scroll_val * 0.15)) * 10.0;
        float n2 = hash(floor(star_uv2));
        float star2_mask = step(0.985, n2);
        star_field += star2_mask * smoothstep(0.4, 0.0, length(fract(star_uv2) - 0.5)) * fract(n2 * 20.0) * 0.7;

        star_field *= inside_horizon_mask;

        // 🌟 Layer 3: Volumetric Nebula Clouds & Space Fog (FBM Noise)
        float neb_y_offset = scroll_val * 0.22;
        vec2 neb_uv = uv * 0.8 + parallax_m * 0.7 + vec2(0.0, neb_y_offset);
        
        // Multi-octave FBM for dense space cloud structures
        float neb_density = fbm(neb_uv + vec2(u_time * 0.015, u_time * 0.01));
        neb_density += fbm(neb_uv * 2.2 - vec2(u_time * 0.01, -u_time * 0.008)) * 0.35;
        
        // Nebula Color Mix: Deep purple, cyan, and black
        vec3 purpleNebula = vec3(0.43, 0.16, 0.93); // #7C3AED
        vec3 cyanNebula = vec3(0.14, 0.83, 0.93);   // #22D3EE
        vec3 spaceBlack = vec3(0.01, 0.01, 0.05);   // Dark cosmos background
        
        // Interpolate nebula colors over scroll region transitions
        vec3 currentNebulaColor = mix(purpleNebula, cyanNebula, smoothstep(0.0, 1.5, scroll_val));
        vec3 space_nebula = mix(spaceBlack, currentNebulaColor * 0.18, neb_density);

        // 🌟 Layer 4: Gravitational deflection & Black Hole Accretion Disk (Interstellar style)
        vec3 accretion_disk = vec3(0.0);
        
        // Approximate curved ray deflection (gravitational lensing)
        // Bends UV coordinates inwards near the black hole
        float deflection = 0.0095 / (r - eventHorizon + 0.001);
        vec2 uv_bent = uv - normalize(to_bh) * deflection * inside_horizon_mask;

        // Recompute parameters with bent light rays
        vec2 to_bh_lensed = uv_bent - bh_pos;
        float r_l = length(to_bh_lensed);
        float phi_l = atan(to_bh_lensed.y, to_bh_lensed.x);

        // Accretion disk dimensions
        float innerDisk = eventHorizon + 0.02;
        float outerDisk = 0.42;

        // Disk tilt shape (tilted torus projection wrapping event horizon)
        float tilt = abs(to_bh_lensed.y - sin(phi_l) * 0.045);
        float diskMask = smoothstep(0.045, 0.0, tilt); // Ring cut
        diskMask *= smoothstep(outerDisk, innerDisk, r_l);
        diskMask *= smoothstep(eventHorizon * 0.95, innerDisk, r_l);

        // Hot gas lanes revolving around the black hole
        float speed = u_time * 2.5;
        float gasLanes = noise(vec2(r_l * 12.0 - speed, phi_l * 4.0));
        gasLanes += noise(vec2(r_l * 28.0 + speed * 0.6, phi_l * 8.0)) * 0.55;

        // Accretion Core: Yellow (#FACC15) transitioning to Cyan Outer (#22D3EE)
        vec3 coreColor = vec3(0.98, 0.80, 0.08); // Accent Yellow
        vec3 edgeColor = vec3(0.14, 0.83, 0.93); // Cyan Glow
        vec3 finalDiskGas = mix(edgeColor, coreColor, smoothstep(outerDisk, innerDisk, r_l));

        float lensed_horizon_mask = step(eventHorizon, r_l);
        accretion_disk = finalDiskGas * (diskMask * (0.35 + gasLanes * 0.65)) * lensed_horizon_mask;

        // 🪐 Secondary Einstein Ring (bent light rays from behind event horizon)
        float ringWidth = 0.015;
        float ringDist = abs(r_l - (eventHorizon + 0.016));
        float ringMask = smoothstep(ringWidth, 0.0, ringDist);
        float ringGas = noise(vec2(phi_l * 6.0 - speed * 1.2, u_time));
        accretion_disk += coreColor * (ringMask * 0.4 * (0.5 + ringGas * 0.5)) * lensed_horizon_mask;

        // 🌟 Compile Layers
        vec3 finalColor = space_nebula + vec3(star_field) + accretion_disk;

        // Shadow event horizon
        finalColor *= lensed_horizon_mask;

        // Edge vignette
        vec2 vignette_uv = v_uv * (1.0 - v_uv.yx);
        float vig = vignette_uv.x * vignette_uv.y * 15.0;
        finalColor *= clamp(vig, 0.0, 1.0);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compiler warning:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking failed:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const uMouseLocation = gl.getUniformLocation(program, "u_mouse");
    const uBhCenterLocation = gl.getUniformLocation(program, "u_bh_center");
    const uTimeLocation = gl.getUniformLocation(program, "u_time");
    const uScrollLocation = gl.getUniformLocation(program, "u_scroll");
    const uIsMobileLocation = gl.getUniformLocation(program, "u_is_mobile");

    const isMobile = window.innerWidth < 768 ? 1.0 : 0.0;

    let time = 0;
    let animId;

    const render = () => {
      time += 0.007;

      // Mouse position LERP easing
      mouse.x += (mouse.targetX - mouse.x) * 0.07;
      mouse.y += (mouse.targetY - mouse.y) * 0.07;
      scroll.y += (scroll.targetY - scroll.y) * 0.07;

      // Adaptive quality rendering
      const pixelRatio = isMobile ? 0.6 : 1.0;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(uMouseLocation, mouse.x * pixelRatio, mouse.y * pixelRatio);
      gl.uniform2f(uBhCenterLocation, bhCenter.x * pixelRatio, bhCenter.y * pixelRatio);
      gl.uniform1f(uTimeLocation, time);
      gl.uniform1f(uScrollLocation, scroll.y * pixelRatio);
      gl.uniform1f(uIsMobileLocation, isMobile);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
      gl.deleteProgram(program);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  const setupCanvas2DFallback = (canvas) => {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let stars = [];

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5,
        d: Math.random() * 0.4 + 0.1,
      });
    }

    let animId;
    const draw = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      // Starfield
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.d;
        if (star.y > height) star.y = 0;
      });

      // Ambient nebula representation
      ctx.fillStyle = "rgba(109, 40, 217, 0.08)";
      ctx.beginPath();
      ctx.arc(width * 0.3, height * 0.4, 200, 0, Math.PI * 2);
      ctx.fill();

      // Flat black hole representation
      ctx.shadowBlur = 30;
      ctx.shadowColor = "#22d3ee";
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.35, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize2D = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize2D);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize2D);
    };
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-black"
    />
  );
}
