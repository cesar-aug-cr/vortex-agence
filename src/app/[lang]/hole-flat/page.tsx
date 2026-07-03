import type { Metadata } from "next";
import FlatDiskLazy from "@/components/three/FlatDiskLazy";

// Dev/visual sandbox — never index.
export const metadata: Metadata = {
  title: "hole-flat — disk sandbox",
  robots: { index: false, follow: false },
};

export default function HoleFlatPage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-stage">
      <FlatDiskLazy />
    </main>
  );
}
