'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { X } from 'lucide-react'
import { useReducedMotion } from '../lib/hooks'

gsap.registerPlugin(MotionPathPlugin)

interface Waypoint {
  id: string
  label: string
  progress: number
}

const waypoints: Waypoint[] = [
  { id: 'experience', label: 'Experience', progress: 0.14 },
  { id: 'projects', label: 'Projects', progress: 0.28 },
  { id: 'skills', label: 'Skills', progress: 0.42 },
  { id: 'achievements', label: 'Achievements', progress: 0.56 },
  { id: 'certifications', label: 'Certifications', progress: 0.70 },
  { id: 'education', label: 'Education', progress: 0.84 },
  { id: 'contact', label: 'Contact', progress: 1 },
]

interface GameMapProps {
  onClose: () => void
}

export function GameMap({ onClose }: GameMapProps) {
  const carRef = useRef<SVGCircleElement>(null)
  const [currentWaypoint, setCurrentWaypoint] = useState(0)
  const [progress, setProgress] = useState(0)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!carRef.current || prefersReducedMotion) return

    const tween = gsap.to(carRef.current, {
      duration: 20,
      ease: 'none',
      motionPath: {
        path: '#roadPath',
        align: '#roadPath',
        alignOrigin: [0.5, 0.5],
      },
      paused: true,
      onUpdate: function() {
        const prog = this.progress()
        setProgress(prog)

        // Check waypoints
        waypoints.forEach((wp, idx) => {
          if (prog >= wp.progress && idx > currentWaypoint) {
            setCurrentWaypoint(idx)
            triggerWaypoint(wp)
          }
        })
      },
    })

    animationRef.current = tween
    return () => {
      tween.kill()
    }
  }, [prefersReducedMotion])

  const triggerWaypoint = (waypoint: Waypoint) => {
    const element = document.getElementById(waypoint.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    // Celebration animation
    const node = document.getElementById(`node-${waypoint.id}`)
    if (node) {
      gsap.to(node, {
        scale: 1.5,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      })
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!animationRef.current) return

    const speed = 0.01
    const currentProgress = animationRef.current.progress()

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      animationRef.current.progress(Math.min(currentProgress + speed, 1))
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      animationRef.current.progress(Math.max(currentProgress - speed, 0))
    } else if (e.key === ' ') {
      e.preventDefault()
      animationRef.current.paused(!animationRef.current.paused())
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div className="glass p-8 rounded-2xl max-w-md text-center">
          <p className="mb-4">Game mode is disabled due to reduced motion preference.</p>
          <button onClick={onClose} className="glass-hover px-6 py-2 rounded-full">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 glass-hover p-2 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-4xl">
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center glow-text">
            Drive Through My Journey
          </h2>

          <div className="mb-4 text-center text-sm text-gray-400">
            Use Arrow Keys or WASD to drive • Space to pause
          </div>

          <svg
            viewBox="0 0 800 600"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Road path */}
            <path
              id="roadPath"
              d="M 100,300 Q 200,100 400,150 T 700,300 Q 650,450 400,500 T 100,300"
              fill="none"
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="40"
              strokeLinecap="round"
            />

            {/* Waypoint nodes */}
            {waypoints.map((wp, idx) => {
              const angle = (idx / waypoints.length) * Math.PI * 2
              const x = 400 + Math.cos(angle) * 250
              const y = 300 + Math.sin(angle) * 200

              return (
                <g key={wp.id}>
                  <circle
                    id={`node-${wp.id}`}
                    cx={x}
                    cy={y}
                    r="20"
                    fill={idx <= currentWaypoint ? '#8b5cf6' : 'rgba(139, 92, 246, 0.3)'}
                    className="transition-all duration-300"
                  />
                  <text
                    x={x}
                    y={y - 35}
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {wp.label}
                  </text>
                </g>
              )
            })}

            {/* Car */}
            <circle
              ref={carRef}
              r="15"
              fill="#0ea5e9"
              stroke="white"
              strokeWidth="2"
            />
          </svg>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-dotnet-500 to-azure-400 transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Checkpoint badges */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {waypoints.map((wp, idx) => (
              <div
                key={wp.id}
                className={`px-3 py-1 rounded-full text-xs ${
                  idx <= currentWaypoint
                    ? 'bg-dotnet-500 text-white'
                    : 'bg-gray-800 text-gray-500'
                }`}
              >
                {wp.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
