'use client'

import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Float, Stars, Cloud } from '@react-three/drei'
import { SectionArea } from './SectionArea'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MultipleFootballs } from './SoccerBall'
import { InteractiveObjects } from './InteractiveObjects'
import { ParkingAreas } from './ParkingAreas'

// Simple house component
function House({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <RigidBody type="fixed">
        <CuboidCollider args={[2, 2, 2]} position={[0, 2, 0]} />
        <mesh castShadow position={[0, 2, 0]}>
          <boxGeometry args={[4, 4, 4]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </RigidBody>
      <mesh castShadow position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.5, 2, 4]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0, 1, 2.01]}>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {[-1.2, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 2.5, 2.01]}>
          <boxGeometry args={[0.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

// Simple tree component
function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RigidBody type="fixed">
        <CuboidCollider args={[0.4, 2, 0.4]} position={[0, 2, 0]} />
        <mesh castShadow position={[0, 2, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 4, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </RigidBody>
      <mesh castShadow position={[0, 5, 0]}>
        <sphereGeometry args={[2, 8, 8]} />
        <meshStandardMaterial color="#228b22" />
      </mesh>
      <mesh castShadow position={[0, 6.5, 0]}>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshStandardMaterial color="#32cd32" />
      </mesh>
    </group>
  )
}

// Moving animal with walking animation
function Animal({ startPosition }: { startPosition: [number, number, number] }) {
  const rigidBodyRef = useRef<any>(null)
  const groupRef = useRef<THREE.Group>(null)
  const legRefs = useRef<THREE.Mesh[]>([])
  const timeOffset = useRef(Math.random() * Math.PI * 2)
  const pathRadius = useRef(5 + Math.random() * 10)
  const speed = useRef(0.5 + Math.random() * 0.3)
  const prevPos = useRef({ x: startPosition[0], z: startPosition[2] })

  useFrame((state) => {
    if (!rigidBodyRef.current || !groupRef.current) return
    
    const time = state.clock.elapsedTime * speed.current + timeOffset.current
    const x = startPosition[0] + Math.cos(time) * pathRadius.current
    const z = startPosition[2] + Math.sin(time) * pathRadius.current
    
    rigidBodyRef.current.setNextKinematicTranslation({ x, y: 0.8, z })
    
    const dx = x - prevPos.current.x
    const dz = z - prevPos.current.z
    const angle = Math.atan2(dx, dz)
    const quat = new THREE.Quaternion()
    quat.setFromEuler(new THREE.Euler(0, angle, 0))
    rigidBodyRef.current.setNextKinematicRotation(quat)
    
    prevPos.current = { x, z }
    
    const walkSpeed = Math.sqrt(dx * dx + dz * dz) * 100
    legRefs.current.forEach((leg, i) => {
      if (leg) {
        const legTime = state.clock.elapsedTime * walkSpeed + i * Math.PI
        leg.rotation.x = Math.sin(legTime) * 0.4
      }
    })
  })

  return (
    <RigidBody ref={rigidBodyRef} position={startPosition} type="kinematicPosition">
      <CuboidCollider args={[0.6, 0.4, 0.8]} />
      <group ref={groupRef}>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.8, 1.6]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        <mesh castShadow position={[0, 0.2, 1]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
        {[
          [-0.4, -0.3, 0.5],
          [0.4, -0.3, 0.5],
          [-0.4, -0.3, -0.5],
          [0.4, -0.3, -0.5],
        ].map((pos, i) => (
          <mesh 
            key={i} 
            ref={(el) => { if (el) legRefs.current[i] = el }}
            castShadow 
            position={pos as [number, number, number]}
          >
            <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
            <meshStandardMaterial color="#d0d0d0" />
          </mesh>
        ))}
        {[-0.2, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.5, 1.2]}>
            <boxGeometry args={[0.15, 0.3, 0.1]} />
            <meshStandardMaterial color="#e0e0e0" />
          </mesh>
        ))}
      </group>
    </RigidBody>
  )
}

// Moving person with walking animation
function Person({ startPosition, color }: { startPosition: [number, number, number]; color: string }) {
  const rigidBodyRef = useRef<any>(null)
  const groupRef = useRef<THREE.Group>(null)
  const legRefs = useRef<THREE.Mesh[]>([])
  const armRefs = useRef<THREE.Mesh[]>([])
  const timeOffset = useRef(Math.random() * Math.PI * 2)
  const pathRadius = useRef(8 + Math.random() * 12)
  const speed = useRef(0.4 + Math.random() * 0.2)
  const prevPos = useRef({ x: startPosition[0], z: startPosition[2] })

  useFrame((state) => {
    if (!rigidBodyRef.current || !groupRef.current) return
    
    const time = state.clock.elapsedTime * speed.current + timeOffset.current
    const x = startPosition[0] + Math.cos(time) * pathRadius.current
    const z = startPosition[2] + Math.sin(time) * pathRadius.current
    
    rigidBodyRef.current.setNextKinematicTranslation({ x, y: 1.5, z })
    
    const dx = x - prevPos.current.x
    const dz = z - prevPos.current.z
    const angle = Math.atan2(dx, dz)
    const quat = new THREE.Quaternion()
    quat.setFromEuler(new THREE.Euler(0, angle, 0))
    rigidBodyRef.current.setNextKinematicRotation(quat)
    
    prevPos.current = { x, z }
    
    const walkSpeed = Math.sqrt(dx * dx + dz * dz) * 150
    legRefs.current.forEach((leg, i) => {
      if (leg) {
        const offset = i * Math.PI
        leg.rotation.x = Math.sin(state.clock.elapsedTime * walkSpeed + offset) * 0.5
      }
    })
    
    armRefs.current.forEach((arm, i) => {
      if (arm) {
        const offset = i * Math.PI
        arm.rotation.x = Math.sin(state.clock.elapsedTime * walkSpeed + offset) * 0.3
      }
    })
  })

  return (
    <RigidBody ref={rigidBodyRef} position={startPosition} type="kinematicPosition">
      <CuboidCollider args={[0.4, 0.6, 0.2]} />
      <group ref={groupRef}>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.4]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh castShadow position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
        {[-0.5, 0.5].map((x, i) => (
          <mesh 
            key={i} 
            ref={(el) => { if (el) armRefs.current[i] = el }}
            castShadow 
            position={[x, 0, 0]}
          >
            <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        {[-0.2, 0.2].map((x, i) => (
          <mesh 
            key={i} 
            ref={(el) => { if (el) legRefs.current[i] = el }}
            castShadow 
            position={[x, -0.9, 0]}
          >
            <cylinderGeometry args={[0.12, 0.12, 1.2, 8]} />
            <meshStandardMaterial color="#4169e1" />
          </mesh>
        ))}
      </group>
    </RigidBody>
  )
}

// Ramp for stunts
function Ramp({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <RigidBody type="fixed" position={position} rotation={rotation}>
      <CuboidCollider args={[4, 0.25, 6]} />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[8, 0.5, 12]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
    </RigidBody>
  )
}

export function World() {
  return (
    <>
      {/* Grass ground */}
      <RigidBody type="fixed">
        <CuboidCollider args={[100, 0.5, 100]} position={[0, -0.5, 0]} />
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[200, 1, 200]} />
          <meshStandardMaterial color="#2d5016" roughness={0.9} />
        </mesh>
      </RigidBody>
      
      {/* Boundary walls - invisible colliders */}
      <RigidBody type="fixed" position={[100, 5, 0]}>
        <CuboidCollider args={[1, 10, 100]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-100, 5, 0]}>
        <CuboidCollider args={[1, 10, 100]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 5, 100]}>
        <CuboidCollider args={[100, 10, 1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 5, -100]}>
        <CuboidCollider args={[100, 10, 1]} />
      </RigidBody>
      
      {/* Visible boundary markers - green fence */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={`fence-north-${i}`} position={[-98 + i * 4, 1, 98]} castShadow>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={`fence-south-${i}`} position={[-98 + i * 4, 1, -98]} castShadow>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={`fence-east-${i}`} position={[98, 1, -98 + i * 4]} castShadow>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={`fence-west-${i}`} position={[-98, 1, -98 + i * 4]} castShadow>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Dirt paths */}
      <mesh receiveShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[8, 0.05, 200]} />
        <meshStandardMaterial color="#8b7355" roughness={1} />
      </mesh>
      <mesh receiveShadow position={[0, 0.01, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 0.05, 200]} />
        <meshStandardMaterial color="#8b7355" roughness={1} />
      </mesh>
      
      <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      <Cloud position={[20, 25, -30]} speed={0.2} opacity={0.3} />
      <Cloud position={[-30, 28, 20]} speed={0.3} opacity={0.25} />
      <Cloud position={[40, 30, 40]} speed={0.25} opacity={0.3} />
      
      <SectionArea position={[0, 0, -40]} title="EXPERIENCE" color="#8b5cf6" icon="💼" />
      <SectionArea position={[45, 0, -35]} title="PROJECTS" color="#0ea5e9" icon="🚀" />
      <SectionArea position={[45, 0, 35]} title="SKILLS" color="#10b981" icon="⚡" />
      <SectionArea position={[0, 0, 55]} title="ACHIEVEMENTS" color="#f59e0b" icon="🏆" />
      <SectionArea position={[-45, 0, 35]} title="CERTIFICATIONS" color="#ec4899" icon="🎓" />
      <SectionArea position={[-45, 0, -35]} title="EDUCATION" color="#6366f1" icon="📚" />
      <SectionArea position={[0, 0, 0]} title="CONTACT" color="#14b8a6" icon="📧" />
      
      <House position={[20, 0, -45]} color="#d2691e" />
      <House position={[-20, 0, -45]} color="#cd853f" />
      <House position={[55, 0, -40]} color="#daa520" />
      <House position={[55, 0, 30]} color="#d2691e" />
      <House position={[-55, 0, 30]} color="#cd853f" />
      <House position={[-55, 0, -40]} color="#daa520" />
      <House position={[20, 0, 60]} color="#d2691e" />
      <House position={[-20, 0, 60]} color="#cd853f" />
      
      <Tree position={[15, 0, -20]} />
      <Tree position={[-15, 0, -25]} />
      <Tree position={[30, 0, -15]} />
      <Tree position={[-30, 0, -18]} />
      <Tree position={[18, 0, 20]} />
      <Tree position={[-15, 0, 25]} />
      <Tree position={[35, 0, 45]} />
      <Tree position={[-35, 0, 48]} />
      
      <Animal startPosition={[25, 0, -15]} />
      <Animal startPosition={[-25, 0, 15]} />
      <Animal startPosition={[20, 0, 40]} />
      <Animal startPosition={[-30, 0, -25]} />
      <Animal startPosition={[35, 0, 10]} />
      <Animal startPosition={[-20, 0, 45]} />
      
      {/* Interactive Soccer Balls */}
      <MultipleFootballs />
      
      {/* Interactive Objects - Boxes and Ramps */}
      <InteractiveObjects />
      
      {/* Parking Areas */}
      <ParkingAreas />
      
      <Person startPosition={[15, 0, -30]} color="#ff6b6b" />
      <Person startPosition={[-22, 0, 20]} color="#4ecdc4" />
      <Person startPosition={[30, 0, -10]} color="#95e1d3" />
      <Person startPosition={[-15, 0, -40]} color="#f38181" />
      <Person startPosition={[12, 0, 50]} color="#aa96da" />
      <Person startPosition={[-35, 0, 12]} color="#fcbad3" />
      
      {[
        [15, 0, -25], [-15, 0, -25], [15, 0, 25], [-15, 0, 25],
        [30, 0, 0], [-30, 0, 0], [0, 0, 40], [0, 0, -40],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.15, 6, 8]} />
            <meshStandardMaterial color="#2f4f4f" metalness={0.8} />
          </mesh>
          <mesh position={[0, 3.5, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={1} />
          </mesh>
          <pointLight position={[0, 3.5, 0]} intensity={10} distance={20} color="#ffeb3b" castShadow />
        </group>
      ))}
      
      <group position={[0, 0, 0]}>
        <RigidBody type="fixed">
          <CuboidCollider args={[0.75, 1, 0.75]} position={[0, 1, 0]} />
          <mesh castShadow position={[0, 1, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 2, 16]} />
            <meshStandardMaterial color="#696969" />
          </mesh>
        </RigidBody>
        <mesh castShadow position={[0, 2.5, 0]}>
          <torusGeometry args={[1.5, 0.2, 16, 32]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      </group>
      
      <fog attach="fog" args={['#87ceeb', 60, 150]} />
    </>
  )
}
