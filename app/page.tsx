'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Hero3D } from './components/Hero3D'
import { UIOverlay } from './components/UIOverlay'
import { Particles } from './components/Particles'

// Dynamically import 3D components to avoid SSR issues
const Experience3D = dynamic(
  () => import('./components/Experience3D').then((mod) => mod.Experience3D),
  { ssr: false }
)

export default function Home() {
  const [started, setStarted] = useState(false)

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {!started ? (
        <>
          <Particles />
          <Hero3D onStart={() => setStarted(true)} />
        </>
      ) : (
        <>
          <Experience3D />
          <UIOverlay />
        </>
      )}
    </main>
  )
}
