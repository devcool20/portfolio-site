"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ============================================================
   NeonTunnel — red streaks (left), blue streaks (right)
   Scroll toward camera and reset to create hyper-speed effect.
   ============================================================ */

interface StreakItem {
  x: number;
  y: number;
  origZ: number;
  speed: number;
  len: number;
  w: number;
  color: [number, number, number];
  opacity: number;
}

function generateStreaks(
  count: number,
  side: "left" | "right",
  baseSpeed: number,
): StreakItem[] {
  const dir = side === "left" ? -1 : 1;
  const col: [number, number, number] =
    side === "left" ? [1, 0.096, 0] : [0, 0.706, 1];
  return Array.from({ length: count }, () => ({
    x: dir * (0.8 + Math.random() * 1.2),
    y: (Math.random() - 0.3) * 2.5,
    origZ: -25 - Math.random() * 25,
    speed: baseSpeed + Math.random() * baseSpeed * 0.6,
    len: 1 + Math.random() * 3,
    w: 0.006 + Math.random() * 0.012,
    color: col,
    opacity: 0.3 + Math.random() * 0.5,
  }));
}

export default function NeonTunnel({
  drsActive,
  mobile = false,
}: {
  drsActive: boolean;
  mobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const itemsRef = useRef<StreakItem[]>([]);

  const factor = mobile ? 0.35 : 1;

  const items = useMemo(() => {
    const count = Math.floor(120 * factor);
    const left = generateStreaks(
      Math.floor(count * 0.5),
      "left",
      drsActive ? 35 : 18,
    );
    const right = generateStreaks(
      Math.floor(count * 0.5),
      "right",
      drsActive ? 35 : 18,
    );
    itemsRef.current = [...left, ...right];
    return [...left, ...right];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factor]);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    const spd = drsActive ? 3.5 : 1;
    groupRef.current.children.forEach((child, i) => {
      const item = itemsRef.current[i];
      if (!item) return;
      child.position.z += item.speed * dt * spd;
      if (child.position.z > 5) {
        child.position.z = item.origZ;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.origZ]}>
          <planeGeometry args={[d.w, d.len]} />
          <meshBasicMaterial
            color={new THREE.Color(...d.color)}
            transparent
            opacity={d.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
