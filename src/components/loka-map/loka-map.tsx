// src/components/loka-map/loka-map.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Html } from '@react-three/drei';
import { useAppStore } from '@/stores/app-store';
import * as THREE from 'three';

interface LokaEntity {
  id: string;
  slug: string;
  nameIast: string;
  nameDevanagari?: string;
  summary?: string;
  position: [number, number, number];
  color: string;
  size: number;
}

function LokaSphere({ loka, onClick }: { loka: LokaEntity; onClick: (slug: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={loka.position}>
      <Sphere
        ref={meshRef}
        args={[loka.size, 32, 32]}
        onClick={() => onClick(loka.slug)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <meshStandardMaterial 
          color={loka.color} 
          transparent 
          opacity={hovered ? 0.8 : 0.6}
          emissive={hovered ? loka.color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Sphere>
      
      {/* <Text
        position={[loka.size + 1, 0, 0]}
        fontSize={0.5}
        color="#7c2d12"
        anchorX="left"
        anchorY="middle"
        font="/fonts/helvetiker_regular.typeface.json"  // Use this fallback (download from Three.js repo or convert your own)
      >
        {loka.nameIast}
      </Text>
      
      {loka.nameDevanagari && (
        <Text
          position={[loka.size + 1, -0.7, 0]}
          fontSize={0.3}
          color="#92400e"
          anchorX="left"
          anchorY="middle"
          font="/fonts/helvetiker_regular.typeface.json"  // Replace with a Devanagari-supporting JSON font if needed
        >
          {loka.nameDevanagari}
        </Text>
      )} */}

      {hovered && (
        <Html position={[loka.size + 1, -1.5, 0]} style={{ width: '200px' }}>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 border border-amber-200 text-xs">
            <p className="text-amber-800">{loka.summary}</p>
            <p className="text-amber-600 mt-1">Click to explore →</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function CosmicAxis() {
  return (
    <group>
      {/* Central Axis (Mount Meru) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 20]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Axis Label */}
      {/* <Text
        position={[0, 11, 0]}
        fontSize={0.6}
        color="#7c2d12"
        anchorX="center"
        anchorY="bottom"
        font="/fonts/helvetiker_regular.typeface.json"
      >
        Mount Meru
      </Text> */}
    </group>
  );
}

export function LokaMap() {
  const { currentLayer, setSelectedEntityId } = useAppStore();
  const [lokas, setLokas] = useState<LokaEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetched lokas:', lokas);  // Check if data is loaded
  }, [lokas]);

  useEffect(() => {
    async function fetchLokas() {
      try {
        const response = await fetch(`/api/entities?type=LOKA&layer=${currentLayer}`);
        const data = await response.json();
        
        if (data.success) {
          // Map lokas to 3D positions (vertical arrangement)
          const lokaPositions = [
            { slug: 'satya-loka', position: [0, 9, 0], color: '#FFD700', size: 1.2 },
            { slug: 'tapa-loka', position: [0, 7, 0], color: '#FFA500', size: 1.1 },
            { slug: 'jana-loka', position: [0, 5, 0], color: '#FF6347', size: 1.0 },
            { slug: 'mahar-loka', position: [0, 3, 0], color: '#20B2AA', size: 0.9 },
            { slug: 'svar-loka', position: [0, 1, 0], color: '#87CEEB', size: 0.8 },
            { slug: 'bhuvar-loka', position: [0, -1, 0], color: '#98FB98', size: 0.7 },
            { slug: 'bhu-loka', position: [0, -3, 0], color: '#8FBC8F', size: 0.6 },
          ];
          
          const mappedLokas = data.data.map((loka: any) => {
            const positionData = lokaPositions.find(p => p.slug === loka.slug);
            return {
              ...loka,
              position: positionData?.position || [0, 0, 0],
              color: positionData?.color || '#888888',
              size: positionData?.size || 1.0,
            };
          }) as LokaEntity[];
          
          setLokas(mappedLokas);
          console.log('State updated with lokas:', mappedLokas);  // Confirm setLokas ran
        } else {
          console.error('API fetch failed:', data);
        }
      } catch (error) {
        console.error('Failed to fetch lokas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLokas();
  }, [currentLayer]);

  const handleLokaClick = (slug: string) => {
    const match = lokas.find(l => l.slug === slug);
    if (match) {
      setSelectedEntityId(match.id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-amber-600">Loading cosmic realms...</div>
      </div>
    );
  }

  if (lokas.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-600">No realms found - check API</div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-gradient-to-b from-blue-100 to-amber-50 rounded-lg border border-amber-200 overflow-hidden">
      <Canvas camera={{ position: [8, 2, 8], fov: 60 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#FFD700" />
        
        {/* Hardcoded test sphere - Comment out once working */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>

        <CosmicAxis />
        
        {lokas.map((loka) => (
          <LokaSphere
            key={loka.id}
            loka={loka}
            onClick={handleLokaClick}
          />
        ))}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
}
