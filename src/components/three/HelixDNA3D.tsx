"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HelixStrands() {
  const group = useRef<THREE.Group>(null);
  const { strand1, strand2, bridges, colors1, colors2 } = useMemo(() => {
    const steps = 200;
    const s1 = new Float32Array(steps * 3);
    const s2 = new Float32Array(steps * 3);
    const c1 = new Float32Array(steps * 3);
    const c2 = new Float32Array(steps * 3);
    // Brand-tuned gradient: lime → cyan → lime
    const lime = new THREE.Color("#c8f02e");
    const cyan = new THREE.Color("#14e0c8");
    const teal = new THREE.Color("#3ad6a0");

    const bridgePos: Float32Array[] = [];
    const bridgeCol: Float32Array[] = [];

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

      const frac = i / steps;
      const col =
        frac < 0.5
          ? lime.clone().lerp(cyan, frac * 2)
          : cyan.clone().lerp(teal, (frac - 0.5) * 2);
      c1[i3] = col.r; c1[i3 + 1] = col.g; c1[i3 + 2] = col.b;
      c2[i3] = col.r; c2[i3 + 1] = col.g; c2[i3 + 2] = col.b;

      if (i % 10 === 0 && i < steps - 1) {
        const bSteps = 8;
        const bp = new Float32Array(bSteps * 3);
        const bc = new Float32Array(bSteps * 3);
        for (let j = 0; j < bSteps; j++) {
          const f = j / (bSteps - 1);
          bp[j * 3] = s1[i3] + (s2[i3] - s1[i3]) * f;
          bp[j * 3 + 1] = y;
          bp[j * 3 + 2] = s1[i3 + 2] + (s2[i3 + 2] - s1[i3 + 2]) * f;
          bc[j * 3] = col.r; bc[j * 3 + 1] = col.g; bc[j * 3 + 2] = col.b;
        }
        bridgePos.push(bp);
        bridgeCol.push(bc);
      }
    }
    return { strand1: s1, strand2: s2, bridges: { pos: bridgePos, col: bridgeCol }, colors1: c1, colors2: c2 };
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.2;
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
      {bridges.pos.map((bp, idx) => (
        <points key={idx}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[bp, 3]} count={bp.length / 3} />
            <bufferAttribute attach="attributes-color" args={[bridges.col[idx], 3]} count={bridges.col[idx].length / 3} />
          </bufferGeometry>
          <pointsMaterial size={0.04} vertexColors transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
      ))}
    </group>
  );
}

function TravelingParticles({ count = 80 }) {
  const points = useRef<THREE.Points>(null);
  const offsets = useMemo(() => {
    const o = new Float32Array(count);
    for (let i = 0; i < count; i++) o[i] = i / count;
    return o;
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const colors = useMemo(() => {
    const c = new Float32Array(count * 3);
    const lime = new THREE.Color("#c8f02e");
    const cyan = new THREE.Color("#14e0c8");
    for (let i = 0; i < count; i++) {
      const col = i % 2 === 0 ? lime : cyan;
      c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
    }
    return c;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const progress = (offsets[i] + t * 0.08) % 1;
      const angle = progress * Math.PI * 6;
      const y = (progress - 0.5) * 10;
      const strand = i % 2 === 0 ? 0 : Math.PI;
      pos[i3] = Math.cos(angle + strand) * 1.2;
      pos[i3 + 1] = y;
      pos[i3 + 2] = Math.sin(angle + strand) * 1.2;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={1} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
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
  const ref = useRef<HTMLDivElement>(null);
  const tilt = (tiltDeg * Math.PI) / 180;

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ height: `${height}px`, width: "100%" }}>
      {visible && (
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ background: "transparent" }} gl={{ alpha: true, antialias: true }}>
          <group rotation={[0, 0, tilt]}>
            <HelixStrands />
            <TravelingParticles />
          </group>
        </Canvas>
      )}
    </div>
  );
}
