import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

function ShieldScene({ paused }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!paused && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = Math.sin(Date.now() / 2200) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={paused ? 0 : 1.1} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial color="#4d8dff" emissive="#17418f" emissiveIntensity={0.7} wireframe />
        </mesh>
        <Line
          points={[
            [-0.5, 0.55, 0],
            [0, 0.9, 0],
            [0.5, 0.55, 0],
            [0.35, -0.5, 0],
            [0, -0.82, 0],
            [-0.35, -0.5, 0],
            [-0.5, 0.55, 0]
          ]}
          color="#2dd4bf"
          lineWidth={2}
        />
      </Float>
    </group>
  );
}

export default function DashboardHero3D({ paused = false }) {
  return (
    <div className="dashboard-hero-3d" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        frameloop={paused ? 'never' : 'always'}
        camera={{ position: [0, 0, 3.4], fov: 42 }}
        gl={{ antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[2, 2, 3]} color="#4d8dff" intensity={3} />
        <pointLight position={[-2, -1, 2]} color="#2dd4bf" intensity={2} />
        <ShieldScene paused={paused} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
