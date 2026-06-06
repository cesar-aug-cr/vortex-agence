"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type HelixType from "./HelixDNA3D";

/**
 * Client-only lazy wrapper: keeps three.js + the DNA helix out of the initial
 * JS bundle (loaded after hydration, ssr:false). The helix only mounts when
 * its section scrolls into view anyway.
 */
const Helix = dynamic(() => import("./HelixDNA3D"), { ssr: false });

export default function HelixDNALazy(props: ComponentProps<typeof HelixType>) {
  return <Helix {...props} />;
}
