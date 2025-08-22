# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 8080 (accessible on all interfaces)
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture Overview

This is a React-based website for SkyBrain, a brain-computer interface (BCI) company. The project uses:

- **Vite** as the build tool and dev server
- **React 18** with TypeScript
- **React Router** for client-side routing
- **shadcn/ui** components built on Radix UI
- **Tailwind CSS** for styling with custom neural/brain-themed colors and animations
- **TanStack Query** for state management

### Key Structure

- `/src/pages/` - Route components (Index, Technology, Applications, Research, Videos, Contact, etc.)
- `/src/components/` - Reusable UI components, including page sections
- `/src/components/ui/` - shadcn/ui component library
- `/src/lib/utils.ts` - Utility functions and shared logic
- `/src/hooks/` - Custom React hooks
- `/src/styles/` - Additional CSS files (responsive fixes, synchronized animations)
- `/public/images/team/` - Team member photos and assets

### Routing

Single-page application with React Router:
- `/` - Home page (Index)
- `/technology` - Technology page
- `/applications` - Applications page  
- `/research` - Research page
- `/roadmap` - Roadmap page
- `/blockchain` - Blockchain page
- `/videos` - Videos page
- `/team` - Team page
- `/contact` - Contact page
- `/beta-signup` - Beta signup page
- `*` - 404 Not Found page

### Theming

Custom color palette for neural/brain theme:
- `neural-blue`: #00D4FF
- `deep-space`: #0A0A23
- `mind-purple`: #6B46FF
- `ghost-white`: #F8F8FF
- `neural-gray`: #8892B0
- `shadow-black`: #1E1E3F

Custom animations: `neural-pulse`, `glow-breathe`, `fade-in-up`, `float`

### Component Architecture

- Components are modular and focused on specific page sections
- Uses shadcn/ui design system for consistent UI patterns
- Navigation component shared across all pages
- Footer component shared across all pages
- Page components compose multiple section components

### Development Workflow

This project is a standard Vite + React + TypeScript project. Changes made locally should be committed and pushed to your remote repository as usual.

### Key Configuration

- **Vite config**: Uses `@vitejs/plugin-react-swc` for fast builds and HMR
- **Path aliases**: `@/` points to `src/` directory
- **TypeScript**: Strict configuration with separate configs for app and Node.js
- **ESLint**: Configured with React and TypeScript rules
- **Tailwind**: Custom neural/brain theme with specialized animations and colors