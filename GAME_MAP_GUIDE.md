# 🎮 Game Map Customization Guide

## Overview

The game map uses **SVG paths** and **GSAP MotionPathPlugin** to animate a car along a custom route. This guide shows you how to customize the route and waypoints.

## Basic Concepts

- **SVG Path**: The road the car follows
- **Waypoints**: Checkpoints that trigger section navigation
- **Progress**: 0 to 1 (0% to 100% along the path)

## Editing the Route

### Location
File: `app/components/GameMap.tsx` (around line 100)

### Current Path
```tsx
<path
  id="roadPath"
  d="M 100,300 Q 200,100 400,150 T 700,300 Q 650,450 400,500 T 100,300"
  fill="none"
  stroke="rgba(139, 92, 246, 0.3)"
  strokeWidth="40"
/>
```

### Path Commands

- `M x,y` - Move to position
- `L x,y` - Line to position
- `Q x1,y1 x,y` - Quadratic curve
- `T x,y` - Smooth quadratic curve
- `C x1,y1 x2,y2 x,y` - Cubic curve
- `S x2,y2 x,y` - Smooth cubic curve

### Example: Simple Circular Route

```tsx
<path
  id="roadPath"
  d="M 400,100 
     A 200,200 0 1,1 400,500 
     A 200,200 0 1,1 400,100"
  fill="none"
  stroke="rgba(139, 92, 246, 0.3)"
  strokeWidth="40"
/>
```

### Example: Zigzag Route

```tsx
<path
  id="roadPath"
  d="M 100,300 
     L 200,150 
     L 300,300 
     L 400,150 
     L 500,300 
     L 600,150 
     L 700,300"
  fill="none"
  stroke="rgba(139, 92, 246, 0.3)"
  strokeWidth="40"
/>
```

### Example: Smooth S-Curve

```tsx
<path
  id="roadPath"
  d="M 100,300 
     C 200,100 300,100 400,300 
     S 600,500 700,300"
  fill="none"
  stroke="rgba(139, 92, 246, 0.3)"
  strokeWidth="40"
/>
```

## Customizing Waypoints

### Current Waypoints
```typescript
const waypoints: Waypoint[] = [
  { id: 'experience', label: 'Experience', progress: 0.14 },
  { id: 'projects', label: 'Projects', progress: 0.28 },
  { id: 'skills', label: 'Skills', progress: 0.42 },
  { id: 'achievements', label: 'Achievements', progress: 0.56 },
  { id: 'certifications', label: 'Certifications', progress: 0.70 },
  { id: 'education', label: 'Education', progress: 0.84 },
  { id: 'contact', label: 'Contact', progress: 1 },
]
```

### Adding a New Waypoint

1. Add section to your page
2. Update waypoints array:

```typescript
const waypoints: Waypoint[] = [
  { id: 'experience', label: 'Experience', progress: 0.12 },
  { id: 'projects', label: 'Projects', progress: 0.24 },
  { id: 'skills', label: 'Skills', progress: 0.36 },
  { id: 'blog', label: 'Blog', progress: 0.48 }, // NEW
  { id: 'achievements', label: 'Achievements', progress: 0.60 },
  { id: 'certifications', label: 'Certifications', progress: 0.72 },
  { id: 'education', label: 'Education', progress: 0.84 },
  { id: 'contact', label: 'Contact', progress: 1 },
]
```

### Progress Values

- Must be between 0 and 1
- Should be evenly distributed
- Last waypoint should be 1 (100%)

**Formula**: `progress = index / (totalWaypoints - 1)`

Example for 8 waypoints:
- Waypoint 1: 0/7 = 0.00
- Waypoint 2: 1/7 = 0.14
- Waypoint 3: 2/7 = 0.28
- ...
- Waypoint 8: 7/7 = 1.00

## Adjusting Waypoint Positions

Waypoint nodes are positioned using trigonometry:

```typescript
const angle = (idx / waypoints.length) * Math.PI * 2
const x = 400 + Math.cos(angle) * 250
const y = 300 + Math.sin(angle) * 200
```

### Custom Positioning

Replace the automatic positioning with manual coordinates:

```typescript
const waypointPositions = [
  { x: 150, y: 300 }, // Experience
  { x: 300, y: 150 }, // Projects
  { x: 500, y: 150 }, // Skills
  { x: 650, y: 300 }, // Achievements
  { x: 650, y: 450 }, // Certifications
  { x: 500, y: 550 }, // Education
  { x: 300, y: 550 }, // Contact
]

// In the JSX:
{waypoints.map((wp, idx) => {
  const pos = waypointPositions[idx]
  return (
    <circle
      cx={pos.x}
      cy={pos.y}
      r="20"
      // ...
    />
  )
})}
```

## Adjusting Animation Speed

### Location
File: `app/components/GameMap.tsx` (around line 40)

```typescript
const tween = gsap.to(carRef.current, {
  duration: 20, // Change this (seconds)
  ease: 'none',
  // ...
})
```

- **Slower**: Increase duration (e.g., `30`)
- **Faster**: Decrease duration (e.g., `10`)

### Keyboard Control Speed

```typescript
const speed = 0.01 // Change this (0.001 to 0.1)

if (e.key === 'ArrowUp') {
  animationRef.current.progress(Math.min(currentProgress + speed, 1))
}
```

## Styling the Road

### Road Width
```tsx
strokeWidth="40" // Change this (10 to 100)
```

### Road Color
```tsx
stroke="rgba(139, 92, 246, 0.3)" // Change RGBA values
```

### Road Style
```tsx
strokeLinecap="round" // Options: round, square, butt
strokeDasharray="10 5" // Dashed line (optional)
```

## Car Customization

### Car Size
```tsx
<circle
  ref={carRef}
  r="15" // Change radius (5 to 30)
  fill="#0ea5e9"
/>
```

### Car Color
```tsx
fill="#0ea5e9" // Change to any color
stroke="white"
strokeWidth="2"
```

### Replace with Custom Sprite

```tsx
<image
  ref={carRef}
  href="/assets/car-sprite.png"
  width="40"
  height="40"
  x="-20" // Center the image
  y="-20"
/>
```

## Testing Your Changes

1. Save the file
2. Refresh browser (hot reload should work)
3. Click "Explore Mode"
4. Test driving with arrow keys
5. Verify waypoints trigger correctly

## Tips

- **Use an SVG editor**: Figma, Inkscape, or [SVG Path Editor](https://yqnn.github.io/svg-path-editor/)
- **Keep viewBox**: `viewBox="0 0 800 600"` for consistency
- **Test on mobile**: Ensure path fits smaller screens
- **Smooth curves**: Use `Q` or `C` commands for better visuals
- **Debug**: Add `console.log(progress)` to see current position

## Advanced: Multiple Routes

Create different routes for different themes:

```typescript
const routes = {
  default: "M 100,300 Q 200,100 400,150...",
  circular: "M 400,100 A 200,200 0 1,1 400,500...",
  zigzag: "M 100,300 L 200,150 L 300,300...",
}

const [currentRoute, setCurrentRoute] = useState('default')

// In JSX:
<path id="roadPath" d={routes[currentRoute]} />
```

## Troubleshooting

### Car not moving
- Check `gsap.registerPlugin(MotionPathPlugin)` is called
- Verify path has `id="roadPath"`
- Ensure `carRef` is attached to element

### Waypoints not triggering
- Check section IDs match waypoint IDs
- Verify progress values are correct
- Test with `console.log` in `triggerWaypoint`

### Path looks wrong
- Check SVG viewBox matches your coordinates
- Verify path commands are valid
- Use SVG validator tool

---

**Need more help?** Check the [main README](./README.md) or inspect the component code!
