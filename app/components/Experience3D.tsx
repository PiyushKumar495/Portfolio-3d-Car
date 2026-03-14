'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Sky } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { Vehicle } from './Vehicle'
import { World } from './World'
import { LoadingScreen } from './LoadingScreen'
import { useReducedMotion } from '../lib/hooks'
import { CarUI } from './CarUI'
import { useGameStore } from '../lib/store'

export function Experience3D() {
  const prefersReducedMotion = useReducedMotion()
  const vehicleData = useGameStore((state) => state.vehicleData)
  const collectibles = useGameStore((state) => state.collectibles)

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-950">
        <div className="glass p-8 rounded-2xl max-w-md text-center">
          <p className="mb-4">3D experience is disabled due to reduced motion preference.</p>
          <p className="text-sm text-gray-400">You can still view the portfolio in classic mode.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-sky-200">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#87ceeb']} />
        
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 15, 40]} fov={60} />
          
          {/* Daytime village lighting */}
          <ambientLight intensity={0.6} color="#ffffff" />
          
          {/* Sun */}
          <directionalLight
            position={[50, 50, 30]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-60}
            shadow-camera-right={60}
            shadow-camera-top={60}
            shadow-camera-bottom={-60}
            shadow-bias={-0.0001}
            color="#fffacd"
          />
          
          {/* Fill light */}
          <directionalLight
            position={[-30, 30, -30]}
            intensity={0.4}
            color="#b0e0e6"
          />
          
          {/* Hemisphere for sky/ground ambient */}
          <hemisphereLight
            args={['#87ceeb', '#2d5016', 0.6]}
            position={[0, 50, 0]}
          />
          
          {/* Sky */}
          <Sky
            distance={450000}
            sunPosition={[50, 50, 30]}
            inclination={0.6}
            azimuth={0.25}
          />
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Physics World */}
          <Physics 
            gravity={[0, -9.81, 0]}
            timeStep={1 / 60}
          >
            <World />
            <Vehicle />
          </Physics>
        </Suspense>
      </Canvas>
      
      <CarUI
        position={vehicleData.position}
        boostActive={vehicleData.boostActive}
        boostCooldown={vehicleData.boostCooldown}
      />
      
      <LoadingScreen />
    </div>
  )
}
