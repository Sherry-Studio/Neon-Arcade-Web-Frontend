"use client";

import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { range, segment, clamp } from "@/hooks/useScrollProgress";
import { T } from "./timeline";
import { buildNeonWord, sampleTextPoints, type Glyph } from "./neonText";

const NEON_Y = 0.78;
const ARCADE_Y = -0.6;

/** How long the name takes to assemble itself when the site opens. */
const INTRO_SECONDS = 3.1;
/** How far particles scatter around their target while scrambling. */
const SCRAMBLE = 0.16;

/** deterministic pseudo-random so flicker is stable frame to frame */
const hash = (n: number) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

export default function NeonLogo({
  progressRef,
  reduced = false,
}: {
  progressRef: MutableRefObject<number>;
  reduced?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const glow = useRef<THREE.PointLight>(null);
  const glow2 = useRef<THREE.PointLight>(null);
  const time = useRef(0);
  /** 0→1 clock for the opening title sequence, independent of scroll */
  const intro = useRef(0);

  // ── letters ──────────────────────────────────────────────────────────
  const neon = useMemo(() => buildNeonWord("NEON", 1.55), []);
  const arcade = useMemo(() => buildNeonWord("ARCADE", 1.35), []);

  const letterRefs = useRef<THREE.Mesh[]>([]);
  letterRefs.current = [];
  const pushLetter = (m: THREE.Mesh | null) => {
    if (m) letterRefs.current.push(m);
  };

  // ── particles that assemble into the wordmark ────────────────────────
  const { targets, starts, geometry } = useMemo(() => {
    const targets = sampleTextPoints(
      [
        { text: "NEON", y: NEON_Y },
        { text: "ARCADE", y: ARCADE_Y },
      ],
      1.5,
      520
    );
    const n = targets.length / 3;
    const starts = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      // start scattered wide and deep, drifting in from the dark
      const a = Math.random() * Math.PI * 2;
      const r = 6 + Math.random() * 10;
      starts[i * 3] = Math.cos(a) * r;
      starts[i * 3 + 1] = (Math.random() - 0.5) * 9;
      starts[i * 3 + 2] = -6 - Math.random() * 14;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(starts.slice(), 3));
    return { targets, starts, geometry };
  }, []);

  useFrame((_, dt) => {
    time.current += dt;
    const p = reduced ? 0.23 : progressRef.current;
    const t = time.current;

    // ── overall visibility / camera pass-through ──────────────────────
    const through = segment(p, T.enterLogoStart, T.enterLogoEnd);
    const alive = p < T.enterLogoEnd + 0.02;
    if (group.current) {
      group.current.visible = alive;
      // the sign rushes past the camera as we fly into it
      group.current.position.z = through * 9;
      group.current.scale.setScalar(1 + through * 2.2);
    }
    if (points.current) points.current.visible = alive;
    if (!alive) {
      if (glow.current) glow.current.intensity = 0;
      if (glow2.current) glow2.current.intensity = 0;
      return;
    }

    // ── particle assembly ─────────────────────────────────────────────
    // Runs on a clock, not on scroll: the name assembles itself the moment
    // the site opens. Scroll only takes over for the fly-through later.
    intro.current = Math.min(intro.current + dt / INTRO_SECONDS, 1);
    const form = reduced ? 1 : intro.current;

    const pos = points.current?.geometry.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (pos) {
      // the swarm settles out of a scramble in the last third of the intro
      const settle = clamp((form - 0.55) / 0.45);
      const scramble = (1 - settle * settle) * SCRAMBLE;

      const n = targets.length / 3;
      for (let i = 0; i < n; i++) {
        // stagger so particles stream in rather than snapping together
        const delay = hash(i) * 0.4;
        const local = clamp((form - delay) / (1 - delay));
        const e = 1 - Math.pow(1 - local, 3); // easeOutCubic
        const i3 = i * 3;

        // swirl while travelling, then a per-particle jitter that decays to 0
        const swirl = (1 - e) * 0.5;
        const jx = Math.sin(t * 9 + i * 12.9898) * scramble;
        const jy = Math.cos(t * 11 + i * 78.233) * scramble;

        pos.array[i3] =
          starts[i3] +
          (targets[i3] - starts[i3]) * e +
          Math.sin(t * 1.4 + i) * swirl * 0.25 +
          jx;
        pos.array[i3 + 1] =
          starts[i3 + 1] +
          (targets[i3 + 1] - starts[i3 + 1]) * e +
          Math.cos(t * 1.2 + i) * swirl * 0.25 +
          jy;
        pos.array[i3 + 2] = starts[i3 + 2] + (targets[i3 + 2] - starts[i3 + 2]) * e;
      }
      pos.needsUpdate = true;
    }
    const pMat = points.current?.material as THREE.PointsMaterial | undefined;
    if (pMat) {
      // particles hand over to the solid neon tubes as they settle
      const handover = clamp((form - 0.86) / 0.14);
      pMat.opacity = Math.min(form * 3, 1) * (1 - handover) * (1 - through);
      pMat.size = 0.03 - form * 0.009;
    }

    // ── per-letter power-on ───────────────────────────────────────────
    const letters = letterRefs.current;
    const count = letters.length || 1;
    let litSum = 0;

    letters.forEach((mesh, i) => {
      // letters ignite one after another, in a scrambled order, as the
      // particles settle — driven by the intro clock, not by scroll
      const order = hash(i + 11);
      const a = 0.6 + order * 0.3;
      const on = range(form, a, a + 0.14);

      // once on: a settled neon flicker, stronger right after ignition
      const justOn = 1 - range(form, a + 0.14, a + 0.34);
      const f =
        hash(Math.floor(t * 22) + i * 7) > 0.82 - justOn * 0.35 ? 0.55 : 1;
      const flicker = 1 - (1 - f) * (0.25 + justOn * 0.6);

      const lit = on * flicker;
      litSum += lit;

      const m = mesh.material as THREE.MeshBasicMaterial;
      m.opacity = lit;
      mesh.visible = lit > 0.001;
    });

    const litAvg = litSum / count;
    if (glow.current) glow.current.intensity = litAvg * 26;
    if (glow2.current) glow2.current.intensity = litAvg * 18;
  });

  const renderWord = (word: { glyphs: Glyph[] }, y: number, key: string) =>
    word.glyphs.map((g, i) => (
      <group key={`${key}-${i}`} position={[g.x, y, 0]}>
        {/* soft halo */}
        <mesh scale={[1.25, 1.7, 1]}>
          <planeGeometry args={[g.width, g.height]} />
          <meshBasicMaterial
            map={g.texture}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        {/* the tube itself */}
        <mesh ref={pushLetter}>
          <planeGeometry args={[g.width, g.height]} />
          <meshBasicMaterial
            map={g.texture}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </group>
    ));

  return (
    <group>
      <group ref={group}>
        <pointLight ref={glow} position={[0, NEON_Y, 1.4]} color="#22d3ee" intensity={0} distance={16} decay={2} />
        <pointLight ref={glow2} position={[0, ARCADE_Y, 1.4]} color="#67e8f9" intensity={0} distance={14} decay={2} />
        {renderWord(neon, NEON_Y, "n")}
        {renderWord(arcade, ARCADE_Y, "a")}
      </group>

      <points ref={points} geometry={geometry}>
        <pointsMaterial
          size={0.028}
          color="#7fe9ff"
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
