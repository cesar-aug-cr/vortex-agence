"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type TestBHSceneType from "./TestBHScene";

// Client-only lazy wrapper (same pattern as BlackHoleLazy): keeps three.js out
// of the initial bundle and skips SSR for the WebGL scene.
const TestBHScene = dynamic(() => import("./TestBHScene"), { ssr: false });

export default function TestBHLazy(props: ComponentProps<typeof TestBHSceneType>) {
  return <TestBHScene {...props} />;
}
