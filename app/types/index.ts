export interface Profile {
  name: string
  title: string
  location: string
  phone: string
  email: string
  linkedin: string
  github: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  highlights: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon?: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credentialUrl?: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  graduationDate: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
