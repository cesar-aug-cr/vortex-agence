/**
 * Animated vortx nav logo — vectors extracted from "vortex logo sequence.ai"
 * (3-page sequence). The letters V · R · T · X are shared and inherit
 * `currentColor`; the "O" is a circle rendered in three states, animated in
 * CSS (see globals.css → "Animated nav logo"):
 *
 *   logo 1 — solid dot (currentColor)  ← base / resting state
 *   logo 2 — lime ring  (--accent)
 *   logo 3 — teal ring  (--accent-2)
 *
 * Timeline (13s loop): the dot rests ~5s → logo 2 replaces it and softly
 * flickers with logo 3 for ~5s → the dot returns. On hover the "O" scales
 * up slightly. Respects prefers-reduced-motion (settles on the base logo).
 *
 * viewBox is the artwork's native 600 × 200 box.
 */

// V · R · T · X — shared white letterforms (counter "O" is the circle below)
const V =
  "M53.257 173.336L5.334 59.824L44.057 59.824L70.923 134.370L96.821 59.824L134.822 59.824L86.172 173.336Z";
const R =
  "M280.033 173.336L280.033 59.824L313.435 59.824L314.648 74.105C317.549 70.231 321.543 66.521 326.627 62.970C331.710 59.424 338.280 57.646 346.352 57.646C349.413 57.646 352.040 57.809 354.218 58.131C356.396 58.456 358.532 59.019 360.633 59.824L355.064 90.563C351.513 89.436 347.317 88.868 342.476 88.868C334.250 88.868 327.592 91.330 322.514 96.251C317.430 101.174 314.886 108.149 314.886 117.186L314.886 173.336Z";
const T =
  "M388.462 130.012L388.462 87.172L370.553 87.172L370.553 59.823L388.462 59.823L388.462 22.550L423.315 22.550L423.315 59.823L452.597 59.823L452.597 87.172L423.315 87.172L423.315 131.950C423.315 137.435 424.403 141.673 426.581 144.655C428.759 147.644 432.185 149.133 436.866 149.133C440.413 149.133 443.478 148.526 446.063 147.316C448.644 146.108 451.065 144.697 453.326 143.082L467.363 164.381C456.552 173.094 444.613 177.450 431.541 177.450C420.728 177.450 412.182 175.431 405.885 171.400C399.594 167.368 395.115 161.800 392.457 154.700C389.793 147.601 388.462 139.374 388.462 130.012Z";
const X =
  "M469.779 173.336L511.893 116.459L470.507 59.824L512.136 59.824L532.465 90.078L553.037 59.824L591.038 59.824L551.102 114.038L594.666 173.336L553.037 173.336L530.530 140.661L507.780 173.336Z";

// "O" as a thick ring (donut, even-odd) — logos 2 & 3
const RING =
  "M198.592 146.978C181.839 146.978 168.204 133.343 168.204 116.590C168.204 99.784 181.839 86.202 198.592 86.202C215.398 86.202 228.980 99.784 228.980 116.590C228.980 133.343 215.398 146.978 198.592 146.978M198.592 55.708C164.980 55.708 137.763 82.978 137.763 116.590C137.763 150.202 164.980 177.419 198.592 177.419C232.204 177.419 259.474 150.202 259.474 116.590C259.474 82.978 232.204 55.708 198.592 55.708Z";

// "O" center / dot radius (logo 1) — fills exactly the ring's hole
const O_CX = 198.592;
const O_CY = 116.59;
const O_R = 30.39;

export function LogoMark({
  className,
  title = "vortx",
  animated = true,
}: {
  className?: string;
  title?: string;
  /** When false, freeze on the base "dot" state with no animation/rings. */
  animated?: boolean;
}) {
  return (
    <svg
      className={`${animated ? "vortx-logo" : ""}${className ? ` ${className}` : ""}`.trim()}
      viewBox="0 0 600 200"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shared letterforms */}
      <g fill="currentColor">
        <path d={V} />
        <path d={R} />
        <path d={T} />
        <path d={X} />
      </g>

      {animated ? (
        /* The animated "O" — scales up on hover */
        <g className="vortx-o">
          {/* logo 2 — lime ring */}
          <path
            className="vortx-o-ring vortx-o-lime"
            d={RING}
            fillRule="evenodd"
            fill="var(--accent)"
          />
          {/* logo 3 — teal ring */}
          <path
            className="vortx-o-ring vortx-o-teal"
            d={RING}
            fillRule="evenodd"
            fill="var(--accent-2)"
          />
          {/* logo 1 — solid dot (base) */}
          <circle
            className="vortx-o-dot"
            cx={O_CX}
            cy={O_CY}
            r={O_R}
            fill="currentColor"
          />
        </g>
      ) : (
        /* Static "dot" only — no rings, no animation */
        <circle cx={O_CX} cy={O_CY} r={O_R} fill="currentColor" />
      )}
    </svg>
  );
}
