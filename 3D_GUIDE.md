# 🚗 3D Experience Setup Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
# 4. Click "Start Experience"
# 5. Drive with WASD or Arrow Keys!
```

## 🎮 How It Works

### The 3D World

Your portfolio is now a **drivable 3D environment** where:
- Each section is a **glowing platform** in 3D space
- Drive your car into a platform to view that section's content
- Information appears in a side panel as you enter each zone
- Physics-based movement makes it feel realistic

### Section Layout

```
        ACHIEVEMENTS (Center-Back)
              🏆
               
EDUCATION     SKILLS      PROJECTS
   📚          ⚡           🚀
               
              CONTACT
               📧
               
        EXPERIENCE (Front)
              💼
```

## 🎨 Customization

### Change Section Positions

Edit `app/components/World.tsx`:

```tsx
<SectionArea
  position={[x, y, z]}  // X=left/right, Y=up/down, Z=forward/back
  title="YOUR SECTION"
  color="#8b5cf6"       // Hex color
  icon="🎯"             // Any emoji
/>
```

**Example Layouts:**

**Circle Layout:**
```tsx
// Experience at 0°
<SectionArea position={[0, 0, -20]} title="EXPERIENCE" />
// Projects at 60°
<SectionArea position={[17, 0, -10]} title="PROJECTS" />
// Skills at 120°
<SectionArea position={[17, 0, 10]} title="SKILLS" />
// etc...
```

**Grid Layout:**
```tsx
<SectionArea position={[-20, 0, -20]} title="EXPERIENCE" />
<SectionArea position={[0, 0, -20]} title="PROJECTS" />
<SectionArea position={[20, 0, -20]} title="SKILLS" />
<SectionArea position={[-20, 0, 0]} title="ACHIEVEMENTS" />
// etc...
```

### Adjust Car Speed

Edit `app/components/Vehicle.tsx`:

```typescript
const speed = 15           // Higher = faster (try 10-30)
const rotationSpeed = 2    // Higher = sharper turns (try 1-5)
```

### Change Car Appearance

In `Vehicle.tsx`, modify the car mesh:

```tsx
// Car body
<mesh castShadow>
  <boxGeometry args={[2, 1, 4]} />  // Width, Height, Length
  <meshStandardMaterial 
    color="#0ea5e9"      // Change color
    metalness={0.8}      // 0-1 (shiny)
    roughness={0.2}      // 0-1 (smooth)
  />
</mesh>
```

**Make it a sports car:**
```tsx
<boxGeometry args={[1.5, 0.8, 3.5]} />  // Sleeker
<meshStandardMaterial color="#ff0000" metalness={0.9} roughness={0.1} />
```

### Add Custom 3D Objects

In `World.tsx`, add decorative elements:

```tsx
// Floating cube
<Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
  <mesh position={[10, 5, 10]}>
    <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial color="#8b5cf6" />
  </mesh>
</Float>

// Spinning torus
<mesh position={[-10, 3, -10]} rotation={[0, 0, 0]}>
  <torusGeometry args={[3, 1, 16, 32]} />
  <meshStandardMaterial color="#0ea5e9" />
</mesh>

// Glowing sphere
<mesh position={[0, 8, 0]}>
  <sphereGeometry args={[1, 32, 32]} />
  <meshStandardMaterial 
    color="#8b5cf6" 
    emissive="#8b5cf6" 
    emissiveIntensity={0.5} 
  />
</mesh>
```

### Change Lighting

Edit `Experience3D.tsx`:

```tsx
// Brighter ambient light
<ambientLight intensity={0.8} />  // Default: 0.5

// Stronger directional light
<directionalLight
  position={[10, 20, 10]}
  intensity={1.5}              // Default: 1
  color="#ffffff"              // Try "#ffd700" for golden
/>

// Add point lights
<pointLight position={[0, 10, 0]} intensity={1} color="#8b5cf6" />
```

### Modify Sky

```tsx
<Sky
  distance={450000}
  sunPosition={[10, 20, 10]}  // Sun position
  inclination={0.6}            // 0-1 (time of day)
  azimuth={0.25}               // 0-1 (sun rotation)
/>
```

**Sunset:** `inclination={0.2}`
**Noon:** `inclination={0.6}`
**Night:** Remove `<Sky />` and use dark ambient

### Change Ground

In `World.tsx`:

```tsx
<mesh receiveShadow position={[0, -0.5, 0]}>
  <boxGeometry args={[100, 1, 100]} />
  <meshStandardMaterial 
    color="#1a1a2e"      // Dark blue
    metalness={0.3}
    roughness={0.8}
  />
</mesh>
```

**Grass-like:**
```tsx
<meshStandardMaterial color="#2d5016" roughness={1} />
```

**Metallic:**
```tsx
<meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
```

### Adjust Camera

Edit `Experience3D.tsx`:

```tsx
<PerspectiveCamera 
  makeDefault 
  position={[0, 10, 20]}  // X, Y, Z starting position
  fov={50}                 // Field of view (30-90)
/>
```

In `Vehicle.tsx`, change camera follow:

```typescript
state.camera.position.lerp(
  new THREE.Vector3(
    position.x,           // Follow X
    position.y + 10,      // Height above car (try 5-20)
    position.z + 15       // Distance behind car (try 10-30)
  ),
  0.05                    // Smoothness (0.01-0.1)
)
```

## 🎯 Adding New Sections

### 1. Add Section Area

In `World.tsx`:

```tsx
<SectionArea
  position={[15, 0, 15]}
  title="BLOG"
  color="#f59e0b"
  icon="📝"
/>
```

### 2. Add Trigger Zone

In `Vehicle.tsx`, add to `sections` array:

```typescript
const sections = [
  // ... existing sections
  { id: 'blog', x: 15, z: 15, range: 10 },
]
```

### 3. Add UI Content

In `UIOverlay.tsx`, add to `sectionContent`:

```typescript
const sectionContent: Record<string, any> = {
  // ... existing sections
  blog: {
    title: 'Blog',
    icon: '📝',
    data: mockBlogPosts,  // Create this in mockData.ts
    type: 'blog',
  },
}
```

### 4. Add Render Logic

In `UIOverlay.tsx`, add rendering:

```tsx
{content.type === 'blog' && (
  <>
    {content.data.map((post: any) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
    ))}
  </>
)}
```

## 🎨 Visual Effects

### Add Fog

In `Experience3D.tsx`:

```tsx
<fog attach="fog" args={['#1a1a2e', 30, 100]} />
```

### Particle System

Create `Particles3D.tsx`:

```tsx
import { Points, PointMaterial } from '@react-three/drei'
import { useMemo } from 'react'

export function Particles3D() {
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 1000; i++) {
      temp.push(
        Math.random() * 100 - 50,
        Math.random() * 50,
        Math.random() * 100 - 50
      )
    }
    return new Float32Array(temp)
  }, [])

  return (
    <Points positions={particles}>
      <PointMaterial
        size={0.1}
        color="#8b5cf6"
        transparent
        opacity={0.6}
      />
    </Points>
  )
}
```

### Bloom Effect

Install postprocessing:

```bash
npm install @react-three/postprocessing
```

In `Experience3D.tsx`:

```tsx
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// After </Physics>
<EffectComposer>
  <Bloom luminanceThreshold={0.9} intensity={0.5} />
</EffectComposer>
```

## 🐛 Common Issues

### Car falls through ground
- Check ground RigidBody: `type="fixed"`
- Ensure colliders are set up correctly

### Camera too close/far
- Adjust camera position in `Vehicle.tsx`
- Change lerp distance values

### Low FPS
- Reduce shadow quality
- Lower `dpr` in Canvas: `dpr={[1, 1.5]}`
- Reduce particle count
- Simplify geometry

### Controls not responsive
- Check keyboard event listeners
- Ensure canvas has focus (click it)
- Try different keys

### Sections not triggering
- Verify section positions match trigger zones
- Check `range` value (increase if needed)
- Add `console.log` in `checkSectionTriggers`

## 📊 Performance Optimization

```tsx
// In Experience3D.tsx
<Canvas
  shadows
  dpr={[1, 1.5]}              // Lower for better performance
  gl={{ 
    antialias: false,         // Disable for speed
    powerPreference: "high-performance"
  }}
  frameloop="demand"          // Only render when needed
>
```

## 🎓 Advanced Customization

### Load 3D Models

```bash
npm install @react-three/drei
```

```tsx
import { useGLTF } from '@react-three/drei'

function CarModel() {
  const { scene } = useGLTF('/models/car.glb')
  return <primitive object={scene} />
}
```

### Add Sounds

```tsx
import { PositionalAudio } from '@react-three/drei'

<PositionalAudio url="/sounds/engine.mp3" distance={10} loop />
```

### Custom Shaders

```tsx
<meshStandardMaterial>
  <shaderMaterial
    vertexShader={vertexShader}
    fragmentShader={fragmentShader}
  />
</meshStandardMaterial>
```

## 🚀 Ready to Drive!

Your 3D portfolio is ready! Start the dev server and explore:

```bash
npm run dev
```

Visit `http://localhost:3000` and click **"Start Experience"**!

---

**Need help?** Check the main [README.md](./README.md) or Three.js documentation.
