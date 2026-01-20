// @ts-nocheck
import React, { useRef } from "react";
import * as THREE from "three";

export default function VoyagerModel(props: any) {
  // Materials
  const matDish = new THREE.MeshStandardMaterial({
    color: "#eaf2ff", // White-ish
    roughness: 0.5,
    metalness: 0.1,
    side: THREE.DoubleSide
  });

  const matBus = new THREE.MeshStandardMaterial({
    color: "#9ca3af", // Grey metal
    roughness: 0.3,
    metalness: 0.8,
    flatShading: true,
  });

  const matDark = new THREE.MeshStandardMaterial({
    color: "#111827", // Dark shielding
    roughness: 0.9,
    metalness: 0.1,
  });

  const matGold = new THREE.MeshStandardMaterial({
    color: "#fbbf24",
    roughness: 0.2,
    metalness: 1.0,
    emissive: "#b45309",
    emissiveIntensity: 0.2
  });

  const matTruss = new THREE.MeshStandardMaterial({
    color: "#d1d5db",
    roughness: 0.6,
    metalness: 0.5,
    wireframe: false // Set true for debugging style
  });

  return (
    <group {...props} dispose={null}>
      {/* 1. HIGH GAIN ANTENNA (The big dish) */}
      <group position={[0, 0.4, 0]} rotation={[0.3, 0, 0]}>
        {/* Main Dish Surface */}
        <mesh material={matDish}>
          <cylinderGeometry args={[1.8, 0.1, 0.6, 32, 1, true]} />
        </mesh>
        {/* Back structure of dish */}
        <mesh position={[0, -0.1, 0]} material={matBus}>
          <cylinderGeometry args={[0.3, 0.5, 0.4, 10]} />
        </mesh>
        {/* Antenna Feed (The tripod in the center) */}
        <group position={[0, 0.3, 0]}>
             <mesh position={[0, 0.6, 0]} material={matBus}>
                <cylinderGeometry args={[0.05, 0.1, 1.2, 8]} />
             </mesh>
             {/* Feed cone */}
             <mesh position={[0, 1.2, 0]} rotation={[3.14,0,0]} material={matDish}>
                <coneGeometry args={[0.15, 0.3, 16]} />
             </mesh>
             {/* Struts for feed */}
             {[0, 120, 240].map((angle) => (
                <mesh key={angle} rotation={[0, (angle * Math.PI) / 180, 0.4]} position={[0, 0.4, 0]} material={matTruss}>
                   <cylinderGeometry args={[0.01, 0.01, 0.9, 4]} />
                </mesh>
             ))}
        </group>
      </group>

      {/* 2. MAIN BUS (The 10-sided body) */}
      <group position={[0, -0.4, 0]}>
        <mesh material={matBus}>
          <cylinderGeometry args={[0.65, 0.65, 0.55, 10]} />
        </mesh>
        {/* Fuel Tank sphere inside */}
        <mesh material={matGold} position={[0,0,0]} scale={0.4}>
            <sphereGeometry args={[1, 16, 16]} />
        </mesh>
      </group>

      {/* 3. RTG BOOM (Radioisotope Thermoelectric Generator) - The power source */}
      {/* Positioned at roughly 4-5 o'clock */}
      <group position={[0.5, -0.6, 0.3]} rotation={[0, 0, -2.0]}>
         {/* Boom Arm */}
         <mesh position={[0, 0.4, 0]} material={matTruss}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
         </mesh>
         {/* The 3 RTG Canisters */}
         <group position={[0, 1.0, 0]}>
            <mesh material={matDark}>
               <cylinderGeometry args={[0.15, 0.15, 1.2, 12]} />
            </mesh>
            {/* Cooling fins detail */}
            {[0, 45, 90, 135].map(rot => (
                <mesh key={rot} rotation={[0, rot * Math.PI/180, 0]} material={matDark}>
                    <boxGeometry args={[0.4, 1.1, 0.02]} />
                </mesh>
            ))}
         </group>
      </group>

      {/* 4. SCIENCE BOOM (Scan platform with cameras) */}
      {/* Opposite to RTG */}
      <group position={[-0.5, -0.4, 0.2]} rotation={[0, 0, 1.8]}>
        <mesh position={[0, 0.8, 0]} material={matTruss}>
            <boxGeometry args={[0.12, 1.6, 0.12]} />
        </mesh>
        {/* Scan Platform */}
        <group position={[0, 1.7, 0]} rotation={[0.5, 0.5, 0]}>
            <mesh material={matBus}>
                <boxGeometry args={[0.4, 0.1, 0.5]} />
            </mesh>
            {/* Lens/Camera */}
            <mesh position={[0, 0.1, 0.15]} material={matDark}>
                <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
            </mesh>
            <mesh position={[0.15, 0.1, -0.1]} material={matDark}>
                <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
            </mesh>
        </group>
      </group>

      {/* 5. MAGNETOMETER BOOM (The very long thin stick) */}
      <group position={[0, -0.4, -0.5]} rotation={[1.9, 0, 0]}>
          <mesh position={[0, 2.5, 0]} material={matTruss}>
              <cylinderGeometry args={[0.03, 0.03, 5, 6]} />
          </mesh>
          {/* Sensor at tip */}
          <mesh position={[0, 5, 0]} material={matGold}>
             <sphereGeometry args={[0.08, 8, 8]} />
          </mesh>
      </group>

      {/* 6. GOLDEN RECORD COVER */}
      {/* Mounted on the side of the bus */}
      <group position={[0.4, -0.4, 0.52]} rotation={[0, 0, 0.2]}>
          <mesh material={matGold}>
              <circleGeometry args={[0.22, 32]} />
          </mesh>
      </group>
    </group>
  );
}