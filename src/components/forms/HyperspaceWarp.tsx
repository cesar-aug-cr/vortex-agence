"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Full-screen "hyperspace" warp overlay shown while the contact form submits
 * and the browser navigates to the thank-you page. WebGL starfield (ported from
 * a standalone demo) recoloured to the brand palette (lime → cyan). No audio.
 * Honours reduced motion: falls back to a calm brand glow + a pulsing dot.
 */
export function HyperspaceWarp({ label }: { label?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-no-motion");
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    // Light theme → white backdrop + alpha-blended coloured (bigger) particles;
    // dark theme → black backdrop + additive glow.
    const isDark = document.documentElement.classList.contains("dark");
    const uLight = isDark ? 0 : 1;

    // ── GLSL ──────────────────────────────────────────────
    const VS = `
      attribute float aId;
      uniform float uTime, uSpeed, uAspect, uLight;
      varying float vBrightness, vHue;
      #define PI 3.14159265
      float hash(float n){ return fract(sin(n*127.1)*43758.5453); }
      void main(){
        float id = aId;
        float angle = hash(id*1.3)*PI*2.0;
        float radius = hash(id*2.7)*0.9+0.05;
        float zOff = hash(id*3.9);
        float z = mod(zOff + uTime*uSpeed*(0.8+hash(id*0.7)*0.4), 1.0);
        float fov = 0.6 + uSpeed*0.3;
        float iz = 1.0/max(z,0.001);
        float px = cos(angle)*radius*iz*fov;
        float py = sin(angle)*radius*iz*fov;
        px /= uAspect;
        gl_Position = vec4(px, py, 0.0, 1.0);
        float sz = (1.0-z)*4.0+0.5;
        // Bigger particles on the light theme (uLight = 1).
        gl_PointSize = clamp((sz + uSpeed*2.0) * (1.0 + uLight*0.9), 0.5, 26.0);
        vBrightness = (1.0-z)*(0.4 + uSpeed*0.6);
        vHue = hash(id*5.1);
      }`;

    // Brand colours: cyan (#14e0c8) → lime (#c8f02e). Dark theme: near-white
    // core + additive glow. Light theme: saturated colour over white (alpha blend).
    const FS = `
      precision mediump float;
      uniform float uLight;
      varying float vBrightness, vHue;
      void main(){
        vec2 uv = gl_PointCoord-0.5;
        float r = length(uv);
        if(r>0.5) discard;
        float core = 1.0-smoothstep(0.0,0.2,r);
        float halo = 1.0-smoothstep(0.0,0.5,r);
        vec3 cyan = vec3(0.078,0.878,0.784);
        vec3 lime = vec3(0.784,0.941,0.180);
        vec3 base = mix(cyan, lime, vHue);
        if(uLight > 0.5){
          vec3 col = base * 0.7;
          float a = clamp(core*1.4 + halo*0.45, 0.0, 1.0) * (0.5 + vBrightness*0.8);
          gl_FragColor = vec4(col, a);
        } else {
          vec3 col = mix(base, vec3(1.0), core*0.6);
          float brightness = vBrightness*(core*1.6 + halo*0.5);
          gl_FragColor = vec4(col*brightness, halo*vBrightness);
        }
      }`;

    const VS2 = `
      attribute vec2 aPos;
      uniform float uTime, uSpeed, uAspect, uLight;
      varying float vAlpha, vHue;
      float hash(float n){ return fract(sin(n*127.1)*43758.5453); }
      void main(){
        float id = aPos.x;
        float isHead = aPos.y;
        float angle = hash(id*1.3)*6.283185;
        float radius = hash(id*2.7)*0.9+0.05;
        float zOff = hash(id*3.9);
        float zH = mod(zOff + uTime*uSpeed*(0.8+hash(id*0.7)*0.4), 1.0);
        float zT = zH + uSpeed*0.08;
        float z = isHead>0.5 ? zH : zT;
        float iz = 1.0/max(z,0.001);
        float fov = 0.6 + uSpeed*0.3;
        float px = cos(angle)*radius*iz*fov;
        float py = sin(angle)*radius*iz*fov;
        px /= uAspect;
        gl_Position = vec4(px, py, 0.0, 1.0);
        vAlpha = isHead>0.5 ? (1.0-zH)*uSpeed*0.7 : 0.0;
        vHue = hash(id*5.1);
      }`;

    const FS2 = `
      precision mediump float;
      uniform float uLight;
      varying float vAlpha, vHue;
      void main(){
        vec3 col = mix(vec3(0.078,0.878,0.784), vec3(0.784,0.941,0.180), vHue);
        if(uLight > 0.5) col *= 0.7;
        gl_FragColor = vec4(col, vAlpha);
      }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = (vs: string, fs: string) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p);
      return p;
    };
    const mkBuf = (data: Float32Array) => {
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return b;
    };
    const u1f = (p: WebGLProgram, n: string, v: number) =>
      gl.uniform1f(gl.getUniformLocation(p, n), v);

    const N = 3000;
    const ids = new Float32Array(N);
    for (let i = 0; i < N; i++) ids[i] = i;
    const streakData = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) {
      streakData[i * 4] = i;
      streakData[i * 4 + 1] = 0;
      streakData[i * 4 + 2] = i;
      streakData[i * 4 + 3] = 1;
    }

    const starProg = prog(VS, FS);
    const streakProg = prog(VS2, FS2);
    const idBuf = mkBuf(ids);
    const streakBuf = mkBuf(streakData);

    let W = 0,
      H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── AUDIO ENGINE — allowed because we mount from the submit-click gesture.
    // Layered drone + low rumble + reverb; pitch/level rise with warp speed.
    let audioCtx: AudioContext | null = null;
    let masterGain: GainNode | null = null;
    let noiseGain: GainNode | null = null;
    let noiseFilter: BiquadFilterNode | null = null;
    const drones: { osc: OscillatorNode; gain: GainNode; baseFreq: number; baseGain: number }[] = [];
    try {
      const Ctx: typeof AudioContext =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        audioCtx = new Ctx();
        audioCtx.resume?.();

        const reverb = audioCtx.createConvolver();
        const len = audioCtx.sampleRate * 3;
        const ir = audioCtx.createBuffer(2, len, audioCtx.sampleRate);
        for (let c = 0; c < 2; c++) {
          const d = ir.getChannelData(c);
          for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
        }
        reverb.buffer = ir;

        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0;
        masterGain.connect(audioCtx.destination);
        const reverbGain = audioCtx.createGain();
        reverbGain.gain.value = 0.35;
        reverb.connect(reverbGain);
        reverbGain.connect(audioCtx.destination);

        const droneSpecs: { freq: number; type: OscillatorType; gain: number }[] = [
          { freq: 55, type: "sine", gain: 0.18 },
          { freq: 110, type: "sine", gain: 0.1 },
          { freq: 55.5, type: "sine", gain: 0.08 },
          { freq: 220, type: "triangle", gain: 0.05 },
          { freq: 82.4, type: "sine", gain: 0.06 },
        ];
        droneSpecs.forEach((d) => {
          const osc = audioCtx!.createOscillator();
          const g = audioCtx!.createGain();
          osc.type = d.type;
          osc.frequency.value = d.freq;
          g.gain.value = d.gain;
          osc.connect(g);
          g.connect(masterGain!);
          g.connect(reverb);
          osc.start();
          drones.push({ osc, gain: g, baseFreq: d.freq, baseGain: d.gain });
        });

        const bufSize = audioCtx.sampleRate * 2;
        const nb = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
        const nd = nb.getChannelData(0);
        for (let i = 0; i < bufSize; i++) nd[i] = Math.random() * 2 - 1;
        const noise = audioCtx.createBufferSource();
        noise.buffer = nb;
        noise.loop = true;
        noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = "lowpass";
        noiseFilter.frequency.value = 120;
        noiseGain = audioCtx.createGain();
        noiseGain.gain.value = 0.04;
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start();

        masterGain.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 1.5);
      }
    } catch {
      audioCtx = null;
    }

    const updateAudio = (spd: number) => {
      if (!audioCtx) return;
      const tt = audioCtx.currentTime;
      drones.forEach((o) => {
        o.osc.frequency.setTargetAtTime(o.baseFreq * (1 + spd * 0.18), tt, 0.5);
        o.gain.gain.setTargetAtTime(o.baseGain * (0.5 + spd * 0.7), tt, 0.4);
      });
      noiseGain?.gain.setTargetAtTime(0.04 + spd * 0.12, tt, 0.3);
      noiseFilter?.frequency.setTargetAtTime(80 + spd * 180, tt, 0.4);
    };

    let running = true;
    let raf = 0;
    let t = 0,
      last = performance.now(),
      speed = 0;
    const frame = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // Accelerate into hyperspace and keep pushing.
      speed += (1.15 - speed) * dt * 1.6;
      t += dt;
      updateAudio(speed);

      if (isDark) gl.clearColor(0, 0, 0, 1);
      else gl.clearColor(0.969, 0.973, 0.957, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, isDark ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);
      const asp = W / H;

      if (speed > 0.1) {
        gl.useProgram(streakProg);
        gl.bindBuffer(gl.ARRAY_BUFFER, streakBuf);
        const aPos = gl.getAttribLocation(streakProg, "aPos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
        u1f(streakProg, "uTime", t);
        u1f(streakProg, "uSpeed", speed);
        u1f(streakProg, "uAspect", asp);
        u1f(streakProg, "uLight", uLight);
        gl.drawArrays(gl.LINES, 0, N * 2);
      }

      gl.useProgram(starProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, idBuf);
      const aId = gl.getAttribLocation(starProg, "aId");
      gl.enableVertexAttribArray(aId);
      gl.vertexAttribPointer(aId, 1, gl.FLOAT, false, 0, 0);
      u1f(starProg, "uTime", t);
      u1f(starProg, "uSpeed", speed);
      u1f(starProg, "uAspect", asp);
      u1f(starProg, "uLight", uLight);
      gl.drawArrays(gl.POINTS, 0, N);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      // NOTE: do NOT call WEBGL_lose_context here — React 18 StrictMode (dev)
      // mounts→unmounts→remounts, and a lost context would leave the remounted
      // canvas blank. Let GC reclaim it on real unmount instead.
      if (audioCtx) {
        // Quick fade so the cut to the thank-you page isn't a hard click.
        try {
          const tt = audioCtx.currentTime;
          masterGain?.gain.cancelScheduledValues(tt);
          masterGain?.gain.setTargetAtTime(0, tt, 0.08);
        } catch {}
        const ctx = audioCtx;
        setTimeout(() => ctx.close().catch(() => {}), 300);
      }
    };
  }, []);

  if (typeof document === "undefined") return null;

  const light = !document.documentElement.classList.contains("dark");

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overflow-hidden animate-fade-in"
      role="status"
      aria-live="polite"
      aria-label={label}
      style={{ backgroundColor: light ? "#f7f8f4" : "#000" }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* vignette so the centre stays readable (white on light, black on dark) */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: light
            ? "radial-gradient(60% 60% at 50% 50%, transparent 45%, rgba(247,248,244,0.6) 100%)"
            : "radial-gradient(60% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>,
    document.body
  );
}
