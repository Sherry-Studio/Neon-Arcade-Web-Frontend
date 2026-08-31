"use client";

import { MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Lighting from "./Lighting";
import NeonLogo from "./NeonLogo";
import ArcadeCabinet from "./ArcadeCabinet";
import DigitalWorlds from "./DigitalWorlds";
import Particles from "./Particles";
import CameraController from "./CameraController";

export default function HeroScene({
  progressRef,
  reduced = false,
  lowPower = false,
}: {
  progressRef: MutableRefObject<number>;
  reduced?: boolean;
  lowPower?: boolean;
}) {
  return (
    <Canvas
      dpr={lowPower ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      camera={{ position: [0, 0.05, 15.5], fov: 28, near: 0.05, far: 400 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
      }}
    >
      <color attach="background" args={["#040406"]} />
      <fog attach="fog" args={["#040406", 9, 34]} />

      <Lighting progressRef={progressRef} reduced={reduced} />
      <NeonLogo progressRef={progressRef} reduced={reduced} />
      <ArcadeCabinet progressRef={progressRef} reduced={reduced} />
      {!lowPower && <Particles progressRef={progressRef} count={reduced ? 60 : 140} />}

      {/* the dark studio floor the cabinet sits on */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#08090c" roughness={0.42} metalness={0.55} />
      </mesh>

      <DigitalWorlds progressRef={progressRef} />

      <CameraController progressRef={progressRef} reduced={reduced} />
    </Canvas>
  );
}
