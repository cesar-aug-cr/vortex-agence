"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import BlackHolePoster from "./BlackHolePoster";
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

/** Seconds a single disk layer takes to fade from invisible to full. */
const FADE_DURATION = 3.5;

/** One image plane lying in the disk (XZ) plane, slowly spinning in-plane.
 *  Fades in gradually (staggered per layer via `fadeDelay`) unless `fade`
 *  is false (reduced motion → frameloop "demand", the tween would stall). */
function DiskLayer({ texture, size, y, speed, fade, fadeDelay = 0 }: { texture: THREE.Texture; size: number; y: number; speed: number; fade: boolean; fadeDelay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const fadeStart = useRef<number | null>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Euler order XYZ: z applies first in object space, so this spins the
    // plane around its own normal while x keeps it lying flat.
    if (ref.current) ref.current.rotation.z = t * speed;
    if (fade && matRef.current && matRef.current.opacity < 1) {
      // Clock starts with the canvas, not with this layer (textures load
      // async) — anchor the fade to the first rendered frame instead.
      if (fadeStart.current === null) fadeStart.current = t;
      const p = Math.min(1, Math.max(0, (t - fadeStart.current - fadeDelay) / FADE_DURATION));
      matRef.current.opacity = 1 - Math.pow(1 - p, 3); // ease-out cubic
    }
  });
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial ref={matRef} map={texture} transparent opacity={fade ? 0 : 1} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

// Extra punch baked into every disk texture (the raw PNG reads a bit washed out).
const SATURATE = "saturate(1.9) brightness(1.35)";
// Lighter grade for the light theme — the 1.35/1.9 brightness that glows on a
// dark stage just bleaches to a white blob on the near-white hero.
const SATURATE_LIGHT = "saturate(1.9) brightness(1.05)";

/** Five stacked image planes = one accretion disk: small/small/LARGE/small/small.
 *  The middle (large, blurred) layer spins slightly faster than the small ones.
 *  Layers fade in one after the other (middle first, then outwards) so the
 *  disk builds up gradually instead of popping in. */
function ImageDisk({ smallSize, largeSize, gap = 0.06, speed = 0.22, baseFilter = `${SATURATE} blur(3px)`, middleFilter = `${SATURATE} blur(4px)`, fade = true, fadeDelay = 0 }: { smallSize: number; largeSize: number; gap?: number; speed?: number; baseFilter?: string; middleFilter?: string; fade?: boolean; fadeDelay?: number }) {
  // Every layer is blurred; the middle one keeps its own (stronger/whiter) filter.
  const sharp = useFilteredTexture(DISK_IMG, baseFilter);
  const blurred = useFilteredTexture(DISK_IMG, middleFilter);
  if (!sharp) return null;
  return (
    <group>
      {/* negative = reversed spin direction */}
      <DiskLayer texture={sharp} size={smallSize} y={gap * 2} speed={-speed * 0.9} fade={fade} fadeDelay={fadeDelay + 1.6} />
      <DiskLayer texture={sharp} size={smallSize} y={gap} speed={-speed} fade={fade} fadeDelay={fadeDelay + 0.8} />
      <DiskLayer texture={blurred ?? sharp} size={largeSize} y={0} speed={-speed * 1.25} fade={fade} fadeDelay={fadeDelay} />
      <DiskLayer texture={sharp} size={smallSize} y={-gap} speed={-speed * 0.95} fade={fade} fadeDelay={fadeDelay + 0.8} />
      <DiskLayer texture={sharp} size={smallSize} y={-gap * 2} speed={-speed * 0.85} fade={fade} fadeDelay={fadeDelay + 1.6} />
    </group>
  );
}

/** Debug overlay (`?bh-debug=1`): the group's local axes (X red, Y green = the
 *  disk's spin axis, Z blue) and a thin ring outlining the disk plane, so the
 *  tilts can be read directly on screen. */
function DiskDebug({ axisLength, ringRadius, color }: { axisLength: number; ringRadius: number; color: string }) {
  return (
    <>
      <axesHelper args={[axisLength]} />
      {/* ring in the disk (XZ) plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ringRadius, 0.012, 8, 96]} />
        <meshBasicMaterial color={color} toneMapped={false} depthTest={false} />
      </mesh>
      {/* spin axis, drawn through the hole */}
      <mesh>
        <cylinderGeometry args={[0.008, 0.008, axisLength * 2, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} depthTest={false} />
      </mesh>
    </>
  );
}

/** The black hole group's base tilt (X / Y / Z, radians). The X component
 *  also wobbles ±0.03 every frame — see BlackHoleImage. */
const BH_TILT = new THREE.Euler(Math.PI * 0.2, 0.3, 0.15, "XYZ");

/** Per-frame easing factor for position/scale changes (the lens uses the same). */
const EASE = 0.05;

/** The second disk's own tilt, relative to the black hole group (the axis the
 *  original second particle disk used). This is what phones show. */
const SECOND_DISK_TILT = new THREE.Euler(Math.PI * 0.35, 0.1, 0.2, "XYZ");
const SECOND_DISK_Q_PHONE = new THREE.Quaternion().setFromEuler(SECOND_DISK_TILT);

/** Desktop only: the second disk is turned to face the camera — a full circle
 *  instead of the steep ellipse. This orientation cancels the parent group's
 *  base tilt and then lays the disk in the screen plane (disk normal = world
 *  Z); the parent's ±1.7° wobble still shows through, so it keeps breathing.
 *  Change SECOND_DISK_FACING to tip it back a little (π/2 = flat to the
 *  screen). The main disk is untouched. */
const SECOND_DISK_FACING = new THREE.Euler(Math.PI / 2, 0, 0, "XYZ");
const SECOND_DISK_Q_DESKTOP = new THREE.Quaternion()
  .setFromEuler(BH_TILT)
  .invert()
  .multiply(new THREE.Quaternion().setFromEuler(SECOND_DISK_FACING));

/** Same group structure/tilts/oscillation as the home BlackHole, image disks. */
function BlackHoleImage({ isMobile, isLight, position, scale, fade, debug = false }: { isMobile: boolean; isLight: boolean; position: [number, number, number]; scale: number; fade: boolean; debug?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  // Position/scale are applied once at mount; later prop changes (the stepped
  // mobile hero moves the hole down and shrinks it) are eased in every frame
  // instead of jumping. The lens eases with the same factor.
  const [initial] = useState(() => ({ position, scale }));
  const [px, py, pz] = position;
  const target = useMemo(() => new THREE.Vector3(px, py, pz), [px, py, pz]);
  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.x = BH_TILT.x + Math.sin(clock.getElapsedTime() * 0.15) * 0.03;
    g.position.lerp(target, EASE);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, EASE));
  });
  return (
    <group ref={groupRef} position={initial.position} rotation={BH_TILT} scale={initial.scale}>
      <EventHorizon radius={isMobile ? 0.46 : 0.42} color={isLight ? "#ffffff" : "#000000"} />
      <PhotonRing inner={0.37} outer={0.455} />
      {debug && <DiskDebug axisLength={2.2} ringRadius={1.7} color="#c8f02e" />}
      {/* main disk (particles ran 0.3 → 1.7 radius ⇒ ~3.4 diameter) */}
      <ImageDisk
        smallSize={2.4}
        largeSize={3.4}
        baseFilter={`${isLight ? SATURATE_LIGHT : SATURATE} blur(3px)`}
        middleFilter={`${isLight ? SATURATE_LIGHT : SATURATE} blur(4px)`}
        fade={fade}
      />
      {/* second disk — same 5-layer PNG stack (10 images total). Faces the
          camera on desktop, keeps its original steep tilt on phones. Its
          middle (blurred) layer is deliberately smaller and whiter than the
          main disk's. It starts fading after the main disk is underway. */}
      <group quaternion={isMobile ? SECOND_DISK_Q_PHONE : SECOND_DISK_Q_DESKTOP}>
        {debug && <DiskDebug axisLength={1.6} ringRadius={1.1} color="#14e0c8" />}
        <ImageDisk
          smallSize={1.8}
          largeSize={2.2}
          speed={0.3}
          baseFilter={`${isLight ? SATURATE_LIGHT : SATURATE} blur(3px)`}
          middleFilter={isLight ? "saturate(1.3) brightness(1.15) blur(4px)" : "saturate(1.3) brightness(1.9) blur(4px)"}
          fade={fade}
          fadeDelay={1.2}
        />
        <PhotonRing inner={0.37} outer={0.455} />
      </group>
    </group>
  );
}

interface Props {
  /** Desktop position of the black hole (defaults to centred, for /test-bh). */
  bhPositionOverride?: [number, number, number];
  bhPositionMobileOverride?: [number, number, number];
  bhScaleOverride?: number;
  /** Phone-only scale; falls back to bhScaleOverride, then the 1.3 default. */
  bhScaleMobileOverride?: number;
}

export default function TestBHScene({
  bhPositionOverride,
  bhPositionMobileOverride,
  bhScaleOverride,
  bhScaleMobileOverride,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isLight, setIsLight] = useState(false);
  // Pause the loop (FBO + double full-scene render per frame, ~21 image planes)
  // as soon as the hero leaves the viewport — it used to spin for the whole
  // page. Same pattern as ThreeSphereV2BlackHole.
  const [onScreen, setOnScreen] = useState(true);
  // WebGL context lost (iOS Safari under memory pressure): show the static
  // poster instead of a frozen black canvas.
  const [lost, setLost] = useState(false);
  // `?bh-debug=1` draws axes + disk-plane rings (dev aid, no cost otherwise).
  // Lazy init is safe: this scene is client-only (dynamic import, ssr:false).
  const [debug] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("bh-debug"));
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

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
  const bhScale = isMobile ? bhScaleMobileOverride ?? bhScaleOverride ?? 1.3 : bhScaleOverride ?? 1.7;

  if (lost) return <BlackHolePoster />;

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 10 : 7], fov: 50 }}
        style={{ background: "transparent", position: "absolute", inset: 0, pointerEvents: "none" }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
        frameloop={reduced ? "demand" : onScreen ? "always" : "never"}
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
          <BlackHoleImage isMobile={isMobile} isLight={isLight} position={bhPosition} scale={bhScale} fade={!reduced} debug={debug} />
          {/* Light theme: no central darkening (grey smudge on white) and a
              much softer horizon brightness boost (white blob otherwise). */}
          <GravitationalLens bhPosition={bhPosition} bhScale={bhScale} ampScale={isLight ? 0.25 : 1} shadowLift={isLight ? 1 : 0} />
        </Suspense>
      </Canvas>
    </div>
  );
}
