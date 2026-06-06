"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type BlackHoleType from "./ThreeSphereV2BlackHole";

/**
 * Client-only lazy wrapper: keeps three.js + the black-hole scene out of the
 * initial JS bundle (loaded after hydration, ssr:false). The hero already
 * fades the scene in, so there is no layout shift while the chunk loads.
 */
const BlackHole = dynamic(() => import("./ThreeSphereV2BlackHole"), {
  ssr: false,
});

export default function BlackHoleLazy(
  props: ComponentProps<typeof BlackHoleType>
) {
  return <BlackHole {...props} />;
}
