"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";

const portfolioImages = [
  "/portfolio/momento-relojero.jpg",
  "/portfolio/isomontage.jpg",
  "/portfolio/garage-biver.jpg",
  "/portfolio/vitrophy.jpg",
  "/portfolio/cim-by-cacr.jpg",
  "/portfolio/blumenthal.jpg",
  "/portfolio/lux-habitat.png",
  "/portfolio/autodis.jpg",
  "/portfolio/pauly-losch.jpg",
];

/* ── Rounded alpha mask ── */
function createRoundedAlpha(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 172;
  const ctx = canvas.getContext("2d")!;
  const r = 26;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(canvas.width - r, 0);
  ctx.arcTo(canvas.width, 0, canvas.width, r, r);
  ctx.lineTo(canvas.width, canvas.height - r);
  ctx.arcTo(canvas.width, canvas.height, canvas.width - r, canvas.height, r);
  ctx.lineTo(r, canvas.height);
  ctx.arcTo(0, canvas.height, 0, canvas.height - r, r);
  ctx.lineTo(0, r);
  ctx.arcTo(0, 0, r, 0, r);
  ctx.closePath();
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

interface CurvedPatchProps {
  radius: number;
  phi: number;
  theta: number;
  phiWidth: number;
  thetaHeight: number;
  texture: THREE.Texture;
  alphaMap: THREE.CanvasTexture;
}

function CurvedPatch({ radius, phi, theta, phiWidth, thetaHeight, texture, alphaMap }: CurvedPatchProps) {
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(radius, 24, 16, phi - phiWidth / 2, phiWidth, theta - thetaHeight / 2, thetaHeight);
  }, [radius, phi, theta, phiWidth, thetaHeight]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial map={texture} alphaMap={alphaMap} alphaTest={0.5} side={THREE.FrontSide} toneMapped={false} />
    </mesh>
  );
}

/* ── Portfolio sphere (optional) ── */
function BandedSphere({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useLoader(THREE.TextureLoader, portfolioImages);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0005;
  });

  const radius = 3.2;
  const thetaHeight = 0.3;
  const targetRatio = 1.4;
  const alphaMap = useMemo(() => createRoundedAlpha(), []);

  const patchData = useMemo(() => {
    const result: { phi: number; theta: number; texIndex: number; phiW: number }[] = [];
    const bands = [
      { theta: Math.PI * 0.15, count: 6, phiOffset: 0 },
      { theta: Math.PI * 0.3, count: 8, phiOffset: Math.PI / 8 },
      { theta: Math.PI * 0.5, count: 9, phiOffset: Math.PI / 9 },
      { theta: Math.PI * 0.7, count: 8, phiOffset: Math.PI / 5 },
      { theta: Math.PI * 0.85, count: 6, phiOffset: Math.PI / 6 },
    ];
    bands.forEach((band, bandIdx) => {
      const sinTheta = Math.sin(band.theta);
      const phiW = (targetRatio * thetaHeight) / Math.max(sinTheta, 0.01);
      const angularSpacing = (2 * Math.PI) / band.count;
      for (let i = 0; i < band.count; i++) {
        result.push({
          phi: band.phiOffset + i * angularSpacing,
          theta: band.theta,
          texIndex: (bandIdx * 5 + i) % textures.length,
          phiW,
        });
      }
    });
    return result;
  }, [textures.length]);

  return (
    <group rotation={[0, (45 * Math.PI) / 180, (45 * Math.PI) / 180]} position={isMobile ? [0.8, -1.2, 0] : [2.5, -1.5, 0]}>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[radius - 0.06, 48, 48]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.04} />
        </mesh>
        {patchData.map((item, i) => (
          <CurvedPatch
            key={i}
            radius={radius}
            phi={item.phi}
            theta={item.theta}
            phiWidth={item.phiW}
            thetaHeight={thetaHeight}
            texture={textures[item.texIndex]}
            alphaMap={alphaMap}
          />
        ))}
      </group>
    </group>
  );
}

/* ── GLSL Shaders for Gravitational Lensing ── */
const lensingVert = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const lensingFrag = /* glsl */ `
uniform sampler2D tScene;
uniform vec2 resolution;
uniform vec2 bhCenter;
uniform float strength;
uniform float ehRadius;
uniform float asymmetry;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 delta = uv - bhCenter;

  float aspect = resolution.x / resolution.y;
  vec2 corrected = vec2(delta.x * aspect, delta.y);
  float dist = length(corrected);

  float distRadius = ehRadius * 2.0;
  if (dist > distRadius) {
    gl_FragColor = texture2D(tScene, uv);
    return;
  }

  vec2 dir = corrected / max(dist, 0.0001);

  float normalizedY = corrected.y / max(dist, 0.0001);
  float adjustedStrength = strength * (1.0 - normalizedY * asymmetry);

  float deflection = adjustedStrength / (dist + 0.001);
  deflection = min(deflection, dist * 0.95);

  vec2 uvDir = vec2(dir.x / aspect, dir.y);
  vec2 distortedUV = uv - uvDir * deflection;
  distortedUV = clamp(distortedUV, vec2(0.001), vec2(0.999));

  vec4 distortedColor = texture2D(tScene, distortedUV);
  vec4 originalColor = texture2D(tScene, uv);

  float amp = 1.0 + strength * 4.0 / (dist * dist + 0.002);
  amp = min(amp, 4.0);

  float shadow = smoothstep(ehRadius * 0.2, ehRadius * 2.2, dist);
  float falloff = smoothstep(distRadius, ehRadius * 0.5, dist);

  vec3 distorted = distortedColor.rgb * amp * shadow;
  vec3 finalRGB = mix(originalColor.rgb, distorted, falloff);
  float finalAlpha = mix(originalColor.a, distortedColor.a, falloff);

  gl_FragColor = vec4(finalRGB, finalAlpha);
}
`;

/* ── Accretion Disk GLSL ──
   The orbital motion runs entirely on the GPU: each point carries its base
   angle / radius / angular speed as static attributes and the position is
   recomputed in the vertex shader from a single uTime uniform. This removes
   the per-frame CPU loop that previously recomputed ~5 500 points and
   re-uploaded the whole position buffer every frame. */
const diskVert = /* glsl */ `
attribute float aSize;
attribute float aSoftness;
attribute float aBaseAngle;
attribute float aRadius;
attribute float aSpeed;
uniform float uTime;
uniform float uSpeed;
varying vec3 vColor;
varying float vSoftness;
void main() {
  vColor = color;
  vSoftness = aSoftness;
  float ang = aBaseAngle + uTime * aSpeed * uSpeed;
  vec3 p = vec3(cos(ang) * aRadius, position.y, sin(ang) * aRadius);
  vec4 mvPos = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = aSize * (450.0 / -mvPos.z);
  gl_Position = projectionMatrix * mvPos;
}
`;

const diskFrag = /* glsl */ `
varying vec3 vColor;
varying float vSoftness;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  float sigma = mix(0.22, 0.48, vSoftness);
  float alpha = exp(-(d * d) / (2.0 * sigma * sigma));
  if (alpha < 0.01) discard;
  float brightness = mix(1.0, 2.5, vSoftness);
  gl_FragColor = vec4(vColor * alpha * brightness, alpha);
}
`;

function AccretionDisk({ count = 4000, maxRadius = 1.4, sizeScale = 1, brightness = 1, speedMultiplier = 1, coreWhite = 0, extraSoftness = 0 }: { count?: number; maxRadius?: number; sizeScale?: number; brightness?: number; speedMultiplier?: number; coreWhite?: number; extraSoftness?: number }) {
  const points = useRef<THREE.Points>(null);
  const { positions, colors, sizes, softness, speeds, baseAngles, radii } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const soft = new Float32Array(count);
    const spd = new Float32Array(count);
    const ang = new Float32Array(count);
    const rad = new Float32Array(count);

    // Blue-green accretion palette (inner hot → outer cool)
    const hotWhite = new THREE.Color("#eafffb");
    const warmCream = new THREE.Color("#7df5e6");
    const goldAmber = new THREE.Color("#22d38c");
    const deepGold = new THREE.Color("#14a7c8");
    const dimBrown = new THREE.Color("#0e3a6b");
    const coreWhiteColor = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 0.3 + Math.pow(Math.random(), 0.75) * maxRadius;
      const angle = Math.random() * Math.PI * 2;

      const diskHeight = 0.005 + (r - 0.5) * 0.01;
      const y = (Math.random() - 0.5) * diskHeight;

      pos[i3] = Math.cos(angle) * r;
      pos[i3 + 1] = y;
      pos[i3 + 2] = Math.sin(angle) * r;

      ang[i] = angle;
      rad[i] = r;
      spd[i] = 1.0 / Math.pow(r, 1.5);

      const t = (r - 0.3) / maxRadius;
      sz[i] = (t < 0.2
        ? 0.25 + (1 - t / 0.2) * 0.35
        : 0.06 + (1 - t) * 0.12) * sizeScale;
      soft[i] = Math.min(1, Math.max(0, 1 - t * 2.5) + extraSoftness);

      let c: THREE.Color;
      if (t < 0.2) {
        c = hotWhite.clone().lerp(warmCream, t / 0.2);
      } else if (t < 0.45) {
        c = warmCream.clone().lerp(goldAmber, (t - 0.2) / 0.25);
      } else if (t < 0.7) {
        c = goldAmber.clone().lerp(deepGold, (t - 0.45) / 0.25);
      } else {
        c = deepGold.clone().lerp(dimBrown, (t - 0.7) / 0.3);
      }
      // brighten the core toward white near the event horizon
      if (coreWhite > 0) {
        const innerness = Math.max(0, 1 - t / 0.4);
        c.lerp(coreWhiteColor, coreWhite * innerness);
      }
      c.r += (Math.random() - 0.5) * 0.06;
      c.g += (Math.random() - 0.5) * 0.04;

      col[i3] = c.r * brightness;
      col[i3 + 1] = c.g * brightness;
      col[i3 + 2] = c.b * brightness;
    }
    return { positions: pos, colors: col, sizes: sz, softness: soft, speeds: spd, baseAngles: ang, radii: rad };
  }, [count, sizeScale, brightness, maxRadius, coreWhite, extraSoftness]);

  const shaderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: diskVert,
        fragmentShader: diskFrag,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: speedMultiplier },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Free the GPU material when the disk unmounts (e.g. when the hero leaves
  // the tree) so it never leaks across mount/unmount cycles.
  useEffect(() => () => shaderMat.dispose(), [shaderMat]);

  useFrame(({ clock }) => {
    shaderMat.uniforms.uTime.value = clock.getElapsedTime();
    shaderMat.uniforms.uSpeed.value = speedMultiplier;
  });

  return (
    <points ref={points} material={shaderMat}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} count={count} />
        <bufferAttribute attach="attributes-aSoftness" args={[softness, 1]} count={count} />
        <bufferAttribute attach="attributes-aBaseAngle" args={[baseAngles, 1]} count={count} />
        <bufferAttribute attach="attributes-aRadius" args={[radii, 1]} count={count} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} count={count} />
      </bufferGeometry>
    </points>
  );
}

function EventHorizon() {
  return (
    <mesh>
      <sphereGeometry args={[0.42, 64, 64]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
}

function PhotonRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.getElapsedTime() * 2.5) * 0.02;
    ref.current.scale.set(s, s, 1);
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.39, 0.48, 128]} />
      <meshBasicMaterial color="#cffef6" transparent opacity={0.85} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function BlackHole({ isMobile, posOverride, rotOverride, scaleOverride, ring2RotOverride, diskCount, disk2Count, diskMaxRadius, diskSizeScale, diskBrightness, disk2MaxRadius, diskSpeed }: { isMobile: boolean; posOverride?: [number, number, number]; rotOverride?: [number, number, number]; scaleOverride?: number; ring2RotOverride?: [number, number, number]; diskCount?: number; disk2Count?: number; diskMaxRadius?: number; diskSizeScale?: number; diskBrightness?: number; disk2MaxRadius?: number; diskSpeed?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = Math.PI * 0.2 + Math.sin(clock.getElapsedTime() * 0.15) * 0.03;
  });

  return (
    <group
      position={posOverride ?? (isMobile ? [-0.8, 2.0, 1] : [-3.5, 0.5, 1])}
      ref={groupRef}
      rotation={rotOverride ?? [Math.PI * 0.2, 0.3, 0.15]}
      scale={scaleOverride ?? (isMobile ? 1.3 : 1.7)}
    >
      <EventHorizon />
      <PhotonRing />
      <AccretionDisk count={diskCount ?? (isMobile ? 2300 : 4500)} maxRadius={diskMaxRadius} sizeScale={diskSizeScale} brightness={diskBrightness} speedMultiplier={diskSpeed} />
      <group rotation={ring2RotOverride ?? [Math.PI * 0.35, 0, 0]}>
        <AccretionDisk count={disk2Count ?? (isMobile ? 600 : 1000)} maxRadius={disk2MaxRadius ?? 0.7} sizeScale={diskSizeScale} brightness={diskBrightness} speedMultiplier={diskSpeed} coreWhite={0.75} extraSoftness={0.22} />
        <PhotonRing />
      </group>
    </group>
  );
}

function GravitationalLens({
  bhPosition,
  bhScale,
  strength = 0.035,
  asymmetry = 0,
}: {
  bhPosition: [number, number, number];
  bhScale: number;
  strength?: number;
  asymmetry?: number;
}) {
  const fbo = useFBO(1024, 1024);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [bx, by, bz] = bhPosition;
  const bhPos3D = useMemo(() => new THREE.Vector3(bx, by, bz), [bx, by, bz]);
  const renderSize = useMemo(() => new THREE.Vector2(), []);

  const uniforms = useMemo(
    () => ({
      tScene: { value: null as THREE.Texture | null },
      resolution: { value: new THREE.Vector2(1, 1) },
      bhCenter: { value: new THREE.Vector2(0.5, 0.5) },
      strength: { value: strength },
      ehRadius: { value: 0.04 },
      asymmetry: { value: asymmetry },
    }),
    []
  );

  useFrame(({ gl, scene, camera }) => {
    if (!meshRef.current || !materialRef.current) return;
    const mat = materialRef.current;
    const cam = camera as THREE.PerspectiveCamera;

    gl.getSize(renderSize);
    const dpr = gl.getPixelRatio();
    mat.uniforms.resolution.value.set(renderSize.x * dpr, renderSize.y * dpr);

    const projected = bhPos3D.clone().project(cam);
    mat.uniforms.bhCenter.value.set(projected.x * 0.5 + 0.5, projected.y * 0.5 + 0.5);

    const bhDist = bhPos3D.distanceTo(cam.position);
    const fovRad = (cam.fov * Math.PI) / 180;
    const ehWorld = 0.42 * bhScale;
    mat.uniforms.ehRadius.value = ehWorld / (bhDist * Math.tan(fovRad / 2)) / 2;

    meshRef.current.visible = false;
    gl.setRenderTarget(fbo);
    gl.render(scene, cam);
    gl.setRenderTarget(null);
    meshRef.current.visible = true;

    mat.uniforms.tScene.value = fbo.texture;
    gl.render(scene, cam);
  }, 1);

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={9999}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={lensingVert}
        fragmentShader={lensingFrag}
        depthTest={false}
        depthWrite={false}
        transparent
      />
    </mesh>
  );
}

interface Props {
  className?: string;
  showSphere?: boolean;
  bhPositionOverride?: [number, number, number];
  bhPositionMobileOverride?: [number, number, number];
  bhRotationOverride?: [number, number, number];
  bhScaleOverride?: number;
  bhRing2RotOverride?: [number, number, number];
  lensingStrength?: number;
  lensingAsymmetry?: number;
  diskCount?: number;
  disk2Count?: number;
  diskMaxRadius?: number;
  diskSizeScale?: number;
  diskBrightness?: number;
  disk2MaxRadius?: number;
  diskSpeed?: number;
}

export default function ThreeSphereV2BlackHole({ className, showSphere = false, bhPositionOverride, bhPositionMobileOverride, bhRotationOverride, bhScaleOverride, bhRing2RotOverride, lensingStrength, lensingAsymmetry, diskCount, disk2Count, diskMaxRadius, diskSizeScale, diskBrightness, disk2MaxRadius, diskSpeed }: Props) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Pause the (very heavy: FBO + double full-scene render per frame) loop when
  // the hero is scrolled out of view, so it never burns the GPU off-screen.
  const [onScreen, setOnScreen] = useState(true);
  // Respect prefers-reduced-motion: render a single static frame instead of an
  // endlessly spinning black hole (design-system hard rule + vestibular a11y).
  const [reduced, setReduced] = useState(false);
  // If the GPU drops the WebGL context (common on iOS Safari under memory
  // pressure) fall back to a static gradient instead of a frozen black canvas.
  const [lost, setLost] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    const timer = setTimeout(() => setVisible(true), 400);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const effectiveOverride = isMobile
    ? bhPositionMobileOverride ?? bhPositionOverride
    : bhPositionOverride;
  const bhPosition: [number, number, number] =
    effectiveOverride ?? (isMobile ? [-2, 0.5, 1] : [-3.5, 0.5, 1]);
  const bhScale = bhScaleOverride ?? (isMobile ? 1.3 : 1.7);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        opacity: visible ? 1 : 0,
        transition: "opacity 2s ease-in-out",
      }}
    >
      {lost ? (
        // Graceful static fallback after a WebGL context loss.
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(42% 52% at 72% 50%, rgba(20,167,200,0.18), rgba(14,58,107,0.10) 45%, transparent 72%)",
          }}
        />
      ) : (
        <Canvas
          camera={{ position: [0, 0, isMobile ? 10 : 7], fov: 50 }}
          style={{ background: "transparent", position: "absolute", inset: 0, pointerEvents: "none" }}
          // Clamp DPR: the lensing pass renders the full scene to a 1024² FBO and
          // then to screen every frame. At native 3× DPR on phones that is ~3×
          // the pixels for no visible gain — cap it (lower on mobile).
          dpr={isMobile ? 1 : [1, 1.5]}
          // Antialias is wasted here (additive points + soft sprites); dropping it
          // on mobile removes the MSAA cost on the most constrained GPUs.
          // failIfMajorPerformanceCaveat:false lets it fall back to software GL
          // rather than failing outright on weak/blocklisted GPUs.
          gl={{
            alpha: true,
            antialias: !isMobile,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          // Animate only when on screen; render a single static frame when the
          // user asked for reduced motion.
          frameloop={reduced ? "demand" : onScreen ? "always" : "never"}
          raycaster={{ enabled: false } as never}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              "webglcontextlost",
              (e) => {
                e.preventDefault();
                setLost(true);
              },
              { once: true }
            );
          }}
        >
        <ambientLight intensity={1.2} />
        <Suspense fallback={null}>
          {showSphere && <BandedSphere isMobile={isMobile} />}
          <BlackHole isMobile={isMobile} posOverride={effectiveOverride} rotOverride={bhRotationOverride} scaleOverride={bhScaleOverride} ring2RotOverride={bhRing2RotOverride} diskCount={diskCount} disk2Count={disk2Count} diskMaxRadius={diskMaxRadius} diskSizeScale={diskSizeScale} diskBrightness={diskBrightness} disk2MaxRadius={disk2MaxRadius} diskSpeed={diskSpeed} />
          <GravitationalLens bhPosition={bhPosition} bhScale={bhScale} strength={lensingStrength} asymmetry={lensingAsymmetry} />
        </Suspense>
        </Canvas>
      )}
    </div>
  );
}
