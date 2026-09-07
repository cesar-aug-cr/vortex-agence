import Image from "next/image";

/**
 * Static stand-in for the hero black hole: the accretion-disk texture the
 * three.js scene already ships (public/three/black-hole-disk.png, ~58 KB),
 * placed where the scene draws the hole (right half on desktop, upper area on
 * phones) with a soft glow. Used instead of the WebGL scene when the visitor
 * asked for lite content (Data Saver, low-memory device, 2G) and as the
 * fallback when the GPU drops the WebGL context.
 */
export default function BlackHolePoster() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute left-1/2 top-[38%] aspect-square w-[120vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 md:left-auto md:right-[-6%] md:top-1/2 md:w-[min(56vw,820px)] md:max-w-none md:translate-x-0"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(20,224,200,0.14), rgba(200,240,46,0.06) 45%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />
        <Image
          src="/three/black-hole-disk.png"
          alt=""
          fill
          sizes="(min-width: 768px) 56vw, 120vw"
          className="object-contain opacity-80 [filter:saturate(1.15)_blur(1px)]"
        />
      </div>
    </div>
  );
}
