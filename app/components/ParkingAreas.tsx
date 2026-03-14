'use client'

import { RigidBody } from '@react-three/rapier'
import { Text } from '@react-three/drei'

export function ParkingSpot({ position, label }: { position: [number, number, number]; label: string }) {
  return (
    <group position={position}>
      {/* Parking ground */}
      <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* White parking lines */}
      <mesh position={[-2.8, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[2.8, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.03, -3.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* P sign */}
      <RigidBody type="fixed">
        <mesh castShadow position={[0, 1.5, 4.5]}>
          <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
          <meshStandardMaterial color="#2f4f4f" />
        </mesh>
        <mesh position={[0, 3, 4.5]}>
          <boxGeometry args={[1.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
        </mesh>
      </RigidBody>
      
      <Text
        position={[0, 3, 4.6]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        P
      </Text>
      
      {/* Label */}
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {label}
      </Text>
    </group>
  )
}

export function ParkingAreas() {
  return (
    <>
      <ParkingSpot position={[0, 0, -50]} label="EXPERIENCE" />
      <ParkingSpot position={[55, 0, -35]} label="PROJECTS" />
      <ParkingSpot position={[55, 0, 35]} label="SKILLS" />
      <ParkingSpot position={[0, 0, 65]} label="ACHIEVEMENTS" />
      <ParkingSpot position={[-55, 0, 35]} label="CERTIFICATIONS" />
      <ParkingSpot position={[-55, 0, -35]} label="EDUCATION" />
      <ParkingSpot position={[10, 0, 0]} label="CONTACT" />
    </>
  )
}
