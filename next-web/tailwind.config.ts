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
        brand: {
          primary: "#fdd835",
          accent: "#000aff",
          dark: "#2c2c2c",
        },
        facebook: "#1877f2",
        line: "#06c755",
        danger: "#d32f2f",
        "section-bg-gray": "#f4f7f6",
        "light-gray-bg": "#f0f0f0",
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
