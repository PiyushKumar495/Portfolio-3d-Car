'use client'

import { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SoccerBall({ position }: { position: [number, number, number] }) {
  const ballRef = useRef<any>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ballRef.current && meshRef.current) {
      // Rotate the ball based on its velocity for realistic rolling
      const velocity = ballRef.current.linvel()
      const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2)
      
      if (speed > 0.1) {
        meshRef.current.rotation.x += velocity.z * 0.05
        meshRef.current.rotation.z -= velocity.x * 0.05
      }
    }
  })

  return (
    <RigidBody
      ref={ballRef}
      position={position}
      colliders="ball"
      restitution={0.8}
      friction={0.5}
      linearDamping={0.5}
      angularDamping={0.5}
      mass={1}
    >
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Black pentagons pattern */}
      {Array.from({ length: 12 }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 12)
        const theta = Math.sqrt(12 * Math.PI) * phi
        
        return (
          <mesh
            key={i}
            position={[
              1.01 * Math.cos(theta) * Math.sin(phi),
              1.01 * Math.sin(theta) * Math.sin(phi),
              1.01 * Math.cos(phi)
            ]}
            rotation={[phi, theta, 0]}
          >
            <circleGeometry args={[0.3, 5]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        )
      })}
      
      {/* Glow effect */}
      <pointLight position={[0, 0, 0]} intensity={2} distance={5} color="#ffffff" />
    </RigidBody>
  )
}

export function MultipleFootballs() {
  const ballPositions: [number, number, number][] = [
    [10, 2, 10],
    [-15, 2, -15],
    [20, 2, -20],
    [-25, 2, 25],
    [0, 2, 30],
  ]

  return (
    <>
      {ballPositions.map((pos, i) => (
        <SoccerBall key={i} position={pos} />
      ))}
    </>
  )
}
