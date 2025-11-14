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
        // Legacy colors from original design
        'primary-color': '#fdd835',
        'dark-color': '#2c2c2c',
        'light-color': '#ffffff',
        'text-color': '#333333',
        'accent-color': '#000aff',
        'facebook-color': '#1877f2',
        'line-color': '#06c755',
        'light-gray-bg': '#f0f0f0',
        'danger-color': '#d32f2f',
        'section-bg-gray': '#f4f7f6',
        // Brand colors for convenience
        brand: {
          primary: "#fdd835",
          accent: "#000aff",
          dark: "#2c2c2c",
        },
        facebook: "#1877f2",
        line: "#06c755",
      },
      fontFamily: {
        main: ["Montserrat", "sans-serif"],
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
