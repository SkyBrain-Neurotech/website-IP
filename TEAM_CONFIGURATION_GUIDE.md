# SkyBrain Team Configuration Guide

## Overview

The team page supports **4 different member types** with different visual styles and badges:

1. **👑 FOUNDER** - Core leadership (gold badge)
2. **💎 ACTIVE** - Current employees (green/blue badge)  
3. **🚀 JOINING** - Coming soon members (gray badge, grayscale photos)
4. **⭐ ADVISOR** - Advisors and consultants (blue/purple badge)

## Team Member Structure

Each team member is defined in `src/components/TeamSelection.tsx` with this structure:

```typescript
{
  id: 'unique-identifier',
  name: 'Full Name',
  role: 'Job Title',
  category: 'Leadership' | 'Advisory' | 'Research' | 'Technology' | 'Medical' | 'Academia',
  avatar: '/images/team/photo-filename.png',
  bio: 'Detailed biography...',
  expertise: ['Skill 1', 'Skill 2', 'Skill 3'],
  status: 'founder' | 'team' | 'coming-soon' | 'advisor',
  education?: 'Educational background',
  experience?: 'Years of experience'
}
```

## How to Add Different Member Types

### 1. **Add Current Employee (Active Team Member)**

```typescript
{
  id: 'software-engineer-1',
  name: 'John Smith',
  role: 'Senior Software Engineer',
  category: 'Technology',
  avatar: '/images/team/john-smith.png',
  bio: 'Full-stack developer specializing in React and Node.js applications for neurotechnology platforms.',
  expertise: ['React', 'Node.js', 'Python', 'Machine Learning', 'API Development'],
  status: 'team', // 💎 ACTIVE badge - current employee
  education: 'M.S. in Computer Science',
  experience: '5+ years in software development'
}
```

### 2. **Add Coming Soon Member**

```typescript
{
  id: 'data-scientist-1', 
  name: 'Sarah Johnson',
  role: 'Senior Data Scientist',
  category: 'Research',
  avatar: '/images/team/sarah-johnson.png',
  bio: 'Data science expert joining our team to advance EEG analysis and machine learning capabilities.',
  expertise: ['Data Science', 'Machine Learning', 'Python', 'TensorFlow', 'Statistical Analysis'],
  status: 'coming-soon', // 🚀 JOINING badge - photo becomes grayscale
  education: 'Ph.D. in Data Science',
  experience: '8+ years in ML and analytics'
}
```

### 3. **Add Advisor**

```typescript
{
  id: 'medical-advisor-1',
  name: 'Dr. Emily Chen',
  role: 'Medical Advisor',
  category: 'Medical',
  avatar: '/images/team/emily-chen.png',
  bio: 'Board-certified neurologist providing clinical guidance for our neurotechnology applications.',
  expertise: ['Neurology', 'Clinical Research', 'EEG Interpretation', 'Medical Devices', 'Patient Care'],
  status: 'advisor', // ⭐ ADVISOR badge
  education: 'M.D., Board Certified Neurologist',
  experience: '12+ years in clinical neurology'
}
```

### 4. **Add Founder/Leadership**

```typescript
{
  id: 'cto-founder',
  name: 'Alex Rodriguez', 
  role: 'Co-Founder & CTO',
  category: 'Leadership',
  avatar: '/images/team/alex-rodriguez.png',
  bio: 'Technology visionary leading our engineering and product development efforts.',
  expertise: ['Software Architecture', 'Product Strategy', 'Team Leadership', 'Neurotechnology', 'Startups'],
  status: 'founder', // 👑 FOUNDER badge - gold styling
  education: 'Ph.D. in Computer Engineering',
  experience: '15+ years in technology leadership'
}
```

## Step-by-Step Instructions

### Step 1: Prepare Team Photos
1. **Photo Requirements:**
   - Size: 400x400 pixels minimum
   - Format: PNG preferred (supports transparency)
   - Quality: High resolution, professional headshots
   - Background: Clean, professional background

2. **Add Photos to Project:**
   ```bash
   # Place photos in this directory:
   /public/images/team/
   
   # Examples:
   /public/images/team/john-smith.png
   /public/images/team/sarah-johnson.png
   /public/images/team/emily-chen.png
   ```

### Step 2: Edit Team Configuration
Open `src/components/TeamSelection.tsx` and find the `teamMembers` array (around line 22).

### Step 3: Add New Team Members
Add your team members to the array:

```typescript
const teamMembers: TeamMember[] = [
  // Existing members...
  
  // NEW EMPLOYEE
  {
    id: 'backend-developer',
    name: 'Mike Thompson',
    role: 'Backend Developer', 
    category: 'Technology',
    avatar: '/images/team/mike-thompson.png',
    bio: 'Backend specialist building scalable APIs and data processing systems for our neurotechnology platform.',
    expertise: ['Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Microservices'],
    status: 'team', // Current employee
    education: 'B.S. in Computer Science',
    experience: '4+ years in backend development'
  },
  
  // COMING SOON MEMBER
  {
    id: 'ux-designer',
    name: 'Lisa Wong',
    role: 'UX/UI Designer',
    category: 'Technology', 
    avatar: '/images/team/lisa-wong.png',
    bio: 'User experience designer joining to create intuitive interfaces for our BCI applications.',
    expertise: ['UX Design', 'UI Design', 'Figma', 'User Research', 'Prototyping'],
    status: 'coming-soon', // Joining soon
    education: 'M.A. in Interaction Design',
    experience: '6+ years in UX/UI design'
  },
  
  // NEW ADVISOR
  {
    id: 'business-advisor',
    name: 'Robert Johnson',
    role: 'Business Strategy Advisor',
    category: 'Advisory',
    avatar: '/images/team/robert-johnson.png', 
    bio: 'Seasoned executive providing strategic guidance on business development and market expansion.',
    expertise: ['Business Strategy', 'Market Development', 'Partnerships', 'Fundraising', 'Operations'],
    status: 'advisor', // Advisor
    education: 'MBA from Stanford Business School',
    experience: '20+ years in business leadership'
  }
];
```

## Categories and Their Icons

The `category` field determines the icon displayed:

- **Leadership** → Crown icon
- **Advisory** → Star icon  
- **Research** → Book icon
- **Technology** → Shield icon
- **Medical** → Stethoscope icon
- **Academia** → Graduation cap icon

## Visual Differences by Status

### **👑 FOUNDER** (`status: 'founder'`)
- **Badge**: Gold "👑 FOUNDER" 
- **Border**: Gold gradient
- **Photo**: Full color, professional glow effect
- **Name**: Highlighted in gold when hovered

### **💎 ACTIVE** (`status: 'team'`)  
- **Badge**: Green/blue "💎 ACTIVE"
- **Border**: Blue gradient
- **Photo**: Full color, professional styling
- **Name**: Highlighted in blue when hovered

### **🚀 JOINING** (`status: 'coming-soon'`)
- **Badge**: Gray "🚀 JOINING" 
- **Border**: Gray gradient
- **Photo**: Grayscale with "JOINING SOON" overlay
- **Name**: Gray text, no hover effects

### **⭐ ADVISOR** (`status: 'advisor'`)
- **Badge**: Blue/purple "⭐ ADVISOR"
- **Border**: Neural blue gradient  
- **Photo**: Full color, advisor styling
- **Name**: Highlighted in blue when hovered

## Example: Complete Team Setup

Here's how to set up a complete team with different roles:

```typescript
const teamMembers: TeamMember[] = [
  // FOUNDERS
  {
    id: 'ceo-founder',
    name: 'Rakesh Jakati',
    role: 'Founder & CEO', 
    category: 'Leadership',
    status: 'founder' // 👑 Gold badge
  },
  
  // CURRENT EMPLOYEES  
  {
    id: 'lead-engineer',
    name: 'David Park',
    role: 'Lead Software Engineer',
    category: 'Technology', 
    status: 'team' // 💎 Green badge
  },
  {
    id: 'research-scientist',
    name: 'Dr. Maria Garcia',
    role: 'Senior Research Scientist',
    category: 'Research',
    status: 'team' // 💎 Green badge  
  },
  
  // COMING SOON
  {
    id: 'ml-engineer',
    name: 'Kevin Liu',
    role: 'ML Engineer',
    category: 'Technology',
    status: 'coming-soon' // 🚀 Gray badge, grayscale photo
  },
  {
    id: 'clinical-researcher', 
    name: 'Dr. James Wilson',
    role: 'Clinical Research Lead',
    category: 'Medical',
    status: 'coming-soon' // 🚀 Gray badge, grayscale photo
  },
  
  // ADVISORS
  {
    id: 'tech-advisor',
    name: 'Dr. Bhaskar Tripathi',
    role: 'AI Advisor', 
    category: 'Advisory',
    status: 'advisor' // ⭐ Blue badge
  },
  {
    id: 'medical-advisor',
    name: 'Dr. Susan Chen',
    role: 'Medical Advisor',
    category: 'Medical', 
    status: 'advisor' // ⭐ Blue badge
  }
];
```

## Pro Tips

### 1. **Photo Management**
- Use consistent photo dimensions (400x400px)
- Professional headshots work best
- Ensure good lighting and clear faces
- PNG format supports transparency for better integration

### 2. **Content Guidelines**
- **Bio**: 1-2 sentences describing their role and expertise
- **Expertise**: 3-5 key skills or areas of knowledge
- **Education**: Highest degree and specialization
- **Experience**: Years of relevant experience

### 3. **Status Transitions**
To move someone from "coming soon" to "active":
```typescript
// Change this:
status: 'coming-soon'

// To this:
status: 'team'
```

### 4. **Team Organization**
Order team members by:
1. Founders first
2. Current employees by seniority
3. Coming soon members
4. Advisors last

This creates a natural hierarchy on the team page.

## Testing Your Changes

After adding team members:

1. **Save the file** (`TeamSelection.tsx`)
2. **Refresh the website** (localhost:8080)
3. **Navigate to Team page** (/team)
4. **Check each member displays correctly:**
   - Proper badge and colors
   - Photo loads (or shows fallback icon)
   - Click to open modal with full details
   - Mobile responsive layout works

## Common Issues & Solutions

### **Photo Not Loading**
- Verify file path: `/public/images/team/filename.png`
- Check file name matches exactly (case-sensitive)
- Ensure image file isn't corrupted

### **Wrong Badge/Colors**
- Check `status` field is one of: `'founder' | 'team' | 'coming-soon' | 'advisor'`
- Verify spelling is exact (no typos)

### **Missing Information**
- All fields except `education` and `experience` are required
- Ensure `expertise` is an array: `['Skill 1', 'Skill 2']`

This guide gives you complete control over your team presentation, allowing you to showcase current employees, build anticipation for incoming talent, and highlight your advisory expertise!