// @ts-nocheck
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, ThreeEvent, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import VoyagerModel from "./VoyagerModel";

// --- ANIMATION UTILS ---

// Easing functions for playful movement
const easeOutElastic = (x) => {
  const c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};
const easeOutBack = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const easeInOutQuad = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

// 20 Playful Maneuvers
// Each function takes (group, t) where t is progress 0 -> 1
const MANEUVERS = [
  // 1. Barrel Roll Left
  (g, t) => g.rotation.z = -(t * Math.PI * 2),
  
  // 2. Barrel Roll Right
  (g, t) => g.rotation.z = (t * Math.PI * 2),
  
  // 3. Backflip (Pitch)
  (g, t) => g.rotation.x = -(t * Math.PI * 2),
  
  // 4. Frontflip
  (g, t) => g.rotation.x = (t * Math.PI * 2),
  
  // 5. Spin (Yaw)
  (g, t) => g.rotation.y = (t * Math.PI * 2),
  
  // 6. The "No" (Shake Head)
  (g, t) => g.rotation.y = Math.sin(t * Math.PI * 8) * 0.3 * (1 - t),
  
  // 7. The "Yes" (Nod)
  (g, t) => g.rotation.x = Math.sin(t * Math.PI * 6) * 0.2 * (1 - t),
  
  // 8. Hiccup (Jump Y + Scale)
  (g, t) => {
    const y = Math.sin(t * Math.PI) * 0.5;
    g.position.y = y;
    const s = 1 + Math.sin(t * Math.PI) * 0.2;
    g.scale.set(s, s, s);
  },
  
  // 9. Zoom In (Z move)
  (g, t) => g.position.z = Math.sin(t * Math.PI) * 2,
  
  // 10. Shiver (Random Vibrations)
  (g, t) => {
    g.position.x = (Math.random() - 0.5) * 0.1 * (1-t);
    g.position.y = (Math.random() - 0.5) * 0.1 * (1-t);
  },
  
  // 11. Corkscrew
  (g, t) => {
    g.rotation.z += t * 0.2;
    g.position.z = Math.sin(t * Math.PI * 2) * 0.5;
    g.position.x = Math.cos(t * Math.PI * 2) * 0.5;
  },
  
  // 12. Dodge Left
  (g, t) => g.position.x = -Math.sin(t * Math.PI) * 1.5,
  
  // 13. Dodge Right
  (g, t) => g.position.x = Math.sin(t * Math.PI) * 1.5,
  
  // 14. Peek (Rotate Y 90 and back)
  (g, t) => g.rotation.y = Math.sin(t * Math.PI) * (Math.PI / 2),
  
  // 15. Wiggle (Z oscillation)
  (g, t) => g.rotation.z = Math.sin(t * Math.PI * 6) * 0.3 * (1-t),
  
  // 16. Pop (Scale fast)
  (g, t) => {
    const s = 1 + easeOutElastic(t < 0.5 ? t * 2 : (1-t)*2) * 0.5;
    g.scale.set(s, s, s);
  },
  
  // 17. Flatten (Scale Z)
  (g, t) => {
    const s = 1 - Math.sin(t * Math.PI) * 0.8;
    g.scale.z = s;
  },
  
  // 18. Elastic Twist
  (g, t) => g.rotation.y = Math.sin(easeOutElastic(t) * Math.PI),

  // 19. Orbit (Small circle)
  (g, t) => {
    g.position.y = Math.cos(t * Math.PI * 2) * 0.5 - 0.5;
    g.position.x = Math.sin(t * Math.PI * 2) * 0.5;
  },
  
  // 20. Glitch (Random pos jump)
  (g, t) => {
    if (Math.random() > 0.8) {
      g.position.set((Math.random()-0.5), (Math.random()-0.5), 0);
    } else {
      g.position.set(0,0,0);
    }
  }
];

function StarField() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (group.current) {
      // Background slow constant rotation
      group.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function VoyagerContainer() {
  const outerGroup = useRef<THREE.Group>(null); // For Scroll & Mouse (Base)
  const innerGroup = useRef<THREE.Group>(null); // For Click Animations (Playful)
  
  // Animation State
  const [activeManeuver, setActiveManeuver] = useState<number | null>(null);
  const maneuverStartTime = useRef(0);

  // Drag & Interaction State
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for Drag Logic
  const dragRotate = useRef({ x: 0, y: 0 }); // Cumulative rotation from drag
  const lastPointer = useRef({ x: 0, y: 0 }); // To calculate delta
  const dragStartPos = useRef({ x: 0, y: 0 }); // To detect if it was a click or a drag

  // Scroll ref
  const scrollRef = useRef(0);

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => { scrollRef.current = window.scrollY; };
    const handleResize = () => { setIsMobile(window.innerWidth < 768); };
    
    handleResize(); // Check on init

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Dynamic cursor based on state
    if (isDragging) {
      document.body.style.cursor = "grabbing";
    } else if (isHovered) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => { document.body.style.cursor = "auto"; }
  }, [isHovered, isDragging]);

  const triggerRandomManeuver = () => {
    if (activeManeuver !== null) return; // Wait for finish
    const randomIndex = Math.floor(Math.random() * MANEUVERS.length);
    setActiveManeuver(randomIndex);
    maneuverStartTime.current = 0; // Will be set in frame
  };

  // --- POINTER EVENTS HANDLERS ---
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // Capture pointer to track dragging outside the object
    (e.target as Element).setPointerCapture(e.pointerId);
    
    setIsDragging(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    setIsDragging(false);

    // Calculate total distance moved
    const dist = Math.sqrt(
      Math.pow(e.clientX - dragStartPos.current.x, 2) + 
      Math.pow(e.clientY - dragStartPos.current.y, 2)
    );

    // If moved less than 5 pixels, consider it a Click and trigger maneuver
    if (dist < 5) {
      triggerRandomManeuver();
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return;
    e.stopPropagation();

    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;

    // Adjust sensitivity
    const sensitivity = 0.005;
    dragRotate.current.x += deltaX * sensitivity;
    dragRotate.current.y += deltaY * sensitivity;

    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  useFrame((state, delta) => {
    // --- 1. BASE MOVEMENT (Outer Group) ---
    if (outerGroup.current) {
      const targetX = state.mouse.x * 0.3; 
      const targetY = state.mouse.y * 0.3;
      const scrollFactor = scrollRef.current * 0.001;
      
      // We combine: Automatic Drift + Scroll Influence + Mouse Look + DRAG ROTATION
      outerGroup.current.rotation.y = THREE.MathUtils.lerp(
        outerGroup.current.rotation.y,
        0.5 + state.clock.getElapsedTime() * 0.05 + targetX + scrollFactor + dragRotate.current.x,
        0.1
      );

      outerGroup.current.rotation.x = THREE.MathUtils.lerp(
        outerGroup.current.rotation.x,
        0.2 - targetY + dragRotate.current.y,
        0.1
      );

      outerGroup.current.rotation.z = THREE.MathUtils.lerp(
        outerGroup.current.rotation.z,
        0.1 + (scrollRef.current * 0.0005), 
        0.1
      );

      // RESPONSIVE POSITIONING
      // Mobile: X=0 (Center), Desktop: X=3 (Right)
      const targetBaseX = isMobile ? 0 : 3;
      const targetBaseY = isMobile ? 0.2 : -0.5; // Slightly higher on mobile to clear bottom text

      outerGroup.current.position.x = THREE.MathUtils.lerp(outerGroup.current.position.x, targetBaseX, 0.08);
      outerGroup.current.position.y = THREE.MathUtils.lerp(outerGroup.current.position.y, targetBaseY, 0.08);

      // Z Depth influenced by scroll
      outerGroup.current.position.z = THREE.MathUtils.lerp(outerGroup.current.position.z, -3 - (scrollFactor * 2), 0.1);
    }

    // --- 2. MANEUVER ANIMATION (Inner Group) ---
    if (innerGroup.current) {
      if (activeManeuver !== null) {
        if (maneuverStartTime.current === 0) maneuverStartTime.current = state.clock.elapsedTime;
        
        const duration = 1.2; 
        const progress = (state.clock.elapsedTime - maneuverStartTime.current) / duration;

        if (progress >= 1) {
          // Reset
          innerGroup.current.rotation.set(0,0,0);
          innerGroup.current.position.set(0,0,0);
          innerGroup.current.scale.set(1,1,1);
          setActiveManeuver(null);
        } else {
          // Execute Maneuver
          MANEUVERS[activeManeuver](innerGroup.current, progress);
        }
      } else {
        // Idling inner group
        innerGroup.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      }
    }
  });

  return (
    // Initial position is handled by useFrame, but we set a safe default
    <group ref={outerGroup} position={[3, -0.5, -3]}>
      <group 
        ref={innerGroup}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
         <VoyagerModel scale={isMobile ? 0.9 : 1.3} />
      </group>
    </group>
  );
}

function FloatingParticles() {
  const count = 150;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const s = Math.cos(t);
      
      // Move particles towards camera
      particle.zFactor += delta * 5; 
      if (particle.zFactor > 10) particle.zFactor = -80; 

      dummy.position.set(
        (particle.xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10),
        (particle.yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10),
        particle.zFactor
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#2bd7ff" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      {/* Sun light coming from top right */}
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      {/* Blue fill light from below (nebula reflection) */}
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#2bd7ff" />
      {/* Rim light for drama */}
      <spotLight position={[0, 5, -10]} intensity={2} color="#ff2d55" angle={0.5} penumbra={1} />
      
      <StarField />
      <FloatingParticles />
      <VoyagerContainer />
    </>
  );
}

export default function SpaceScene() {
  return (
    <div 
      className="fixed inset-0 z-0 h-screen w-screen"
      style={{
        background: `
          radial-gradient(1200px 900px at 20% 15%, rgba(43,215,255,.08), transparent 55%),
          radial-gradient(1000px 800px at 80% 10%, rgba(255,45,85,.08), transparent 60%),
          linear-gradient(180deg, #050815 0%, #070b1e 100%)
        `
      }}
      aria-hidden="true"
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} 
        dpr={[1, 2]}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <SceneContent />
      </Canvas>
      {/* Overlay for better text contrast at bottom of page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg0/95 pointer-events-none" />
    </div>
  );
}