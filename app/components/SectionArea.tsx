'use client'

import { Text, Float, Sparkles } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SectionAreaProps {
  position: [number, number, number]
  title: string
  color: string
  icon: string
}

export function SectionArea({ position, title, color, icon }: SectionAreaProps) {
  const platformRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (platformRef.current) {
      platformRef.current.rotation.y += 0.002
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group position={position}>
      {/* Base platform */}
      <RigidBody type="fixed" sensor>
        <mesh receiveShadow position={[0, 0.1, 0]}>
          <cylinderGeometry args={[10, 10, 0.3, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </RigidBody>
      
      {/* Rotating platform detail */}
      <mesh ref={platformRef} position={[0, 0.25, 0]}>
        <cylinderGeometry args={[9.5, 9.5, 0.1, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Title with better visibility */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <Text
          position={[0, 4, 0]}
          fontSize={2}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.2}
          outlineColor={color}
          fontWeight="bold"
        >
          {title}
        </Text>
      </Float>
      
      {/* Icon/Emoji - larger and more visible */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.8}>
        <Text
          position={[0, 6.5, 0]}
          fontSize={3.5}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      </Float>
      
      {/* Pulsing glow effect */}
      <mesh ref={glowRef} position={[0, 0.4, 0]}>
        <cylinderGeometry args={[11, 11, 0.1, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Outer ring */}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[10.5, 0.3, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0}
        />
      </mesh>
      
      {/* Sparkles effect */}
      <Sparkles
        count={50}
        scale={[20, 10, 20]}
        size={3}
        speed={0.3}
        color={color}
        opacity={0.6}
      />
      
      {/* Pillars with improved design */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => {
        const x = Math.cos(angle) * 9
        const z = Math.sin(angle) * 9
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Main pillar */}
            <mesh castShadow>
              <cylinderGeometry args={[0.4, 0.5, 3, 8]} />
              <meshStandardMaterial 
                color={color} 
                metalness={0.9} 
                roughness={0.1}
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Pillar top */}
            <mesh position={[0, 1.7, 0]}>
              <cylinderGeometry args={[0.6, 0.4, 0.3, 8]} />
              <meshStandardMaterial 
                color={color} 
                metalness={1} 
                roughness={0}
                emissive={color}
                emissiveIntensity={0.5}
              />
            </mesh>
            {/* Pillar light */}
            <pointLight position={[0, 2, 0]} intensity={2} distance={8} color={color} />
          </group>
        )
      })}
      
      {/* Center light beam */}
      <mesh position={[0, 5, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 2, 10, 32, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Point light for illumination */}
      <pointLight position={[0, 8, 0]} intensity={5} distance={25} color={color} />
      <pointLight position={[0, 1, 0]} intensity={3} distance={15} color={color} />
    </group>
  )
}
