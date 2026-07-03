"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AccretionDisk } from "./ThreeSphereV2BlackHole";

/**
 * /hole-flat sandbox: the home-page black hole's main accretion disk, viewed
 * face-on ("en plano") instead of tilted. Same particle system, same palette
 * logic (lime on the light theme, blue-green on dark) — just rotated so the
 * disk plane faces the camera.
 */
export default function FlatDiskScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  // Same live light/dark detection as the hero scene: the disk swaps its
  // dark-blue outer particles for lime on the white stage.
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

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 5.5 : 4], fov: 50 }}
        style={{ background: "transparent", position: "absolute", inset: 0, pointerEvents: "none" }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
        frameloop={reduced ? "demand" : "always"}
      >
        {/* The disk lives in the XZ plane; -90° around X brings it face-on. */}
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <AccretionDisk count={isMobile ? 1400 : 2400} limeOuter={isLight} />
        </group>
      </Canvas>
    </div>
  );
}
