import type { Profile, Experience, Project, Skill, Achievement, Certification, Education } from '../types'

export const mockProfile: Profile = {
  name: 'Piyush Kumar',
  title: '.NET Full-Stack Developer',
  location: 'Bengaluru, Karnataka, 560066',
  phone: '+91-7061615693',
  email: 'piyushkumarbarnwal@gmail.com',
  linkedin: 'linkedin.com/in/piyushkumar123',
  github: 'github.com/PiyushKumar495',
  summary: '.NET Full-Stack Developer at Capgemini delivering end-to-end solutions across ASP.NET Core Web APIs and Angular frontends for enterprise workflow systems. Achieved 30% API performance improvement via SQL query optimization. Azure Developer Associate (AZ-204) certified.',
}

export const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'Capgemini',
    role: 'Software Developer (.NET Full Stack)',
    location: 'Bengaluru, Karnataka',
    startDate: 'Jan 2025',
    endDate: 'Present',
    highlights: [
      'Designed and shipped 10+ RESTful APIs in ASP.NET Core using Repository pattern',
      'Built secure, role-based access control with JWT authentication',
      'Profiled and rewrote critical SQL queries, cutting average API response time by ~30%',
      'Developed Angular components and integrated RESTful APIs for internal enterprise UI',
      'Wrote unit and integration tests using xUnit for core API endpoints',
    ],
  },
]

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce platform handling product catalogue, cart, and order lifecycle on an 8-entity EF Core schema with foreign key constraints ensuring transactional consistency.',
    techStack: ['C#', 'ASP.NET Core Web API', 'Angular', 'EF Core', 'SQL Server', 'Azure'],
    githubUrl: 'https://github.com/PiyushKumar495/EShoppingWebsite-Project',
    imageUrl: '/assets/ecommerce.jpg',
  },
  {
    id: '2',
    title: 'Cooking Recipe Portal',
    description: 'Multi-role recipe management platform with JWT-based authentication and role-based route guarding. Features interactive Angular Material UI with ratings, reviews, and inline editing.',
    techStack: ['C#', 'ASP.NET Core Web API', 'Angular', 'EF Core', 'SQL Server', 'JWT'],
    githubUrl: 'https://github.com/PiyushKumar495/CookingRecipePortal',
    imageUrl: '/assets/recipe.jpg',
  },
]

export const mockSkills: Skill[] = [
  {
    category: 'Backend',
    items: ['C#', 'ASP.NET Core Web API', 'ASP.NET MVC', 'EF Core', 'LINQ', 'Dapper'],
  },
  {
    category: 'Frontend',
    items: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Microsoft Azure', 'Azure App Services', 'Azure Functions', 'Docker', 'Git', 'CI/CD'],
  },
  {
    category: 'Databases',
    items: ['SQL Server', 'MySQL', 'Azure SQL', 'T-SQL'],
  },
  {
    category: 'Concepts',
    items: ['RESTful APIs', 'Clean Architecture', 'SOLID', 'JWT', 'RBAC', 'OOP', 'DI'],
  },
]

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Hacktoberfest Contributor',
    description: 'Contributed to open-source projects by raising and merging pull requests',
    icon: '🎯',
  },
  {
    id: '2',
    title: 'HackerRank 4★ SQL',
    description: 'Secured 4-star rating in SQL on HackerRank',
    icon: '⭐',
  },
  {
    id: '3',
    title: 'LeetCode 200+ Problems',
    description: 'Solved 200+ DSA problems on LeetCode',
    icon: '💻',
  },
]

export const mockCertifications: Certification[] = [
  {
    id: '1',
    title: 'Microsoft Certified: Azure Developer Associate (AZ-204)',
    issuer: 'Microsoft',
    date: 'Feb 2026',
  },
  {
    id: '2',
    title: 'Microsoft Full-Stack Developer Professional Certificate',
    issuer: 'Microsoft',
    date: 'Dec 2025',
  },
  {
    id: '3',
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    date: 'Nov 2025',
  },
]

export const mockEducation: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Technology (B.Tech) in Computer Science',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    graduationDate: 'May 2025',
  },
]
