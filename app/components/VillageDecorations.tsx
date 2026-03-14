'use client'

import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Bench({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed">
        <CuboidCollider args={[1, 0.2, 0.4]} position={[0, 0.4, 0]} />
        <mesh castShadow position={[0, 0.4, 0]}>
          <boxGeometry args={[2, 0.4, 0.8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        <mesh castShadow position={[0, 0.8, -0.3]}>
          <boxGeometry args={[2, 0.6, 0.1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        {[-0.8, 0.8].map((x, i) => (
          <mesh key={i} castShadow position={[x, 0.2, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.8]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
        ))}
      </RigidBody>
    </group>
  )
}

export function Fountain({ position }: { position: [number, number, number] }) {
  const waterRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <group position={position}>
      <RigidBody type="fixed">
        <CuboidCollider args={[2, 0.5, 2]} position={[0, 0.5, 0]} />
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <cylinderGeometry args={[2, 2.5, 1, 8]} />
          <meshStandardMaterial color="#a0a0a0" />
        </mesh>
      </RigidBody>
      <mesh ref={waterRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#4fc3f7" transparent opacity={0.6} />
      </mesh>
      <pointLight position={[0, 2, 0]} intensity={5} distance={10} color="#4fc3f7" />
    </group>
  )
}

export function FlowerBed({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 0.6
        const z = Math.sin(angle) * 0.6
        const colors = ['#ff1744', '#ffeb3b', '#e91e63', '#9c27b0', '#2196f3']
        return (
          <mesh key={i} castShadow position={[x, 0.4, z]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color={colors[i % colors.length]} />
          </mesh>
        )
      })}
    </group>
  )
}

export function Playground({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Slide */}
      <RigidBody type="fixed" position={[-3, 0, 0]}>
        <CuboidCollider args={[1, 1.5, 1]} />
        <mesh castShadow position={[0, 1.5, 0]}>
          <boxGeometry args={[2, 3, 2]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh castShadow position={[1.5, 0.75, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[2, 0.3, 1.5]} />
          <meshStandardMaterial color="#ffd93d" />
        </mesh>
      </RigidBody>

      {/* Swing */}
      <group position={[3, 0, 0]}>
        <RigidBody type="fixed">
          <mesh castShadow position={[0, 2.5, 0]}>
            <boxGeometry args={[3, 0.2, 0.2]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          {[-1, 1].map((x, i) => (
            <mesh key={i} castShadow position={[x, 1.25, 0]}>
              <boxGeometry args={[0.2, 2.5, 0.2]} />
              <meshStandardMaterial color="#8b4513" />
            </mesh>
          ))}
        </RigidBody>
        <mesh castShadow position={[0, 1, 0]}>
          <boxGeometry args={[0.8, 0.1, 0.6]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
      </group>

      {/* Sandbox */}
      <mesh receiveShadow position={[0, 0.1, 3]}>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#f4a460" />
      </mesh>
    </group>
  )
}

export function Mailbox({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed">
        <CuboidCollider args={[0.3, 0.4, 0.3]} position={[0, 0.9, 0]} />
        <mesh castShadow position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh castShadow position={[0, 0.9, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.6]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
        <mesh position={[0.31, 0.9, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.4]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </RigidBody>
    </group>
  )
}

export function Flag({ position }: { position: [number, number, number] }) {
  const flagRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (flagRef.current) {
      flagRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh castShadow position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
      <mesh ref={flagRef} castShadow position={[0.5, 4, 0]}>
        <boxGeometry args={[1, 0.6, 0.05]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
    </group>
  )
}
