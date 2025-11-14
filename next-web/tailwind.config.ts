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
        // Industrial construction tools theme colors
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
      fontFamily: {
        main: ["Montserrat", "sans-serif"],
        thai: ["Sarabun", "Tahoma", "sans-serif"],
      },
      container: {
        center: true,
        padding: "0",
        maxWidth: "1200px",
      },
    },
  },
  plugins: [],
} satisfies Config;
