'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = ['experience', 'projects', 'skills', 'achievements', 'certifications', 'education', 'contact']

export function MinimapHUD() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = scrolled / documentHeight

      setScrollProgress(progress)

      // Determine active section
      sections.forEach((id, idx) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(idx)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 right-4 z-40 glass p-4 rounded-xl w-48"
    >
      <div className="text-xs font-semibold mb-3 text-gray-400">Navigation</div>

      <div className="space-y-2">
        {sections.map((section, idx) => (
          <button
            key={section}
            onClick={() => {
              document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
              idx === activeSection
                ? 'bg-dotnet-500 text-white'
                : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-gray-400 mb-2">Progress</div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-dotnet-500 to-azure-400 transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}
