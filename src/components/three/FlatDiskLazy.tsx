"use client";

import dynamic from "next/dynamic";

// Client-only lazy wrapper (same pattern as BlackHoleLazy): keeps three.js out
// of the initial bundle and skips SSR for the WebGL scene.
const FlatDiskScene = dynamic(() => import("./FlatDiskScene"), { ssr: false });

export default function FlatDiskLazy() {
  return <FlatDiskScene />;
}
