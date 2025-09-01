import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        masters: {
          // Primary Greens (Augusta's signature)
          pine: '#004B36',        // Deep pine green (primary buttons, headers)
          fairway: '#006747',     // Classic Masters green (main brand color)
          pristine: '#008556',    // Lighter action green (hover states)
          
          // Accent Colors
          azalea: '#DA2C7A',      // Azalea pink (alerts, special features)
          dogwood: '#F8F4F0',     // Dogwood white (backgrounds)
          gold: '#D4A574',        // Muted gold (premium features, badges)
          
          // Neutrals (Clubhouse inspired)
          cream: '#FDFDF8',       // Off-white background
          sand: '#F5F2ED',        // Light tan (cards, sections)
          stone: '#E8E2D5',       // Medium tan (borders)
          slate: '#4A5247',       // Dark gray-green (text)
          charcoal: '#2C312E',    // Almost black (headings)
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'display': '3.75rem',     // 60px - Hero only
        'h1': '2.25rem',         // 36px - Page titles
        'h2': '1.875rem',        // 30px - Section headers  
        'h3': '1.5rem',          // 24px - Card titles
        'h4': '1.25rem',         // 20px - Subsections
        'body': '1rem',          // 16px - Body text
        'small': '0.875rem',     // 14px - Captions
        'tiny': '0.75rem'        // 12px - Labels
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'masters-pattern': 'linear-gradient(135deg, transparent 0%, rgba(0, 75, 54, 0.02) 50%, transparent 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px -4px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 30px -10px rgba(0, 75, 54, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;