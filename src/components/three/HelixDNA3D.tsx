"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HelixStrands({ steps = 200, animate = true }: { steps?: number; animate?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { strand1, strand2, bridgePos, bridgeCol, colors1, colors2 } = useMemo(() => {
    const s1 = new Float32Array(steps * 3);
    const s2 = new Float32Array(steps * 3);
    const c1 = new Float32Array(steps * 3);
    const c2 = new Float32Array(steps * 3);
    // One strand lime, the other cyan; rungs blend between the two.
    const lime = new THREE.Color("#c8f02e");
    const cyan = new THREE.Color("#14e0c8");

    // All "rungs" are accumulated into a single buffer → one draw call instead
    // of ~20 separate <points> (one per bridge).
    const bp: number[] = [];
    const bc: number[] = [];

    for (let i = 0; i < steps; i++) {
      const i3 = i * 3;
      const t = (i / steps) * Math.PI * 6;
      const y = (i / steps - 0.5) * 10;
      const r = 1.2;

      s1[i3] = Math.cos(t) * r;
      s1[i3 + 1] = y;
      s1[i3 + 2] = Math.sin(t) * r;

      s2[i3] = Math.cos(t + Math.PI) * r;
      s2[i3 + 1] = y;
      s2[i3 + 2] = Math.sin(t + Math.PI) * r;

      c1[i3] = lime.r; c1[i3 + 1] = lime.g; c1[i3 + 2] = lime.b;
      c2[i3] = cyan.r; c2[i3 + 1] = cyan.g; c2[i3 + 2] = cyan.b;

      if (i % 10 === 0 && i < steps - 1) {
        const bSteps = 8;
        for (let j = 0; j < bSteps; j++) {
          const f = j / (bSteps - 1);
          bp.push(
            s1[i3] + (s2[i3] - s1[i3]) * f,
            y,
            s1[i3 + 2] + (s2[i3 + 2] - s1[i3 + 2]) * f
          );
          const col = lime.clone().lerp(cyan, f);
          bc.push(col.r, col.g, col.b);
        }
      }
    }
    return {
      strand1: s1,
      strand2: s2,
      bridgePos: new Float32Array(bp),
      bridgeCol: new Float32Array(bc),
      colors1: c1,
      colors2: c2,
    };
  }, [steps]);

  useFrame(({ clock }) => {
    if (!group.current || !animate) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.07;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[strand1, 3]} count={strand1.length / 3} />
          <bufferAttribute attach="attributes-color" args={[colors1, 3]} count={colors1.length / 3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[strand2, 3]} count={strand2.length / 3} />
          <bufferAttribute attach="attributes-color" args={[colors2, 3]} count={colors2.length / 3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[bridgePos, 3]} count={bridgePos.length / 3} />
          <bufferAttribute attach="attributes-color" args={[bridgeCol, 3]} count={bridgeCol.length / 3} />
        </bufferGeometry>
        <pointsMaterial size={0.055} vertexColors transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

export default function HelixDNA3D({
  className,
  height = 420,
  tiltDeg = 0,
}: {
  className?: string;
  height?: number;
  /** Tilt around the view axis. Negative = top leans right (bottom-left → top-right). */
  tiltDeg?: number;
}) {
  const [visible, setVisible] = useState(false);
  // Mount the Canvas once (first time it scrolls into view) and keep it: the
  // previous mount/unmount on every viewport pass re-created the WebGL context
  // and recompiled the shaders each time (risky on iOS). Off-screen it now
  // just stops its frameloop.
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tilt = (tiltDeg * Math.PI) / 180;

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setMounted(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => {
      window.removeEventListener("resize", check);
      mq.removeEventListener?.("change", apply);
    };
  }, []);

  // Decorative only: on phones the helix costs a WebGL context and battery
  // for a background that is mostly hidden behind the cards — skip it.
  if (isMobile) return null;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        height: `${height}px`,
        width: "100%",
        // Fade in instead of popping when the canvas mounts into view.
        opacity: visible ? 1 : 0,
        transition: reduced ? "none" : "opacity 1600ms ease-out",
      }}
    >
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: "transparent" }}
          // Cap DPR + drop AA on mobile (additive points don't benefit from it).
          dpr={isMobile ? 1 : [1, 1.5]}
          gl={{
            alpha: true,
            antialias: !isMobile,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          // Decorative canvas → no pointer interaction; single static frame when
          // the user prefers reduced motion.
          frameloop={reduced ? "demand" : visible ? "always" : "never"}
          raycaster={{ enabled: false } as never}
        >
          <group rotation={[0, 0, tilt]}>
            <HelixStrands steps={isMobile ? 120 : 200} animate={!reduced} />
          </group>
        </Canvas>
      )}
    </div>
  );
}
