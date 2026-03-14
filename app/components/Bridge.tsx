'use client'

import { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Bridge({ position }: { position: [number, number, number] }) {
  const waterRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (waterRef.current) {
      const material = waterRef.current.material as THREE.MeshStandardMaterial
    material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* River/Gap */}
      <mesh ref={waterRef} position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 40]} />
        <meshStandardMaterial
          color="#4fc3f7"
          transparent
          opacity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Bridge deck */}
      <RigidBody type="fixed">
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[8, 0.5, 40]} />
          <meshStandardMaterial color="#8b4513" roughness={0.8} />
        </mesh>
      </RigidBody>
      
      {/* Bridge railings */}
      {[-4, 4].map((x, i) => (
        <RigidBody key={i} type="fixed">
          {Array.from({ length: 20 }).map((_, j) => (
            <mesh key={j} castShadow position={[x, 1, -18 + j * 2]}>
              <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
          ))}
          <mesh castShadow position={[x, 1.7, 0]}>
            <boxGeometry args={[0.2, 0.2, 40]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        </RigidBody>
      ))}
      
      {/* Support pillars */}
      {[-15, -5, 5, 15].map((z, i) => (
        <RigidBody key={i} type="fixed">
          <mesh castShadow position={[-3, -2, z]}>
            <cylinderGeometry args={[0.5, 0.6, 4, 8]} />
            <meshStandardMaterial color="#696969" />
          </mesh>
          <mesh castShadow position={[3, -2, z]}>
            <cylinderGeometry args={[0.5, 0.6, 4, 8]} />
            <meshStandardMaterial color="#696969" />
          </mesh>
        </RigidBody>
      ))}
      
      {/* Water effect - ripples */}
      <pointLight position={[0, 2, 0]} intensity={3} distance={15} color="#4fc3f7" />
    </group>
  )
}
