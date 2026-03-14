'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface CarParticlesProps {
  carPosition: THREE.Vector3
  isMoving: boolean
  isBoosting: boolean
}

export function DustTrail({ position, active }: { position: [number, number, number]; active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particlesCount = 50
  const positions = useRef(new Float32Array(particlesCount * 3))
  const velocities = useRef(new Float32Array(particlesCount * 3))
  const lifetimes = useRef(new Float32Array(particlesCount))

  useFrame((state, delta) => {
    if (!pointsRef.current || !active) return

    const posArray = positions.current
    const velArray = velocities.current
    const lifeArray = lifetimes.current

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3

      // Update lifetime
      lifeArray[i] -= delta * 2

      if (lifeArray[i] <= 0) {
        // Reset particle
        posArray[i3] = position[0] + (Math.random() - 0.5) * 2
        posArray[i3 + 1] = position[1] + 0.2
        posArray[i3 + 2] = position[2] + (Math.random() - 0.5) * 2
        
        velArray[i3] = (Math.random() - 0.5) * 0.5
        velArray[i3 + 1] = Math.random() * 0.5
        velArray[i3 + 2] = (Math.random() - 0.5) * 0.5
        
        lifeArray[i] = 1
      } else {
        // Update position
        posArray[i3] += velArray[i3] * delta
        posArray[i3 + 1] += velArray[i3 + 1] * delta
        posArray[i3 + 2] += velArray[i3 + 2] * delta
      }
    }

    if (pointsRef.current.geometry.attributes.position) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={pointsRef} positions={positions.current} stride={3}>
      <PointMaterial
        transparent
        color="#8b7355"
        size={0.3}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

export function BoostFlames({ position, active }: { position: [number, number, number]; active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const particlesCount = 30
  const positions = useRef(new Float32Array(particlesCount * 3))
  const velocities = useRef(new Float32Array(particlesCount * 3))
  const lifetimes = useRef(new Float32Array(particlesCount))

  useFrame((state, delta) => {
    if (!pointsRef.current || !active) return

    const posArray = positions.current
    const velArray = velocities.current
    const lifeArray = lifetimes.current

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3

      lifeArray[i] -= delta * 5

      if (lifeArray[i] <= 0) {
        // Reset particle at car back
        posArray[i3] = position[0] + (Math.random() - 0.5) * 1
        posArray[i3 + 1] = position[1] + 0.5
        posArray[i3 + 2] = position[2] - 2.5 + (Math.random() - 0.5) * 0.5
        
        velArray[i3] = (Math.random() - 0.5) * 0.3
        velArray[i3 + 1] = Math.random() * 0.2
        velArray[i3 + 2] = -Math.random() * 2
        
        lifeArray[i] = 1
      } else {
        posArray[i3] += velArray[i3] * delta
        posArray[i3 + 1] += velArray[i3 + 1] * delta
        posArray[i3 + 2] += velArray[i3 + 2] * delta
      }
    }

    if (pointsRef.current.geometry.attributes.position) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  if (!active) return null

  return (
    <Points ref={pointsRef} positions={positions.current} stride={3}>
      <PointMaterial
        transparent
        color="#ff6b00"
        size={0.5}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}
