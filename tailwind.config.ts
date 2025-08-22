
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'orbitron': ['Orbitron', 'monospace'],
				'inter': ['Inter', 'sans-serif'],
				'jetbrains': ['JetBrains Mono', 'monospace'],
			},
			colors: {
				// Simplified SkyBrain Color Palette
				'neural-blue': '#00D4FF',
				'deep-space': '#0A0A23',
				'mind-purple': '#6B46FF',
				'ghost-white': '#F8F8FF',
				'neural-gray': '#8892B0',
				'shadow-black': '#1E1E3F',
				
				// Tailwind CSS Variables
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			backgroundImage: {
				'neural-gradient': 'linear-gradient(135deg, #00D4FF 0%, #6B46FF 100%)',
				'deep-mind-gradient': 'linear-gradient(180deg, #0A0A23 0%, #1E1E3F 100%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'neural-pulse': {
					'0%, 100%': { 
						opacity: '0.5', 
						transform: 'scale(1)' 
					},
					'50%': { 
						opacity: '1', 
						transform: 'scale(1.05)' 
					}
				},
				'glow-breathe': {
					'0%, 100%': { 
						textShadow: '0 0 20px #00D4FF' 
					},
					'50%': { 
						textShadow: '0 0 30px #00D4FF, 0 0 40px #00D4FF' 
					}
				},
				'fade-in-up': {
					'0%': { 
						opacity: '0', 
						transform: 'translateY(30px)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neural-pulse': 'neural-pulse 2s infinite',
				'glow-breathe': 'glow-breathe 3s infinite alternate',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'float': 'float 6s ease-in-out infinite'
			}
		}
	},
	plugins: [import("tailwindcss-animate")],
} satisfies Config;
