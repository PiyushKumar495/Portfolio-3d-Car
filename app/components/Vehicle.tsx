'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useKeyboardControls } from '../lib/useKeyboardControls'
import { useGameStore } from '../lib/store'
import * as THREE from 'three'

export function Vehicle() {
  const vehicleRef = useRef<any>(null)
  const { forward, backward, left, right } = useKeyboardControls()
  const setCurrentSection = useGameStore((state) => state.setCurrentSection)
  const clearSection = useGameStore((state) => state.clearSection)
  const setVehicleData = useGameStore((state) => state.setVehicleData)
  
  const [boostActive, setBoostActive] = useState(false)
  const [boostCooldown, setBoostCooldown] = useState(100)
  
  const baseSpeed = 20
  const boostSpeed = 40
  const moveSpeed = boostActive ? boostSpeed : baseSpeed
  const rotateSpeed = 0.05
  const currentRotation = useRef(0)

  // Boost key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Shift' || e.shiftKey) && boostCooldown === 100 && !boostActive) {
        setBoostActive(true)
        setBoostCooldown(0)
        setTimeout(() => {
          setBoostActive(false)
        }, 2000)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [boostCooldown, boostActive])

  // Boost cooldown recovery
  useEffect(() => {
    if (!boostActive && boostCooldown < 100) {
      const timer = setInterval(() => {
        setBoostCooldown(prev => Math.min(prev + 1, 100))
      }, 50)
      return () => clearInterval(timer)
    }
  }, [boostActive, boostCooldown])

  useFrame((state) => {
    if (!vehicleRef.current) return

    const body = vehicleRef.current
    const position = body.translation()
    const velocity = body.linvel()
    
    // Rotation
    if (left) currentRotation.current += rotateSpeed
    if (right) currentRotation.current -= rotateSpeed
    
    // Calculate velocity
    let velX = velocity.x
    let velZ = velocity.z
    
    if (forward) {
      velX = Math.sin(currentRotation.current) * moveSpeed
      velZ = Math.cos(currentRotation.current) * moveSpeed
    } else if (backward) {
      velX = -Math.sin(currentRotation.current) * moveSpeed * 0.5
      velZ = -Math.cos(currentRotation.current) * moveSpeed * 0.5
    } else {
      velX = 0
      velZ = 0
    }
    
    body.setLinvel({ x: velX, y: velocity.y, z: velZ }, true)
    
    // Calculate speed and update position
    const currentSpeed = Math.sqrt(velX * velX + velZ * velZ)
    setVehicleData({
      speed: currentSpeed,
      position: { x: position.x, z: position.z },
      boostActive,
      boostCooldown
    })
    
    // Set rotation
    const quat = new THREE.Quaternion()
    quat.setFromEuler(new THREE.Euler(0, currentRotation.current, 0))
    body.setRotation(quat, true)
    
    // Camera follow
    const cameraDistance = 30
    const cameraHeight = 18
    const cameraX = position.x - Math.sin(currentRotation.current) * cameraDistance
    const cameraZ = position.z - Math.cos(currentRotation.current) * cameraDistance
    
    state.camera.position.lerp(
      new THREE.Vector3(cameraX, position.y + cameraHeight, cameraZ),
      0.1
    )
    state.camera.lookAt(position.x, position.y + 2, position.z)
    
    // Check section triggers - increased range
    checkSectionTriggers(position)
  })

  const checkSectionTriggers = (position: { x: number; y: number; z: number }) => {
    const sections = [
      { id: 'experience', x: 0, z: -40, range: 18 },
      { id: 'projects', x: 45, z: -35, range: 18 },
      { id: 'skills', x: 45, z: 35, range: 18 },
      { id: 'achievements', x: 0, z: 55, range: 18 },
      { id: 'certifications', x: -45, z: 35, range: 18 },
      { id: 'education', x: -45, z: -35, range: 18 },
      { id: 'contact', x: 0, z: 0, range: 18 },
    ]

    let closestSection: string | null = null
    let minDistance = Infinity

    sections.forEach((section) => {
      const distance = Math.sqrt(
        Math.pow(position.x - section.x, 2) + Math.pow(position.z - section.z, 2)
      )
      if (distance < section.range && distance < minDistance) {
        minDistance = distance
        closestSection = section.id
      }
    })

    if (closestSection !== null) {
      setCurrentSection(closestSection)
    } else {
      clearSection()
    }
  }

  return (
    <RigidBody
      ref={vehicleRef}
      position={[0, 2, 45]}
      colliders={false}
      type="dynamic"
      lockRotations
      linearDamping={5}
      angularDamping={5}
    >
      <CuboidCollider args={[1.2, 0.6, 2.2]} mass={1} />
      
      <group>
        {/* Main car body */}
        <mesh castShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[2.2, 0.8, 4.5]} />
          <meshStandardMaterial 
            color="#0f172a"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
        
        {/* Car roof */}
        <mesh castShadow position={[0, 1, -0.3]}>
          <boxGeometry args={[2, 0.9, 2.2]} />
          <meshStandardMaterial 
            color="#020617"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Windshield */}
        <mesh castShadow position={[0, 1.1, 0.8]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[1.9, 0.7, 0.1]} />
          <meshStandardMaterial 
            color="#1e293b"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.4}
          />
        </mesh>
        
        {/* Rear windshield */}
        <mesh castShadow position={[0, 1.1, -1.3]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.9, 0.7, 0.1]} />
          <meshStandardMaterial 
            color="#1e293b"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.4}
          />
        </mesh>
        
        {/* Hood accent */}
        <mesh castShadow position={[0, 0.75, 1.8]}>
          <boxGeometry args={[1.8, 0.1, 1]} />
          <meshStandardMaterial 
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Spoiler */}
        <mesh castShadow position={[0, 1.5, -2.3]}>
          <boxGeometry args={[2, 0.1, 0.5]} />
          <meshStandardMaterial 
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Side mirrors */}
        {[-1.3, 1.3].map((x, i) => (
          <mesh key={i} castShadow position={[x, 1.2, 0.5]}>
            <boxGeometry args={[0.2, 0.15, 0.3]} />
            <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        
        {/* Wheels */}
        {[
          [-1.3, -0.3, 1.8],
          [1.3, -0.3, 1.8],
          [-1.3, -0.3, -1.8],
          [1.3, -0.3, -1.8],
        ].map((pos, i) => (
          <group key={i} position={pos as [number, number, number]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.4, 16]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.45, 16]} />
              <meshStandardMaterial color="#1f2937" metalness={0.95} roughness={0.05} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
              <meshStandardMaterial 
                color="#8b5cf6" 
                emissive="#8b5cf6"
                emissiveIntensity={0.8}
                metalness={1} 
                roughness={0} 
              />
            </mesh>
          </group>
        ))}
        
        {/* Headlights */}
        {[-0.8, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.4, 2.3]}>
            <boxGeometry args={[0.3, 0.2, 0.1]} />
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={3}
            />
          </mesh>
        ))}
        
        {/* Headlight beams */}
        {[-0.8, 0.8].map((x, i) => (
          <spotLight
            key={`headlight-${i}`}
            position={[x, 0.4, 2.5]}
            angle={0.6}
            penumbra={0.5}
            intensity={50}
            distance={30}
            color="#ffffff"
            castShadow
          />
        ))}
        
        {/* Taillights */}
        {[-0.8, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.4, -2.3]}>
            <boxGeometry args={[0.3, 0.2, 0.1]} />
            <meshStandardMaterial 
              color="#ff0000"
              emissive="#ff0000"
              emissiveIntensity={2}
            />
          </mesh>
        ))}
        
        {/* Underglow */}
        <pointLight position={[0, -0.5, 0]} intensity={5} distance={6} color="#8b5cf6" />
        <pointLight position={[-1.5, -0.3, 0]} intensity={3} distance={4} color="#8b5cf6" />
        <pointLight position={[1.5, -0.3, 0]} intensity={3} distance={4} color="#8b5cf6" />
      </group>
    </RigidBody>
  )
}
