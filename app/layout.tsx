import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from './components/Toaster'

export const metadata: Metadata = {
  title: 'Piyush Kumar | .NET Full-Stack Developer',
  description: 'Building scalable .NET backends & modern Next.js frontends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
