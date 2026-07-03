import type { Metadata } from "next";
import TestBHLazy from "@/components/three/TestBHLazy";

// Dev/visual sandbox — never index.
export const metadata: Metadata = {
  title: "test-bh — image-disk black hole sandbox",
  robots: { index: false, follow: false },
};

export default function TestBHPage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-stage">
      <TestBHLazy />
    </main>
  );
}
