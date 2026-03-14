# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 3: Customize Your Content

### Update Personal Information

Edit `app/lib/mockData.ts`:

```typescript
export const mockProfile: Profile = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... update all fields
}
```

### Add Your Projects

```typescript
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Your Project Name',
    description: 'Project description...',
    techStack: ['C#', 'ASP.NET Core', 'React'],
    githubUrl: 'https://github.com/yourusername/project',
    imageUrl: '/assets/projects/your-project.jpg',
  },
]
```

### Update Experience

```typescript
export const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'Your Company',
    role: 'Your Role',
    startDate: 'Jan 2024',
    endDate: 'Present',
    highlights: [
      'Achievement 1',
      'Achievement 2',
    ],
  },
]
```

## Step 4: Add Images (Optional)

Place your images in:
- `public/assets/projects/` - Project screenshots
- `public/assets/logos/` - Tech stack logos

## Step 5: Test the Game

1. Click "Explore Mode" button on the hero section
2. Use **Arrow Keys** or **WASD** to drive the car
3. Press **Space** to pause
4. Watch as the car reaches waypoints and auto-scrolls to sections

## Step 6: Connect to Your .NET API (Optional)

When your backend is ready:

1. Create `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

2. The app will automatically fetch from your API endpoints:
   - `/api/profile`
   - `/api/experience`
   - `/api/projects`
   - `/api/skills`
   - `/api/achievements`
   - `/api/certifications`
   - `/api/education`
   - `POST /api/contact`

## Step 7: Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization Tips

### Change Theme Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  dotnet: {
    500: '#8b5cf6', // Your primary color
  },
}
```

### Modify Game Route

Edit `app/components/GameMap.tsx` and change the SVG path:

```tsx
<path
  id="roadPath"
  d="M 100,300 Q 200,100 400,150 T 700,300"
  // ^ Customize this path
/>
```

### Adjust Animation Speed

In `app/components/GameMap.tsx`:

```typescript
duration: 20, // Change this number (seconds)
```

## 🐛 Common Issues

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Animations not working
- Check browser console for errors
- Ensure GSAP is properly installed: `npm install gsap`

### Images not loading
- Verify images are in `public/assets/`
- Check file paths in `mockData.ts`
- Use forward slashes: `/assets/image.jpg`

## 📚 Next Steps

1. ✅ Customize content in `mockData.ts`
2. ✅ Add your project images
3. ✅ Test all sections and animations
4. ✅ Build your .NET API backend
5. ✅ Deploy to Vercel or your hosting platform

## 🆘 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review component files in `app/components/`
- Inspect browser DevTools console for errors

---

**Happy coding! 🎉**
