'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface CollectibleProps {
  position: [number, number, number]
  type: 'coin' | 'star'
  onCollect: () => void
}

export function Collectible({ position, type, onCollect }: CollectibleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [collected, setCollected] = useState(false)

  useFrame((state) => {
    if (meshRef.current && !collected) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  const handleCollision = () => {
    if (!collected) {
      setCollected(true)
      onCollect()
    }
  }

  if (collected) return null

  const colors = {
    coin: '#ffd700',
    star: '#ffeb3b'
  }

  return (
    <RigidBody
      type="fixed"
      position={position}
      sensor
      onIntersectionEnter={handleCollision}
    >
      <mesh ref={meshRef} castShadow>
        {type === 'coin' && <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />}
        {type === 'star' && <octahedronGeometry args={[0.6, 0]} />}
        <meshStandardMaterial
          color={colors[type]}
          emissive={colors[type]}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        distance={5}
        color={colors[type]}
      />
    </RigidBody>
  )
}
