'use client'

import { motion } from 'framer-motion'

interface CarUIProps {
  position: { x: number; z: number }
  boostActive: boolean
  boostCooldown: number
}

export function CarUI({ position, boostActive, boostCooldown }: CarUIProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Boost Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-sm rounded-2xl p-4 border-2 border-orange-500/50"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🔥</div>
          <div>
            <div className="text-xs text-gray-400 uppercase">Boost</div>
            <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden mt-1">
              <motion.div
                className={`h-full ${boostActive ? 'bg-orange-500' : 'bg-blue-500'}`}
                style={{ width: `${boostCooldown}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
        {boostActive && (
          <div className="text-xs text-orange-400 mt-1 font-bold animate-pulse">
            ACTIVE!
          </div>
        )}
      </motion.div>

      {/* Minimap */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute bottom-8 right-8 bg-black/70 backdrop-blur-sm rounded-2xl p-4 border-2 border-green-500/50"
      >
        <div className="text-xs text-gray-400 uppercase mb-2 text-center">Map</div>
        <div className="relative w-32 h-32 bg-gray-900 rounded-lg overflow-hidden">
          {/* Grid */}
          <div className="absolute inset-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full border-t border-gray-700"
                style={{ top: `${i * 25}%` }}
              />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full border-l border-gray-700"
                style={{ left: `${i * 25}%` }}
              />
            ))}
          </div>
          
          {/* Player position */}
          <motion.div
            className="absolute w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"
            style={{
              left: `${((position.x + 100) / 200) * 100}%`,
              top: `${((position.z + 100) / 200) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Center marker */}
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          X: {Math.round(position.x)} Z: {Math.round(position.z)}
        </div>
      </motion.div>
    </div>
  )
}