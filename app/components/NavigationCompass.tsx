'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '../lib/store'

const sections = [
  { id: 'contact', label: 'Contact', color: '#14b8a6', angle: 0, distance: 0 },
  { id: 'experience', label: 'Experience', color: '#8b5cf6', angle: 180, distance: 30 },
  { id: 'projects', label: 'Projects', color: '#0ea5e9', angle: 135, distance: 43 },
  { id: 'skills', label: 'Skills', color: '#10b981', angle: 45, distance: 43 },
  { id: 'achievements', label: 'Achievements', color: '#f59e0b', angle: 0, distance: 45 },
  { id: 'certifications', label: 'Certifications', color: '#ec4899', angle: -45, distance: 43 },
  { id: 'education', label: 'Education', color: '#6366f1', angle: -135, distance: 43 },
]

export function NavigationCompass() {
  const currentSection = useGameStore((state) => state.currentSection)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <div className="glass p-6 rounded-2xl shadow-glow border-2 border-white/10">
        <div className="text-sm font-bold mb-4 text-center text-gray-400">Navigation Map</div>
        
        {/* Compass */}
        <div className="relative w-48 h-48">
          {/* Center (Contact) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentSection === 'contact' ? 'scale-125 shadow-glow' : ''
              }`}
              style={{
                backgroundColor: currentSection === 'contact' ? '#14b8a6' : '#14b8a620',
                color: currentSection === 'contact' ? '#fff' : '#14b8a6',
                border: `2px solid #14b8a6`,
              }}
            >
              📧
            </div>
          </div>

          {/* Other sections */}
          {sections.slice(1).map((section) => {
            const angleRad = (section.angle * Math.PI) / 180
            const radius = 70
            const x = Math.sin(angleRad) * radius
            const y = -Math.cos(angleRad) * radius

            return (
              <div
                key={section.id}
                className="absolute top-1/2 left-1/2 transition-all"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentSection === section.id ? 'scale-125 shadow-glow' : ''
                  }`}
                  style={{
                    backgroundColor: currentSection === section.id ? section.color : `${section.color}20`,
                    color: currentSection === section.id ? '#fff' : section.color,
                    border: `2px solid ${section.color}`,
                  }}
                  title={section.label}
                >
                  {section.label.charAt(0)}
                </div>
                
                {/* Line to center */}
                <svg
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    width: Math.abs(x) * 2,
                    height: Math.abs(y) * 2,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <line
                    x1={x > 0 ? 0 : Math.abs(x) * 2}
                    y1={y > 0 ? 0 : Math.abs(y) * 2}
                    x2={x > 0 ? Math.abs(x) * 2 : 0}
                    y2={y > 0 ? Math.abs(y) * 2 : 0}
                    stroke={section.color}
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </svg>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 space-y-1 text-xs">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`flex items-center gap-2 transition-all ${
                currentSection === section.id ? 'text-white font-bold' : 'text-gray-500'
              }`}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: section.color }}
              />
              <span>{section.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
