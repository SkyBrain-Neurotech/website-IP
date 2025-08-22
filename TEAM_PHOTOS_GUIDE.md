# Team Photos Upload Guide

## Photo Specifications

### Size Requirements
- **Team Grid Photos**: 400x400 pixels minimum (square format)
- **Modal Detail Photos**: 600x600 pixels minimum (square format)
- **Format**: JPG or PNG
- **File Size**: Under 500KB per image for optimal loading

### Photo Guidelines

#### Visual Consistency
- **Background**: Neutral, professional backgrounds (white, light gray, or subtle gradient)
- **Lighting**: Even, professional lighting - avoid harsh shadows
- **Composition**: Head and shoulders shot, centered
- **Expression**: Professional, approachable smile
- **Dress Code**: Business professional or smart casual

#### Technical Requirements
- **Resolution**: High resolution (300 DPI preferred)
- **Aspect Ratio**: 1:1 (square)
- **Color**: Full color (avoid black and white unless stylistic choice)
- **Quality**: Sharp, well-focused images

## File Organization

### Folder Structure
```
public/
  images/
    team/
      founder-ceo.jpg
      ai-advisor.jpg
      neurotech-advisor.jpg
      research-scientist-1.jpg
      research-scientist-2.jpg
      blockchain-expert.jpg
      doctor-advisor-1.jpg
      doctor-advisor-2.jpg
      academic-researcher-1.jpg
      academic-researcher-2.jpg
```

### File Naming Convention
- Use the exact `id` from the team member data
- Use lowercase with hyphens
- Include file extension (.jpg or .png)

## Implementation Steps

### 1. Create Team Photos Folder
```bash
mkdir -p public/images/team
```

### 2. Upload Photos
Place all team member photos in `public/images/team/` with correct naming

### 3. Update Avatar Paths
Replace placeholder URLs in `TeamSelection.tsx`:
```typescript
avatar: '/images/team/founder-ceo.jpg'
```

## Current Team Member IDs and Photo Paths

| Team Member | ID | Photo Path |
|-------------|----|-----------| 
| Founder & CEO | `founder-ceo` | `/images/team/founder-ceo.jpg` |
| AI Advisor | `ai-advisor` | `/images/team/ai-advisor.jpg` |
| Neurotech Advisor | `neurotech-advisor` | `/images/team/neurotech-advisor.jpg` |
| Dr. Sarah Chen | `research-scientist-1` | `/images/team/research-scientist-1.jpg` |
| Dr. Michael Rodriguez | `research-scientist-2` | `/images/team/research-scientist-2.jpg` |
| Dr. Alex Kumar | `blockchain-expert` | `/images/team/blockchain-expert.jpg` |
| Dr. Emily Johnson | `doctor-advisor-1` | `/images/team/doctor-advisor-1.jpg` |
| Dr. James Wilson | `doctor-advisor-2` | `/images/team/doctor-advisor-2.jpg` |
| Dr. Maria Gonzalez | `academic-researcher-1` | `/images/team/academic-researcher-1.jpg` |
| Dr. David Park | `academic-researcher-2` | `/images/team/academic-researcher-2.jpg` |

## Features Implemented

### Responsive Photo Display
- **Grid View**: 160x160px (40x40 Tailwind classes)
- **Modal View**: 192x192px (48x48 Tailwind classes)
- **Object-fit**: `cover` for proper cropping
- **Fallback**: Icon display if photo fails to load

### Professional Effects
- **Hover Effects**: Subtle scale and glow
- **Border Styling**: Neural-blue themed borders
- **Coming Soon**: Grayscale filter for pending members
- **Smooth Transitions**: Professional animations

### Error Handling
- Automatic fallback to category icons if photos fail to load
- Graceful degradation for missing images
- No broken image display

## Next Steps

1. **Gather Photos**: Collect professional headshots for all team members
2. **Process Images**: Resize to specifications and optimize file sizes
3. **Upload Files**: Place in correct folder structure
4. **Update Paths**: Modify avatar URLs in component
5. **Test**: Verify all photos load correctly across devices

## Photo Optimization Tools

- **Online**: TinyPNG, Squoosh.app
- **Software**: Photoshop, GIMP, Canva
- **Command Line**: ImageMagick, Sharp

## Quality Checklist

- [ ] All photos are 400x400px minimum
- [ ] Professional, consistent lighting
- [ ] Neutral backgrounds
- [ ] Professional attire
- [ ] Files under 500KB each
- [ ] Consistent naming convention
- [ ] All paths updated in code
- [ ] Tested on multiple devices