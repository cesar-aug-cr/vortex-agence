/**
 * Variant C — "Laser Drones": six tiny laser drones (glowing points with comet
 * trails) fly all over the stage and BUILD a website with their beams, then
 * take it apart again with a rising laser curtain. Pure CSS (no client JS).
 *
 * STORYBOARD (one master loop, T = 15 s; every animation shares it)
 *  0.00–0.25  Swarm in a slow-spinning hexagon, linked by a flickering laser web.
 *  0.65–1.85  FRAME — cyan + green drones race around the empty canvas; their
 *             beams engrave the browser frame from two opposite corners. The
 *             blue drone cuts the chrome divider. 1.85: frame closes → the window
 *             powers on like a CRT (a bright line opening vertically).
 *  1.90–2.56  CHROME — lime drone zaps the 3 dots (spring pops), cyan beam
 *             stretches the URL pill, "vortx.lu" is typed under a beam.
 *  2.30–2.70  BLUEPRINT — three laser guide lines (column edges + headline top).
 *  2.64–3.22  NAV — logo printed letter by letter, nav pills zapped in, eyebrow chip.
 *  3.35–4.75  HEADLINE — a drone flies over line 1 and PRINTS it letter by letter
 *             (squash-and-stretch pops), a second drone prints line 2 (lime) from below.
 *  4.90–6.16  FLOURISH — laser underline, a wave runs through every letter, the
 *             last word does an elastic scale. Tagline scanned in word by word.
 *  5.95–6.95  CTA — two beams trace the pill outline, the lime fill pours in,
 *             label words slide up, arrow pops, CTA starts to glow.
 *  7.00–8.35  CARDS — three beams outline three cards at once, they snap in;
 *             "100" ring is drawn, SEO bars spring up, conversion line is drawn.
 *  8.65–9.20  LIVE — loading bar completes, guides fade, LIVE badge pops, rim glows.
 *  9.15–10.9  PAYOFF — laser-web power surge, the site tilts in 3D with a lime
 *             glow pulse; a cursor clicks the CTA → press, ripple, conversion
 *             burst, "+38 %" pulses. 11.1–11.8 tilt back.
 * 11.90–13.90 DISMANTLE — two drones raise a laser curtain from the bottom;
 *             every element it crosses collapses CRT-style; the frame retracts.
 * 13.90–15.00 Drones regroup into the hexagon → seamless loop.
 *
 * Reduced motion: every animation is cancelled by the site, so the base styles
 * are a finished, LIVE website poster (drones, beams and guides hidden).
 */
import type { CSSProperties } from "react";
import type { SitesWebMotionProps } from "./types";
import {
  T,
  buildScene,
  cq,
  COL,
  WIN,
  DIV_Y,
  DOTS,
  DOT_Y,
  URL,
  URL_TXT,
  LIVE,
  LOGO,
  NAVP,
  NAVP_W,
  NAVCTA,
  EYE,
  HEAD,
  TAG,
  CTA,
  CARDS,
  CARD_Y0,
  CARD_Y1,
  RING,
  BARS,
  CHART,
  type ColName,
} from "./LabC.scene";

const JAK = "var(--font-jakarta), var(--font-inter-tight), system-ui, sans-serif";
const SANS = "var(--font-inter-tight), system-ui, sans-serif";
const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

const ms = (v: number) => `${Math.round(v)}ms`;
/** comet trail = lagged copies of each drone: [lag ms, radius, opacity] */
const TRAIL: [number, number, number][] = [
  [14, 7.5, 0.9],
  [30, 6, 0.6],
  [48, 4.6, 0.38],
];
const SPARKS = [-120, 40];
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  left: cq(x),
  top: cq(y),
  ...(w !== undefined ? { width: cq(w) } : {}),
  ...(h !== undefined ? { height: cq(h) } : {}),
});
const rad = (d: number) => (d * Math.PI) / 180;

export default function SitesWebMotionC({
  className,
  title = "Sites web qui convertissent",
  tagline = "Des sites rapides, pensés pour transformer le visiteur en client.",
  cta = "Réserver un appel",
}: SitesWebMotionProps) {
  const sc = buildScene(title, tagline, cta);
  const { ids, paths: p } = sc;
  const cols: ColName[] = ["lime", "cyan", "green", "blue"];
  const ctaMid = CTA.y + CTA.h / 2;
  const winD = `M${WIN.x0 + WIN.r} ${WIN.y0}H${WIN.x1 - WIN.r}A${WIN.r} ${WIN.r} 0 0 1 ${WIN.x1} ${WIN.y0 + WIN.r}V${WIN.y1 - WIN.r}A${WIN.r} ${WIN.r} 0 0 1 ${WIN.x1 - WIN.r} ${WIN.y1}H${WIN.x0 + WIN.r}A${WIN.r} ${WIN.r} 0 0 1 ${WIN.x0} ${WIN.y1 - WIN.r}V${WIN.y0 + WIN.r}A${WIN.r} ${WIN.r} 0 0 1 ${WIN.x0 + WIN.r} ${WIN.y0}Z`;
  const dash = (len: number) => `${len} ${len + 2}`;

  return (
    <div className={`illu-motion ${sc.rootClass} ${className ?? ""}`} aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: sc.css }} />

      {/* ---------- static blueprint backdrop ---------- */}
      <svg className="swc-L" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <pattern id={ids.grid} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r=".75" fill={COL.white} fillOpacity=".13" />
          </pattern>
        </defs>
        <rect x="8" y="8" width="384" height="384" fill={`url(#${ids.grid})`} />
        <path
          d={`M${WIN.x0 - 8} ${WIN.y0 + 6}V${WIN.y0 - 8}H${WIN.x0 + 6}M${WIN.x1 - 6} ${WIN.y0 - 8}H${WIN.x1 + 8}V${WIN.y0 + 6}M${WIN.x1 + 8} ${WIN.y1 - 6}V${WIN.y1 + 8}H${WIN.x1 - 6}M${WIN.x0 + 6} ${WIN.y1 + 8}H${WIN.x0 - 8}V${WIN.y1 - 6}`}
          fill="none"
          stroke={COL.cyan}
          strokeOpacity=".45"
          strokeWidth=".8"
        />
      </svg>

      <div className="swc-halo swc-hl" />

      {/* ---------- the website (tilts as one plane at the payoff) ---------- */}
      <div className="swc-site swc-st">
        <svg className="swc-L" viewBox="0 0 400 400" aria-hidden="true">
          <defs>
            <linearGradient id={`${ids.grid}-fr`} gradientUnits="userSpaceOnUse" x1={WIN.x0} y1={WIN.y0} x2={WIN.x1} y2={WIN.y1}>
              <stop offset="0" stopColor={COL.lime} />
              <stop offset=".45" stopColor={COL.cyan} />
              <stop offset="1" stopColor={COL.blue} />
            </linearGradient>
            <linearGradient id={`${ids.grid}-fl`} x1="0" y1="0" x2="0" y2="1">
              <stop offset=".3" stopColor={COL.white} stopOpacity="0" />
              <stop offset=".5" stopColor={COL.white} stopOpacity=".95" />
              <stop offset=".7" stopColor={COL.white} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={ids.barG} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0" stopColor={COL.blue} />
              <stop offset="1" stopColor={COL.cyan} />
            </linearGradient>
            <linearGradient id={ids.area} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={COL.lime} stopOpacity=".32" />
              <stop offset="1" stopColor={COL.lime} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* lime rim glow (pulses when the site goes live) */}
          <path className="swc-rm" d={winD} opacity=".35" fill="none" stroke={COL.lime} strokeWidth="9" strokeOpacity=".16" />
          <path className="swc-rm" d={winD} opacity=".35" fill="none" stroke={COL.lime} strokeWidth="3.2" strokeOpacity=".4" />

          {/* window body: powers on like a CRT, wiped by the curtain */}
          <g className="swc-wf">
            <rect x={WIN.x0} y={WIN.y0} width={WIN.x1 - WIN.x0} height={WIN.y1 - WIN.y0} rx={WIN.r} fill="#0d0e14" fillOpacity=".95" />
            <path
              d={`M${WIN.x0} ${DIV_Y}V${WIN.y0 + WIN.r}A${WIN.r} ${WIN.r} 0 0 1 ${WIN.x0 + WIN.r} ${WIN.y0}H${WIN.x1 - WIN.r}A${WIN.r} ${WIN.r} 0 0 1 ${WIN.x1} ${WIN.y0 + WIN.r}V${DIV_Y}Z`}
              fill={COL.white}
              fillOpacity=".035"
            />
          </g>
          <rect className="swc-fl swc-tmp" x={WIN.x0} y={WIN.y0} width={WIN.x1 - WIN.x0} height={WIN.y1 - WIN.y0} rx={WIN.r} fill={`url(#${ids.grid}-fl)`} />

          {/* blueprint guides (temporary) */}
          <g fill="none" stroke={COL.cyan} strokeWidth=".7" strokeOpacity=".55">
            <path className="swc-g1 swc-tmp" d={p.gV1.d} strokeDasharray={dash(p.gV1.len)} />
            <path className="swc-g2 swc-tmp" d={p.gV2.d} strokeDasharray={dash(p.gV2.len)} />
            <path className="swc-g3 swc-tmp" d={p.gH1.d} strokeDasharray={dash(p.gH1.len)} />
          </g>

          {/* engraved frame: glow + core, two halves */}
          <g fill="none">
            <path className="swc-fa" d={p.frameA.d} stroke={COL.cyan} strokeOpacity=".16" strokeWidth="5" strokeDasharray={dash(p.frameA.len)} />
            <path className="swc-fb" d={p.frameB.d} stroke={COL.cyan} strokeOpacity=".16" strokeWidth="5" strokeDasharray={dash(p.frameB.len)} />
            <path className="swc-fa" d={p.frameA.d} stroke={`url(#${ids.grid}-fr)`} strokeWidth="1.6" strokeDasharray={dash(p.frameA.len)} />
            <path className="swc-fb" d={p.frameB.d} stroke={`url(#${ids.grid}-fr)`} strokeWidth="1.6" strokeDasharray={dash(p.frameB.len)} />
          </g>

          {/* chrome */}
          <path className="swc-dv" d={p.divider.d} fill="none" stroke={COL.white} strokeOpacity=".14" strokeWidth="1" strokeDasharray={dash(p.divider.len)} />
          <g transform={`translate(${WIN.x0} ${DIV_Y})`}>
            <rect className="swc-ld swc-tmp" x="0" y="-.9" width={WIN.x1 - WIN.x0} height="1.8" fill={COL.lime} />
          </g>
          {DOTS.map((x, i) => (
            <g key={x} transform={`translate(${x} ${DOT_Y})`}>
              <circle className={`swc-dt${i}`} r="3.4" fill={COL.lime} fillOpacity={[1, 0.62, 0.32][i]} />
            </g>
          ))}
          <g transform={`translate(${URL.x} ${URL.y})`}>
            <rect className="swc-up" width={URL.w} height={URL.h} rx={URL.h / 2} fill={COL.white} fillOpacity=".06" stroke={COL.white} strokeOpacity=".1" strokeWidth=".6" />
          </g>

          {/* nav */}
          <g transform={`translate(${LOGO.gx + LOGO.g / 2} ${LOGO.cy})`}>
            <g className="swc-lg">
              <rect x={-LOGO.g / 2} y={-LOGO.g / 2} width={LOGO.g} height={LOGO.g} rx="2.6" fill={COL.lime} />
              <path d="M-2.4 -1.6L0 2L2.4 -1.6" fill="none" stroke="#0a0a0b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
          {NAVP.map((x, i) => (
            <g key={x} transform={`translate(${x + NAVP_W / 2} ${LOGO.cy})`}>
              <rect className={`swc-nv${i}`} x={-NAVP_W / 2} y="-2" width={NAVP_W} height="4" rx="2" fill={COL.white} fillOpacity=".3" />
            </g>
          ))}
          <g transform={`translate(${NAVCTA.x + NAVCTA.w / 2} ${LOGO.cy})`}>
            <g className="swc-nv3">
              <rect x={-NAVCTA.w / 2} y={-NAVCTA.h / 2} width={NAVCTA.w} height={NAVCTA.h} rx={NAVCTA.h / 2} fill={COL.lime} fillOpacity=".14" stroke={COL.lime} strokeOpacity=".7" strokeWidth=".8" />
              <rect x="-11" y="-1.6" width="22" height="3.2" rx="1.6" fill={COL.lime} fillOpacity=".85" />
            </g>
          </g>

          {/* cards */}
          {CARDS.map((c, i) => {
            const cx = (c.x0 + c.x1) / 2;
            const cy = (CARD_Y0 + CARD_Y1) / 2;
            const w = c.x1 - c.x0;
            const h = CARD_Y1 - CARD_Y0;
            return (
              <g key={i} transform={`translate(${cx} ${cy})`}>
                <g className={`swc-cd${i}`}>
                  <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="8" fill={COL.white} fillOpacity=".045" stroke={COL.white} strokeOpacity=".11" strokeWidth=".8" />
                  <g transform={`translate(${-cx} ${-cy})`}>
                    {i === 0 && (
                      <>
                        <circle cx={RING.cx} cy={RING.cy} r={RING.r} fill="none" stroke={COL.white} strokeOpacity=".1" strokeWidth="3" />
                        <path className="swc-rg" d={p.ring.d} fill="none" stroke={COL.green} strokeWidth="3" strokeDasharray={dash(p.ring.len)} />
                        <path d="M88 309h40M88 318h28M88 327h34" stroke={COL.white} strokeOpacity=".2" strokeWidth="4" strokeLinecap="round" />
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <path d="M160 316h26M160 325h18" stroke={COL.white} strokeOpacity=".16" strokeWidth="4" strokeLinecap="round" />
                        {BARS.h.map((bh, k) => (
                          <g key={k} transform={`translate(${BARS.x0 + k * (BARS.w + BARS.gap)} ${BARS.base})`}>
                            <rect className={`swc-br${k}`} x="0" y={-bh} width={BARS.w} height={bh} rx="1.6" fill={`url(#${ids.barG})`} fillOpacity={0.55 + k * 0.15} />
                          </g>
                        ))}
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <path className="swc-ar" d={p.area.d} fill={`url(#${ids.area})`} />
                        <path className="swc-ch" d={p.chart.d} fill="none" stroke={COL.lime} strokeWidth="1.8" strokeLinejoin="round" strokeDasharray={dash(p.chart.len)} />
                        <g transform={`translate(${CHART[CHART.length - 1].x} ${CHART[CHART.length - 1].y})`}>
                          <circle className="swc-cp" r="2.8" fill={COL.lime} stroke={COL.lime} strokeOpacity=".3" strokeWidth="3.2" />
                        </g>
                      </>
                    )}
                  </g>
                </g>
              </g>
            );
          })}
          {CARDS.map((_, i) => {
            const g = p[`card${i}`];
            return <path key={i} className={`swc-co${i} swc-tmp`} d={g.d} fill="none" stroke={[COL.cyan, COL.green, COL.cyan][i]} strokeWidth="1.3" strokeDasharray={dash(g.len)} />;
          })}

          {/* CTA outline halves (temporary) + secondary play button */}
          <path className="swc-co swc-tmp" d={p.ctaTop.d} fill="none" stroke={COL.lime} strokeWidth="1.4" strokeDasharray={dash(p.ctaTop.len)} />
          <path className="swc-cu swc-tmp" d={p.ctaBot.d} fill="none" stroke={COL.blue} strokeWidth="1.4" strokeDasharray={dash(p.ctaBot.len)} />
          <g transform={`translate(${sc.cta.playX} ${ctaMid})`}>
            <g className="swc-pb">
              <circle r={CTA.h / 2 - 1} fill="none" stroke={COL.white} strokeOpacity=".3" strokeWidth=".9" />
              <path d="M-2.6 -4.2L4.4 0L-2.6 4.2Z" fill={COL.white} fillOpacity=".85" />
            </g>
          </g>
        </svg>

        {/* ---------- HTML text layer (kinetic typography) ---------- */}
        <div className="swc-abs" style={{ inset: 0 }}>
          {/* URL */}
          <div
            className="swc-abs swc-uh"
            style={{ ...box(URL_TXT.x, URL.y, URL.w - 10, URL.h), fontFamily: MONO, fontWeight: 500, fontSize: cq(URL_TXT.fs), lineHeight: cq(URL.h), color: "rgba(242,243,238,.78)", whiteSpace: "nowrap" }}
          >
            <svg className="swc-ty" viewBox="0 0 10 12" style={{ position: "static", display: "inline-block", width: cq(6), height: cq(7.2), marginRight: cq(3), verticalAlign: "-0.05em", animationDelay: ms(sc.url.d[0]) }}>
              <path d="M2.5 5h5a1.5 1.5 0 0 1 1.5 1.5V10a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 1 10V6.5A1.5 1.5 0 0 1 2.5 5ZM3 5V3.6a2 2 0 0 1 4 0V5" fill={COL.lime} stroke={COL.lime} strokeWidth=".9" />
            </svg>
            {Array.from(sc.url.text).map((ch, k) => (
              <span key={k} className="swc-ty" style={{ animationDelay: ms(sc.url.d[k + 1]) }}>
                {ch}
              </span>
            ))}
          </div>

          {/* LIVE badge */}
          <div
            className="swc-abs swc-lv"
            style={{ ...box(LIVE.x, LIVE.y, LIVE.w, LIVE.h), display: "flex", alignItems: "center", justifyContent: "center", gap: cq(3), borderRadius: 999, border: "0.25cqw solid rgba(200,240,46,.5)", background: "rgba(200,240,46,.12)", fontFamily: MONO, fontWeight: 700, fontSize: cq(8.4), letterSpacing: ".08em", color: COL.lime }}
          >
            <span className="swc-lvd" style={{ display: "block", width: cq(4.4), height: cq(4.4), borderRadius: 99, background: COL.lime, boxShadow: "0 0 1.2cqw rgba(200,240,46,.9)" }} />
            LIVE
          </div>

          {/* logo */}
          <div className="swc-abs swc-lh" style={{ ...box(LOGO.tx, LOGO.cy - LOGO.fs * 0.6), fontFamily: JAK, fontWeight: 800, fontSize: cq(LOGO.fs), lineHeight: 1.2, color: COL.white, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
            {Array.from(sc.logo.text).map((ch, k) => (
              <span key={k} className="swc-ty" style={{ animationDelay: ms(sc.logo.d[k]), color: k >= 3 ? COL.lime : undefined }}>
                {ch}
              </span>
            ))}
          </div>

          {/* eyebrow chip */}
          <div
            className="swc-abs swc-ey"
            style={{ ...box(EYE.x, EYE.y, undefined, EYE.h), display: "flex", alignItems: "center", padding: `0 ${cq(5)}`, borderRadius: 999, border: "0.22cqw solid rgba(200,240,46,.4)", fontFamily: MONO, fontWeight: 700, fontSize: cq(EYE.fs), letterSpacing: ".14em", color: COL.lime, whiteSpace: "nowrap" }}
          >
            {"</> NEXT.JS"}
          </div>

          {/* headline — printed letter by letter */}
          <div className="swc-abs" style={{ ...box(HEAD.x, HEAD.y), fontFamily: JAK, fontWeight: 800, fontSize: cq(sc.head.fs), lineHeight: HEAD.lh, letterSpacing: `${HEAD.ls}em`, color: COL.white }}>
            {sc.head.lines.map((line, li) => {
              const last = li === sc.head.lines.length - 1 && sc.head.lines.length > 1;
              return (
                <div key={li} className={`swc-ln swc-h${li}`} style={last ? { color: COL.lime } : undefined}>
                  {line.words.map((w, wi) => [
                    wi > 0 ? " " : null,
                    <span key={wi} className={last ? "swc-hw swc-el" : "swc-w"}>
                      {w.map((l, k) => (
                        <span key={k} className="swc-lp" style={{ animationDelay: ms(l.dp) }}>
                          <span className="swc-lw" style={{ animationDelay: ms(l.dw) }}>
                            {l.ch}
                          </span>
                        </span>
                      ))}
                      {last && <span className="swc-ul" style={{ top: "0.93em", height: "0.065em" }} />}
                    </span>,
                  ])}
                </div>
              );
            })}
          </div>

          {/* tagline — scanned in word by word */}
          <div
            className="swc-abs swc-tg"
            style={{ ...box(TAG.x, TAG.y, TAG.w), maxHeight: cq(TAG.fs * TAG.lh * 2 + 1), overflow: "hidden", fontFamily: SANS, fontWeight: 400, fontSize: cq(TAG.fs), lineHeight: TAG.lh, color: "rgba(242,243,238,.66)" }}
          >
            {sc.tag.words.map((w, k) => [
              k > 0 ? " " : null,
              <span key={k} className="swc-tw" style={{ animationDelay: ms(w.d) }}>
                {w.text}
              </span>,
            ])}
          </div>

          {/* CTA */}
          <div className="swc-abs swc-cg" style={box(CTA.x - 30, CTA.y - 26, sc.cta.w + 60, CTA.h + 52)} />
          <div className="swc-abs swc-ct" style={box(CTA.x, CTA.y, sc.cta.w, CTA.h)}>
            <span className="swc-cf" />
            <span
              style={{ position: "relative", display: "flex", height: "100%", alignItems: "center", justifyContent: "center", gap: "0.3em", fontFamily: SANS, fontWeight: 600, fontSize: cq(sc.cta.fs), lineHeight: 1.25, color: "#0a0a0b", whiteSpace: "nowrap" }}
            >
              {sc.cta.words.map((w, k) => (
                <span key={k} className="swc-cm">
                  <span className="swc-cw" style={{ animationDelay: ms(w.d) }}>
                    {w.text}
                  </span>
                </span>
              ))}
              <svg className="swc-ca" viewBox="0 0 12 12" style={{ position: "static", display: "block", width: "0.95em", height: "0.95em", marginLeft: "0.1em" }}>
                <path d="M2 6h7.5M6.5 2.8 9.7 6l-3.2 3.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* card labels */}
          <div className="swc-abs swc-k0" style={{ ...box(RING.cx - 14, RING.cy - 7, 28, 14), display: "flex", alignItems: "center", justifyContent: "center", transformOrigin: "50% 50%", fontFamily: JAK, fontWeight: 800, fontSize: cq(9.2), color: COL.white, letterSpacing: "-0.02em" }}>
            100
          </div>
          <div className="swc-abs swc-k1" style={{ ...box(158, 291), fontFamily: MONO, fontWeight: 700, fontSize: cq(9.6), letterSpacing: ".06em", color: COL.cyan, lineHeight: 1.2 }}>
            SEO
          </div>
          <div className="swc-abs swc-k2" style={{ ...box(CARDS[2].x0 + 9, 288), fontFamily: JAK, fontWeight: 800, fontSize: cq(12.4), letterSpacing: "-0.02em", color: COL.lime, lineHeight: 1.1, whiteSpace: "nowrap" }}>
            +38&#8202;%
          </div>

          {/* conversion: ripple, burst, cursor */}
          <div className="swc-abs swc-rp" style={box(CTA.x + sc.cta.w / 2 - 14, ctaMid - 14, 28, 28)} />
          {sc.burst.map((a, k) => (
            <span
              key={a}
              className="swc-abs swc-bp"
              style={{ ...box(CTA.x + sc.cta.w / 2, ctaMid - 0.75, k % 2 ? 26 : 36, 1.5), rotate: `${a}deg`, transformOrigin: "0 50%", borderRadius: 99, background: `linear-gradient(90deg, transparent, ${[COL.lime, COL.cyan, COL.green, COL.white][k % 4]})` }}
            />
          ))}
          <svg className="swc-abs swc-cs" viewBox="0 0 14 20" style={{ ...box(CTA.x + sc.cta.w / 2 + 4, ctaMid + 2, 14, 20), overflow: "visible" }}>
            <path d="M1 1v15.5l4.2-4 2.9 6.6 2.8-1.2-2.9-6.4H14z" fill="#0a0a0b" stroke={COL.white} strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ---------- lasers & drones (temporary FX, hidden in the poster) ---------- */}
      <svg className="swc-L swc-fx" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          {cols.map((c) => [
            <radialGradient key={`g${c}`} id={ids.g(c)}>
              <stop offset="0" stopColor={COL[c]} stopOpacity=".95" />
              <stop offset=".28" stopColor={COL[c]} stopOpacity=".42" />
              <stop offset="1" stopColor={COL[c]} stopOpacity="0" />
            </radialGradient>,
            <linearGradient key={`b${c}`} id={ids.b(c)} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={COL[c]} stopOpacity="0" />
              <stop offset=".5" stopColor={COL[c]} stopOpacity=".6" />
              <stop offset="1" stopColor={COL[c]} stopOpacity="0" />
            </linearGradient>,
          ])}
          <linearGradient id={`${ids.grid}-cb`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={COL.lime} stopOpacity="0" />
            <stop offset=".5" stopColor={COL.lime} stopOpacity=".2" />
            <stop offset="1" stopColor={COL.cyan} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* curtain glow band + debris thrown off the scan line */}
        <g className="swc-cb">
          <rect x="-20" y="-34" width="440" height="68" fill={`url(#${ids.grid}-cb)`} />
          {[60, 150, 250, 340].map((x, k) => (
            <circle key={x} className="swc-db" cx={x} cy="-1" r={k % 2 ? 1.5 : 2} fill={k % 3 ? COL.cyan : COL.lime} style={{ animationDelay: ms(-k * 83) }} />
          ))}
        </g>

        {/* impact points (absolute) */}
        {sc.drones.map((d) => (
          <g key={`ip${d.id}`} className={`swc-ip${d.id}`}>
            <circle r="15" fill={`url(#${ids.g(d.col)})`} />
            <path className="swc-fk" d="M-11 0H11M0 -11V11M-4.5 -4.5L4.5 4.5M-4.5 4.5L4.5 -4.5" stroke="#fff" strokeOpacity=".85" strokeWidth=".6" style={{ animationDelay: ms(-d.id * 23) }} />
            {SPARKS.map((a, k) => {
              const ang = rad(a + d.id * 29);
              return (
                <line
                  key={a}
                  className="swc-sp"
                  x1={(2.2 * Math.cos(ang)).toFixed(2)}
                  y1={(2.2 * Math.sin(ang)).toFixed(2)}
                  x2={(4.4 * Math.cos(ang)).toFixed(2)}
                  y2={(4.4 * Math.sin(ang)).toFixed(2)}
                  stroke={k % 2 ? "#fff" : COL[d.col]}
                  strokeWidth="1"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ animationDelay: ms(-k * 75 - d.id * 31) }}
                />
              );
            })}
            <circle r="2.5" fill="#fff" />
          </g>
        ))}

        {/* comet trails: lagged copies of each drone (same keyframes, shifted in time) */}
        {sc.drones.map((d) =>
          TRAIL.map(([lag, r, o]) => (
            <g key={`gh${d.id}-${lag}`} className={`swc-dx${d.id}`} style={{ animationDelay: ms(lag - T) }}>
              <circle className={`swc-dy${d.id}`} r={r} fill={`url(#${ids.g(d.col)})`} fillOpacity={o} style={{ animationDelay: ms(lag - T) }} />
            </g>
          ))
        )}

        {/* drones: web line, beam, body */}
        {sc.drones.map((d) => (
          <g key={`d${d.id}`} className={`swc-dx${d.id}`}>
            <g className={`swc-dy${d.id}`}>
              <g className={`swc-wb${d.id}`}>
                <rect x="0" y="-2.4" width="1" height="4.8" fill={`url(#${ids.b(d.col)})`} />
                <rect x="0" y="-.45" width="1" height=".9" fill="#fff" fillOpacity=".9" />
              </g>
              <g className={`swc-bm${d.id}`}>
                <rect x="0" y="-7" width="1" height="14" fill={`url(#${ids.b(d.col)})`} />
                <rect x="0" y="-1.35" width="1" height="2.7" fill={COL[d.col]} fillOpacity=".9" />
                <rect x="0" y="-.55" width="1" height="1.1" fill="#fff" />
              </g>
              <circle className="swc-bd" r="11" fill={`url(#${ids.g(d.col)})`} style={{ animationDelay: ms(-d.id * 125) }} />
              <circle r="1.9" fill="#fff" stroke={COL[d.col]} strokeWidth="1.5" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
