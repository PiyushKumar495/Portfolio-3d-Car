'use client'

import { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { Text } from '@react-three/drei'
import { useGameStore } from '../lib/store'
import * as THREE from 'three'

interface GoalPostProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  team: 'blue' | 'red'
}

export function GoalPost({ position, rotation = [0, 0, 0], team }: GoalPostProps) {
  const addGoal = useGameStore((state) => state.addGoal)
  const color = team === 'blue' ? '#0ea5e9' : '#ef4444'
  const ballsScored = useRef(new Set<string>())

  const handleBallEnter = (event: any) => {
    // Check if it's a ball (has restitution > 0.7)
    const otherBody = event.other.rigidBody
    if (otherBody && otherBody.restitution && otherBody.restitution() > 0.7) {
      const ballId = otherBody.handle
      if (!ballsScored.current.has(ballId)) {
        ballsScored.current.add(ballId)
        addGoal(team)
        console.log(`GOAL! ${team} team scored!`)
        
        // Reset after 2 seconds so same ball can score again
        setTimeout(() => {
          ballsScored.current.delete(ballId)
        }, 2000)
      }
    }
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Goal frame */}
      <RigidBody type="fixed">
        {/* Left post */}
        <mesh castShadow position={[-4, 2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Right post */}
        <mesh castShadow position={[4, 2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Top bar */}
        <mesh castShadow position={[0, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 8, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Back posts */}
        <mesh castShadow position={[-4, 2, -2]}>
          <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[4, 2, -2]}>
          <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Top back bar */}
        <mesh castShadow position={[0, 4, -2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 8, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Side bars */}
        <mesh castShadow position={[-4, 4, -1]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[4, 4, -1]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
      </RigidBody>
      
      {/* Goal detection zone (sensor) - larger area */}
      <RigidBody type="fixed" sensor onIntersectionEnter={handleBallEnter}>
        <mesh position={[0, 2, -0.5]} visible={false}>
          <boxGeometry args={[9, 5, 3]} />
        </mesh>
      </RigidBody>
      
      {/* Net visual */}
      <mesh position={[0, 2, -1]}>
        <boxGeometry args={[8, 4, 2]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>
      
      {/* Team label */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.8}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {team.toUpperCase()} GOAL
      </Text>
      
      {/* Ground marker */}
      <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

export function SoccerGoals() {
  return (
    <>
      {/* Blue goal */}
      <GoalPost position={[0, 0, -70]} team="blue" />
      
      {/* Red goal */}
      <GoalPost position={[0, 0, 70]} rotation={[0, Math.PI, 0]} team="red" />
    </>
  )
}
