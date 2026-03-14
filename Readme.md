# 🚗 .NET Full-Stack Portfolio - 3D Interactive Experience

An immersive 3D portfolio inspired by Bruno Simon's legendary website. Drive a car through a 3D world to explore different sections of my professional journey as a .NET Full-Stack Developer.

## ✨ Features

- **3D Interactive World**: Drive through a physics-based 3D environment
- **Real-time Physics**: Powered by Rapier physics engine
- **7 Interactive Zones**: Experience, Projects, Skills, Achievements, Certifications, Education, Contact
- **Dynamic UI**: Section information appears as you enter each area
- **Smooth Controls**: WASD or Arrow Keys with realistic vehicle physics
- **Beautiful Visuals**: Sky, lighting, shadows, and floating decorative elements
- **Fully Animated**: Framer Motion + Three.js for stunning visuals
- **Dark Theme**: .NET purple branding with neon accents
- **Accessible**: Respects `prefers-reduced-motion`
- **Performance Optimized**: 60fps with efficient rendering

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **3D Engine**: Three.js + React Three Fiber
- **Physics**: Rapier (via @react-three/rapier)
- **3D Helpers**: @react-three/drei
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State**: Zustand
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file**:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Controls

- **W / Arrow Up**: Move forward
- **S / Arrow Down**: Move backward
- **A / Arrow Left**: Turn left
- **D / Arrow Right**: Turn right
- **Mouse**: Look around (orbit camera)

## 📁 Project Structure

```
Portfolio2/
├── app/
│   ├── components/
│   │   ├── Hero3D.tsx           # Landing screen
│   │   ├── Experience3D.tsx     # Main 3D canvas
│   │   ├── Vehicle.tsx          # Physics-based car
│   │   ├── World.tsx            # 3D environment
│   │   ├── SectionArea.tsx      # Interactive zones
│   │   ├── UIOverlay.tsx        # Section info panels
│   │   ├── LoadingScreen.tsx    # Loading progress
│   │   └── Particles.tsx        # Background effects
│   ├── lib/
│   │   ├── store.ts             # Zustand state
│   │   ├── useKeyboardControls.ts
│   │   ├── mockData.ts          # Your data
│   │   └── hooks.ts
│   ├── types/
│   │   └── index.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── assets/
├── tailwind.config.ts
└── package.json
```

## 🎨 Customization

### 1. Update Personal Data

Edit `app/lib/mockData.ts`:

```typescript
export const mockProfile: Profile = {
  name: 'Your Name',
  title: 'Your Title',
  // ... update all fields
}
```

### 2. Modify Section Positions

Edit `app/components/World.tsx`:

```tsx
<SectionArea
  position={[0, 0, -20]}  // Change X, Y, Z coordinates
  title="EXPERIENCE"
  color="#8b5cf6"
  icon="💼"
/>
```

### 3. Adjust Vehicle Physics

Edit `app/components/Vehicle.tsx`:

```typescript
const speed = 15           // Movement speed
const rotationSpeed = 2    // Turn speed
```

### 4. Change Colors

Edit `tailwind.config.ts` or directly in components:

```tsx
<meshStandardMaterial color="#8b5cf6" />
```

### 5. Add More Decorative Elements

In `app/components/World.tsx`, add floating objects:

```tsx
<Float speed={2} rotationIntensity={0.5}>
  <mesh position={[x, y, z]}>
    <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial color="#8b5cf6" />
  </mesh>
</Float>
```

## 🎯 Interactive Zones

Drive your car into these areas to view content:

1. **Experience** (Purple) - Work history and achievements
2. **Projects** (Blue) - Portfolio projects with tech stacks
3. **Skills** (Green) - Technical skills by category
4. **Achievements** (Orange) - Awards and accomplishments
5. **Certifications** (Pink) - Professional certifications
6. **Education** (Indigo) - Academic background
7. **Contact** (Teal) - Get in touch links

## ♿ Accessibility

- **Reduced Motion**: Automatically disables 3D if user prefers reduced motion
- **Keyboard Controls**: Full keyboard navigation
- **Clear Instructions**: On-screen control hints
- **Fallback UI**: Alternative view for accessibility

## 🚀 Performance

- **Optimized Rendering**: Only renders what's visible
- **Physics Optimization**: Efficient collision detection
- **Code Splitting**: Dynamic imports for 3D components
- **Shadow Optimization**: Configured shadow maps
- **60 FPS Target**: Smooth animations and physics

## 🐛 Troubleshooting

### 3D scene not loading
- Check browser console for errors
- Ensure WebGL is supported: visit [get.webgl.org](https://get.webgl.org)
- Try a different browser (Chrome/Firefox recommended)

### Poor performance
- Reduce shadow quality in `Experience3D.tsx`
- Lower `dpr` (device pixel ratio) in Canvas
- Close other browser tabs
- Update graphics drivers

### Controls not working
- Click on the canvas to focus
- Check keyboard layout (QWERTY assumed)
- Try arrow keys instead of WASD

### Physics behaving strangely
- Refresh the page
- Check Rapier physics settings
- Adjust mass/damping in `Vehicle.tsx`

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Environment Variables

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## 📊 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 15+ ✅
- Edge 90+ ✅

Requires WebGL 2.0 support.

## 🎓 Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Rapier Physics](https://rapier.rs/)
- [Bruno Simon's Portfolio](https://bruno-simon.com/)

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

Built by **Piyush Kumar**
- GitHub: [@PiyushKumar495](https://github.com/PiyushKumar495)
- LinkedIn: [piyushkumar123](https://linkedin.com/in/piyushkumar123)

Inspired by [Bruno Simon](https://bruno-simon.com/)

---

**Made with ❤️ using Next.js, Three.js, React Three Fiber & Rapier Physics**
