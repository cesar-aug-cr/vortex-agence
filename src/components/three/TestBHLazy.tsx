"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentProps } from "react";
import type TestBHSceneType from "./TestBHScene";
import BlackHolePoster from "./BlackHolePoster";
import { prefersLiteScene } from "@/lib/lite-scene";

// Client-only lazy wrapper (same pattern as BlackHoleLazy): keeps three.js out
// of the initial bundle and skips SSR for the WebGL scene.
const TestBHScene = dynamic(() => import("./TestBHScene"), { ssr: false });

/**
 * Decides between the WebGL scene and the static poster. The check runs in an
 * effect (navigator.connection / deviceMemory don't exist on the server); until
 * it has run nothing is rendered, which is what the scene did anyway (ssr:false
 * + a 2 s fade-in). On Data Saver / 2G / ≤ 2 GB devices the three.js chunk is
 * never requested.
 */
export default function TestBHLazy(props: ComponentProps<typeof TestBHSceneType>) {
  const [lite, setLite] = useState<boolean | null>(null);
  useEffect(() => {
    setLite(prefersLiteScene());
  }, []);
  if (lite === null) return null;
  return lite ? <BlackHolePoster /> : <TestBHScene {...props} />;
}
