"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import F1PostProcessing from "./F1PostProcessing";
import gsap from "gsap";
import * as THREE from "three";

const SECTIONS = [
  { label: "ABOUT", section: "about" },
  { label: "SKILLS", section: "skills" },
  { label: "PROJECTS", section: "projects" },
  { label: "EXP", section: "experience" },
  { label: "BLOG", section: "/blog" },
  { label: "CONTACT", section: "contact" },
];

const MODEL_PATH = "/models/f1-steering-wheel.glb";
const INIT_DURATION_MS = 1200;
const VIDEO_DURATION_MS = 3000;

/* ═══════════════════════════════════════════════════════════════
   GLB Steering Wheel
   ═══════════════════════════════════════════════════════════════ */

function SteeringWheelModel({ phase }: { phase: number }) {
  const { scene } = useGLTF(MODEL_PATH);
  const ref = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 1.2;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!modelRef.current) return;
    modelRef.current.updateWorldMatrix(true, true);
    const meshEntries: Array<{ box: THREE.Box3; maxAxis: number; center: THREE.Vector3 }> = [];

    modelRef.current.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const geo = mesh.geometry as THREE.BufferGeometry | undefined;
      if (!geo) return;
      geo.computeBoundingBox();
      if (!geo.boundingBox) return;
      const bb = geo.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
      const sz = new THREE.Vector3();
      bb.getSize(sz);
      const ctr = new THREE.Vector3();
      bb.getCenter(ctr);
      meshEntries.push({ box: bb, maxAxis: Math.max(sz.x, sz.y, sz.z), center: ctr });
    });

    if (meshEntries.length === 0) return;

    const sorted = [...meshEntries].sort((a, b) => a.maxAxis - b.maxAxis);
    const p75 = sorted[Math.floor((sorted.length - 1) * 0.75)]?.maxAxis ?? sorted[sorted.length - 1].maxAxis;
    const filtered = meshEntries.filter((m) => m.maxAxis <= p75 * 2);
    const usable = filtered.length > 0 ? filtered : meshEntries;

    const bounds = new THREE.Box3();
    bounds.copy(usable[0].box);
    for (let i = 1; i < usable.length; i++) bounds.union(usable[i].box);

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    bounds.getSize(size);
    bounds.getCenter(center);

    const maxAxis = Math.max(size.x, size.y, size.z);
    if (!isFinite(maxAxis) || maxAxis <= 0) return;

    // Normalize arbitrary GLB units to a predictable on-screen size.
    const targetSize = 5.8;
    const fitScale = targetSize / maxAxis;
    modelRef.current.scale.setScalar(fitScale);
    modelRef.current.position.set(-center.x * fitScale, -center.y * fitScale, -center.z * fitScale);
  }, [scene]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.5) * 0.008;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.004;
  });

  const s = Math.min(1, phase);
  if (s <= 0.01) return null;

  return (
    <group ref={ref} scale={s} position={[0, -0.18, -0.45]} rotation={[0.05, 0, 0]}>
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

/* ═══════════════════════════════════════════════════════════════
   HTML Overlay Buttons (rendered via drei Html — always face camera)
   ═══════════════════════════════════════════════════════════════ */

function NavButtons3D({
  phase,
  onNavigate,
}: {
  phase: number;
  onNavigate: (s: string) => void;
}) {
  if (phase < 0.3) return null;
  const opacity = Math.min(1, (phase - 0.3) / 0.5);

  return (
    <Html
      center
      position={[0, -0.55, 0.15]}
      style={{ pointerEvents: opacity > 0.5 ? "auto" : "none" }}
    >
      <div
        className="flex gap-3 select-none"
        style={{ opacity, transition: "opacity 0.4s ease" }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onNavigate(s.section)}
            className="
              px-4 py-2 rounded border text-[10px] font-mono uppercase tracking-[0.2em]
              transition-all duration-200 cursor-pointer
              border-[#FF1800]/30 text-gray-300 bg-[#0a0a10]/80
              hover:border-[#FF1800] hover:text-white hover:bg-[#FF1800]/15
              hover:shadow-[0_0_18px_rgba(255,24,0,0.25)]
              active:scale-95
            "
          >
            {s.label}
          </button>
        ))}
      </div>
    </Html>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Floating Particles
   ═══════════════════════════════════════════════════════════════ */

function FloatingParticles({ opacity }: { opacity: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const { positions, velocities } = useMemo(() => {
    const rng = (seed: number) => () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const r = rng(42);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (r() - 0.5) * 10;
      pos[i * 3 + 1] = (r() - 0.5) * 8;
      pos[i * 3 + 2] = -r() * 6 - 1;
      vel[i] = 0.003 + r() * 0.008;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const p = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      p.array[i * 3 + 1] += velocities[i];
      if (p.array[i * 3 + 1] > 4) p.array[i * 3 + 1] = -4;
    }
    p.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#FF1800"
        transparent
        opacity={opacity * 0.25}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Camera controller
   ═══════════════════════════════════════════════════════════════ */

function HeroCamera({ phase }: { phase: number }) {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const e = phase * phase * (3 - 2 * phase);
    camera.position.set(
      e * Math.sin(t * 0.5) * 0.02,
      0.15 - e * 0.05,
      2.2 - e * 0.4,
    );
    camera.lookAt(0, -0.05, -0.5);
  });
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   3D Scene
   ═══════════════════════════════════════════════════════════════ */

function Cockpit3DScene({
  phase,
  onNavigate,
}: {
  phase: number;
  onNavigate: (s: string) => void;
}) {
  return (
    <>
      <HeroCamera phase={phase} />

      <ambientLight intensity={0.75} color="#ffffff" />
      <directionalLight position={[2, 4, 5]} intensity={2.2} color="#fffdf8" />
      <directionalLight position={[-2, 1.5, 3]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-2.5, 1.5, -0.5]} intensity={2} color="#FF1800" distance={10} decay={2} />
      <pointLight position={[2.5, 1.5, -0.5]} intensity={1.2} color="#FF3500" distance={10} decay={2} />
      <pointLight position={[0, -0.5, 1.5]} intensity={0.6} color="#FF1800" distance={5} decay={2} />
      <spotLight position={[0, 3, 2]} intensity={2.2} angle={0.4} penumbra={0.5} color="#ffffff" distance={15} decay={2} />

      <fog attach="fog" args={["#050507", 5, 20]} />

      <FloatingParticles opacity={phase} />

      <Suspense fallback={null}>
        <SteeringWheelModel phase={phase} />
      </Suspense>

      <NavButtons3D phase={phase} onNavigate={onNavigate} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Overlay UI
   ═══════════════════════════════════════════════════════════════ */

function OverlayUI({ navActive }: { navActive: boolean }) {
  return (
    <div
      className="absolute top-6 left-0 right-0 flex items-center justify-center gap-3 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: navActive ? 0 : 1 }}
    >
      <div className="h-px w-12 bg-linear-to-r from-transparent to-[#FF1800]/60" />
      <span className="text-[9px] tracking-[0.4em] uppercase text-[#FF1800]/60 font-mono">
        Divyanshu Sharma — Portfolio
      </span>
      <div className="h-px w-12 bg-linear-to-l from-transparent to-[#FF1800]/60" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main exported component
   ═══════════════════════════════════════════════════════════════ */

export default function CockpitHero({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const [stage, setStage] = useState<"init" | "video" | "wheel">("init");
  const [navActive, setNavActive] = useState(false);
  const [phaseNum, setPhaseNum] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionedRef = useRef(false);

  useEffect(() => {
    const initTimer = window.setTimeout(() => setStage("video"), INIT_DURATION_MS);
    return () => window.clearTimeout(initTimer);
  }, []);

  const transitionToWheel = useCallback(() => {
    if (transitionedRef.current) return;
    transitionedRef.current = true;
    const v = videoRef.current;
    gsap.to(v, {
      scale: 1.1,
      filter: "brightness(0.1) blur(3px)",
      duration: 0.9,
      ease: "power2.inOut",
      onComplete: () => {
        setNavActive(true);
        setStage("wheel");
        gsap.to({}, {
          duration: 1.3,
          ease: "power3.out",
          onUpdate: function () {
            setPhaseNum(this.progress());
          },
          onComplete: () => setPhaseNum(1),
        });
      },
    });
  }, []);

  useEffect(() => {
    if (stage !== "video") return;
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
    const videoTimer = window.setTimeout(transitionToWheel, VIDEO_DURATION_MS);
    return () => window.clearTimeout(videoTimer);
  }, [stage, transitionToWheel]);

  const handleNav = useCallback(
    (section: string) => {
      if (/^\//.test(section)) {
        window.location.href = section;
        return;
      }
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power4.in",
        onComplete: () => onNavigate(section),
      });
    },
    [onNavigate],
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050507] overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* ═══ Video ═══ */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/f1-cockpit.mp4"
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            opacity: stage === "video" || stage === "wheel" ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
          onError={transitionToWheel}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,24,0,0.06) 0%, transparent 50%, rgba(255,24,0,0.04) 100%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* ═══ Vignette ═══ */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: navActive
            ? "radial-gradient(ellipse at center, rgba(5,5,7,0.85) 0%, #050507 65%)"
            : "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
          transition: "background 2s ease",
        }}
      />

      {/* ═══ 2D Overlay ═══ */}
      <OverlayUI navActive={navActive} />

      {/* ═══ 3D Scene (steering wheel + buttons) ═══ */}
      <div
        className="absolute inset-0 z-10"
        style={{
          opacity: navActive ? 1 : 0,
          transition: "opacity 1.8s ease 0.2s",
          pointerEvents: navActive ? "auto" : "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0.05, 1.45], fov: 42, near: 0.01, far: 80 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          dpr={[1, 1.5]}
          onCreated={({ gl }) => {
            gl.setClearColor("#050507", 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
          }}
        >
          <Cockpit3DScene phase={phaseNum} onNavigate={handleNav} />
          <F1PostProcessing />
        </Canvas>
      </div>

      {/* ═══ Bottom Hint ═══ */}
      <div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none"
        style={{
          opacity: navActive ? 0.5 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF1800] animate-pulse" />
          <span className="text-[8px] tracking-[0.3em] uppercase text-gray-500 font-mono">
            Choose Your Destination
          </span>
        </div>
      </div>

      {/* ═══ Loading ═══ */}
      {stage === "init" && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050507]">
          <div className="flex gap-[3px] mb-4">
            {Array.from({ length: 20 }).map((_, i) => {
              const red = i >= 16;
              return (
                <div
                  key={i}
                  className="w-2.5 h-1.5 rounded-[1px] animate-pulse"
                  style={{
                    background: red ? "#FF1800" : "#00B4FF",
                    opacity: 0.6,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              );
            })}
          </div>
          <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-gray-600">
            INITIALIZING COCKPIT
          </span>
        </div>
      )}
    </section>
  );
}
