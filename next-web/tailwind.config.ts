import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS Variables for dynamic theming
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Legacy color variables (for backward compatibility)
        'primary-color': '#1e3a8a', // Deep blue - industrial strength
        'secondary-color': '#64748b', // Slate gray - professional
        'accent-color': '#f97316', // Orange - safety/construction
        'dark-color': '#1e293b', // Dark slate - heavy duty
        'light-color': '#f8fafc', // Light slate - clean
        'text-color': '#334155', // Medium slate - readable
        'facebook-color': '#1877f2',
        'line-color': '#06c755',
        'light-gray-bg': '#f1f5f9', // Very light slate
        'danger-color': '#dc2626', // Red - warnings
        'section-bg-gray': '#e2e8f0', // Light industrial gray
        'warning-color': '#f59e0b', // Amber - caution
        'success-color': '#16a34a', // Green - success
        
        // Industrial palette
        'industrial': {
          'blue': '#1e3a8a', // Deep industrial blue
          'light-blue': '#3b82f6', // Bright blue
          'gray': '#64748b', // Professional gray
          'dark-gray': '#1e293b', // Heavy duty gray
          'light-gray': '#f1f5f9', // Clean light gray
          'orange': '#f97316', // Safety orange
          'steel': '#475569', // Steel color
        },
        
        // Brand colors for convenience
        brand: {
          primary: "#1e3a8a",
          accent: "#f97316",
          dark: "#1e293b",
        },
        facebook: "#1877f2",
        line: "#06c755",
      },
      
      // 8-point spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      fontFamily: {
        main: ["Montserrat", "sans-serif"],
        thai: ["Sarabun", "Tahoma", "sans-serif"],
        display: ["Prompt Sans", "Montserrat", "sans-serif"],
      },
      
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        maxWidth: "1200px",
      },
      
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'class',
} satisfies Config;
