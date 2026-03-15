'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../lib/store'
import { mockExperience, mockProjects, mockSkills, mockAchievements, mockCertifications, mockEducation } from '../lib/mockData'
import { Github, Linkedin, Mail, ExternalLink, Briefcase, Code, Zap, Trophy, Award, GraduationCap, MessageCircle } from 'lucide-react'
import { NavigationCompass } from './NavigationCompass'

const sectionContent: Record<string, any> = {
  experience: {
    title: 'Experience',
    icon: Briefcase,
    color: '#8b5cf6',
    data: mockExperience,
    type: 'experience',
  },
  projects: {
    title: 'Projects',
    icon: Code,
    color: '#0ea5e9',
    data: mockProjects,
    type: 'projects',
  },
  skills: {
    title: 'Skills',
    icon: Zap,
    color: '#10b981',
    data: mockSkills,
    type: 'skills',
  },
  achievements: {
    title: 'Achievements',
    icon: Trophy,
    color: '#f59e0b',
    data: mockAchievements,
    type: 'achievements',
  },
  certifications: {
    title: 'Certifications',
    icon: Award,
    color: '#ec4899',
    data: mockCertifications,
    type: 'certifications',
  },
  education: {
    title: 'Education',
    icon: GraduationCap,
    color: '#6366f1',
    data: mockEducation,
    type: 'education',
  },
  contact: {
    title: 'Contact',
    icon: MessageCircle,
    color: '#14b8a6',
    type: 'contact',
  },
}

export function UIOverlay() {
  const currentSection = useGameStore((state) => state.currentSection)
  const content = currentSection ? sectionContent[currentSection] : null
  const IconComponent = content?.icon

  return (
    <>
      {/* Enhanced Controls hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 left-8 z-40"
      >
        <div className="glass p-6 rounded-2xl shadow-glow border-2 border-white/10">
          <div className="text-lg font-bold mb-3 text-dotnet-400">🎮 Controls</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">W</kbd>
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">↑</kbd>
              <span className="text-gray-300">Forward</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">S</kbd>
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">↓</kbd>
              <span className="text-gray-300">Backward</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">A</kbd>
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">←</kbd>
              <span className="text-gray-300">Turn Left</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">D</kbd>
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">→</kbd>
              <span className="text-gray-300">Turn Right</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-1 bg-white/10 rounded font-mono text-xs">Shift</kbd>
              <span className="text-gray-300">Boost</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Compass */}
      <NavigationCompass />

      {/* Enhanced Section info panel */}
      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-8 right-8 bottom-8 z-40 w-[450px]"
          >
            <div 
              className="glass p-8 rounded-3xl shadow-glow-lg border-2 h-full flex flex-col"
              style={{ 
                borderColor: `${content.color}40`,
                boxShadow: `0 0 40px ${content.color}40, 0 20px 60px rgba(0,0,0,0.5)`
              }}
            >
              {/* Header - Fixed */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10 flex-shrink-0">
                <div 
                  className="p-4 rounded-2xl"
                  style={{ backgroundColor: `${content.color}20` }}
                >
                  {IconComponent && <IconComponent className="w-8 h-8" style={{ color: content.color }} />}
                </div>
                <div className="flex-1">
                  <h2 
                    className="text-3xl font-bold glow-text"
                    style={{ color: content.color }}
                  >
                    {content.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">Scroll to see all</p>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {content.type === 'experience' && (
                  <>
                    {content.data.map((exp: any) => (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-dotnet-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-xl text-dotnet-400">{exp.role}</h3>
                          <span className="text-xs px-3 py-1 bg-dotnet-500/20 rounded-full text-dotnet-300 whitespace-nowrap">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-gray-200 mb-1">{exp.company}</div>
                        <div className="text-sm text-gray-400 mb-4">{exp.location}</div>
                        <ul className="space-y-2">
                          {exp.highlights.map((h: string, i: number) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-dotnet-400 mt-1 text-lg flex-shrink-0">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </>
                )}

                {content.type === 'projects' && (
                  <>
                    {content.data.map((project: any, idx: number) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-azure-400/50 transition-all group"
                      >
                        <h3 className="font-bold text-xl mb-3 text-azure-400 group-hover:text-azure-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map((tech: string) => (
                            <span key={tech} className="text-xs px-3 py-1 bg-azure-500/20 text-azure-300 rounded-full border border-azure-500/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-azure-400 hover:text-azure-300 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            View on GitHub
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </>
                )}

                {content.type === 'skills' && (
                  <>
                    {content.data.map((skillGroup: any, idx: number) => (
                      <motion.div
                        key={skillGroup.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10"
                      >
                        <h3 className="font-bold text-lg mb-4 text-green-400">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((item: string) => (
                            <span key={item} className="text-sm px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 transition-all cursor-default">
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}

                {content.type === 'achievements' && (
                  <>
                    {content.data.map((achievement: any, idx: number) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-all flex items-start gap-4"
                      >
                        <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-orange-400 mb-2">{achievement.title}</h3>
                          <p className="text-sm text-gray-300">{achievement.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}

                {content.type === 'certifications' && (
                  <>
                    {content.data.map((cert: any, idx: number) => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-pink-500/20 rounded-xl flex-shrink-0">
                            <Award className="w-6 h-6 text-pink-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-base text-pink-400 mb-2 leading-tight">{cert.title}</h3>
                            <div className="text-sm text-gray-300 mb-1">{cert.issuer}</div>
                            <div className="text-xs text-gray-500">{cert.date}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}

                {content.type === 'education' && (
                  <>
                    {content.data.map((edu: any, idx: number) => (
                      <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-indigo-500/20 rounded-xl flex-shrink-0">
                            <GraduationCap className="w-6 h-6 text-indigo-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-indigo-400 mb-2">{edu.degree}</h3>
                            <div className="text-base font-semibold text-gray-200 mb-1">{edu.institution}</div>
                            <div className="text-sm text-gray-400">{edu.location} • {edu.graduationDate}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}

                {content.type === 'contact' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                        Let's connect and build something amazing together!
                      </p>
                      
                      <div className="space-y-3">
                        <a
                          href="mailto:piyushkumarbarnwal@gmail.com"
                          className="flex items-center gap-4 p-4 bg-teal-500/10 hover:bg-teal-500/20 rounded-xl border border-teal-500/30 transition-all group"
                        >
                          <div className="p-3 bg-teal-500/20 rounded-lg group-hover:scale-110 transition-transform">
                            <Mail className="w-5 h-5 text-teal-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-teal-400">Email</div>
                            <div className="text-sm text-gray-400">piyushkumarbarnwal@gmail.com</div>
                          </div>
                        </a>

                        <a
                          href="https://github.com/PiyushKumar495"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 bg-gray-500/10 hover:bg-gray-500/20 rounded-xl border border-gray-500/30 transition-all group"
                        >
                          <div className="p-3 bg-gray-500/20 rounded-lg group-hover:scale-110 transition-transform">
                            <Github className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-300">GitHub</div>
                            <div className="text-sm text-gray-400">@PiyushKumar495</div>
                          </div>
                        </a>

                        <a
                          href="https://linkedin.com/in/piyushkumar123"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl border border-blue-500/30 transition-all group"
                        >
                          <div className="p-3 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                            <Linkedin className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-blue-400">LinkedIn</div>
                            <div className="text-sm text-gray-400">piyushkumar123</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </>
  )
}
