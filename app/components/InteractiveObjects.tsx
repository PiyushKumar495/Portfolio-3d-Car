'use client'

import { RigidBody } from '@react-three/rapier'

export function PushableBox({ position }: { position: [number, number, number] }) {
  return (
    <RigidBody
      position={position}
      colliders="cuboid"
      restitution={0.2}
      friction={0.8}
      mass={5}
    >
      <mesh castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#8b4513"
          roughness={0.8}
        />
      </mesh>
      {/* Wood texture lines */}
      <mesh position={[0, 0, 1.01]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </RigidBody>
  )
}

export function JumpRamp({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <RigidBody type="fixed" position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[6, 0.5, 8]} />
        <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.5} />
      </mesh>
    </RigidBody>
  )
}

export function InteractiveObjects() {
  return (
    <>
      {/* Pushable boxes scattered around */}
      <PushableBox position={[15, 1, 0]} />
      <PushableBox position={[-18, 1, 5]} />
      <PushableBox position={[25, 1, -30]} />
      <PushableBox position={[-20, 1, 30]} />
      <PushableBox position={[5, 1, 20]} />
      
      {/* Jump ramps */}
      <JumpRamp position={[30, 0, 0]} rotation={[0.3, 0, 0]} />
      <JumpRamp position={[-35, 0, -10]} rotation={[0.3, Math.PI / 4, 0]} />
      <JumpRamp position={[0, 0, -60]} rotation={[0.4, 0, 0]} />
    </>
  )
}
