import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dotnet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        azure: {
          400: '#0ea5e9',
          500: '#0284c7',
          600: '#0369a1',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(139, 92, 246, 0.6)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.8)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 1), 0 0 80px rgba(139, 92, 246, 0.5)',
        'azure-glow': '0 0 20px rgba(14, 165, 233, 0.8)',
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(270, 70%, 50%, 0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(200, 70%, 50%, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(270, 70%, 50%, 0.3) 0px, transparent 50%)',
        'dots': 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dots': '20px 20px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
