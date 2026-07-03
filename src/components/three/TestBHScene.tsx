"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EventHorizon, PhotonRing, GravitationalLens } from "./ThreeSphereV2BlackHole";

/**
 * /test-bh sandbox: the home-page black hole (event horizon + photon rings +
 * gravitational lensing, same tilt/oscillation) but with the two particle
 * accretion disks replaced by a static disk IMAGE. Each disk is a sandwich of
 * three image planes — small / large / small — stacked closely along the disk
 * axis; the middle (large) layer gets a slight blur for depth.
 */

const DISK_IMG = "/three/black-hole-disk.png";

/** Load the disk image into a canvas with a CSS filter (saturate/blur) baked in. */
function useFilteredTexture(src: string, filter: string): THREE.Texture | null {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = filter;
      ctx.drawImage(img, 0, 0);
      const t = new THREE.CanvasTexture(canvas);
      t.colorSpace = THREE.SRGBColorSpace;
      setTex(t);
    };
    return () => {
      cancelled = true;
    };
  }, [src, filter]);
  useEffect(() => () => tex?.dispose(), [tex]);
  return tex;
}

/** One image plane lying in the disk (XZ) plane, slowly spinning in-plane. */
function DiskLayer({ texture, size, y, speed }: { texture: THREE.Texture; size: number; y: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    // Euler order XYZ: z applies first in object space, so this spins the
    // plane around its own normal while x keeps it lying flat.
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

// Extra punch baked into every disk texture (the raw PNG reads a bit washed out).
const SATURATE = "saturate(1.9) brightness(1.35)";

/** Five stacked image planes = one accretion disk: small/small/LARGE/small/small.
 *  The middle (large, blurred) layer spins slightly faster than the small ones. */
function ImageDisk({ smallSize, largeSize, gap = 0.06, speed = 0.22, middleFilter = `${SATURATE} blur(4px)` }: { smallSize: number; largeSize: number; gap?: number; speed?: number; middleFilter?: string }) {
  // Every layer is blurred; the middle one keeps its own (stronger/whiter) filter.
  const sharp = useFilteredTexture(DISK_IMG, `${SATURATE} blur(3px)`);
  const blurred = useFilteredTexture(DISK_IMG, middleFilter);
  if (!sharp) return null;
  return (
    <group>
      {/* negative = reversed spin direction */}
      <DiskLayer texture={sharp} size={smallSize} y={gap * 2} speed={-speed * 0.9} />
      <DiskLayer texture={sharp} size={smallSize} y={gap} speed={-speed} />
      <DiskLayer texture={blurred ?? sharp} size={largeSize} y={0} speed={-speed * 1.25} />
      <DiskLayer texture={sharp} size={smallSize} y={-gap} speed={-speed * 0.95} />
      <DiskLayer texture={sharp} size={smallSize} y={-gap * 2} speed={-speed * 0.85} />
    </group>
  );
}

/** Same group structure/tilts/oscillation as the home BlackHole, image disks. */
function BlackHoleImage({ isMobile, isLight, position, scale }: { isMobile: boolean; isLight: boolean; position: [number, number, number]; scale: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = Math.PI * 0.2 + Math.sin(clock.getElapsedTime() * 0.15) * 0.03;
  });
  return (
    <group ref={groupRef} position={position} rotation={[Math.PI * 0.2, 0.3, 0.15]} scale={scale}>
      <EventHorizon radius={isMobile ? 0.46 : 0.42} color={isLight ? "#ffffff" : "#000000"} />
      <PhotonRing />
      {/* main disk (particles ran 0.3 → 1.7 radius ⇒ ~3.4 diameter) */}
      <ImageDisk smallSize={2.4} largeSize={3.4} />
      {/* second tilted disk — same 5-layer PNG stack, on the axis the original
          second particle disk used (10 images total). Its middle (blurred)
          layer is deliberately smaller and whiter than the main disk's. */}
      <group rotation={[Math.PI * 0.35, 0.1, 0.2]}>
        <ImageDisk smallSize={1.8} largeSize={2.2} speed={0.3} middleFilter="saturate(1.3) brightness(1.9) blur(4px)" />
        <PhotonRing />
      </group>
    </group>
  );
}

interface Props {
  /** Desktop position of the black hole (defaults to centred, for /test-bh). */
  bhPositionOverride?: [number, number, number];
  bhPositionMobileOverride?: [number, number, number];
  bhScaleOverride?: number;
}

export default function TestBHScene({ bhPositionOverride, bhPositionMobileOverride, bhScaleOverride }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    const apply = () => setIsLight(!el.classList.contains("dark"));
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const bhPosition: [number, number, number] =
    (isMobile ? bhPositionMobileOverride ?? bhPositionOverride : bhPositionOverride) ?? [0, 0, 0];
  const bhScale = bhScaleOverride ?? (isMobile ? 1.3 : 1.7);

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 10 : 7], fov: 50 }}
        style={{ background: "transparent", position: "absolute", inset: 0, pointerEvents: "none" }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
        frameloop={reduced ? "demand" : "always"}
      >
        <ambientLight intensity={1.2} />
        <Suspense fallback={null}>
          <BlackHoleImage isMobile={isMobile} isLight={isLight} position={bhPosition} scale={bhScale} />
          <GravitationalLens bhPosition={bhPosition} bhScale={bhScale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
