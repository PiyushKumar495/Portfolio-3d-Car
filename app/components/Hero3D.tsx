'use client'

import { motion } from 'framer-motion'
import { Play, Mouse, ExternalLink } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../lib/motionVariants'

interface Hero3DProps {
  onStart: () => void
}

export function Hero3D({ onStart }: Hero3DProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      {/* Dark animated background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-950/30 via-black to-black opacity-80" />
      <div className="absolute inset-0 bg-dots bg-dots opacity-10" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="text-6xl mb-4 filter drop-shadow-[0_0_20px_rgba(139,92,246,0.8)]">🚗</div>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{
            background: 'linear-gradient(to right, #8b5cf6, #0ea5e9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))',
          }}
        >
          Drive Through My
          <br />
          .NET Journey
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-xl md:text-2xl text-purple-300 mb-4"
        >
          Piyush Kumar
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          An immersive 3D village experience showcasing my work as a .NET Full-Stack Developer
        </motion.p>

        <motion.button
          variants={fadeInUp}
          onClick={onStart}
          className="group relative px-12 py-6 rounded-full font-bold text-xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #0ea5e9)',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 0 80px rgba(14, 165, 233, 0.4)',
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Start Experience
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>

        <motion.div variants={fadeInUp} className="mt-8">
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-500/40 text-purple-300 hover:border-purple-400 hover:text-white hover:bg-purple-500/10 transition-all text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View Classic Portfolio
          </a>
          <p className="mt-2 text-xs text-gray-600">Standard version with .NET Web API</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <Mouse className="w-4 h-4" />
          <span>Use WASD or Arrow Keys to drive</span>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-8 flex gap-6 justify-center text-sm"
        >
          <a
            href="https://github.com/PiyushKumar495"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/piyushkumar123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            LinkedIn
          </a>
          <a href="mailto:piyushkumarbarnwal@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
            Email
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
